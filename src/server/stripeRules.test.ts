import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cancelSubscriptionNow,
  cancelSubscriptions,
  listSubscriptions,
  refundInvoice,
  setCancelAtPeriodEnd,
  stripePrices,
  testCheckout,
  verifyWebhook,
} from "./stripe";

const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>();
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const urlOf = (i: number) => String(fetchMock.mock.calls[i][0]);
const initOf = (i: number) => fetchMock.mock.calls[i][1];
const bodyOf = (i: number) => Object.fromEntries(new URLSearchParams(String(initOf(i)?.body)));

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_rules");
  vi.stubEnv("STRIPE_PRICE_MONTHLY", "price_m");
  vi.stubEnv("STRIPE_PRICE_YEARLY", "price_y");
  vi.stubEnv("STRIPE_PRICE_MONTHLY_USD", "price_mu");
  vi.stubEnv("STRIPE_PRICE_YEARLY_USD", "price_yu");
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("stripePrices", () => {
  it("needs the secret key and both prices", () => {
    expect(stripePrices("CAD")).toEqual({ month: "price_m", year: "price_y" });
    expect(stripePrices("USD")).toEqual({ month: "price_mu", year: "price_yu" });
    vi.stubEnv("STRIPE_SECRET_KEY", "");
    expect(stripePrices("CAD")).toBeNull();
    expect(stripePrices("USD")).toBeNull();
  });
  it("is unavailable when either price is missing", () => {
    vi.stubEnv("STRIPE_PRICE_YEARLY", "");
    expect(stripePrices("CAD")).toBeNull();
    expect(stripePrices("USD")).not.toBeNull();
    vi.stubEnv("STRIPE_PRICE_MONTHLY_USD", "");
    expect(stripePrices("USD")).toBeNull();
    vi.stubEnv("STRIPE_PRICE_MONTHLY", "");
    vi.stubEnv("STRIPE_PRICE_YEARLY_USD", "price_yu");
    expect(stripePrices("CAD")).toBeNull();
  });
});

