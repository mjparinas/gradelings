import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const dir = mkdtempSync(join(tmpdir(), "grademap-referral-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
delete process.env.STRIPE_SECRET_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, verify: Mod, referral: Mod;
let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");
let ref: typeof import("@/server/referral");
let plan: typeof import("@/lib/plan");

beforeAll(async () => {
  [signup, verify, referral] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/verify/route"),
    import("@/app/api/referral/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  email = await import("@/server/email");
  ref = await import("@/server/referral");
  plan = await import("@/lib/plan");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
function req(path: string, method: string, body?: unknown, cookie?: string): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.2.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const tokenIn = (text: string) => decodeURIComponent(/token=([^\s&"]+)/.exec(text)![1]);

async function join_(address: string, referralCode?: string) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email: address, password: "correct horse", referralCode }));
  const body = (await res.json()) as { family: { trialEndsAt: number } };
  return { cookie: (res.headers.get("set-cookie") ?? "").split(";")[0], trialEndsAt: body.family.trialEndsAt };
}
async function confirm(address: string) {
  const mail = email.outbox().filter((m) => m.to === address).at(-1)!;
  return verify.POST(req("/api/auth/verify/", "POST", { token: tokenIn(mail.text) }));
}
const familyOf = async (address: string) =>
  (await dbm.query<{ id: string; trial_ends_at: number; referred_by: string | null }>("SELECT f.* FROM families f JOIN parents p ON p.family_id = f.id WHERE p.email = ?", [address]))[0];
const DAY = 86_400_000;

describe("referral codes", () => {
  it("accepts only well-formed codes", () => {
    expect(plan.normalizeReferralCode(" abcd2345 ")).toBe("ABCD2345");
    for (const bad of ["", "SHORT", "ABCD234O", "ABCD23456", 5, null]) expect(plan.normalizeReferralCode(bad)).toBeNull();
  });

  it("gives each family one stable code, only to signed-in parents", async () => {
    expect((await referral.GET(req("/api/referral/", "GET"))).status).toBe(401);
    const { cookie } = await join_("one@example.com");
    const a = (await (await referral.GET(req("/api/referral/", "GET", undefined, cookie))).json()) as { code: string; joined: number };
    const b = (await (await referral.GET(req("/api/referral/", "GET", undefined, cookie))).json()) as { code: string };
    expect(plan.normalizeReferralCode(a.code)).toBe(a.code);
    expect(b.code).toBe(a.code);
    expect(a.joined).toBe(0);
  });
});

describe("thanking the referrer", () => {
  it("leaves a referred family's trial alone, then thanks the referrer once the email is confirmed", async () => {
    const { cookie } = await join_("giver@example.com");
    const { code } = (await (await referral.GET(req("/api/referral/", "GET", undefined, cookie))).json()) as { code: string };
    const before = (await familyOf("giver@example.com")).trial_ends_at;

    const friend = await join_("friend@example.com", code.toLowerCase());
    expect(friend.trialEndsAt - Date.now()).toBeLessThanOrEqual(plan.TRIAL_DAYS * DAY);
    expect((await familyOf("friend@example.com")).referred_by).toBe((await familyOf("giver@example.com")).id);

    // Nothing for the referrer until the friend's email is confirmed.
    expect((await familyOf("giver@example.com")).trial_ends_at).toBe(before);
    expect((await confirm("friend@example.com")).status).toBe(200);
    expect((await familyOf("giver@example.com")).trial_ends_at).toBe(before + plan.REFERRAL_BONUS_DAYS * DAY);

    // Confirming again (a fresh link) never pays twice.
    await ref.rewardReferrer((await familyOf("friend@example.com")).id);
    expect((await familyOf("giver@example.com")).trial_ends_at).toBe(before + plan.REFERRAL_BONUS_DAYS * DAY);

    const summary = (await (await referral.GET(req("/api/referral/", "GET", undefined, cookie))).json()) as { joined: number; rewarded: number; monthsEarned: number };
    expect(summary).toMatchObject({ joined: 1, rewarded: 1, monthsEarned: 1 });
  });

  it("restarts from today for a referrer whose trial already ended", async () => {
    const { cookie } = await join_("lapsed@example.com");
    const { code } = (await (await referral.GET(req("/api/referral/", "GET", undefined, cookie))).json()) as { code: string };
    await dbm.run("UPDATE families SET trial_ends_at = ?, plan = 'free' WHERE id = ?", [Date.now() - 10 * DAY, (await familyOf("lapsed@example.com")).id]);
    await join_("newbie@example.com", code);
    await confirm("newbie@example.com");
    const end = (await familyOf("lapsed@example.com")).trial_ends_at;
    expect(end).toBeGreaterThan(Date.now() + (plan.REFERRAL_BONUS_DAYS - 1) * DAY);
    expect(end).toBeLessThan(Date.now() + (plan.REFERRAL_BONUS_DAYS + 1) * DAY);
  });

  it("extends a paying referrer's renewal date in simulated billing", async () => {
    const { cookie } = await join_("payer@example.com");
    const id = (await familyOf("payer@example.com")).id;
    const { code } = (await (await referral.GET(req("/api/referral/", "GET", undefined, cookie))).json()) as { code: string };
    const end = Date.now() + 10 * DAY;
    await dbm.run("UPDATE families SET subscription_status = 'active', plan = 'premium', current_period_end = ? WHERE id = ?", [end, id]);
    await join_("pal@example.com", code);
    await confirm("pal@example.com");
    const row = (await dbm.query<{ current_period_end: number }>("SELECT current_period_end FROM families WHERE id = ?", [id]))[0];
    expect(Number(row.current_period_end)).toBe(end + plan.REFERRAL_BONUS_DAYS * DAY);
  });

  it("ignores unknown codes without telling the caller", async () => {
    const friend = await join_("stranger@example.com", "ZZZZ2222");
    expect(friend.trialEndsAt - Date.now()).toBeLessThanOrEqual(plan.TRIAL_DAYS * DAY);
    expect((await familyOf("stranger@example.com")).referred_by).toBeNull();
  });

  it("stops rewarding after the cap", async () => {
    const { cookie } = await join_("popular@example.com");
    const id = (await familyOf("popular@example.com")).id;
    const { code } = (await (await referral.GET(req("/api/referral/", "GET", undefined, cookie))).json()) as { code: string };
    const start = (await familyOf("popular@example.com")).trial_ends_at;
    for (let i = 0; i < plan.REFERRAL_MAX_REWARDS + 2; i++) {
      await join_(`fan${i}@example.com`, code);
      await confirm(`fan${i}@example.com`);
    }
    expect((await familyOf("popular@example.com")).trial_ends_at).toBe(start + plan.REFERRAL_MAX_REWARDS * plan.REFERRAL_BONUS_DAYS * DAY);
    const summary = await ref.referralSummary(id);
    expect(summary).toMatchObject({ joined: plan.REFERRAL_MAX_REWARDS + 2, monthsEarned: plan.REFERRAL_MAX_REWARDS });
  });

  it("gives class accounts no code, and their code can't be used", async () => {
    const { cookie } = await join_("teacher@example.com");
    const id = (await familyOf("teacher@example.com")).id;
    await dbm.run("UPDATE parents SET role = 'student' WHERE family_id = ?", [id]);
    expect((await referral.GET(req("/api/referral/", "GET", undefined, cookie))).status).toBe(401); // student sessions are narrow by design
    expect(await ref.ensureReferralCode(id)).toBeNull();
  });
});

describe("thanking a real Stripe subscriber", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  async function payingReferrer(address: string) {
    const { cookie } = await join_(address);
    const id = (await familyOf(address)).id;
    const { code } = (await (await referral.GET(req("/api/referral/", "GET", undefined, cookie))).json()) as { code: string };
    await dbm.run("UPDATE families SET subscription_status = 'active', plan = 'premium', stripe_customer = ?, current_period_end = 123 WHERE id = ?", [`cus_${id}`, id]);
    return { id, code };
  }

  it("takes a month's price off their next Stripe invoice instead of moving dates", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_ref");
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const { id, code } = await payingReferrer("stripe-payer@example.com");
    await join_("stripe-pal@example.com", code);
    await confirm("stripe-pal@example.com");

    const credits = fetchMock.mock.calls.filter((c) => String((c as unknown[])[0]).includes("/balance_transactions"));
    expect(credits).toHaveLength(1);
    const [url, init] = credits[0] as unknown as [string, RequestInit];
    expect(url).toBe(`https://api.stripe.com/v1/customers/${encodeURIComponent(`cus_${id}`)}/balance_transactions`);
    expect(new URLSearchParams(String(init.body)).get("amount")).toBe(String(-Math.round(plan.PRICES.month.amount * 100)));
    const row = (await dbm.query<{ current_period_end: number }>("SELECT current_period_end FROM families WHERE id = ?", [id]))[0];
    expect(Number(row.current_period_end)).toBe(123);
  });

  it("releases the reward when Stripe refuses, so a later confirmation can try again", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_ref");
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ error: { message: "No such customer" } }), { status: 400 })));
    const { code } = await payingReferrer("stripe-fail@example.com");
    await join_("stripe-fail-pal@example.com", code);
    const pal = (await familyOf("stripe-fail-pal@example.com")).id;

    expect(await ref.rewardReferrer(pal)).toBe(false);
    const after = await dbm.query<{ referral_rewarded_at: number | null }>("SELECT referral_rewarded_at FROM families WHERE id = ?", [pal]);
    expect(after[0].referral_rewarded_at).toBeNull();

    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
    expect(await ref.rewardReferrer(pal)).toBe(true);
    expect(await ref.rewardReferrer(pal)).toBe(false); // Thanked once only.
  });
});
