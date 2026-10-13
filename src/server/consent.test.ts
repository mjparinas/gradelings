import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// US families: country from the first child, the COPPA consent gate in sync, consent and withdraw routes,
// the confirmation emails and the USD checkout. Real route handlers against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-consent-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
delete process.env.RESEND_API_KEY;
delete process.env.NEXT_PUBLIC_SITE_URL;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, sync: Mod, consentRoute: Mod, withdrawRoute: Mod, checkout: Mod, webhook: Mod, me: Mod;
let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");
let consent: typeof import("@/server/consent");

beforeAll(async () => {
  [signup, sync, consentRoute, withdrawRoute, checkout, webhook, me] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/sync/route"),
    import("@/app/api/account/consent/route"),
    import("@/app/api/account/consent/withdraw/route"),
    import("@/app/api/billing/checkout/route"),
    import("@/app/api/billing/webhook/route"),
    import("@/app/api/auth/me/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  email = await import("@/server/email");
  consent = await import("@/server/consent");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
function post(path: string, body: unknown, cookie?: string): Request {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `10.1.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0];

async function newAccount(address: string) {
  const res = await signup.POST(post("/api/auth/signup/", { email: address, password: "correct horse" }));
  expect(res.status).toBe(200);
  const body = await res.json();
  return { cookie: cookieOf(res), familyId: body.family.account.familyId as string };
}

const child = (id: string, framework: string, createdAt = Date.now() - 10_000) => ({ id, name: "Sam", grade: "3", avatar: "ollie", colour: "#fff", framework, createdAt, updatedAt: Date.now() });
const event = (id: string, profileId: string) => ({ id, profileId, type: "answer", t: Date.now() - 1000, unitKey: "3/math/x", correct: true });
const family = (familyId: string) => dbm.query<Record<string, unknown>>("SELECT * FROM families WHERE id = ?", [familyId]).then((r) => r[0]);
const stored = async (familyId: string) => ({
  profiles: (await dbm.query("SELECT id FROM profiles WHERE family_id = ?", [familyId])).length,
  events: (await dbm.query("SELECT id FROM events WHERE family_id = ?", [familyId])).length,
  settings: (await dbm.query("SELECT profile_id FROM child_settings WHERE family_id = ?", [familyId])).length,
});

describe("a Canadian family", () => {
  it("stays Canadian, is never asked for consent and syncs as before", async () => {
    const { cookie, familyId } = await newAccount("ca-family@example.com");
    const res = await (await sync.POST(post("/api/sync/", { profiles: [child("ca-1", "ca-on")], events: [event("ca-e1", "ca-1")] }, cookie))).json();
    expect(res.accepted).toEqual(["ca-e1"]);
    expect(res.family).toMatchObject({ country: "CA", consentAt: null });
    expect(await stored(familyId)).toMatchObject({ profiles: 1, events: 1 });
    expect((await consentRoute.POST(post("/api/account/consent/", { agree: true }, cookie))).status).toBe(400);
  });

  it("keeps its country once a child is stored, even if a US child is added later", async () => {
    const { cookie, familyId } = await newAccount("ca-then-us@example.com");
    await sync.POST(post("/api/sync/", { profiles: [child("ctu-1", "ca-bc")] }, cookie));
    const res = await (await sync.POST(post("/api/sync/", { profiles: [child("ctu-2", "us-wa", Date.now() - 99_999)] }, cookie))).json();
    expect(res.family.country).toBe("CA");
    expect((await family(familyId)).country).toBe("CA");
  });
});

describe("a US family", () => {
  it("is US from its first child, and nothing about the children is stored before consent", async () => {
    const { cookie, familyId } = await newAccount("us-family@example.com");
    const settings = { profileId: "us-1", updatedAt: Date.now(), dailyGoalMinutes: 15 };
    const res = await (await sync.POST(post("/api/sync/", { profiles: [child("us-1", "us-wa")], settings: [settings], events: [event("us-e1", "us-1")] }, cookie))).json();
    expect(res.family).toMatchObject({ country: "US", consentAt: null });
    // Not acknowledged: the device keeps the events and sends them once consent is given.
    expect(res.accepted).toEqual([]);
    expect(res.profiles).toEqual([]);
    expect(await stored(familyId)).toEqual({ profiles: 0, events: 0, settings: 0 });
    const meRes = await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json();
    expect(meRes.family.country).toBe("US");
  });

  it("follows the first child added, until a child is stored", async () => {
    const { cookie } = await newAccount("us-order@example.com");
    const res = await (await sync.POST(post("/api/sync/", { profiles: [child("ord-ca", "ca-bc", 2000), child("ord-us", "us-wa", 1000)] }, cookie))).json();
    expect(res.family.country).toBe("US");
    // The US child was deleted on the device before consent: the family follows its remaining (Canadian) child.
    const back = await (await sync.POST(post("/api/sync/", { profiles: [child("ord-ca", "ca-bc", 2000), { ...child("ord-us", "us-wa", 1000), deleted: true }] }, cookie))).json();
    expect(back.family.country).toBe("CA");
    expect(back.profiles.filter((p: { deleted?: boolean }) => !p.deleted).map((p: { id: string }) => p.id)).toEqual(["ord-ca"]);
  });

  it("syncs after consent, emails a confirmation now and a delayed one later, and withdrawing deletes the children's data", async () => {
    const { cookie, familyId } = await newAccount("us-consent@example.com");
    await sync.POST(post("/api/sync/", { profiles: [child("uc-1", "us-wa")], events: [event("uc-e1", "uc-1")] }, cookie));
    expect((await consentRoute.POST(post("/api/account/consent/", {}, cookie))).status).toBe(400);

    const before = email.outbox().length;
    const agreed = await (await consentRoute.POST(post("/api/account/consent/", { agree: true }, cookie))).json();
    expect(agreed.family.consentAt).toEqual(expect.any(Number));
    const row = await family(familyId);
    expect(row).toMatchObject({ consent_version: "2026-10", consent_method: "email-plus", consent_followup_at: null });
    const confirmation = email.outbox().slice(before).find((m) => m.to === "us-consent@example.com")!;
    expect(confirmation.kind).toBe("consent");
    expect(confirmation.subject).toMatch(/gave .+ permission/);
    expect(confirmation.text).toContain(`/account/consent/?token=${encodeURIComponent(String(row.consent_token))}`);
    expect(confirmation.text).not.toContain("Sam");

    // Agreeing twice changes nothing and sends nothing more.
    const count = email.outbox().length;
    await consentRoute.POST(post("/api/account/consent/", { agree: true }, cookie));
    expect(email.outbox().length).toBe(count);

    const res = await (await sync.POST(post("/api/sync/", { profiles: [child("uc-1", "us-wa")], events: [event("uc-e1", "uc-1")] }, cookie))).json();
    expect(res.accepted).toEqual(["uc-e1"]);
    expect(res.profiles[0].framework).toBe("us-wa");
    expect(await stored(familyId)).toMatchObject({ profiles: 1, events: 1 });

    // The delayed confirmation waits a day, then goes once.
    const consentAt = Number(row.consent_at);
    expect(await consent.sendConsentFollowUps("https://app.test", consentAt + 60_000)).toBe(0);
    expect(await consent.sendConsentFollowUps("https://app.test", consentAt + 86_400_000)).toBe(1);
    expect(email.outbox().at(-1)).toMatchObject({ to: "us-consent@example.com", kind: "consent" });
    expect(email.outbox().at(-1)!.subject).toMatch(/^Reminder/);
    expect(await consent.sendConsentFollowUps("https://app.test", consentAt + 2 * 86_400_000)).toBe(0);

    // The withdraw link: a bad token is refused, the real one deletes the children's data and stops sync.
    expect((await withdrawRoute.POST(post("/api/account/consent/withdraw/?token=nope", undefined))).status).toBe(400);
    expect((await withdrawRoute.POST(post(`/api/account/consent/withdraw/?token=${encodeURIComponent(String(row.consent_token))}`, undefined))).status).toBe(200);
    expect(await stored(familyId)).toEqual({ profiles: 0, events: 0, settings: 0 });
    expect(await family(familyId)).toMatchObject({ consent_at: null, country: "US" });
    expect((await family(familyId)).consent_revoked_at).toEqual(expect.any(Number));
    // The parent's account stays.
    expect((await dbm.query("SELECT id FROM parents WHERE family_id = ?", [familyId])).length).toBe(1);
    const after = await (await sync.POST(post("/api/sync/", { profiles: [child("uc-1", "us-wa")], events: [event("uc-e2", "uc-1")] }, cookie))).json();
    expect(after.accepted).toEqual([]);
    expect(after.family.consentAt).toBeNull();
    expect(await stored(familyId)).toEqual({ profiles: 0, events: 0, settings: 0 });
  });

  it("can withdraw from the Parent area too", async () => {
    const { cookie, familyId } = await newAccount("us-withdraw@example.com");
    await sync.POST(post("/api/sync/", { profiles: [child("uw-1", "us-wa")] }, cookie));
    await consentRoute.POST(post("/api/account/consent/", { agree: true }, cookie));
    await sync.POST(post("/api/sync/", { profiles: [child("uw-1", "us-wa")], events: [event("uw-e1", "uw-1")] }, cookie));
    expect(await stored(familyId)).toMatchObject({ profiles: 1, events: 1 });
    const res = await (await consentRoute.POST(post("/api/account/consent/", { withdraw: true }, cookie))).json();
    expect(res.family.consentAt).toBeNull();
    expect(await stored(familyId)).toEqual({ profiles: 0, events: 0, settings: 0 });
  });

  it("counts a paid checkout as consent, recorded from the webhook", async () => {
    const { cookie, familyId } = await newAccount("us-paid@example.com");
    await sync.POST(post("/api/sync/", { profiles: [child("up-1", "us-wa")] }, cookie));
    const payload = JSON.stringify({
      id: "evt_us_paid",
      created: Math.floor(Date.now() / 1000),
      type: "checkout.session.completed",
      data: { object: { client_reference_id: familyId, customer: "cus_us", payment_status: "paid", mode: "subscription", subscription: "sub_us", customer_details: { email: "us-paid@example.com" } } },
    });
    const t = Math.floor(Date.now() / 1000);
    const sig = `t=${t},v1=${createHmac("sha256", "whsec_test").update(`${t}.${payload}`).digest("hex")}`;
    const before = email.outbox().length;
    const res = await webhook.POST(new Request("http://localhost/api/billing/webhook/", { method: "POST", body: payload, headers: { "stripe-signature": sig } }));
    expect(res.status).toBe(200);
    expect(await family(familyId)).toMatchObject({ consent_method: "payment", plan: "premium" });
    expect(email.outbox().slice(before).some((m) => m.to === "us-paid@example.com" && m.kind === "consent")).toBe(true);
  });

  it("checks out in US dollars with Stripe Tax, or says US payments aren't available yet", async () => {
    const { cookie, familyId } = await newAccount("us-checkout@example.com");
    await dbm.run("UPDATE parents SET email_verified_at = ? WHERE family_id = ?", [Date.now(), familyId]);
    await sync.POST(post("/api/sync/", { profiles: [child("uco-1", "us-wa")] }, cookie));
    const env = { STRIPE_SECRET_KEY: "sk_test_1", STRIPE_PRICE_MONTHLY: "price_cad_m", STRIPE_PRICE_YEARLY: "price_cad_y" };
    Object.assign(process.env, env);
    const realFetch = globalThis.fetch;
    const sent: string[] = [];
    globalThis.fetch = (async (_url: string, init?: RequestInit) => {
      sent.push(String(init?.body));
      return new Response(JSON.stringify({ url: "https://checkout.stripe.com/c/us" }), { status: 200 });
    }) as typeof fetch;
    try {
      const unavailable = await checkout.POST(post("/api/billing/checkout/", { interval: "year" }, cookie));
      expect(unavailable.status).toBe(503);
      expect((await unavailable.json()).error).toMatch(/US dollars aren't available yet/);
      expect(sent).toEqual([]);

      Object.assign(process.env, { STRIPE_PRICE_MONTHLY_USD: "price_usd_m", STRIPE_PRICE_YEARLY_USD: "price_usd_y" });
      const ok = await checkout.POST(post("/api/billing/checkout/", { interval: "year" }, cookie));
      expect(ok.status).toBe(200);
      const form = Object.fromEntries(new URLSearchParams(sent[0]));
      expect(form).toMatchObject({ "line_items[0][price]": "price_usd_y", "automatic_tax[enabled]": "true", billing_address_collection: "required" });
    } finally {
      globalThis.fetch = realFetch;
      for (const k of [...Object.keys(env), "STRIPE_PRICE_MONTHLY_USD", "STRIPE_PRICE_YEARLY_USD"]) delete process.env[k];
    }
  });
});
