import { ADMIN_BODY_LIMIT, appOrigin, error, json, readJson } from "@/server/auth";
import { CANCEL_CONFIRM, REFUND_CONFIRM } from "@/lib/adminBilling";
import { audit, requireAdmin } from "@/server/admin";
import { familyBilling, noteRefund } from "@/server/adminBilling";
import { query } from "@/server/db";
import { sendEmail } from "@/server/email";
import { paymentProblemEmail } from "@/server/emailTemplates";
import { cancelSubscriptionNow, refundInvoice, setCancelAtPeriodEnd } from "@/server/stripe";

// Billing actions on one family: refunds, cancelling or resuming the subscription, and the "please update your
// card" email. Refunds and cancelling now can't be undone, so each needs a word typed back.

/** `?familyId=` gives the family's payments and live subscription. */
export async function GET(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const familyId = new URL(req.url).searchParams.get("familyId") ?? "";
  if (!(await isFamily(familyId))) return error(404, "No such family.");
  return json(await familyBilling(familyId));
}

async function isFamily(id: string) {
  const parents = await query<{ role: string }>("SELECT role FROM parents WHERE family_id = ?", [id]);
  return parents.length > 0 && !parents.some((p) => p.role === "student");
}

interface Body {
  familyId?: unknown;
  action?: unknown;
  paymentId?: unknown;
  amount?: unknown;
  subscriptionId?: unknown;
  confirm?: unknown;
}

export async function POST(req: Request) {
  const gate = await requireAdmin(req);
  if ("response" in gate) return gate.response;
  const admin = gate.admin.email;
  const body = ((await readJson(req, ADMIN_BODY_LIMIT)) ?? {}) as Body;
  const familyId = typeof body.familyId === "string" ? body.familyId : "";
  if (!(await isFamily(familyId))) return error(404, "No such family.");
  const log = (action: string, detail?: unknown) => audit(admin, action, familyId, detail);

  if (body.action === "card-email") {
    const parent = (await query<{ email: string; email_bounced_at: number | null }>("SELECT email, email_bounced_at FROM parents WHERE family_id = ? ORDER BY created_at LIMIT 1", [familyId]))[0];
    if (!parent) return error(404, "No such family.");
    if (parent.email_bounced_at) return error(400, "Email to this address bounced or was marked as spam.");
    const sent = await sendEmail(paymentProblemEmail(parent.email, appOrigin(req), admin));
    await log("billing.card-email");
    return sent.ok ? json({ ok: true }) : error(502, "The email couldn't be sent. Check the email settings.");
  }

  const billing = await familyBilling(familyId);
  if (!billing?.stripe) return error(400, "Stripe isn't set up, so there's nothing to change.");

  if (body.action === "refund") {
    const payment = billing.payments.find((p) => p.id === body.paymentId);
    if (!payment) return error(404, "No such payment for this family.");
    const left = payment.amount - payment.refunded;
    if (!Number.isInteger(body.amount) || (body.amount as number) < 1 || (body.amount as number) > left) return error(400, `The refund must be between 1¢ and what's left (${(left / 100).toFixed(2)}).`);
    if (body.confirm !== REFUND_CONFIRM) return error(400, `Type ${REFUND_CONFIRM} to confirm.`);
    try {
      const r = await refundInvoice(payment.id, body.amount as number, `Refunded from the admin panel by ${admin}`);
      await noteRefund(payment.id, r.amount);
      await log("billing.refund", { payment: payment.id, amount: r.amount, refund: r.id });
      return json({ ok: true, refunded: r.amount });
    } catch (e) {
      return error(502, `Stripe refused the refund: ${(e as Error).message}`);
    }
  }

  const sub = billing.subscriptions.find((s) => s.id === body.subscriptionId);
  if (body.action === "cancel-at-end" || body.action === "resume" || body.action === "cancel-now") {
    if (!sub) return error(404, "No such subscription for this family.");
    try {
      if (body.action === "cancel-now") {
        if (body.confirm !== CANCEL_CONFIRM) return error(400, `Type ${CANCEL_CONFIRM} to confirm.`);
        await cancelSubscriptionNow(sub.id);
      } else {
        await setCancelAtPeriodEnd(sub.id, body.action === "cancel-at-end");
      }
    } catch (e) {
      return error(502, `Stripe refused: ${(e as Error).message}`);
    }
    // The subscription webhook updates the family's plan; this only records who did it.
    await log(`billing.${body.action}`, { subscription: sub.id });
    return json({ ok: true });
  }

  return error(400, "Unknown action.");
}