describe("cancelSubscriptions", () => {
  it("ends every live subscription across pages, skipping ended ones, and counts them", async () => {
    fetchMock
      .mockResolvedValueOnce(json({ data: [{ id: "sub_1", status: "active" }, { id: "sub_2", status: "canceled" }], has_more: true }))
      .mockResolvedValueOnce(json({})) // delete sub_1
      .mockResolvedValueOnce(json({ data: [{ id: "sub_3", status: "past_due" }, { id: "sub_4", status: "incomplete_expired" }], has_more: false }))
      .mockResolvedValueOnce(json({})); // delete sub_3
    expect(await cancelSubscriptions("cus_1")).toBe(2);
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(urlOf(0)).toContain("https://api.stripe.com/v1/subscriptions?");
    const first = new URL(urlOf(0)).searchParams;
    expect(Object.fromEntries(first)).toEqual({ customer: "cus_1", status: "all", limit: "100" });
    expect(initOf(0)?.headers).toEqual({ authorization: "Bearer sk_test_rules" });
    expect(urlOf(1)).toBe("https://api.stripe.com/v1/subscriptions/sub_1");
    expect(initOf(1)?.method).toBe("DELETE");
    expect(initOf(1)?.headers).toEqual({ authorization: "Bearer sk_test_rules" });
    expect(new URL(urlOf(2)).searchParams.get("starting_after")).toBe("sub_2");
    expect(urlOf(3)).toBe("https://api.stripe.com/v1/subscriptions/sub_3");
  });

  it("stops on an empty page even if Stripe says there is more", async () => {
    fetchMock.mockResolvedValueOnce(json({ data: [], has_more: true }));
    expect(await cancelSubscriptions("cus_2")).toBe(0);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("treats a missing list as empty", async () => {
    fetchMock.mockResolvedValueOnce(json({}));
    expect(await cancelSubscriptions("cus_3")).toBe(0);
  });

  it("does not ask for a first page cursor", async () => {
    fetchMock.mockResolvedValueOnce(json({ data: [] }));
    await cancelSubscriptions("cus_4");
    expect(new URL(urlOf(0)).searchParams.has("starting_after")).toBe(false);
  });

  it("throws Stripe's message, or the status, when listing fails", async () => {
    fetchMock.mockResolvedValueOnce(json({ error: { message: "No such customer" } }, 404));
    await expect(cancelSubscriptions("cus_x")).rejects.toThrow("No such customer");
    fetchMock.mockResolvedValueOnce(json({}, 503));
    await expect(cancelSubscriptions("cus_x")).rejects.toThrow("Stripe error 503");
  });

  it("throws Stripe's message, or the status, when ending one fails", async () => {
    fetchMock.mockResolvedValueOnce(json({ data: [{ id: "sub_9", status: "active" }] })).mockResolvedValueOnce(json({ error: { message: "Cannot cancel" } }, 400));
    await expect(cancelSubscriptions("cus_x")).rejects.toThrow("Cannot cancel");
    fetchMock.mockResolvedValueOnce(json({ data: [{ id: "sub_9", status: "active" }] })).mockResolvedValueOnce(json({}, 500));
    await expect(cancelSubscriptions("cus_x")).rejects.toThrow("Stripe error 500");
  });
});

describe("testCheckout", () => {
  it("opens a health-check session with a trial 30 days out, then expires it", async () => {
    const now = 1_800_000_000_000;
    fetchMock.mockResolvedValueOnce(json({ id: "cs_test/1" })).mockResolvedValueOnce(json({}));
    await testCheckout("CAD", "https://app.test", now);
    expect(urlOf(0)).toBe("https://api.stripe.com/v1/checkout/sessions");
    const params = bodyOf(0);
    expect(params["metadata[health_check]"]).toBe("1");
    expect(params["metadata[family]"] ?? params.client_reference_id).toBeTruthy();
    expect(params.customer_email).toBe("health-check@example.com");
    expect(Number(params["subscription_data[trial_end]"])).toBe(Math.floor((now + 30 * 86_400_000) / 1000));
    expect(urlOf(1)).toBe("https://api.stripe.com/v1/checkout/sessions/cs_test%2F1/expire");
    expect(initOf(1)?.method).toBe("POST");
  });
});

describe("verifyWebhook", () => {
  const secret = "whsec_rules";
  const sign = (payload: string, t: number, key = secret) => createHmac("sha256", key).update(`${t}.${payload}`).digest("hex");
  const now = () => Math.floor(Date.now() / 1000);

  it("accepts a fresh, correctly signed payload", () => {
    const t = now();
    expect(verifyWebhook("{}", `t=${t},v1=${sign("{}", t)}`, secret)).toBe(true);
  });
  it("accepts when any of several v1 signatures matches", () => {
    const t = now();
    expect(verifyWebhook("{}", `t=${t},v1=${"0".repeat(64)},v1=${sign("{}", t)}`, secret)).toBe(true);
  });
  it("rejects a missing header or secret", () => {
    const t = now();
    const header = `t=${t},v1=${sign("{}", t)}`;
    expect(verifyWebhook("{}", null, secret)).toBe(false);
    expect(verifyWebhook("{}", "", secret)).toBe(false);
    expect(verifyWebhook("{}", header, "")).toBe(false);
  });
  it("rejects a wrong secret, tampered body, or a v0-only header", () => {
    const t = now();
    expect(verifyWebhook("{}", `t=${t},v1=${sign("{}", t, "other")}`, secret)).toBe(false);
    expect(verifyWebhook("{ }", `t=${t},v1=${sign("{}", t)}`, secret)).toBe(false);
    expect(verifyWebhook("{}", `t=${t},v0=${sign("{}", t)}`, secret)).toBe(false);
    expect(verifyWebhook("{}", `t=${t},v1=short`, secret)).toBe(false);
  });
  it("rejects a missing timestamp", () => {
    expect(verifyWebhook("{}", `v1=${sign("{}", 0)}`, secret)).toBe(false);
  });
  it("allows five minutes of clock drift either way and not a second more", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2_000_000_000_000));
    const base = 2_000_000_000;
    for (const [offset, expected] of [[-300, true], [300, true], [-301, false], [301, false]] as const) {
      const t = base + offset;
      expect(verifyWebhook("{}", `t=${t},v1=${sign("{}", t)}`, secret)).toBe(expected);
    }
  });
  it("reads the secret from the environment by default", () => {
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", secret);
    const t = now();
    expect(verifyWebhook("{}", `t=${t},v1=${sign("{}", t)}`)).toBe(true);
  });
});

