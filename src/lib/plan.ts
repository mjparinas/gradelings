import type { FamilyInfo } from "./model";

// Subscription plans and what each one unlocks. Tune these numbers freely:
// the whole app reads them from here.

export const TRIAL_DAYS = 30;
export const FREE_UNITS_PER_COURSE = 2;
export const MAX_CHILDREN = 3;

export const PRICES = {
  month: { amount: 14.99, currency: "CAD", label: "$14.99/month" },
  year: { amount: 119.99, currency: "CAD", label: "$119.99/year", note: "Save 33%" },
};

export type Feature = "allUnits" | "adventure" | "review" | "speed" | "challenge" | "arcade" | "fullReports";

const ACTIVE = new Set(["active", "trialing", "past_due"]);

/** Parent-area page where a family starts or manages a paid plan. Works before anyone opens the kids' app. */
export const SUBSCRIBE_HREF = "/parents/#/subscription";

/** `accessUntil` for a code that never runs out: the latest time a JavaScript Date can hold. */
export const LIFETIME_ACCESS = 8_640_000_000_000_000;

/** Free access from a redeemed code (lifetime, a year, six months...), as opposed to a subscription. */
export function hasCodeAccess(family: FamilyInfo, now = Date.now()): boolean {
  return Boolean(family.accessUntil && now < family.accessUntil);
}

export function isLifetime(family: FamilyInfo): boolean {
  return (family.accessUntil ?? 0) >= LIFETIME_ACCESS;
}

export function isPremium(family: FamilyInfo, now = Date.now()): boolean {
  if (family.plan === "premium") return true;
  if (hasCodeAccess(family, now)) return true;
  if (family.subscription && ACTIVE.has(family.subscription.status)) return true;
  return now < family.trialEndsAt;
}

/** A membership (paid, or granted by a code), as opposed to the free trial or the free plan. */
export function hasPaidPlan(family: FamilyInfo, now = Date.now()): boolean {
  if (family.plan === "premium") return true;
  if (hasCodeAccess(family, now)) return true;
  return Boolean(family.subscription && ACTIVE.has(family.subscription.status));
}

/** Who should see a subscribe prompt: families still on the trial, or already on the free plan. */
export function upgradeOffer(family: FamilyInfo, now = Date.now()): "trial" | "free" | null {
  if (hasPaidPlan(family, now)) return null;
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
