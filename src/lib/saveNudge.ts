import type { FamilyInfo } from "./model";
import { TRIAL_FINAL_STRETCH_DAYS, trialDaysLeft, upgradeOffer } from "./plan";

/**
 * Whether the end-of-lesson screen asks a grown-up to make a free account. Without one, progress lives
 * on this device only and the trial emails can't reach anyone. We ask after a child's first finished
 * lesson, again after the third and the seventh (a grown-up who wasn't there the first time, owner, November 6, 2026),
 * then once a day in the last stretch of the trial (`TRIAL_FINAL_STRETCH_DAYS`), and never once an account exists.
 */
export const SAVE_ASK_LESSONS = [1, 3, 7];

export function askToSaveProgress(family: FamilyInfo, sessionsTotal: number, sessionsToday: number, now = Date.now()): boolean {
  if (family.account) return false;
  if (SAVE_ASK_LESSONS.includes(sessionsTotal)) return true;
  return upgradeOffer(family, now) === "trial" && trialDaysLeft(family, now) <= TRIAL_FINAL_STRETCH_DAYS && sessionsToday === 1;
}
