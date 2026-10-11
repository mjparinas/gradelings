import "server-only";
import { randomInt } from "node:crypto";
import { LIFETIME_ACCESS } from "@/lib/plan";
import { query, run } from "./db";
import { createCoupon } from "./stripe";

// Codes the owner hands out (to schools, testers, partners or as a gift): free access for a number of
// days or for life, or a percentage off at checkout. Created through the admin API, redeemed by a
// signed-in parent in Subscription. Each family can use a code once.

export type CodeKind = "access" | "discount";
export type DiscountDuration = "once" | "repeating" | "forever";

export interface CodeRow {
  code: string;
  kind: CodeKind;
  days: number | null;
  percent_off: number | null;
  duration: DiscountDuration | null;
  months: number | null;
  stripe_coupon: string | null;
  max_uses: number | null;
  uses: number;
  expires_at: number | null;
  note: string | null;
  created_at: number;
  disabled_at: number | null;
}

const DAY = 86_400_000;
// No 0/O, 1/I/L: codes are read aloud and typed from paper.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** Upper-case, without spaces or dashes, so "abcd-efgh" and "ABCD EFGH" are the same code. */
export function normalizeCode(input: string): string {
  return input.toUpperCase().replace(/[\s-]/g, "");
}

/** A random 12-character code, shown as three groups of four. About 59 bits, so it can't be guessed. */
export function generateCode(): string {
  let out = "";
  for (let i = 0; i < 12; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

export function formatCode(code: string): string {
  return code.length === 12 ? code.match(/.{4}/g)!.join("-") : code;
}

export interface NewCode {
  code?: string;
  kind: CodeKind;
  /** Access codes: how many days of free access. Omit for lifetime. */
  days?: number | null;
  /** Discount codes: percentage off (1 to 100). */
  percentOff?: number | null;
  /** Discount codes: the first payment only (default), `months` months, or every payment. */
  duration?: DiscountDuration | null;
  months?: number | null;
  /** Discount codes: an existing Stripe coupon to use instead of making one. */
  stripeCoupon?: string | null;
  maxUses?: number | null;
  expiresAt?: number | null;
  note?: string | null;
}

/** Checks an admin's request. Returns an error message, or null when it is fine. */
export function validateNewCode(c: NewCode): string | null {
  if (c.kind !== "access" && c.kind !== "discount") return "kind must be 'access' or 'discount'.";
  if (c.code != null && (typeof c.code !== "string" || !/^[A-Z0-9]{6,32}$/.test(normalizeCode(c.code)))) return "code must be 6 to 32 letters or digits.";
  if (c.kind === "access" && c.days != null && !(Number.isInteger(c.days) && c.days >= 1 && c.days <= 3650)) return "days must be a whole number from 1 to 3650, or left out for lifetime.";
  if (c.kind === "discount" && !(Number.isInteger(c.percentOff) && c.percentOff! >= 1 && c.percentOff! <= 100)) return "percentOff must be a whole number from 1 to 100.";
  if (c.kind === "discount" && c.duration != null && !["once", "repeating", "forever"].includes(c.duration)) return "duration must be 'once', 'repeating' or 'forever'.";
  if (c.kind === "discount" && c.duration === "repeating" && !(Number.isInteger(c.months) && c.months! >= 1 && c.months! <= 36)) return "months must be a whole number from 1 to 36.";
  if (c.maxUses != null && !(Number.isInteger(c.maxUses) && c.maxUses >= 1)) return "maxUses must be a whole number of at least 1.";
  if (c.expiresAt != null && !(Number.isFinite(c.expiresAt) && c.expiresAt > Date.now())) return "expiresAt must be a future time in milliseconds.";
  if (c.note != null && (typeof c.note !== "string" || c.note.length > 200)) return "note must be at most 200 characters.";
  if (c.stripeCoupon != null && (typeof c.stripeCoupon !== "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(c.stripeCoupon))) return "stripeCoupon is not a valid coupon id.";
  return null;
}

/** Saves a new code. Returns null when that code already exists. */
export async function createCode(c: NewCode, now = Date.now()): Promise<CodeRow | null> {
  const code = c.code ? normalizeCode(c.code) : generateCode();
  const discount = c.kind === "discount";
  const added = await run(
    `INSERT OR IGNORE INTO redeem_codes (code, kind, days, percent_off, duration, months, stripe_coupon, max_uses, expires_at, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      code,
      c.kind,
      c.kind === "access" ? (c.days ?? null) : null,
      discount ? c.percentOff! : null,
      discount ? (c.duration ?? "once") : null,
      discount && c.duration === "repeating" ? c.months! : null,
      discount ? (c.stripeCoupon ?? null) : null,
      c.maxUses ?? null,
      c.expiresAt ?? null,
      c.note ?? null,
      now,
    ],
  );
  if (!added) return null;
  return getCode(code);
}

export async function getCode(code: string): Promise<CodeRow | null> {
  const row = (await query<CodeRow>("SELECT * FROM redeem_codes WHERE code = ?", [normalizeCode(code)]))[0];
  return row ? toRow(row) : null;
}

export async function listCodes(): Promise<CodeRow[]> {
  return (await query<CodeRow>("SELECT * FROM redeem_codes ORDER BY created_at DESC LIMIT 500")).map(toRow);
}

/** Stops a code being redeemed. Access already granted stays. */
export async function disableCode(code: string, now = Date.now()): Promise<boolean> {
  return (await run("UPDATE redeem_codes SET disabled_at = ? WHERE code = ? AND disabled_at IS NULL", [now, normalizeCode(code)])) > 0;
}

function toRow(r: CodeRow): CodeRow {
  const n = (v: unknown) => (v === null || v === undefined ? null : Number(v));
  return {
    code: String(r.code),
    kind: r.kind,
    days: n(r.days),
    percent_off: n(r.percent_off),
    duration: r.duration ?? null,
    months: n(r.months),
    stripe_coupon: r.stripe_coupon ?? null,
    max_uses: n(r.max_uses),
    uses: Number(r.uses),
    expires_at: n(r.expires_at),
    note: r.note ?? null,
    created_at: Number(r.created_at),
    disabled_at: n(r.disabled_at),
  };
}

/** When free access from an access code ends, starting from whatever access the family already has. */
export function extendAccess(current: number | null, days: number | null, now: number): number {
  if (days == null) return LIFETIME_ACCESS;
  const from = Math.max(now, current ?? 0);
  if (from >= LIFETIME_ACCESS) return LIFETIME_ACCESS;
  return Math.min(LIFETIME_ACCESS, from + days * DAY);
}

export type RedeemResult =
  | { ok: true; kind: "access"; accessUntil: number }
  | { ok: true; kind: "discount"; percentOff: number }
  | { ok: false; status: number; error: string };

const UNKNOWN = "That code isn't valid. Check it and try again.";

/**
 * Uses a code for a family. Wrong, disabled, expired and used-up codes all get the same answer, so the
 * reply never confirms which codes exist.
 */
export async function redeemCode(familyId: string, input: string, now = Date.now()): Promise<RedeemResult> {
  const code = normalizeCode(input);
  if (!/^[A-Z0-9]{6,32}$/.test(code)) return { ok: false, status: 400, error: UNKNOWN };
  const row = await getCode(code);
  if (!row || row.disabled_at || (row.expires_at && row.expires_at <= now)) return { ok: false, status: 400, error: UNKNOWN };
  if (row.max_uses != null && row.uses >= row.max_uses) return { ok: false, status: 400, error: UNKNOWN };

  const family = (await query<{ access_until: number | null; subscription_status: string | null; plan: string }>(
    "SELECT access_until, subscription_status, plan FROM families WHERE id = ?",
    [familyId],
  ))[0];
  if (!family) return { ok: false, status: 404, error: "We couldn't find your account." };
  if (row.kind === "discount" && (family.plan === "premium" || ["active", "trialing", "past_due"].includes(family.subscription_status ?? ""))) {
    return { ok: false, status: 409, error: "Discount codes apply when you subscribe, and you already have a membership." };
  }
  if (row.kind === "access" && Number(family.access_until ?? 0) >= LIFETIME_ACCESS) {
    return { ok: false, status: 409, error: "You already have lifetime access." };
  }

  // Claim a use first, so two families racing for the last use can't both get it.
  const claimed = await run("UPDATE redeem_codes SET uses = uses + 1 WHERE code = ? AND disabled_at IS NULL AND (max_uses IS NULL OR uses < max_uses)", [code]);
  if (!claimed) return { ok: false, status: 400, error: UNKNOWN };
  const mine = await run("INSERT OR IGNORE INTO code_redemptions (code, family_id, redeemed_at) VALUES (?, ?, ?)", [code, familyId, now]);
  if (!mine) {
    await run("UPDATE redeem_codes SET uses = uses - 1 WHERE code = ?", [code]);
    return { ok: false, status: 409, error: "You've already used this code." };
  }

  if (row.kind === "access") {
    const until = extendAccess(family.access_until == null ? null : Number(family.access_until), row.days, now);
    await run("UPDATE families SET access_until = ?, updated_at = ? WHERE id = ?", [until, now, familyId]);
    return { ok: true, kind: "access", accessUntil: until };
  }
  await run("UPDATE families SET discount_code = ?, updated_at = ? WHERE id = ?", [code, now, familyId]);
  return { ok: true, kind: "discount", percentOff: row.percent_off! };
}

/**
 * The discount waiting for this family's next checkout. A code that expires after the family redeemed it
 * still counts; one the owner disabled does not.
 */
export async function pendingDiscount(code: string | null | undefined): Promise<CodeRow | null> {
  if (!code) return null;
  const row = await getCode(code);
  if (!row || row.kind !== "discount" || row.disabled_at) return null;
  return row;
}

/** The Stripe coupon for a discount code, made the first time someone checks out with it. */
export async function stripeCouponFor(row: CodeRow): Promise<string> {
  if (row.stripe_coupon) return row.stripe_coupon;
  const id = await createCoupon({
    percentOff: row.percent_off!,
    duration: row.duration ?? "once",
    months: row.months ?? undefined,
    name: `${row.percent_off}% off (${formatCode(row.code)})`,
  });
  // Two checkouts at once may both make one; the first saved is kept and the other is simply unused.
  await run("UPDATE redeem_codes SET stripe_coupon = ? WHERE code = ? AND stripe_coupon IS NULL", [id, row.code]);
  return (await getCode(row.code))?.stripe_coupon ?? id;
}
