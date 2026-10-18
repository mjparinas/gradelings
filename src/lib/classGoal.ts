// The class goal: one number of questions the whole class answers together this week. A teacher sets the
// target; the server adds up the class's answers since Monday. It is only a count, with no names and no
// ranking, so there is nothing to win against a classmate. Like the family goal in `togetherGoal.ts`, it is
// a way to cheer together, never a mark, and it locks nothing.

export const CLASS_GOAL_MIN = 10;
export const CLASS_GOAL_MAX = 5000;
/** A suggested target is this many questions for each student in the class. */
export const CLASS_GOAL_PER_STUDENT = 20;
/** Quick choices, in questions per student; the panel multiplies by the class size. */
export const CLASS_GOAL_PER_STUDENT_CHOICES = [10, 20, 30, 50] as const;

/** What a device or the teacher's screen gets. */
export interface ClassGoal {
  /** Questions to reach this week. */
  target: number;
  /** Questions the class has answered since the week began. */
  answers: number;
  met: boolean;
}

export const cleanGoalTarget = (v: unknown): number | null =>
  typeof v === "number" && Number.isInteger(v) && v >= CLASS_GOAL_MIN && v <= CLASS_GOAL_MAX ? v : null;

/** A browser's `getTimezoneOffset()` is in minutes, within a day of UTC either way; anything else counts as UTC. */
export const cleanTzOffset = (v: unknown): number => (typeof v === "number" && Number.isInteger(v) && Math.abs(v) <= 14 * 60 ? v : 0);

/**
 * When the week containing `now` began (a Monday, midnight in the teacher's time zone), in ms since epoch.
 * `tzOffset` is the teacher's `Date.getTimezoneOffset()` (minutes behind UTC, so Vancouver is 420 or 480).
 */
export function goalWeekStart(now: number, tzOffset: number): number {
  const local = new Date(now - tzOffset * 60_000); // read its UTC fields as the teacher's wall clock
  const sinceMonday = (local.getUTCDay() + 6) % 7;
  const midnight = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate() - sinceMonday);
  return midnight + tzOffset * 60_000;
}

export const suggestedTarget = (students: number): number => Math.min(CLASS_GOAL_MAX, Math.max(CLASS_GOAL_MIN, students * CLASS_GOAL_PER_STUDENT));
