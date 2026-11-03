import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// What the Stripe webhook does with each kind of event, found by mutation testing (`npm run test:mutation:server`).

const dir = mkdtempSync(join(tmpdir(), "grademap-hookrules-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
delete process.env.RESEND_API_KEY;

const alerts: { key: string; subject: string; lines: string[]; path?: string }[] = [];
vi.mock("@/server/alerts", async (orig) => ({
  ...(await orig<typeof import("@/server/alerts")>()),
  sendAlert: async (key: string, a: { subject: string; lines: string[]; path?: string }) => {
    alerts.push({ key, ...a });
    return true;
  },
}));

let hook: (req: Request) => Promise<Response>;
let signup: (req: Request) => Promise<Response>;
let dbm: typeof import("@/server/db");

beforeAll(async () => {
  hook = (await import("@/app/api/billing/webhook/route")).POST;
  signup = (await import("@/server/testing/signupWithSession")).POST;
  dbm = await import("@/server/db");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));
beforeEach(() => {
  alerts.length = 0;
});

const sign = (payload: string) => {
  const t = Math.floor(Date.now() / 1000);
  return `t=${t},v1=${createHmac("sha256", "whsec_test").update(`${t}.${payload}`).digest("hex")}`;
};
const send = (body: unknown, signed = true) => {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  return hook(new Request("http://localhost/api/billing/webhook/", { method: "POST", headers: signed ? { "stripe-signature": sign(payload) } : {}, body: payload }));
};
let evt = 0;
const event = (type: string, object: Record<string, unknown>, created = Math.floor(Date.now() / 1000)) => ({ id: `evt_rules_${++evt}`, created, type, data: { object } });

let n = 0;
async function family(customer?: string): Promise<{ id: string; email: string }> {
  const email = `hook${++n}@example.com`;
  await signup(new Request("http://localhost/api/auth/signup/", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `10.8.0.${n}` }, body: JSON.stringify({ email, password: "correct horse battery" }) }));
  const id = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [email]))[0].family_id;
  if (customer) await dbm.run("UPDATE families SET stripe_customer = ? WHERE id = ?", [customer, id]);
  return { id, email };
}
const row = async (id: string) => (await dbm.query<Record<string, unknown>>("SELECT * FROM families WHERE id = ?", [id]))[0];

describe("webhook intake", () => {
  it("refuses an unsigned or badly signed body, and signed text that is not JSON", async () => {
    expect((await send(event("x", { a: 1 }), false)).status).toBe(400);
    expect((await send("not json at all")).status).toBe(400);
  });

  it("acknowledges but ignores an event with no id or no object, and handles each id once", async () => {
    expect(await (await send({ type: "x", data: { object: { a: 1 } } })).text()).toBe("ok");
    expect(await (await send({ id: "evt_noobj", type: "x", data: {} })).text()).toBe("ok");
    expect(await dbm.query("SELECT id FROM stripe_events WHERE id = 'evt_noobj'")).toHaveLength(0);
    const e = event("invoice.payment_failed", { customer: "cus_once", amount_due: 1000 });
    await send(e);
    await send(e);
    expect(alerts).toHaveLength(1);
  });

  it("records each handled event in the webhook log as a success", async () => {
    await send(event("customer.subscription.updated", { status: "active", customer: "cus_log" }));
    const log = await dbm.query<{ ok: number; type: string }>("SELECT ok, type FROM webhook_log WHERE type = 'customer.subscription.updated'");
    expect(log.at(-1)).toMatchObject({ ok: 1 });
  });
});

