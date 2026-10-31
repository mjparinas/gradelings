import { homeworkDone, isCurrentHomework, type Classwork } from "./classroom";

// A child's homework as their parent sees it: what the teacher assigned, when it's due and whether it's done.
// Read from the classwork sync already brings to every family device and the child's own events, with the same
// rules as the child's home screen ("From your teacher") and the teacher's class view, so all three agree.
// The parent Overview and the weekly email both use it. Practice, never a mark.

const DAY = 86_400_000;
/** The weekly email lists at most this many unfinished units per child, then says how many more. */
const MAX_EMAIL_UNITS = 3;

export interface HomeworkItem {
  key: string;
  className: string;
  dueAt?: number;
  /** Questions the teacher asked for; without one, the unit is done at Proficient. */
  goal?: number;
  /** Questions answered on the unit since it was assigned (capped at the goal). */
  answered: number;
  done: boolean;
  /** Past its due date and not done. */
  overdue: boolean;
}

/**
 * The current homework for one child (see `isCurrentHomework`): unfinished units first, those past due first and
 * then by due date, then finished ones. `level` reads the unit's level from the child's derived stats.
 */
export function childHomework(
  classwork: readonly Classwork[],
  profileId: string,
  events: readonly { type: string; unit?: string; t: number }[],
  level: (key: string) => number,
  now: number,
): HomeworkItem[] {
  const seen = new Set<string>();
  const out: HomeworkItem[] = [];
  for (const c of classwork) {
    if (c.profileId !== profileId) continue;
    for (const key of c.unitKeys) {
      if (seen.has(key)) continue;
      seen.add(key);
      const dueAt = c.due?.[key];
      const since = c.since?.[key];
      if (!isCurrentHomework(dueAt, since, now)) continue;
      const goal = c.goal?.[key];
      const answered = goal ? Math.min(goal, homeworkDone(events, key, since ?? 0)) : 0;
      const done = goal ? answered >= goal : level(key) >= 2;
      out.push({ key, className: c.className, dueAt, goal, answered, done, overdue: !done && dueAt !== undefined && dueAt < now });
    }
  }
  const rank = (h: HomeworkItem) => (h.done ? 2 : h.overdue ? 0 : 1);
  return out.sort((a, b) => rank(a) - rank(b) || (a.dueAt ?? Infinity) - (b.dueAt ?? Infinity));
}

/**
 * The weekly email's homework lines for one child: a count, then each unfinished unit with its progress and
 * whether it is due this week or past due. Dates are left out: the server doesn't know the family's time zone.
 * `unitName` returns undefined for a unit whose content isn't known, which is then left out. `proficient` is the
 * framework's own name for level 2 ("Proficient"), which a unit with no question count is done at.
 */
export function homeworkEmailLines(name: string, items: readonly HomeworkItem[], unitName: (key: string) => string | undefined, proficient: string, now: number): string[] {
  const named = items.filter((h) => unitName(h.key));
  if (!named.length) return [];
  const done = named.filter((h) => h.done).length;
  const lines = [`  Homework: ${name} has finished ${done} of ${named.length} ${named.length === 1 ? "unit" : "units"} from the teacher.`];
  const open = named.filter((h) => !h.done);
  for (const h of open.slice(0, MAX_EMAIL_UNITS)) {
    const progress = h.goal ? `${h.answered} of ${h.goal} questions` : `working toward ${proficient}`;
    const when = h.overdue ? ", past its due date" : h.dueAt !== undefined && h.dueAt - now <= 7 * DAY ? ", due this week" : "";
    lines.push(`    ${unitName(h.key)}: ${progress}${when}.`);
  }
  if (open.length > MAX_EMAIL_UNITS) lines.push(`    …and ${open.length - MAX_EMAIL_UNITS} more in the Parent area.`);
  return lines;
}
