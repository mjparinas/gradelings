import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createCheckout, createCoupon, createPortal, creditCustomer, devBillingAllowed, listPaidInvoices } from "./stripe";

const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>();
const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });
const form = (i = 0) => Object.fromEntries(new URLSearchParams(String(fetchMock.mock.calls[i][1]?.body)));

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_1");
  vi.stubEnv("STRIPE_PRICE_MONTHLY", "price_month");
  vi.stubEnv("STRIPE_PRICE_YEARLY", "price_year");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("checkout", () => {
  it("starts a yearly subscription for a new customer, tagged with the family, with the promotion-code box", async () => {
    fetchMock.mockResolvedValueOnce(ok({ url: "https://checkout.stripe.com/c/1" }));
    const url = await createCheckout({ familyId: "fam1", email: "p@example.com", interval: "year", origin: "https://app.test" });
    expect(url).toBe("https://checkout.stripe.com/c/1");
    const [endpoint, init] = fetchMock.mock.calls[0];
    expect(endpoint).toBe("https://api.stripe.com/v1/checkout/sessions");
    expect(init?.headers).toMatchObject({ authorization: "Bearer sk_test_1", "content-type": "application/x-www-form-urlencoded" });
    expect(form()).toEqual({
      mode: "subscription",
      "line_items[0][price]": "price_year",
      "line_items[0][quantity]": "1",
      client_reference_id: "fam1",
      "subscription_data[metadata][family_id]": "fam1",
      "metadata[family_id]": "fam1",
      success_url: "https://app.test/parents/#/subscription?checkout=success",
      cancel_url: "https://app.test/parents/#/subscription?checkout=cancelled",
      customer_email: "p@example.com",
      allow_promotion_codes: "true",
    });
  });

  it("reuses the Stripe customer and applies a redeemed discount instead of the code box", async () => {
    fetchMock.mockResolvedValueOnce(ok({ url: "u" }));
    await createCheckout({ familyId: "fam1", email: "p@example.com", interval: "month", origin: "https://app.test", customer: "cus_1", coupon: "co_50" });
    const sent = form();
    expect(sent).toMatchObject({ "line_items[0][price]": "price_month", customer: "cus_1", "discounts[0][coupon]": "co_50" });
    expect(sent.customer_email).toBeUndefined();
    expect(sent.allow_promotion_codes).toBeUndefined();
  });

  it("passes on Stripe's error message, or the status when there is none", async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ error: { message: "No such price" } }), { status: 400 }));
    await expect(createCheckout({ familyId: "f", email: "e", interval: "month", origin: "o" })).rejects.toThrow("No such price");
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 502 }));
    await expect(createPortal("cus_1", "o")).rejects.toThrow("Stripe error 502");
  });
});

describe("portal, credits and coupons", () => {
  it("opens the billing portal back to the subscription screen", async () => {
    fetchMock.mockResolvedValueOnce(ok({ url: "https://billing.stripe.com/p/1" }));
    expect(await createPortal("cus_1", "https://app.test")).toBe("https://billing.stripe.com/p/1");
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.stripe.com/v1/billing_portal/sessions");
    expect(form()).toEqual({ customer: "cus_1", return_url: "https://app.test/parents/#/subscription" });
  });

  it("credits a customer as a negative balance, whatever sign is passed", async () => {
    fetchMock.mockImplementation(async () => ok({}));
    await creditCustomer("cus/1", 1499, "CAD", "Referral: one free month");
    await creditCustomer("cus/1", -1499, "CAD", "Again");
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.stripe.com/v1/customers/cus%2F1/balance_transactions");
    expect(form(0)).toEqual({ amount: "-1499", currency: "cad", description: "Referral: one free month" });
    expect(form(1).amount).toBe("-1499");
  });

  it("makes coupons once, for some months (one by default), or forever, with a short name", async () => {
    fetchMock.mockImplementation(async () => ok({ id: "co_1" }));
    expect(await createCoupon({ percentOff: 25, duration: "repeating", months: 3, name: "SPRING" })).toBe("co_1");
    await createCoupon({ percentOff: 10, duration: "repeating", name: "X" });
    await createCoupon({ percentOff: 100, duration: "forever", name: "A".repeat(60) });
    expect(form(0)).toEqual({ percent_off: "25", duration: "repeating", name: "SPRING", duration_in_months: "3" });
    expect(form(1).duration_in_months).toBe("1");
    expect(form(2).duration_in_months).toBeUndefined();
    expect(form(2).name).toHaveLength(40);
  });
});

describe("listPaidInvoices", () => {
  it("asks for paid invoices a page at a time", async () => {
    fetchMock.mockResolvedValueOnce(ok({ data: [{ id: "in_1" }], has_more: true })).mockResolvedValueOnce(ok({}));
    expect(await listPaidInvoices()).toEqual({ invoices: [{ id: "in_1" }], hasMore: true });
    expect(await listPaidInvoices("in_1")).toEqual({ invoices: [], hasMore: false });
    expect(fetchMock.mock.calls[0][0]).toBe("https://api.stripe.com/v1/invoices?status=paid&limit=100");
    expect(fetchMock.mock.calls[1][0]).toBe("https://api.stripe.com/v1/invoices?status=paid&limit=100&starting_after=in_1");
    expect(fetchMock.mock.calls[1][1]?.headers).toEqual({ authorization: "Bearer sk_test_1" });
  });

  it("throws Stripe's error", async () => {
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ error: { message: "Invalid API Key" } }), { status: 401 }));
    await expect(listPaidInvoices()).rejects.toThrow("Invalid API Key");
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 500 }));
    await expect(listPaidInvoices()).rejects.toThrow("Stripe error 500");
  });
});

describe("devBillingAllowed", () => {
  it("is never on with real Stripe keys or on the production deployment", () => {
    expect(devBillingAllowed()).toBe(false);
    vi.stubEnv("STRIPE_SECRET_KEY", "");
    expect(devBillingAllowed()).toBe(true);
    vi.stubEnv("NODE_ENV", "production");
    expect(devBillingAllowed()).toBe(false);
    vi.stubEnv("ALLOW_DEV_BILLING", "1");
    expect(devBillingAllowed()).toBe(true);
    vi.stubEnv("VERCEL_ENV", "production");
    expect(devBillingAllowed()).toBe(false);
  });
});
