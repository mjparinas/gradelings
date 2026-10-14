import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { Currency } from "@/lib/plan";

// Stripe over plain HTTPS: no SDK needed. Set these environment variables:
//   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
//   STRIPE_PRICE_MONTHLY, STRIPE_PRICE_YEARLY (recurring Price ids, in CAD)
//   STRIPE_PRICE_MONTHLY_USD, STRIPE_PRICE_YEARLY_USD (the same plan in USD, for US families)

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_MONTHLY && process.env.STRIPE_PRICE_YEARLY);
}

/** The recurring Price ids for one currency, or null when that currency isn't set up (US checkout then answers that it's unavailable). */
export function stripePrices(currency: Currency): { month: string; year: string } | null {
  const env = process.env;
  const [month, year] = currency === "USD" ? [env.STRIPE_PRICE_MONTHLY_USD, env.STRIPE_PRICE_YEARLY_USD] : [env.STRIPE_PRICE_MONTHLY, env.STRIPE_PRICE_YEARLY];
  return env.STRIPE_SECRET_KEY && month && year ? { month, year } : null;
}

/** Cancellation only needs the secret key; price ids are needed to start billing. */
export function stripeCancellationConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Lets you click through the subscription flow without Stripe while developing. */
export function devBillingAllowed(): boolean {
  // Never on the real production deployment, even with the flag: it grants premium without payment.
  if (process.env.VERCEL_ENV === "production") return false;
  return !stripeConfigured() && (process.env.NODE_ENV !== "production" || process.env.ALLOW_DEV_BILLING === "1");
}

function form(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

async function stripe<T>(path: string, params: Record<string, string>): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: form(params),
  });
  const data = (await res.json()) as T & { error?: { message: string } };
  if (!res.ok) throw new Error(data.error?.message ?? `Stripe error ${res.status}`);
  return data;
}

/** Ends every live subscription for a customer, immediately. Throws if Stripe refuses. */
export async function cancelSubscriptions(customer: string): Promise<number> {
  const headers = { authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` };
  let cancelled = 0;
  let startingAfter: string | undefined;
  while (true) {
    const params = new URLSearchParams({ customer, status: "all", limit: "100" });
    if (startingAfter) params.set("starting_after", startingAfter);
    const res = await fetch(`https://api.stripe.com/v1/subscriptions?${params}`, { headers });
    const data = (await res.json()) as { data?: { id: string; status: string }[]; has_more?: boolean; error?: { message: string } };
    if (!res.ok) throw new Error(data.error?.message ?? `Stripe error ${res.status}`);
    const subscriptions = data.data ?? [];
    for (const sub of subscriptions) {
      if (sub.status === "canceled" || sub.status === "incomplete_expired") continue;
      const del = await fetch(`https://api.stripe.com/v1/subscriptions/${encodeURIComponent(sub.id)}`, { method: "DELETE", headers });
      if (!del.ok) throw new Error(((await del.json()) as { error?: { message: string } }).error?.message ?? `Stripe error ${del.status}`);
      cancelled++;
    }
    if (!data.has_more || subscriptions.length === 0) break;
    startingAfter = subscriptions[subscriptions.length - 1].id;
  }
  return cancelled;
}

export interface CheckoutOptions {
  interval: "month" | "year";
  familyId: string;
  email: string;
  customer?: string | null;
  origin: string;
  /** A Stripe coupon from a redeemed discount code. */
  coupon?: string | null;
  /** Bill from this time (ms) instead of today, so the rest of the free trial is kept. */
  firstChargeAt?: number | null;
  /** CAD (the default) or USD for a US family. */
  currency?: Currency;
}

