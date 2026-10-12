import type { FamilyInfo } from "./model";

// Subscription plans and what each one unlocks. Tune these numbers freely:
// the whole app reads them from here.

export const TRIAL_DAYS = 30;
export const FREE_UNITS_PER_COURSE = 2;
export const MAX_CHILDREN = 3;

/** Referrals: when a friend signs up with your code and confirms their email, you get a free month of this length. */
export const REFERRAL_BONUS_DAYS = 30;
/** A family can earn at most this many free months from referrals. */
export const REFERRAL_MAX_REWARDS = 12;
/** Unambiguous characters only (no 0/O, 1/I/L), so a code read aloud or typed from a screenshot works. */
export const REFERRAL_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const REFERRAL_CODE_LENGTH = 8;

/** Shape check only; whether a code belongs to a family is decided on the server. */
export function normalizeReferralCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const code = raw.trim().toUpperCase();
  if (code.length !== REFERRAL_CODE_LENGTH) return null;
  for (const ch of code) if (!REFERRAL_ALPHABET.includes(ch)) return null;
  return code;
}

export const PRICES = {
  month: { amount: 14.99, currency: "CAD", label: "$14.99/month" },
  year: { amount: 119.99, currency: "CAD", label: "$119.99/year", note: "Save 33%" },
};

export type Feature = "allUnits" | "adventure" | "review" | "speed" | "challenge" | "arcade" | "fullReports";

const ACTIVE = new Set(["active", "trialing", "past_due"]);

/** Parent-area page where a family starts or manages a paid plan. Works before anyone opens the kids' app. */
export const SUBSCRIBE_HREF = "/parents/#/subscription";

export function isPremium(family: FamilyInfo, now = Date.now()): boolean {
  if (family.plan === "premium") return true;
  if (family.subscription && ACTIVE.has(family.subscription.status)) return true;
  return now < family.trialEndsAt;
}

/** A paid membership, as opposed to the free trial or the free plan. */
export function hasPaidPlan(family: FamilyInfo): boolean {
  if (family.plan === "premium") return true;
  return Boolean(family.subscription && ACTIVE.has(family.subscription.status));
}

/** Who should see a subscribe prompt: families still on the trial, or already on the free plan. */
export function upgradeOffer(family: FamilyInfo, now = Date.now()): "trial" | "free" | null {
  if (hasPaidPlan(family)) return null;
  return isPremium(family, now) ? "trial" : "free";
}

export function trialDaysLeft(family: FamilyInfo, now = Date.now()): number {
  return Math.max(0, Math.ceil((family.trialEndsAt - now) / 86_400_000));
}

export function canUse(family: FamilyInfo, _feature: Feature, now = Date.now()): boolean {
  // Every premium feature is currently on the same plan.
  return isPremium(family, now);
}

/** On the free plan, the first few units of each course stay open. */
export function unitOpen(family: FamilyInfo, unitIndex: number, now = Date.now()): boolean {
  return isPremium(family, now) || unitIndex < FREE_UNITS_PER_COURSE;
}
