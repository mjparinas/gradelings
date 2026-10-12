import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { LIFETIME_ACCESS } from "@/lib/plan";

// Redeem codes, through the real route handlers against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-codes-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
const ADMIN = "admin-token-that-is-long-enough-123";
delete process.env.RESEND_API_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, me: Mod, redeem: Mod, admin: Mod, checkout: Mod, webhook: Mod, account: Mod;
let dbm: typeof import("@/server/db");
let codes: typeof import("@/server/codes");

beforeAll(async () => {
  [signup, me, redeem, admin, checkout, webhook, account] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/me/route"),
    import("@/app/api/codes/redeem/route"),
    import("@/app/api/admin/codes/route"),
    import("@/app/api/billing/checkout/route"),
    import("@/app/api/billing/webhook/route"),
    import("@/app/api/account/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  codes = await import("@/server/codes");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
function req(path: string, body?: unknown, opts: { cookie?: string; method?: string; auth?: string } = {}): Request {
  return new Request(`http://localhost${path}`, {
    method: opts.method ?? "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `10.1.0.${++ip}`,
      ...(opts.cookie ? { cookie: opts.cookie } : {}),
      ...(opts.auth ? { authorization: opts.auth } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0];

async function newAccount(address: string) {
  const res = await signup.POST(req("/api/auth/signup/", { email: address, password: "correct horse" }));
  expect(res.status).toBe(200);
  const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [address]))[0].family_id;
  return { cookie: cookieOf(res), familyId };
}
const family = async (cookie: string) => (await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json()).family;

async function makeCode(body: Record<string, unknown>) {
  process.env.ADMIN_TOKEN = ADMIN;
  try {
    const res = await admin.POST(req("/api/admin/codes/", body, { auth: `Bearer ${ADMIN}` }));
    expect(res.status).toBe(200);
    return (await res.json()).code as { code: string; display: string };
  } finally {
    delete process.env.ADMIN_TOKEN;
  }
}

describe("admin codes API", () => {
  it("is off without a long ADMIN_TOKEN, and refuses a wrong token", async () => {
    delete process.env.ADMIN_TOKEN;
    expect((await admin.GET(req("/api/admin/codes/", undefined, { method: "GET", auth: "Bearer x" }))).status).toBe(404);
    process.env.ADMIN_TOKEN = "short";
    expect((await admin.GET(req("/api/admin/codes/", undefined, { method: "GET", auth: "Bearer short" }))).status).toBe(404);
    process.env.ADMIN_TOKEN = ADMIN;
    expect((await admin.GET(req("/api/admin/codes/", undefined, { method: "GET", auth: "Bearer wrong" }))).status).toBe(404);
    expect((await admin.GET(req("/api/admin/codes/", undefined, { method: "GET", auth: `Bearer ${ADMIN}` }))).status).toBe(200);
    delete process.env.ADMIN_TOKEN;
  });

  it("makes random readable codes, takes custom ones once, and checks the request", async () => {
    const random = await makeCode({ kind: "access", days: 30 });
    expect(random.code).toMatch(/^[A-HJ-NP-Z2-9]{12}$/);
    expect(random.display).toMatch(/^\w{4}-\w{4}-\w{4}$/);
    const custom = await makeCode({ kind: "discount", percentOff: 20, code: "spring-2027" });
    expect(custom.code).toBe("SPRING2027");

    process.env.ADMIN_TOKEN = ADMIN;
    const auth = `Bearer ${ADMIN}`;
    expect((await admin.POST(req("/api/admin/codes/", { kind: "discount", percentOff: 10, code: "Spring 2027" }, { auth }))).status).toBe(409);
    for (const bad of [
      { kind: "gift" },
      { kind: "access", days: 0 },
      { kind: "access", days: 1.5 },
      { kind: "discount" },
      { kind: "discount", percentOff: 120 },
      { kind: "discount", percentOff: 20, duration: "repeating" },
      { kind: "access", code: "abc" },
      { kind: "access", code: 12345678 },
      { kind: "access", maxUses: 0 },
      { kind: "access", expiresAt: 1 },
    ]) {
      expect((await admin.POST(req("/api/admin/codes/", bad, { auth }))).status, JSON.stringify(bad)).toBe(400);
    }
    const list = await (await admin.GET(req("/api/admin/codes/", undefined, { method: "GET", auth }))).json();
    expect(list.codes.map((c: { code: string }) => c.code)).toEqual(expect.arrayContaining([random.code, "SPRING2027"]));
    delete process.env.ADMIN_TOKEN;
  });
});

describe("redeeming codes", () => {
  it("gives six months of access, stacks a year on top, and works once per family", async () => {
    const { cookie } = await newAccount("six@example.com");
    const six = await makeCode({ kind: "access", days: 182 });
    const year = await makeCode({ kind: "access", days: 365 });
    const before = Date.now();
    const res = await redeem.POST(req("/api/codes/redeem/", { code: six.display.toLowerCase() }, { cookie }));
    expect(res.status).toBe(200);
    const first = (await family(cookie)).accessUntil;
    expect(first).toBeGreaterThanOrEqual(before + 182 * 86_400_000);
    expect((await redeem.POST(req("/api/codes/redeem/", { code: six.code }, { cookie }))).status).toBe(409);
    expect((await redeem.POST(req("/api/codes/redeem/", { code: year.code }, { cookie }))).status).toBe(200);
    expect((await family(cookie)).accessUntil).toBe(first + 365 * 86_400_000);
  });

  it("grants lifetime access that a cancelled subscription doesn't take away", async () => {
    const { cookie, familyId } = await newAccount("life@example.com");
    const life = await makeCode({ kind: "access" });
    await redeem.POST(req("/api/codes/redeem/", { code: life.code }, { cookie }));
    expect((await family(cookie)).accessUntil).toBe(LIFETIME_ACCESS);

    const payload = JSON.stringify({ id: "evt_life", created: Math.floor(Date.now() / 1000), type: "customer.subscription.deleted", data: { object: { status: "canceled", customer: "cus_l", metadata: { family_id: familyId } } } });
    const t = Math.floor(Date.now() / 1000);
    const sig = `t=${t},v1=${createHmac("sha256", "whsec_test").update(`${t}.${payload}`).digest("hex")}`;
    await webhook.POST(new Request("http://localhost/api/billing/webhook/", { method: "POST", headers: { "stripe-signature": sig }, body: payload }));
    const f = await family(cookie);
    expect(f.plan).toBe("free");
    expect(f.accessUntil).toBe(LIFETIME_ACCESS);

    const more = await makeCode({ kind: "access", days: 30 });
    expect((await redeem.POST(req("/api/codes/redeem/", { code: more.code }, { cookie }))).status).toBe(409);
  });

  it("answers the same for unknown, disabled, expired and used-up codes", async () => {
    const { cookie } = await newAccount("nope@example.com");
    const other = await newAccount("first@example.com");
    const once = await makeCode({ kind: "access", days: 30, maxUses: 1 });
    expect((await redeem.POST(req("/api/codes/redeem/", { code: once.code }, { cookie: other.cookie }))).status).toBe(200);
    const off = await makeCode({ kind: "access", days: 30 });
    process.env.ADMIN_TOKEN = ADMIN;
    expect((await admin.DELETE(req("/api/admin/codes/", { code: off.display }, { method: "DELETE", auth: `Bearer ${ADMIN}` }))).status).toBe(200);
    delete process.env.ADMIN_TOKEN;
    const soon = await makeCode({ kind: "access", days: 30, expiresAt: Date.now() + 60_000 });
    await dbm.run("UPDATE redeem_codes SET expires_at = ? WHERE code = ?", [Date.now() - 1, soon.code]);

    const messages = new Set<string>();
    for (const code of ["NOSUCHCODE1", once.code, off.code, soon.code, "!!", ""]) {
      const res = await redeem.POST(req("/api/codes/redeem/", { code }, { cookie }));
      expect(res.status, code).toBe(400);
      messages.add((await res.json()).error);
    }
    expect(messages.size).toBe(1);
    expect((await family(cookie)).accessUntil).toBeNull();
  });

  it("never lets two families take the last use", async () => {
    const a = await newAccount("race-a@example.com");
    const b = await newAccount("race-b@example.com");
    const last = await makeCode({ kind: "access", days: 30, maxUses: 1 });
    const results = await Promise.all([a, b].map((f) => redeem.POST(req("/api/codes/redeem/", { code: last.code }, { cookie: f.cookie }))));
    expect(results.map((r) => r.status).sort()).toEqual([200, 400]);
    expect((await codes.getCode(last.code))!.uses).toBe(1);
  });

  it("needs a parent account, and limits guessing", async () => {
    expect((await redeem.POST(req("/api/codes/redeem/", { code: "ABCDEFGH" }))).status).toBe(401);
    const { cookie } = await newAccount("guess@example.com");
    const statuses: number[] = [];
    for (let i = 0; i < 12; i++) statuses.push((await redeem.POST(req("/api/codes/redeem/", { code: `GUESS${i}XYZ` }, { cookie }))).status);
    expect(statuses.slice(0, 10).every((s) => s === 400)).toBe(true);
    expect(statuses.at(-1)).toBe(429);
  });

  it("saves a discount for checkout, sends its coupon to Stripe, and clears it once paid", async () => {
    const { cookie, familyId } = await newAccount("deal@example.com");
    await dbm.run("UPDATE parents SET email_verified_at = 1 WHERE email = ?", ["deal@example.com"]);
    const deal = await makeCode({ kind: "discount", percentOff: 25, duration: "repeating", months: 3 });
    const res = await redeem.POST(req("/api/codes/redeem/", { code: deal.code }, { cookie }));
    expect((await res.json()).result).toEqual({ ok: true, kind: "discount", percentOff: 25 });
    expect((await family(cookie)).discount).toEqual({ code: deal.code, percentOff: 25 });

    const env = { STRIPE_SECRET_KEY: "sk_test", STRIPE_PRICE_MONTHLY: "price_m", STRIPE_PRICE_YEARLY: "price_y" };
    Object.assign(process.env, env);
    const sent: Record<string, URLSearchParams> = {};
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
      const url = String(input);
      const params = new URLSearchParams(String(init?.body ?? ""));
      if (url.endsWith("/coupons")) {
        sent.coupon = params;
        return new Response(JSON.stringify({ id: "coupon_25" }));
      }
      sent.checkout = params;
      return new Response(JSON.stringify({ url: "https://checkout.stripe.test/s" }));
    });
    try {
      expect((await checkout.POST(req("/api/billing/checkout/", { interval: "year" }, { cookie }))).status).toBe(200);
      expect(sent.coupon.get("percent_off")).toBe("25");
      expect(sent.coupon.get("duration")).toBe("repeating");
      expect(sent.coupon.get("duration_in_months")).toBe("3");
      expect(sent.checkout.get("discounts[0][coupon]")).toBe("coupon_25");
      expect(sent.checkout.has("allow_promotion_codes")).toBe(false);
      expect((await codes.getCode(deal.code))!.stripe_coupon).toBe("coupon_25");
    } finally {
      fetchMock.mockRestore();
      for (const k of Object.keys(env)) delete process.env[k];
    }

    const payload = JSON.stringify({ id: "evt_deal", created: Math.floor(Date.now() / 1000), type: "checkout.session.completed", data: { object: { client_reference_id: familyId, customer: "cus_d", payment_status: "paid", mode: "subscription", subscription: "sub_d" } } });
    const t = Math.floor(Date.now() / 1000);
    const sig = `t=${t},v1=${createHmac("sha256", "whsec_test").update(`${t}.${payload}`).digest("hex")}`;
    await webhook.POST(new Request("http://localhost/api/billing/webhook/", { method: "POST", headers: { "stripe-signature": sig }, body: payload }));
    const f = await family(cookie);
    expect(f.plan).toBe("premium");
    expect(f.discount).toBeNull();

    // A subscribed family has nothing to discount.
    const later = await makeCode({ kind: "discount", percentOff: 10 });
    expect((await redeem.POST(req("/api/codes/redeem/", { code: later.code }, { cookie }))).status).toBe(409);
  });

  it("clears a discount when the subscription starts, even if its checkout paid later", async () => {
    const { cookie, familyId } = await newAccount("slowpay@example.com");
    const deal = await makeCode({ kind: "discount", percentOff: 15 });
    await redeem.POST(req("/api/codes/redeem/", { code: deal.code }, { cookie }));
    expect((await family(cookie)).discount).toEqual({ code: deal.code, percentOff: 15 });
    const payload = JSON.stringify({ id: "evt_slow", created: Math.floor(Date.now() / 1000), type: "customer.subscription.created", data: { object: { status: "active", customer: "cus_slow", metadata: { family_id: familyId } } } });
    const t = Math.floor(Date.now() / 1000);
    const sig = `t=${t},v1=${createHmac("sha256", "whsec_test").update(`${t}.${payload}`).digest("hex")}`;
    await webhook.POST(new Request("http://localhost/api/billing/webhook/", { method: "POST", headers: { "stripe-signature": sig }, body: payload }));
    expect((await family(cookie)).discount).toBeNull();
  });

  it("removes a family's redemptions when the account is deleted", async () => {
    const { cookie, familyId } = await newAccount("gone@example.com");
    const code = await makeCode({ kind: "access", days: 30 });
    await redeem.POST(req("/api/codes/redeem/", { code: code.code }, { cookie }));
    expect((await account.DELETE(req("/api/account/", { password: "correct horse" }, { cookie, method: "DELETE" }))).status).toBe(200);
    expect(await dbm.query("SELECT * FROM code_redemptions WHERE family_id = ?", [familyId])).toEqual([]);
  });
});

describe("extendAccess", () => {
  it("starts from now or from the access already granted, and never passes lifetime", () => {
    const day = 86_400_000;
    expect(codes.extendAccess(null, 10, 1_000)).toBe(1_000 + 10 * day);
    expect(codes.extendAccess(500, 10, 1_000)).toBe(1_000 + 10 * day);
    expect(codes.extendAccess(5_000, 10, 1_000)).toBe(5_000 + 10 * day);
    expect(codes.extendAccess(5_000, null, 1_000)).toBe(LIFETIME_ACCESS);
    expect(codes.extendAccess(LIFETIME_ACCESS, 10, 1_000)).toBe(LIFETIME_ACCESS);
    expect(codes.extendAccess(LIFETIME_ACCESS - day, 10, 1_000)).toBe(LIFETIME_ACCESS);
  });

  it("reads codes however they are typed", () => {
    expect(codes.normalizeCode(" abcd-efgh jkmn ")).toBe("ABCDEFGHJKMN");
    expect(codes.formatCode("ABCDEFGHJKMN")).toBe("ABCD-EFGH-JKMN");
    expect(codes.formatCode("SPRING2027")).toBe("SPRING2027");
  });
});