describe("listSubscriptions", () => {
  it("lists live subscriptions with their renewal date in milliseconds", async () => {
    fetchMock.mockResolvedValueOnce(
      json({
        data: [
          { id: "sub_a", status: "active", cancel_at_period_end: true, current_period_end: 1000 },
          { id: "sub_b", status: "canceled", current_period_end: 5 },
          { id: "sub_c", status: "incomplete_expired" },
          { id: "sub_d", status: "trialing", items: { data: [{ current_period_end: 2000 }] } },
          { id: "sub_e", status: "past_due" },
        ],
      }),
    );
    expect(await listSubscriptions("cus_l")).toEqual([
      { id: "sub_a", status: "active", cancelAtPeriodEnd: true, currentPeriodEnd: 1_000_000 },
      { id: "sub_d", status: "trialing", cancelAtPeriodEnd: false, currentPeriodEnd: 2_000_000 },
      { id: "sub_e", status: "past_due", cancelAtPeriodEnd: false, currentPeriodEnd: null },
    ]);
    const url = new URL(urlOf(0));
    expect(url.pathname).toBe("/v1/subscriptions");
    expect(Object.fromEntries(url.searchParams)).toEqual({ customer: "cus_l", status: "all", limit: "20" });
    expect(initOf(0)?.headers).toEqual({ authorization: "Bearer sk_test_rules" });
  });
  it("throws Stripe's message, or the status", async () => {
    fetchMock.mockResolvedValueOnce(json({ error: { message: "Bad key" } }, 401));
    await expect(listSubscriptions("c")).rejects.toThrow("Bad key");
    fetchMock.mockResolvedValueOnce(json({}, 502));
    await expect(listSubscriptions("c")).rejects.toThrow("Stripe error 502");
  });
});

describe("cancelling one subscription", () => {
  it("sets or clears cancel-at-period-end", async () => {
    fetchMock.mockResolvedValueOnce(json({})).mockResolvedValueOnce(json({}));
    await setCancelAtPeriodEnd("sub/1", true);
    await setCancelAtPeriodEnd("sub/1", false);
    expect(urlOf(0)).toBe("https://api.stripe.com/v1/subscriptions/sub%2F1");
    expect(bodyOf(0)).toEqual({ cancel_at_period_end: "true" });
    expect(bodyOf(1)).toEqual({ cancel_at_period_end: "false" });
  });
  it("ends one now with a DELETE", async () => {
    fetchMock.mockResolvedValueOnce(json({}));
    await cancelSubscriptionNow("sub/2");
    expect(urlOf(0)).toBe("https://api.stripe.com/v1/subscriptions/sub%2F2");
    expect(initOf(0)?.method).toBe("DELETE");
    expect(initOf(0)?.headers).toEqual({ authorization: "Bearer sk_test_rules" });
  });
  it("throws Stripe's message, or the status", async () => {
    fetchMock.mockResolvedValueOnce(json({ error: { message: "Gone" } }, 404));
    await expect(cancelSubscriptionNow("s")).rejects.toThrow("Gone");
    fetchMock.mockResolvedValueOnce(json({}, 500));
    await expect(cancelSubscriptionNow("s")).rejects.toThrow("Stripe error 500");
  });
});