describe("alerts", () => {
  it("tells the admins about a failed payment, naming the family and the amount", async () => {
    const f = await family("cus_fail");
    await send(event("invoice.payment_failed", { customer: "cus_fail", amount_due: 1499, currency: "usd", attempt_count: 2 }));
    expect(alerts).toHaveLength(1);
    expect(alerts[0].key).toBe(`payment-failed:${f.id}`);
    expect(alerts[0].subject).toContain(f.email);
    expect(alerts[0].lines[0]).toContain("14.99 USD");
    expect(alerts[0].lines[0]).toContain("attempt 2");
    expect(alerts[0].path).toContain(f.id);
  });

  it("falls back to the Stripe customer, and to CAD, for a family it does not know", async () => {
    await send(event("invoice.payment_failed", { customer: "cus_unknown", amount_due: 500 }));
    expect(alerts[0].key).toBe("payment-failed:cus_unknown");
    expect(alerts[0].subject).toContain("cus_unknown");
    expect(alerts[0].lines[0]).toContain("5.00 CAD");
    expect(alerts[0].lines[0]).toContain("attempt 1");
    alerts.length = 0;
    await send(event("invoice.payment_failed", { amount_due: 500 }));
    expect(alerts[0].subject).toContain("an unknown customer");
  });

  it("alerts on a dispute, keyed by the dispute, and sends nothing for other events", async () => {
    const f = await family("cus_dispute");
    await send(event("charge.dispute.created", { id: "dp_1", customer: "cus_dispute", amount: 2000, currency: "cad" }));
    expect(alerts).toHaveLength(1);
    expect(alerts[0].key).toBe("dispute:dp_1");
    expect(alerts[0].subject).toContain(f.email);
    expect(alerts[0].path).toContain(f.id);
    alerts.length = 0;
    await send(event("charge.dispute.created", { id: "dp_2", customer: "cus_nobody", amount: 2000 }));
    expect(alerts[0].path).toBe("/admin/");
    alerts.length = 0;
    await send(event("customer.subscription.updated", { status: "active", customer: "cus_dispute" }));
    expect(alerts).toHaveLength(0);
  });
});

describe("checkout", () => {
  const paid = (fid: string, over: Record<string, unknown> = {}) => ({ client_reference_id: fid, customer: "cus_co", payment_status: "paid", mode: "subscription", subscription: "sub_co", ...over });

  it("upgrades only for a paid subscription checkout", async () => {
    for (const over of [{ payment_status: "unpaid" }, { mode: "payment" }, { subscription: undefined }]) {
      const f = await family();
      await send(event("checkout.session.completed", paid(f.id, over)));
      expect((await row(f.id)).plan).not.toBe("premium");
    }
    const ok = await family();
    await send(event("checkout.session.completed", paid(ok.id, { payment_status: "no_payment_required" })));
    expect(await row(ok.id)).toMatchObject({ plan: "premium", subscription_status: "active", stripe_customer: "cus_co" });
  });

  it("finds the family in the metadata when there is no client reference, and ignores one with neither", async () => {
    const f = await family();
    await send(event("checkout.session.completed", paid(f.id, { client_reference_id: undefined, metadata: { family_id: f.id } })));
    expect((await row(f.id)).plan).toBe("premium");
    await send(event("checkout.session.completed", paid("x", { client_reference_id: undefined })));
  });

  it("clears a waiting discount code when the checkout is paid", async () => {
    const f = await family();
    await dbm.run("UPDATE families SET discount_code = 'SAVE10' WHERE id = ?", [f.id]);
    await send(event("checkout.session.completed", paid(f.id)));
    expect((await row(f.id)).discount_code).toBeNull();
  });

  it("does not let an older event overwrite a newer one", async () => {
    const f = await family();
    const now = Math.floor(Date.now() / 1000);
    await send(event("checkout.session.completed", paid(f.id), now));
    await send(event("customer.subscription.deleted", { customer: "cus_co", metadata: { family_id: f.id } }, now - 3600));
    expect(await row(f.id)).toMatchObject({ plan: "premium", subscription_status: "active" });
  });
});

