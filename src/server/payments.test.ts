import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const dir = mkdtempSync(join(tmpdir(), "grademap-payments-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;

let dbm: typeof import("./db");
let pay: typeof import("./payments");

beforeAll(async () => {
  dbm = await import("./db");
  pay = await import("./payments");
  const now = Date.now();
  for (const [id, customer, interval] of [
    ["fam-a", "cus_a", "year"],
    ["fam-b", "cus_b", null],
  ] as const) {
    await dbm.run("INSERT INTO families (id, created_at, trial_ends_at, updated_at, stripe_customer, subscription_interval) VALUES (?, ?, ?, ?, ?, ?)", [id, now, now, now, customer, interval]);
  }
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));
beforeEach(async () => {
  await dbm.run("DELETE FROM payments");
});
afterEach(() => vi.unstubAllGlobals());

const rows = () => dbm.query<{ id: string; family_id: string; amount: number; refunded: number; currency: string; interval: string | null; paid_at: number }>("SELECT * FROM payments ORDER BY id");

describe("recordInvoice", () => {
  it("finds the family from subscription metadata in the newer and older invoice shapes", async () => {
    expect(await pay.recordInvoice({ id: "in_new", amount_paid: 1499, customer: "cus_x", parent: { subscription_details: { metadata: { family_id: "fam-b" } } }, created: 1000 })).toBe(true);
    expect(await pay.recordInvoice({ id: "in_old", amount_paid: 1499, subscription_details: { metadata: { family_id: "fam-b" } }, created: 1000 })).toBe(true);
    expect(await pay.recordInvoice({ id: "in_meta", amount_paid: 1499, metadata: { family_id: "fam-b" }, created: 1000 })).toBe(true);
    expect((await rows()).map((r) => [r.id, r.family_id])).toEqual([
      ["in_meta", "fam-b"],
      ["in_new", "fam-b"],
      ["in_old", "fam-b"],
    ]);
  });

  it("falls back to the Stripe customer when the metadata names an unknown family", async () => {
    expect(await pay.recordInvoice({ id: "in_1", amount_paid: 500, customer: "cus_a", metadata: { family_id: "deleted-family" }, created: 1000 })).toBe(true);
    expect((await rows())[0].family_id).toBe("fam-a");
  });

  it("ignores invoices that aren't ours, have no id, or paid nothing", async () => {
    expect(await pay.recordInvoice({ id: "in_s", amount_paid: 500, customer: "cus_stranger" })).toBe(false);
    expect(await pay.recordInvoice({ id: "in_n", amount_paid: 500 })).toBe(false);
    expect(await pay.recordInvoice({ amount_paid: 500, customer: "cus_a" })).toBe(false);
    expect(await pay.recordInvoice({ id: "in_0", amount_paid: 0, customer: "cus_a" })).toBe(false);
    expect(await pay.recordInvoice({ id: "in_neg", amount_paid: -5, customer: "cus_a" })).toBe(false);
    expect(await rows()).toEqual([]);
  });

  it("reads the billing interval from the invoice lines, else from the family", async () => {
    await pay.recordInvoice({ id: "in_plan", amount_paid: 1, customer: "cus_b", lines: { data: [{ description: "tax" }, { plan: { interval: "month" } }] } });
    await pay.recordInvoice({ id: "in_pricing", amount_paid: 1, customer: "cus_b", lines: { data: [{ pricing: { price_details: { recurring: { interval: "year" } } } }] } });
    await pay.recordInvoice({ id: "in_family", amount_paid: 1, customer: "cus_a", lines: { data: [{ price: { recurring: { interval: "week" } } }] } });
    await pay.recordInvoice({ id: "in_none", amount_paid: 1, customer: "cus_b" });
    expect(Object.fromEntries((await rows()).map((r) => [r.id, r.interval]))).toEqual({ in_plan: "month", in_pricing: "year", in_family: "year", in_none: null });
  });

  it("dates the payment when it was paid, else when the invoice was made, else now; upper-cases the currency", async () => {
    await pay.recordInvoice({ id: "in_paid", amount_paid: 1, customer: "cus_a", status_transitions: { paid_at: 2000 }, created: 1000, currency: "usd" });
    await pay.recordInvoice({ id: "in_created", amount_paid: 1, customer: "cus_a", created: 1000 });
    await pay.recordInvoice({ id: "in_now", amount_paid: 1, customer: "cus_a" }, 777);
    expect(Object.fromEntries((await rows()).map((r) => [r.id, [r.paid_at, r.currency]]))).toEqual({
      in_paid: [2_000_000, "USD"],
      in_created: [1_000_000, "CAD"],
      in_now: [777, "CAD"],
    });
  });

  it("updates a repeated invoice in place", async () => {
    await pay.recordInvoice({ id: "in_1", amount_paid: 1000, customer: "cus_a", created: 1 });
    await pay.recordInvoice({ id: "in_1", amount_paid: 1200, customer: "cus_a", created: 2 });
    expect(await rows()).toEqual([expect.objectContaining({ id: "in_1", amount: 1200, paid_at: 2000 })]);
  });
});

describe("recordRefund", () => {
  it("lowers the invoice's revenue, whether the charge names the invoice by id or as an object", async () => {
    await pay.recordInvoice({ id: "in_1", amount_paid: 1499, customer: "cus_a", created: 1 });
    await pay.recordInvoice({ id: "in_2", amount_paid: 1499, customer: "cus_a", created: 1 });
    await pay.recordRefund({ invoice: "in_1", amount_refunded: 500 });
    await pay.recordRefund({ invoice: { id: "in_2" }, amount_refunded: -3 });
    await pay.recordRefund({ amount_refunded: 999 });
    expect((await rows()).map((r) => r.refunded)).toEqual([500, 0]);
  });
});

describe("importPayments", () => {
  it("pages through Stripe's paid invoices and stores the ones for our families", async () => {
    const pages = [
      { data: [{ id: "in_a1", amount_paid: 100, customer: "cus_a", created: 1 }, { id: "in_x", amount_paid: 100, customer: "cus_other" }], has_more: true },
      { data: [{ id: "in_b1", amount_paid: 200, customer: "cus_b", created: 1 }], has_more: false },
    ];
    const fetchMock = vi.fn<(url: string) => Promise<Response>>(async () => new Response(JSON.stringify(pages.shift())));
    vi.stubGlobal("fetch", fetchMock);
    expect(await pay.importPayments()).toEqual({ seen: 3, stored: 2 });
    expect(String(fetchMock.mock.calls[1][0])).toContain("starting_after=in_x");
    expect((await rows()).map((r) => r.id)).toEqual(["in_a1", "in_b1"]);
  });

  it("stops at the page limit and on an empty page", async () => {
    let n = 0;
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ data: [{ id: `in_${n++}`, amount_paid: 1, customer: "cus_a" }], has_more: true })));
    vi.stubGlobal("fetch", fetchMock);
    expect(await pay.importPayments(2)).toEqual({ seen: 2, stored: 2 });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ data: [], has_more: true }))));
    expect(await pay.importPayments()).toEqual({ seen: 0, stored: 0 });
  });
});

describe("admin settings", () => {
  it("stores a value and replaces it", async () => {
    expect(await pay.getSetting("monthly_costs")).toBeNull();
    await pay.setSetting("monthly_costs", "100");
    await pay.setSetting("monthly_costs", "250");
    expect(await pay.getSetting("monthly_costs")).toBe("250");
  });
});