describe("refundInvoice", () => {
  const refund = { id: "re_1", amount: 1499 };

  it("refunds the payment intent listed under the invoice's payments", async () => {
    fetchMock.mockResolvedValueOnce(json({ payments: { data: [{ payment: { payment_intent: "pi_1" } }] } })).mockResolvedValueOnce(json(refund));
    expect(await refundInvoice("in/1", 1499, "x".repeat(300))).toEqual({ id: "re_1", amount: 1499 });
    expect(urlOf(0)).toBe("https://api.stripe.com/v1/invoices/in%2F1?expand[]=payments");
    expect(urlOf(1)).toBe("https://api.stripe.com/v1/refunds");
    const p = bodyOf(1);
    expect(p.payment_intent).toBe("pi_1");
    expect(p.charge).toBeUndefined();
    expect(p.amount).toBe("1499");
    expect(p.reason).toBe("requested_by_customer");
    expect(p["metadata[note]"]).toHaveLength(200);
    expect(p["metadata[invoice]"]).toBe("in/1");
  });

  it("accepts expanded objects with an id", async () => {
    fetchMock.mockResolvedValueOnce(json({ payments: { data: [{ payment: { payment_intent: { id: "pi_obj" } } }] } })).mockResolvedValueOnce(json(refund));
    await refundInvoice("in_2", 5, "n");
    expect(bodyOf(1).payment_intent).toBe("pi_obj");
  });

  it("skips payments with nothing usable and falls back to the invoice's own intent", async () => {
    fetchMock
      .mockResolvedValueOnce(json({ payment_intent: "pi_inv", payments: { data: [{}, { payment: { payment_intent: { id: 5 } } }, { payment: { payment_intent: null } }] } }))
      .mockResolvedValueOnce(json(refund));
    await refundInvoice("in_3", 5, "n");
    expect(bodyOf(1).payment_intent).toBe("pi_inv");
  });

  it("falls back to a charge when there is no intent, from a payment or the invoice", async () => {
    fetchMock.mockResolvedValueOnce(json({ payments: { data: [{ payment: { charge: "ch_pay" } }] } })).mockResolvedValueOnce(json(refund));
    await refundInvoice("in_4", 5, "n");
    expect(bodyOf(1).charge).toBe("ch_pay");
    expect(bodyOf(1).payment_intent).toBeUndefined();

    fetchMock.mockResolvedValueOnce(json({ charge: { id: "ch_inv" } })).mockResolvedValueOnce(json(refund));
    await refundInvoice("in_5", 5, "n");
    expect(bodyOf(3).charge).toBe("ch_inv");
  });

  it("prefers an intent over a charge", async () => {
    fetchMock.mockResolvedValueOnce(json({ charge: "ch_x", payments: { data: [{ payment: { payment_intent: "pi_y", charge: "ch_z" } }] } })).mockResolvedValueOnce(json(refund));
    await refundInvoice("in_6", 5, "n");
    expect(bodyOf(1).payment_intent).toBe("pi_y");
    expect(bodyOf(1).charge).toBeUndefined();
  });

  it("refuses when the invoice has no payment, without calling the refunds API", async () => {
    fetchMock.mockResolvedValueOnce(json({}));
    await expect(refundInvoice("in_7", 5, "n")).rejects.toThrow("Stripe has no payment on this invoice to refund.");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    fetchMock.mockResolvedValueOnce(json({ payments: { data: [{ payment: { charge: 12 } }] }, charge: {} }));
    await expect(refundInvoice("in_8", 5, "n")).rejects.toThrow("no payment");
  });

  it("passes on Stripe's error when the invoice can't be read", async () => {
    fetchMock.mockResolvedValueOnce(json({ error: { message: "No such invoice" } }, 404));
    await expect(refundInvoice("in_9", 5, "n")).rejects.toThrow("No such invoice");
    fetchMock.mockResolvedValueOnce(json({}, 500));
    await expect(refundInvoice("in_9", 5, "n")).rejects.toThrow("Stripe error 500");
    expect(initOf(1)?.headers).toEqual({ authorization: "Bearer sk_test_rules" });
  });
});
