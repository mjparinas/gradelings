import type { DayStat } from "./derive";
import { dayKey } from "./model";

// "Share Gradelings" on the parent Overview after a good week. Read from the children's day counts, so
// nothing is stored but the device's own "Not now", and the shared link carries nothing about a child.

/** Practice days in a week that make it a good one. */
export const GOOD_WEEK_DAYS = 3;
/** How long "Not now" keeps the card away on this device. */
export const SHARE_SNOOZE_MS = 30 * 86_400_000;

const KEY = "gradelings.shareSnooze";

/** A day counts like a streak day: a finished session, a story read to the end or at least 5 answers. */
export function practisedDays(days: Record<string, DayStat | undefined>, now: number): number {
  let n = 0;
  for (let i = 0; i < 7; i++) {
    const d = days[dayKey(now - i * 86_400_000)];
    if (d && (d.sessions > 0 || d.stories > 0 || d.answers >= 5)) n++;
  }
  return n;
}

export function isGoodWeek(days: Record<string, DayStat | undefined>, now: number): boolean {
  return practisedDays(days, now) >= GOOD_WEEK_DAYS;
}

export function shareSnoozed(now: number): boolean {
  try {
    const until = Number(localStorage.getItem(KEY));
    return Number.isFinite(until) && until > now;
  } catch {
    return false;
  }
}

export function snoozeShare(now: number) {
  try {
    localStorage.setItem(KEY, String(now + SHARE_SNOOZE_MS));
  } catch {
    // Blocked storage: the card just comes back next time.
  }
}
