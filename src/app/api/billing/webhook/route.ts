import { cancelReason } from "@/lib/cancelReasons";
import { appOrigin } from "@/server/auth";
import { query, run } from "@/server/db";
import { recordConsent } from "@/server/consent";
import { alertNewCustomer, familyPath, sendAlert } from "@/server/alerts";
import { recordWebhook } from "@/server/monitor";
import { recordInvoice, recordRefund } from "@/server/payments";
import { fulfilGift, isPaidGift } from "@/server/gifts";
import { verifyWebhook } from "@/server/stripe";

// Stripe tells us when a subscription starts, renews, changes or ends.
// Configure the endpoint in Stripe for: checkout.session.completed,
// customer.subscription.created, customer.subscription.updated, customer.subscription.deleted,
// (a paid gift checkout also makes the gift code),
// and, for the admin dashboard's revenue numbers, invoice.paid and charge.refunded.

interface StripeEvent {
  id?: string;
  created?: number;
  type: string;
  data: { object: Record<string, unknown> };
}

export async function POST(req: Request) {
  const payload = await req.text();
  if (!verifyWebhook(payload, req.headers.get("stripe-signature"))) {
    await recordWebhook("stripe", false, null, "Bad signature");
    return new Response("Bad signature", { status: 400 });
  }
  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return new Response("Bad payload", { status: 400 });
  }
  const obj = event.data?.object;
  if (!event.id || !obj) return new Response("ok");
  const now = Date.now();
  // Stripe redelivers events: handle each id once.
  if ((await run("INSERT OR IGNORE INTO stripe_events (id, created_at) VALUES (?, ?)", [event.id, now])) === 0) return new Response("ok");
  try {
    await apply(req, event, obj, now);
  } catch (e) {
    await run("DELETE FROM stripe_events WHERE id = ?", [event.id]); // let Stripe retry
    await recordWebhook("stripe", false, event.type, (e as Error).message);
    throw e;
  }
  await recordWebhook("stripe", true, event.type);
  return new Response("ok");
}

/** Events can arrive out of order. An older one never overwrites what a newer one already set. */
async function isStale(event: StripeEvent, familyId: string | undefined, customer: string | undefined): Promise<boolean> {
  const at = (event.created ?? 0) * 1000;
  const rows = familyId
    ? await query<{ billing_event_at: number }>("SELECT billing_event_at FROM families WHERE id = ?", [familyId])
    : await query<{ billing_event_at: number }>("SELECT billing_event_at FROM families WHERE stripe_customer = ?", [customer ?? ""]);
  return !!rows[0] && at < Number(rows[0].billing_event_at);
}

