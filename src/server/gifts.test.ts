import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { GIFT_DAYS, giftCents } from "@/lib/plan";

// Gifts, through the real webhook and gift routes against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-gifts-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
delete process.env.RESEND_API_KEY;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let webhook: Mod, gift: Mod, signup: Mod, redeem: Mod, me: Mod;
let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");
let flags: typeof import("@/server/flags");

beforeAll(async () => {
  [webhook, gift, signup, redeem, me] = (await Promise.all([
    import("@/app/api/billing/webhook/route"),
    import("@/app/api/billing/gift/route"),
    import("@/app/api/auth/signup/route"),
    import("@/app/api/codes/redeem/route"),
    import("@/app/api/auth/me/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  email = await import("@/server/email");
  flags = await import("@/server/flags");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

let ip = 0;
const post = (path: string, body: unknown, headers: Record<string, string> = {}) =>
  new Request(`http://localhost${path}`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `10.2.0.${++ip}`, ...headers }, body: JSON.stringify(body) });

function event(id: string, session: Record<string, unknown>): Request {
  const payload = JSON.stringify({ id, created: Math.floor(Date.now() / 1000), type: "checkout.session.completed", data: { object: session } });
  const t = Math.floor(Date.now() / 1000);
  const sig = `t=${t},v1=${createHmac("sha256", "whsec_test").update(`${t}.${payload}`).digest("hex")}`;
  return new Request("http://localhost/api/billing/webhook/", { method: "POST", headers: { "stripe-signature": sig }, body: payload });
}
const paidGift = (id: string, over: Record<string, unknown> = {}) => ({
  id,
  mode: "payment",
  payment_status: "paid",
  currency: "cad",
  amount_subtotal: giftCents("CAD"),
  metadata: { gift: "1" },
  customer_details: { email: "buyer@example.com" },
  ...over,
});
const giftCodes = () => dbm.query<{ code: string; days: number; max_uses: number; note: string; expires_at: number }>("SELECT * FROM redeem_codes WHERE note LIKE 'Gift %'");

describe("a paid gift checkout", () => {
  it("makes one single-use code for a year and emails it to the buyer", async () => {
    const before = email.outbox().length;
    expect((await webhook.POST(event("evt_g1", paidGift("cs_g1")))).status).toBe(200);
    const [row] = await giftCodes();
    expect(row).toMatchObject({ days: GIFT_DAYS, max_uses: 1, note: "Gift cs_g1" });
    expect(row.expires_at).toBeGreaterThan(Date.now() + 700 * 86_400_000);
    const sent = email.outbox().slice(before);
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({ to: "buyer@example.com", kind: "gift" });
    expect(sent[0].text).toContain(row.code.match(/.{4}/g)!.join("-"));
  });

  it("makes the code once however often Stripe repeats the checkout", async () => {
    await webhook.POST(event("evt_g2a", paidGift("cs_g2")));
    await webhook.POST(event("evt_g2b", paidGift("cs_g2")));
    expect((await giftCodes()).filter((c) => c.note === "Gift cs_g2")).toHaveLength(1);
  });

  it("gives a family a year of access when they redeem it, and only once", async () => {
    await webhook.POST(event("evt_g3", paidGift("cs_g3")));
    const code = (await giftCodes()).find((c) => c.note === "Gift cs_g3")!.code;
    const res = await signup.POST(post("/api/auth/signup/", { email: "family@example.com", password: "correct horse" }));
    const cookie = (res.headers.get("set-cookie") ?? "").split(";")[0];
    const used = await redeem.POST(post("/api/codes/redeem/", { code }, { cookie }));
    expect(used.status).toBe(200);
    const family = (await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json()).family;
    expect(family.accessUntil).toBeGreaterThan(Date.now() + 360 * 86_400_000);
    const other = await signup.POST(post("/api/auth/signup/", { email: "other@example.com", password: "correct horse" }));
    const second = await redeem.POST(post("/api/codes/redeem/", { code }, { cookie: (other.headers.get("set-cookie") ?? "").split(";")[0] }));
    expect(second.status).toBe(400);
  });

  it("ignores payments that aren't our gift: unpaid, not tagged, or the wrong price", async () => {
    const before = (await giftCodes()).length;
    await webhook.POST(event("evt_x1", paidGift("cs_x1", { payment_status: "unpaid" })));
    await webhook.POST(event("evt_x2", paidGift("cs_x2", { metadata: {} })));
    await webhook.POST(event("evt_x3", paidGift("cs_x3", { amount_subtotal: 100 })));
    await webhook.POST(event("evt_x4", paidGift("cs_x4", { mode: "subscription" })));
    await webhook.POST(event("evt_x5", paidGift("cs_x5", { currency: "eur" })));
    expect(await giftCodes()).toHaveLength(before);
  });

  it("still makes the code when the buyer's email is missing, but sends nothing", async () => {
    const before = email.outbox().length;
    await webhook.POST(event("evt_g4", paidGift("cs_g4", { customer_details: null })));
    expect((await giftCodes()).some((c) => c.note === "Gift cs_g4")).toBe(true);
    expect(email.outbox()).toHaveLength(before);
  });
});

describe("buying a gift", () => {
  const stubStripe = () => {
    const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => new Response(JSON.stringify({ url: "https://checkout.stripe.test/g" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  };

  it("is closed until the gift-plans flag is on and Stripe is set up", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_1");
    vi.stubEnv("STRIPE_PRICE_MONTHLY", "price_m");
    vi.stubEnv("STRIPE_PRICE_YEARLY", "price_y");
    expect(await (await gift.GET(new Request("http://localhost/api/billing/gift/"))).json()).toEqual({ open: { CAD: false, USD: false } });
    const closed = await gift.POST(post("/api/billing/gift/", { currency: "CAD" }, { origin: "http://localhost", host: "localhost" }));
    expect(closed.status).toBe(503);
  });

  it("starts a one-off checkout in the buyer's currency once open, with no account", async () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_1");
    vi.stubEnv("STRIPE_PRICE_MONTHLY", "price_m");
    vi.stubEnv("STRIPE_PRICE_YEARLY", "price_y");
    vi.stubEnv("STRIPE_PRICE_MONTHLY_USD", "price_mu");
    vi.stubEnv("STRIPE_PRICE_YEARLY_USD", "price_yu");
    await flags.setFlag("gift-plans", { enabled: true, rollout: 100 });
    expect(await (await gift.GET(new Request("http://localhost/api/billing/gift/"))).json()).toEqual({ open: { CAD: true, USD: true } });
    const fetchMock = stubStripe();
    const res = await gift.POST(post("/api/billing/gift/", { currency: "USD" }, { origin: "http://localhost", host: "localhost" }));
    expect(await res.json()).toEqual({ url: "https://checkout.stripe.test/g" });
    const sent = Object.fromEntries(new URLSearchParams(String(fetchMock.mock.calls[0][1]?.body)));
    expect(sent).toMatchObject({
      mode: "payment",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][unit_amount]": String(giftCents("USD")),
      "metadata[gift]": "1",
      "automatic_tax[enabled]": "true",
    });
  });

  it("refuses a request from another site", async () => {
    const res = await gift.POST(post("/api/billing/gift/", { currency: "CAD" }, { origin: "https://evil.example", host: "localhost" }));
    expect(res.status).toBe(403);
  });
});
