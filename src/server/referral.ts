import "server-only";
import { toCountryCode } from "@/lib/country";
import { randomInt } from "node:crypto";
import { APP_NAME } from "@/lib/brand";
import { REFERRAL_ALPHABET, REFERRAL_BONUS_DAYS, REFERRAL_CODE_LENGTH, REFERRAL_MAX_REWARDS, pricesFor } from "@/lib/plan";
import { query, run } from "./db";
import { creditCustomer, stripeCancellationConfigured } from "./stripe";

// Referrals reward the sharer only. The family that shared a code gets a free month when a new parent who
// signed up with it confirms their email, so a throwaway address earns nothing. The new family's trial is
// unchanged. Each family can be referred once and its referrer is thanked once.

const DAY = 86_400_000;

function makeCode(): string {
  let code = "";
  for (let i = 0; i < REFERRAL_CODE_LENGTH; i++) code += REFERRAL_ALPHABET[randomInt(REFERRAL_ALPHABET.length)];
  return code;
}

/** The family's code, made the first time it's asked for. Student accounts never have one. */
export async function ensureReferralCode(familyId: string): Promise<string | null> {
  const rows = await query<{ referral_code: string | null; role: string }>(
    "SELECT f.referral_code, COALESCE((SELECT MAX(p.role) FROM parents p WHERE p.family_id = f.id), 'parent') AS role FROM families f WHERE f.id = ?",
    [familyId],
  );
  const row = rows[0];
  if (!row || row.role === "student") return null;
  if (row.referral_code) return row.referral_code;
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = makeCode();
    // The unique index turns a clash into "0 rows changed" instead of an error.
    const changed = await run("UPDATE families SET referral_code = ? WHERE id = ? AND referral_code IS NULL AND NOT EXISTS (SELECT 1 FROM families WHERE referral_code = ?)", [code, familyId, code]).catch(() => 0);
    if (changed) return code;
    const again = await query<{ referral_code: string | null }>("SELECT referral_code FROM families WHERE id = ?", [familyId]);
    if (again[0]?.referral_code) return again[0].referral_code;
  }
  return null;
}

/** The family that owns a code, or null. Class accounts can't refer anyone. */
export async function referrerFor(code: string): Promise<string | null> {
  const rows = await query<{ id: string }>(
    "SELECT f.id FROM families f WHERE f.referral_code = ? AND NOT EXISTS (SELECT 1 FROM parents p WHERE p.family_id = f.id AND p.role = 'student')",
    [code],
  );
  return rows[0]?.id ?? null;
}

export function bonusTrialEnd(trialEndsAt: number): number {
  return trialEndsAt + REFERRAL_BONUS_DAYS * DAY;
}

export interface ReferralSummary {
  code: string;
  /** Friends who signed up with the code. */
  joined: number;
  /** Friends who confirmed their email, each worth a free month. */
  rewarded: number;
  /** Free months earned so far, at most REFERRAL_MAX_REWARDS. */
  monthsEarned: number;
  maxMonths: number;
  bonusDays: number;
}

export async function referralSummary(familyId: string): Promise<ReferralSummary | null> {
  const code = await ensureReferralCode(familyId);
  if (!code) return null;
  const rows = await query<{ joined: number; rewarded: number }>(
    "SELECT COUNT(*) AS joined, COALESCE(SUM(CASE WHEN referral_rewarded_at IS NOT NULL THEN 1 ELSE 0 END), 0) AS rewarded FROM families WHERE referred_by = ?",
    [familyId],
  );
  const rewarded = Number(rows[0]?.rewarded ?? 0);
  return {
    code,
    joined: Number(rows[0]?.joined ?? 0),
    rewarded,
    monthsEarned: Math.min(rewarded, REFERRAL_MAX_REWARDS),
    maxMonths: REFERRAL_MAX_REWARDS,
    bonusDays: REFERRAL_BONUS_DAYS,
  };
}

/**
 * Called when a parent confirms their email. If their family was referred and the referrer hasn't been
 * thanked yet, the referrer gets a free month. Safe to call any number of times.
 */
export async function rewardReferrer(familyId: string, now = Date.now()): Promise<boolean> {
  // Claim the reward first; a second confirmation (or two at once) changes no rows and stops here.
  const claimed = await run("UPDATE families SET referral_rewarded_at = ? WHERE id = ? AND referred_by IS NOT NULL AND referral_rewarded_at IS NULL", [now, familyId]);
  if (!claimed) return false;
  const referred = (await query<{ referred_by: string }>("SELECT referred_by FROM families WHERE id = ?", [familyId]))[0];
  const referrerId = referred?.referred_by;
  if (!referrerId) return false;
  // The cap is counted on the referrer's own row and claimed in one statement, so deleting rewarded
  // accounts can't reset it and simultaneous confirmations can't go over it.
  if (!(await run("UPDATE families SET referral_rewards = referral_rewards + 1 WHERE id = ? AND referral_rewards < ?", [referrerId, REFERRAL_MAX_REWARDS]))) return false;
  const referrer = (await query<{ trial_ends_at: number; stripe_customer: string | null; subscription_status: string | null; current_period_end: number | null; country: string | null }>(
    "SELECT trial_ends_at, stripe_customer, subscription_status, current_period_end, country FROM families WHERE id = ?",
    [referrerId],
  ))[0];
  if (!referrer) return false;

  const paying = referrer.subscription_status && ["active", "trialing", "past_due"].includes(referrer.subscription_status);
  if (paying && referrer.stripe_customer && stripeCancellationConfigured()) {
    // A real subscriber: take one month's price off their next invoice, in the currency they pay in.
    try {
      const month = pricesFor(toCountryCode(referrer.country)).month;
      await creditCustomer(referrer.stripe_customer, Math.round(month.amount * 100), month.currency, `${APP_NAME} referral: one free month`);
      await run("UPDATE families SET updated_at = ? WHERE id = ?", [now, referrerId]);
      return true;
    } catch (e) {
      console.error("[referral] could not credit the referrer's Stripe balance", (e as Error).message);
      await run("UPDATE families SET referral_rewarded_at = NULL WHERE id = ?", [familyId]); // try again on a later confirmation
      await run("UPDATE families SET referral_rewards = referral_rewards - 1 WHERE id = ? AND referral_rewards > 0", [referrerId]);
      return false;
    }
  }
  if (paying) {
    // Simulated billing (development): push the renewal date back a month.
    await run("UPDATE families SET current_period_end = COALESCE(current_period_end, ?) + ?, updated_at = ? WHERE id = ?", [now, REFERRAL_BONUS_DAYS * DAY, now, referrerId]);
    return true;
  }
  // Trial or free plan: another month of everything, starting from today or the end of the current trial.
  await run("UPDATE families SET trial_ends_at = ? , updated_at = ? WHERE id = ?", [bonusTrialEnd(Math.max(Number(referrer.trial_ends_at), now)), now, referrerId]);
  return true;
}