/** The Checkout Session parameters for a family, shared with the admin panel's no-charge checkout test. */
export function checkoutParams(opts: CheckoutOptions): Record<string, string> {
  const currency = opts.currency ?? "CAD";
  const prices = stripePrices(currency);
  if (!prices) throw new Error(`Payments in ${currency} aren't set up yet.`);
  const price = prices[opts.interval];
  const params: Record<string, string> = {
    mode: "subscription",
    "line_items[0][price]": price,
    "line_items[0][quantity]": "1",
    client_reference_id: opts.familyId,
    "subscription_data[metadata][family_id]": opts.familyId,
    "metadata[family_id]": opts.familyId,
    success_url: `${opts.origin}/parents/#/subscription?checkout=success`,
    cancel_url: `${opts.origin}/parents/#/subscription?checkout=cancelled`,
  };
  if (opts.customer) params.customer = opts.customer;
  else params.customer_email = opts.email;
  if (currency === "USD") {
    // US sales tax: Stripe Tax works it out from the billing address, collected here. Canadian checkout is unchanged.
    params["automatic_tax[enabled]"] = "true";
    params.billing_address_collection = "required";
    // Stripe Tax needs the address saved on an existing customer too.
    if (opts.customer) params["customer_update[address]"] = "auto";
  }
  if (opts.firstChargeAt) {
    // The card is still taken at checkout; the first payment waits for the trial to end.
    params["subscription_data[trial_end]"] = String(Math.floor(opts.firstChargeAt / 1000));
    params.payment_method_collection = "always";
  }
  // Stripe takes either a set discount or a promotion-code box, not both.
  if (opts.coupon) params["discounts[0][coupon]"] = opts.coupon;
  else params.allow_promotion_codes = "true";
  return params;
}

export async function createCheckout(opts: CheckoutOptions): Promise<string> {
  const session = await stripe<{ url: string }>("checkout/sessions", checkoutParams(opts));
  return session.url;
}

/**
 * Proves checkout works without charging anyone: opens a Checkout Session exactly as a family's would be
 * (same prices, tax and trial settings), then expires it at once so it can never be paid. Throws Stripe's
 * own message when it refuses.
 */
export async function testCheckout(currency: Currency, origin: string, now = Date.now()): Promise<void> {
  const params = checkoutParams({
    interval: "month",
    familyId: "health-check",
    email: "health-check@example.com",
    origin,
    firstChargeAt: now + 30 * 86_400_000,
    currency,
  });
  params["metadata[health_check]"] = "1";
  const session = await stripe<{ id: string }>("checkout/sessions", params);
  await stripe(`checkout/sessions/${encodeURIComponent(session.id)}/expire`, {});
}

/** Takes `cents` off the customer's next invoice (a negative balance is a credit in Stripe). */
export async function creditCustomer(customer: string, cents: number, currency: string, description: string): Promise<void> {
  await stripe(`customers/${encodeURIComponent(customer)}/balance_transactions`, {
    amount: String(-Math.abs(cents)),
    currency: currency.toLowerCase(),
    description,
  });
}

/**
 * A Stripe coupon for a discount code: a percentage off once, for some months, or for as long as the plan lasts.
 * A percentage has no currency, so one coupon works for CAD and USD checkouts alike.
 */
export async function createCoupon(opts: { percentOff: number; duration: "once" | "repeating" | "forever"; months?: number; name: string }): Promise<string> {
  const params: Record<string, string> = { percent_off: String(opts.percentOff), duration: opts.duration, name: opts.name.slice(0, 40) };
  if (opts.duration === "repeating") params.duration_in_months = String(opts.months ?? 1);
  return (await stripe<{ id: string }>("coupons", params)).id;
}

export async function createPortal(customer: string, origin: string): Promise<string> {
  const session = await stripe<{ url: string }>("billing_portal/sessions", {
    customer,
    // The query tells the Subscription page to pick up a change made in the portal (src/components/parents/Subscription.tsx).
    return_url: `${origin}/parents/#/subscription?portal=done`,
  });
  return session.url;
}

/** One page of paid invoices, newest first, for the admin dashboard's "Import from Stripe". */
export async function listPaidInvoices(startingAfter?: string): Promise<{ invoices: Record<string, unknown>[]; hasMore: boolean }> {
  const params = new URLSearchParams({ status: "paid", limit: "100" });
  if (startingAfter) params.set("starting_after", startingAfter);
  const res = await fetch(`https://api.stripe.com/v1/invoices?${params}`, { headers: { authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } });
  const data = (await res.json()) as { data?: Record<string, unknown>[]; has_more?: boolean; error?: { message: string } };
  if (!res.ok) throw new Error(data.error?.message ?? `Stripe error ${res.status}`);
  return { invoices: data.data ?? [], hasMore: Boolean(data.has_more) };
}