async function apply(req: Request, event: StripeEvent, obj: Record<string, unknown>, now: number) {
  const at = (event.created ?? 0) * 1000;

  // A family's first real payment is good news for the admins (not a trial's C$0 invoice, not a renewal).
  if (event.type === "invoice.paid" && (await recordInvoice(obj, at || now))) await alertNewCustomer(String(obj.id), now, appOrigin(req));
  if (event.type === "charge.refunded") await recordRefund(obj);
  if (event.type === "invoice.payment_failed" || event.type === "charge.dispute.created") await alertBilling(event.type, obj, now);

  if (event.type === "checkout.session.completed") {
    // A gift is paid once and delivered as a code; it belongs to no family yet.
    if (isPaidGift(obj)) await fulfilGift(obj, appOrigin(req), now);
    const familyId = (obj.client_reference_id as string) ?? (obj.metadata as Record<string, string>)?.family_id;
    // Only a paid checkout grants premium; a delayed payment method sends a later event when it clears.
    const paid = obj.payment_status === "paid" || obj.payment_status === "no_payment_required";
    // Only our own subscription checkout. A one-off payment on the same Stripe account (a Payment Link,
    // where a buyer can set client_reference_id themselves) must never unlock the plan.
    const subscription = obj.mode === "subscription" && !!obj.subscription;
    if (familyId && paid && subscription && !(await isStale(event, familyId, undefined))) {
      // A discount code is used up by the checkout it was applied to.
      await run("UPDATE families SET stripe_customer = ?, subscription_status = 'active', plan = 'premium', discount_code = NULL, updated_at = ?, billing_event_at = ? WHERE id = ?", [
        obj.customer as string,
        now,
        at,
        familyId,
      ]);
      // For a US family, a paid checkout also counts as parental consent under COPPA. Recorded when there is none
      // yet, but the app never depends on it: the Parent area asks any US family without consent directly.
      const email = (obj.customer_details as { email?: unknown } | undefined)?.email ?? obj.customer_email;
      await recordConsent(familyId, "payment", typeof email === "string" ? email : null, appOrigin(req), now);
    }
  }

  if (event.type.startsWith("customer.subscription.")) {
    const status = event.type === "customer.subscription.deleted" ? "canceled" : (obj.status as string);
    const items = (obj.items as { data?: { current_period_end?: number; price?: { recurring?: { interval?: string } } }[] })?.data ?? [];
    const interval = items[0]?.price?.recurring?.interval ?? null;
    // Newer Stripe API versions report the period end per subscription item.
    const periodEnd = Number(obj.current_period_end ?? items[0]?.current_period_end ?? 0) * 1000 || null;
    const premium = ["active", "trialing", "past_due"].includes(status);
    // Cancelled in the billing portal: the plan (or the free trial) runs to this time and doesn't renew.
    const cancelAt = Number(obj.cancel_at ?? 0) * 1000 || (obj.cancel_at_period_end ? periodEnd : null);
    // When it was cancelled: Stripe's canceled_at is the time of the request, even when it ends later. Null once resumed.
    const cancelledAt = cancelAt || status === "canceled" ? Number(obj.canceled_at ?? 0) * 1000 || at || now : null;
    const familyId = (obj.metadata as Record<string, string>)?.family_id;
    // The reason a parent picked when cancelling in the billing portal. Kept even when the event is stale.
    const reason = cancelReason((obj.cancellation_details as Record<string, unknown> | undefined)?.feedback);
    if (reason && typeof obj.id === "string") {
      await run(
        `INSERT INTO cancellations (subscription_id, family_id, reason, at) VALUES (?, COALESCE(?, (SELECT id FROM families WHERE stripe_customer = ?)), ?, ?)
         ON CONFLICT(subscription_id) DO UPDATE SET reason = excluded.reason`,
        [obj.id, familyId ?? null, obj.customer as string, reason, now],
      );
    }
    if (await isStale(event, familyId, obj.customer as string)) return;
    const args = [status, interval, periodEnd, cancelAt, cancelledAt, premium ? "premium" : "free", now, at];
    // A new subscription has used up any discount code, even when its checkout paid later (delayed payment methods).
    const discount = event.type === "customer.subscription.created" ? ", discount_code = NULL" : "";
    if (familyId) {
      await run(
        `UPDATE families SET subscription_status = ?, subscription_interval = ?, current_period_end = ?, cancel_at = ?, cancelled_at = ?, plan = ?, updated_at = ?, billing_event_at = ?, stripe_customer = COALESCE(stripe_customer, ?)${discount} WHERE id = ?`,
        [...args, obj.customer as string, familyId],
      );
    } else {
      await run(
        `UPDATE families SET subscription_status = ?, subscription_interval = ?, current_period_end = ?, cancel_at = ?, cancelled_at = ?, plan = ?, updated_at = ?, billing_event_at = ?${discount} WHERE stripe_customer = ?`,
        [...args, obj.customer as string],
      );
    }
  }
}

/** Tells the admins about a failed payment or a dispute, with a link to the family. */
async function alertBilling(type: string, obj: Record<string, unknown>, now: number) {
  const customer = typeof obj.customer === "string" ? obj.customer : null;
  const fam = customer
    ? (await query<{ id: string; email: string | null }>("SELECT f.id, (SELECT p.email FROM parents p WHERE p.family_id = f.id ORDER BY p.created_at LIMIT 1) AS email FROM families f WHERE f.stripe_customer = ?", [customer]))[0]
    : undefined;
  const amount = Number(obj.amount_due ?? obj.amount ?? 0);
  const money = `${(amount / 100).toFixed(2)} ${String(obj.currency ?? "cad").toUpperCase()}`;
  const who = fam?.email ?? customer ?? "an unknown customer";
  if (type === "invoice.payment_failed") {
    await sendAlert(`payment-failed:${fam?.id ?? customer}`, { subject: `A payment failed for ${who}`, lines: [`Stripe couldn't take ${money} (attempt ${Number(obj.attempt_count ?? 1)}).`, "From the family's page you can email them a link to update their card."], path: fam ? familyPath(fam.id) : "/admin/" }, now);
  } else {
    await sendAlert(`dispute:${String(obj.id ?? customer)}`, { subject: `A payment was disputed by ${who}`, lines: [`A dispute was opened for ${money}. Respond in Stripe before the deadline.`], path: fam ? familyPath(fam.id) : "/admin/" }, now);
  }
}
