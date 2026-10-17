import type { ChildSettings } from "./model";
import { dayKey } from "./model";

// A unit a parent picked for a child to work on, with an optional day it is for ("test on Friday").
// It lives in the child's synced settings. Adventure picks it more often and the child's home screen
// shows it as a card; nothing else about scoring changes.

export interface Focus {
  /** A unit key, such as "4/math/fractions". */
  unit: string;
  /** The last day it matters (a local calendar day, "2026-10-23"). Unset means until a parent clears it. */
  until?: string;
  setAt: number;
}

/** Adventure picks the focus unit about this many times more often than its usual weight. */
export const FOCUS_BOOST = 3;

/** The child's current focus, or undefined when there is none or its day has passed. */
export function activeFocus(settings: Pick<ChildSettings, "focus"> | undefined, now: number): Focus | undefined {
  const focus = settings?.focus;
  if (!focus?.unit) return undefined;
  if (focus.until && focus.until < dayKey(now)) return undefined;
  return focus;
}

/** "5 days left", "Last day" or "" for a focus with no day, for the child's card. */
export function focusDaysLeft(focus: Focus, now: number): number | undefined {
  if (!focus.until) return undefined;
  const [y, m, d] = focus.until.split("-").map(Number);
  const end = new Date(y, m - 1, d).getTime();
  const [ty, tm, td] = dayKey(now).split("-").map(Number);
  return Math.round((end - new Date(ty, tm - 1, td).getTime()) / 86_400_000);
}