describe("subscription events", () => {
  const sub = (fid: string, over: Record<string, unknown> = {}) => ({ status: "active", customer: "cus_sub", metadata: { family_id: fid }, ...over });

  it("reads the interval and period end, from the subscription or from its first item", async () => {
    const f = await family();
    await send(event("customer.subscription.updated", sub(f.id, { current_period_end: 2_000_000_000, items: { data: [{ price: { recurring: { interval: "year" } } }] } })));
    expect(await row(f.id)).toMatchObject({ subscription_interval: "year", current_period_end: 2_000_000_000_000, plan: "premium" });
    const g = await family();
    await send(event("customer.subscription.updated", sub(g.id, { items: { data: [{ current_period_end: 1_900_000_000, price: { recurring: { interval: "month" } } }] } })));
    expect(await row(g.id)).toMatchObject({ subscription_interval: "month", current_period_end: 1_900_000_000_000 });
    const h = await family();
    await send(event("customer.subscription.updated", sub(h.id)));
    expect(await row(h.id)).toMatchObject({ subscription_interval: null, current_period_end: null });
  });

  it("keeps premium while trialing or past due, and ends it when cancelled or unpaid", async () => {
    for (const [status, plan] of [["trialing", "premium"], ["past_due", "premium"], ["canceled", "free"], ["unpaid", "free"], ["incomplete_expired", "free"]] as const) {
      const f = await family();
      await send(event("customer.subscription.updated", sub(f.id, { status })));
      expect((await row(f.id)).plan).toBe(plan);
    }
    const g = await family();
    await send(event("customer.subscription.deleted", sub(g.id)));
    expect(await row(g.id)).toMatchObject({ subscription_status: "canceled", plan: "free" });
  });

  it("notes when a plan will end and when it was cancelled, and clears both once resumed", async () => {
    const f = await family();
    await send(event("customer.subscription.updated", sub(f.id, { cancel_at: 2_100_000_000, canceled_at: 2_000_000_000 })));
    expect(await row(f.id)).toMatchObject({ cancel_at: 2_100_000_000_000, cancelled_at: 2_000_000_000_000 });
    await send(event("customer.subscription.updated", sub(f.id, { cancel_at: null, canceled_at: null })));
    expect(await row(f.id)).toMatchObject({ cancel_at: null, cancelled_at: null });
    const g = await family();
    await send(event("customer.subscription.updated", sub(g.id, { cancel_at_period_end: true, current_period_end: 2_200_000_000, canceled_at: 2_000_000_000 })));
    expect((await row(g.id)).cancel_at).toBe(2_200_000_000_000);
  });

  it("uses up a discount code only when a subscription is created", async () => {
    const f = await family();
    await dbm.run("UPDATE families SET discount_code = 'SAVE10' WHERE id = ?", [f.id]);
    await send(event("customer.subscription.updated", sub(f.id)));
    expect((await row(f.id)).discount_code).toBe("SAVE10");
    await send(event("customer.subscription.created", sub(f.id)));
    expect((await row(f.id)).discount_code).toBeNull();
  });

  it("finds the family by its Stripe customer when the metadata has no family", async () => {
    const f = await family("cus_bycust");
    await send(event("customer.subscription.updated", { status: "active", customer: "cus_bycust" }));
    expect((await row(f.id)).plan).toBe("premium");
  });

  it("keeps the reason a parent gave for cancelling, once per subscription, only for known reasons", async () => {
    const f = await family();
    await send(event("customer.subscription.updated", sub(f.id, { id: "sub_reason", cancellation_details: { feedback: "too_expensive" } })));
    await send(event("customer.subscription.updated", sub(f.id, { id: "sub_unknown", cancellation_details: { feedback: "made_up" } })));
    await send(event("customer.subscription.updated", sub(f.id, { cancellation_details: { feedback: "unused" } })));
    const rows = await dbm.query<{ subscription_id: string; reason: string; family_id: string }>("SELECT subscription_id, reason, family_id FROM cancellations");
    expect(rows).toEqual([{ subscription_id: "sub_reason", reason: "too_expensive", family_id: f.id }]);
  });
});
