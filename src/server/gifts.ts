import "server-only";
import { GIFT_CODE_VALID_DAYS, GIFT_DAYS, giftCents, type Currency } from "@/lib/plan";
import { createCode, formatCode } from "./codes";
import { query, run } from "./db";
import { sendEmail } from "./email";
import { giftEmail } from "./emailTemplates";

// A gift is a one-off Stripe Checkout (src/server/stripe.ts `giftCheckoutParams`). When it is paid, the
// webhook calls `fulfilGift`, which makes a single-use access code for a year and emails it to the buyer.
// The code is the gift: nothing about the person who receives it is collected or stored.

const DAY = 86_400_000;

const toCurrency = (v: unknown): Currency | null => (typeof v === "string" && ["CAD", "USD"].includes(v.toUpperCase()) ? (v.toUpperCase() as Currency) : null);

interface CheckoutSession {
  id?: unknown;
  mode?: unknown;
  payment_status?: unknown;
  currency?: unknown;
  amount_subtotal?: unknown;
  metadata?: Record<string, string> | null;
  customer_details?: { email?: unknown } | null;
  customer_email?: unknown;
  amount_total?: unknown;
  payment_intent?: unknown;
}

/**
 * Is this a paid checkout of ours for a gift? Besides our tag on the session, the price must be exactly
 * what a gift costs in that currency, so a one-off payment made some other way on the same Stripe
 * account can never mint a code.
 */
export function isPaidGift(s: CheckoutSession): boolean {
  if (s.mode !== "payment" || s.metadata?.gift !== "1" || typeof s.id !== "string") return false;
  if (s.payment_status !== "paid") return false;
  const currency = toCurrency(s.currency);
  return currency !== null && Number(s.amount_subtotal) === giftCents(currency);
}

export interface GiftResult {
  code: string;
  /** The email went out (or email isn't set up in development). False when there was nobody to send it to. */
  emailed: boolean;
}

/**
 * Counts the gift in the admin revenue: a payments row (interval "gift", no family) keyed by the payment intent,
 * which is what `charge.refunded` names, so a refund in Stripe lowers it. A repeat only updates the amount.
 */
async function recordGiftPayment(session: CheckoutSession, now: number): Promise<void> {
  const currency = toCurrency(session.currency);
  const amount = Number(session.amount_total ?? session.amount_subtotal);
  if (!currency || !(amount > 0)) return;
  const id = typeof session.payment_intent === "string" && session.payment_intent ? session.payment_intent : String(session.id);
  await run(
    `INSERT INTO payments (id, family_id, amount, currency, interval, paid_at) VALUES (?, NULL, ?, ?, 'gift', ?)
     ON CONFLICT (id) DO UPDATE SET amount = excluded.amount`,
    [id, amount, currency, now],
  );
}

/** Makes the gift's code (once per checkout, however many times Stripe repeats the event) and emails it. Throws when the email fails so Stripe retries. */
export async function fulfilGift(session: CheckoutSession, origin: string, now = Date.now()): Promise<GiftResult> {
  const note = `Gift ${String(session.id)}`;
  let made: string | undefined = (await query<{ code: string }>("SELECT code FROM redeem_codes WHERE note = ?", [note]))[0]?.code;
  // A 12-character random code collides essentially never; try a few times anyway.
  for (let attempt = 0; attempt < 5 && !made; attempt++) {
    made = (await createCode({ kind: "access", days: GIFT_DAYS, maxUses: 1, expiresAt: now + GIFT_CODE_VALID_DAYS * DAY, note }, now))?.code;
  }
  if (!made) throw new Error("Could not make a gift code.");
  const code: string = made;
  await recordGiftPayment(session, now);
  const to = session.customer_details?.email ?? session.customer_email;
  if (typeof to !== "string" || !to.includes("@")) return { code, emailed: false };
  const expires = new Date(now + GIFT_CODE_VALID_DAYS * DAY).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const sent = await sendEmail(giftEmail(to, origin, { code: formatCode(code), days: GIFT_DAYS, expires }));
  if (!sent.ok && !sent.skipped) throw new Error("Could not email the gift code.");
  return { code, emailed: true };
}
