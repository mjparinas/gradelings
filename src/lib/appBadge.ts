import { childHomework } from "./homework";
import type { Classwork } from "./classroom";
import { validUnfinished, type Unfinished } from "./resume";

// The number on the app's icon: the active child's homework that isn't done yet, plus one for a lesson left
// partway. It is worked out on the device from what the home screen already shows ("From your teacher" and
// "Finish your lesson?"), so it needs no server, no permission and no notification. It is a count, never
// a message, and it only changes while the app is open (nothing is pushed to a child's device).

/** The most the badge ever shows, so it never reads like a pile of overdue work. */
export const MAX_BADGE = 9;

export interface BadgeInput {
  classwork: readonly Classwork[];
  profileId: string;
  events: readonly { type: string; unit?: string; t: number }[];
  /** The unit's level (0 to 3) from the child's derived stats. */
  level: (key: string) => number;
  unfinished: Unfinished | null | undefined;
  now: number;
}

/** How many things are waiting: unfinished homework units plus a lesson left partway. */
export function badgeCount(i: BadgeInput): number {
  const homework = childHomework(i.classwork, i.profileId, i.events, i.level, i.now).filter((h) => !h.done).length;
  const lesson = validUnfinished(i.unfinished, i.now) ? 1 : 0;
  return Math.min(MAX_BADGE, homework + lesson);
}

interface BadgeNavigator {
  setAppBadge?: (n?: number) => Promise<void>;
  clearAppBadge?: () => Promise<void>;
}

/** Shows the count on the icon (or clears it at 0). Does nothing where the Badging API doesn't exist. */
export async function applyBadge(count: number, nav: BadgeNavigator = typeof navigator === "undefined" ? {} : (navigator as unknown as BadgeNavigator)): Promise<void> {
  try {
    if (count > 0 && nav.setAppBadge) await nav.setAppBadge(count);
    else if (nav.clearAppBadge) await nav.clearAppBadge();
    else if (nav.setAppBadge) await nav.setAppBadge(0);
  } catch {
    // The browser said no (not installed, or no permission): the icon just has no number.
  }
}