/** Verifies the Stripe-Signature header (v1 scheme, 5-minute tolerance). */
export function verifyWebhook(payload: string, header: string | null, secret = process.env.STRIPE_WEBHOOK_SECRET): boolean {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = Number(parts.t);
  if (!t || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  const signatures = header
    .split(",")
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));
  return signatures.some((sig) => sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected)));
}

async function stripeGet<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, { headers: { authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } });
  const data = (await res.json()) as T & { error?: { message: string } };
  if (!res.ok) throw new Error(data.error?.message ?? `Stripe error ${res.status}`);
  return data;
}

export interface SubscriptionInfo {
  id: string;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: number | null;
}

/** A customer's subscriptions that haven't ended, for the admin panel. */
export async function listSubscriptions(customer: string): Promise<SubscriptionInfo[]> {
  const data = await stripeGet<{ data: Record<string, unknown>[] }>(`subscriptions?${new URLSearchParams({ customer, status: "all", limit: "20" })}`);
  return data.data
    .filter((s) => s.status !== "canceled" && s.status !== "incomplete_expired")
    .map((s) => {
      const items = (s.items as { data?: { current_period_end?: number }[] } | undefined)?.data ?? [];
      const end = Number(s.current_period_end ?? items[0]?.current_period_end ?? 0);
      return { id: String(s.id), status: String(s.status), cancelAtPeriodEnd: Boolean(s.cancel_at_period_end), currentPeriodEnd: end ? end * 1000 : null };
    });
}

/** Cancels at the end of the paid period (true), or takes that back (false). */
export async function setCancelAtPeriodEnd(subscription: string, cancel: boolean): Promise<void> {
  await stripe(`subscriptions/${encodeURIComponent(subscription)}`, { cancel_at_period_end: String(cancel) });
}

/** Ends one subscription now. */
export async function cancelSubscriptionNow(subscription: string): Promise<void> {
  const res = await fetch(`https://api.stripe.com/v1/subscriptions/${encodeURIComponent(subscription)}`, { method: "DELETE", headers: { authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } });
  if (!res.ok) throw new Error(((await res.json()) as { error?: { message: string } }).error?.message ?? `Stripe error ${res.status}`);
}

/**
 * Refunds part or all of a paid invoice. Newer Stripe API versions list an invoice's payments separately,
 * so the payment is looked up there first, then on the invoice itself.
 */
export async function refundInvoice(invoice: string, cents: number, note: string): Promise<{ id: string; amount: number }> {
  const inv = await stripeGet<Record<string, unknown>>(`invoices/${encodeURIComponent(invoice)}?expand[]=payments`);
  const payments = ((inv.payments as { data?: { payment?: { payment_intent?: unknown; charge?: unknown } }[] } | undefined)?.data ?? []).map((p) => p.payment ?? {});
  const pick = (v: unknown) => (typeof v === "string" ? v : v && typeof v === "object" && typeof (v as { id?: unknown }).id === "string" ? (v as { id: string }).id : null);
  const intent = payments.map((p) => pick(p.payment_intent)).find(Boolean) ?? pick(inv.payment_intent);
  const charge = intent ? null : (payments.map((p) => pick(p.charge)).find(Boolean) ?? pick(inv.charge));
  if (!intent && !charge) throw new Error("Stripe has no payment on this invoice to refund.");
  const params: Record<string, string> = { amount: String(cents), reason: "requested_by_customer", "metadata[note]": note.slice(0, 200), "metadata[invoice]": invoice };
  if (intent) params.payment_intent = intent;
  else params.charge = charge!;
  const r = await stripe<{ id: string; amount: number }>("refunds", params);
  return { id: r.id, amount: Number(r.amount) };
}
