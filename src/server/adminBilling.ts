import "server-only";
import { query, run } from "./db";
import { listSubscriptions, stripeCancellationConfigured, type SubscriptionInfo } from "./stripe";

// A family's payments and subscription, for the admin panel's billing actions (refund, cancel, a failed-payment
// email). Payments come from our own table, which the Stripe webhook fills; the subscription is read live.

export interface PaymentRow {
  id: string;
  amount: number;
  refunded: number;
  currency: string;
  interval: string | null;
  paidAt: number;
}

export async function familyPayments(familyId: string): Promise<PaymentRow[]> {
  const rows = await query<Record<string, unknown>>("SELECT id, amount, refunded, currency, interval, paid_at FROM payments WHERE family_id = ? ORDER BY paid_at DESC LIMIT 50", [familyId]);
  return rows.map((r) => ({
    id: String(r.id),
    amount: Number(r.amount),
    refunded: Number(r.refunded ?? 0),
    currency: String(r.currency),
    interval: r.interval == null ? null : String(r.interval),
    paidAt: Number(r.paid_at),
  }));
}

export interface FamilyBilling {
  stripe: boolean;
  customer: string | null;
  payments: PaymentRow[];
  subscriptions: SubscriptionInfo[];
  /** Why the subscriptions couldn't be read, if they couldn't. */
  stripeError: string | null;
}

export async function familyBilling(familyId: string): Promise<FamilyBilling | null> {
  const fam = (await query<{ stripe_customer: string | null }>("SELECT stripe_customer FROM families WHERE id = ?", [familyId]))[0];
  if (!fam) return null;
  const customer = fam.stripe_customer ? String(fam.stripe_customer) : null;
  const stripe = stripeCancellationConfigured();
  let subscriptions: SubscriptionInfo[] = [];
  let stripeError: string | null = null;
  if (stripe && customer) {
    try {
      subscriptions = await listSubscriptions(customer);
    } catch (e) {
      stripeError = (e as Error).message;
    }
  }
  return { stripe, customer, payments: await familyPayments(familyId), subscriptions, stripeError };
}

/** Counts a refund right away; the charge.refunded webhook later sets the exact total. */
export async function noteRefund(paymentId: string, cents: number): Promise<void> {
  await run("UPDATE payments SET refunded = MIN(amount, refunded + ?) WHERE id = ?", [cents, paymentId]);
}
