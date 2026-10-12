import type { FamilyInfo } from "./model";
import { trialDaysLeft, upgradeOffer } from "./plan";

/**
 * Whether the end-of-lesson screen asks a grown-up to make a free account. Without one, progress lives
 * on this device only and the trial emails can't reach anyone. We ask after a child's first finished
 * lesson, then once a day in the last week of the trial, and never once an account exists.
 */
export function askToSaveProgress(family: FamilyInfo, sessionsTotal: number, sessionsToday: number, now = Date.now()): boolean {
  if (family.account) return false;
  if (sessionsTotal === 1) return true;
  return upgradeOffer(family, now) === "trial" && trialDaysLeft(family, now) <= 7 && sessionsToday === 1;
}
