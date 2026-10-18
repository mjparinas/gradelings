import "server-only";
import { query, run } from "./db";
import { listPaidInvoices } from "./stripe";

// Payments Stripe collected, kept so the admin dashboard can show revenue over time. The webhook records each
// paid invoice and refund as it happens; "Import from Stripe" in the panel fills in anything older.

type Obj = Record<string, unknown>;
const get = (o: unknown, ...path: string[]): unknown => path.reduce<unknown>((v, k) => (v && typeof v === "object" ? (v as Obj)[k] : undefined), o);

/** The family an invoice belongs to: from the subscription's metadata, or by its Stripe customer. */
async function familyFor(invoice: Obj): Promise<string | null> {
  const meta =
    get(invoice, "parent", "subscription_details", "metadata", "family_id") ?? get(invoice, "subscription_details", "metadata", "family_id") ?? get(invoice, "metadata", "family_id");
  if (typeof meta === "string" && meta) {
    if ((await query("SELECT id FROM families WHERE id = ?", [meta])).length) return meta;
  }
  const customer = invoice.customer;
  if (typeof customer !== "string") return null;
  return (await query<{ id: string }>("SELECT id FROM families WHERE stripe_customer = ?", [customer]))[0]?.id ?? null;
}

function intervalOf(invoice: Obj): string | null {
  const lines = (get(invoice, "lines", "data") as Obj[] | undefined) ?? [];
  for (const line of lines) {
    const i = get(line, "price", "recurring", "interval") ?? get(line, "plan", "interval") ?? get(line, "pricing", "price_details", "recurring", "interval");
    if (i === "month" || i === "year") return i;
  }
  return null;
}

/**
 * Records a paid invoice. Only invoices for one of our families count, since a Stripe account can also bill
 * for other things. Returns whether it was stored (a repeat updates the amount but keeps the family link).
 */
export async function recordInvoice(invoice: Obj, fallbackAt = Date.now()): Promise<boolean> {
  const id = invoice.id;
  const amount = Number(invoice.amount_paid ?? 0);
  if (typeof id !== "string" || !(amount > 0)) return false;
  const familyId = await familyFor(invoice);
  if (!familyId) return false;
  const paidAt = Number(get(invoice, "status_transitions", "paid_at") ?? invoice.created ?? 0) * 1000 || fallbackAt;
  let interval = intervalOf(invoice);
  interval ??= (await query<{ subscription_interval: string | null }>("SELECT subscription_interval FROM families WHERE id = ?", [familyId]))[0]?.subscription_interval ?? null;
  await run(
    `INSERT INTO payments (id, family_id, amount, currency, interval, paid_at) VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT (id) DO UPDATE SET amount = excluded.amount, interval = excluded.interval, paid_at = excluded.paid_at`,
    [id, familyId, amount, String(invoice.currency ?? "cad").toUpperCase(), interval, paidAt],
  );
  return true;
}

/** A refunded charge lowers the revenue of the invoice it paid for. */
export async function recordRefund(charge: Obj): Promise<void> {
  const invoice = typeof charge.invoice === "string" ? charge.invoice : get(charge, "invoice", "id");
  // A gift is a one-off payment with no invoice; its row is keyed by the payment intent.
  const id = typeof invoice === "string" ? invoice : charge.payment_intent;
  if (typeof id !== "string") return;
  await run("UPDATE payments SET refunded = ? WHERE id = ?", [Math.max(0, Number(charge.amount_refunded ?? 0)), id]);
}

/** Copies paid invoices from Stripe. Stops after `maxPages` pages of 100, newest first. */
export async function importPayments(maxPages = 50): Promise<{ seen: number; stored: number }> {
  let seen = 0;
  let stored = 0;
  let after: string | undefined;
  for (let page = 0; page < maxPages; page++) {
    const { invoices, hasMore } = await listPaidInvoices(after);
    for (const inv of invoices) {
      seen++;
      if (await recordInvoice(inv)) stored++;
    }
    if (!hasMore || !invoices.length) break;
    after = String(invoices[invoices.length - 1].id);
  }
  return { seen, stored };
}

export async function getSetting(key: string): Promise<string | null> {
  return (await query<{ value: string }>("SELECT value FROM admin_settings WHERE key = ?", [key]))[0]?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await run("INSERT INTO admin_settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at", [
    key,
    value,
    Date.now(),
  ]);
}
