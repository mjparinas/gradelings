import type { Derived } from "./derive";
import { activeDay, weekDays, weekStart } from "./quests";

// A goal the children of one family reach together: answers added up across them this week. It is
// only counts, with no names and no ranking, so there is nothing to win against a sibling. The
// target comes from how many children there are, so it needs no setting and nothing is stored.

export const TOGETHER_PER_CHILD = 60;

export interface TogetherProgress {
  answers: number;
  target: number;
  met: boolean;
  /** Days of the week (Monday first) with practice by anyone in the family. */
  dots: { day: string; practised: boolean }[];
}

/** Needs at least two children; one child's weekly goal is the parent's weekly goal. */
export function togetherProgress(children: Pick<Derived, "days">[], now: number): TogetherProgress | undefined {
  if (children.length < 2) return undefined;
  const days = weekDays(weekStart(now));
  const answers = children.reduce((sum, d) => sum + days.reduce((s, k) => s + (d.days[k]?.answers ?? 0), 0), 0);
  const target = TOGETHER_PER_CHILD * children.length;
  const dots = days.map((day) => ({ day, practised: children.some((d) => d.days[day] && activeDay(d.days[day])) }));
  return { answers, target, met: answers >= target, dots };
}
