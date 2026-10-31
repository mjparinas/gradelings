import { classInsights, homeworkOverview, type StudentRow } from "./classroom";

// The Monday class email (opt-in, per teacher): for each class, who practised last week, the homework that is current,
// units to reteach and students to check in with, so the class view comes to the teacher. Built from the same numbers
// as the class page (classInsights, homeworkOverview). First names and practice only, and it says so.

const DAY = 86_400_000;
/** A unit counts as current homework when it is due from a week ago on, or, with no due date, was assigned in the last 4 weeks. */
const RECENT_DUE = 7 * DAY;
const RECENT_ASSIGNED = 28 * DAY;
const MAX_HOMEWORK = 5;
const MAX_RETEACH = 3;
const MAX_CHECK_IN = 8;

export interface DigestClass {
  name: string;
  students: StudentRow[];
  assignments: string[];
  due: Record<string, number>;
  goal: Record<string, number>;
  assignedAt: Record<string, number>;
  /** Start dates of units scheduled ahead. A unit counts as assigned from its start. */
  startsAt?: Record<string, number>;
}

const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const names = (list: string[]) => (list.length < 2 ? list.join("") : `${list.slice(0, -1).join(", ")} and ${list.at(-1)}`);

/** The lines for one class, or none when the class has no students or nothing assigned. */
export function classDigestLines(c: DigestClass, unitName: (key: string) => string, now: number): string[] {
  if (!c.students.length || !c.assignments.length) return [];
  const practised = c.students.filter((s) => s.lastActive !== null && now - s.lastActive <= 7 * DAY).length;
  const lines = [`${c.name}: ${practised} of ${c.students.length} ${c.students.length === 1 ? "student" : "students"} practised in the last week.`];

  const current = c.assignments.filter((k) => (c.due[k] !== undefined ? c.due[k] >= now - RECENT_DUE : Math.max(c.assignedAt[k] ?? 0, c.startsAt?.[k] ?? 0) >= now - RECENT_ASSIGNED) && !((c.startsAt?.[k] ?? 0) > now));
  const homework = homeworkOverview(c.students, current, c.due, c.goal, now).filter((h) => h.assigned > 0);
  for (const h of homework.slice(0, MAX_HOMEWORK)) {
    const when = h.overdue ? ", past due" : c.due[h.key] !== undefined && c.due[h.key] - now <= 7 * DAY && c.due[h.key] >= now ? ", due this week" : "";
    lines.push(`  Homework, ${unitName(h.key)}: ${h.done} of ${h.assigned} done${when}.`);
  }
  if (homework.length > MAX_HOMEWORK) lines.push(`  …and ${homework.length - MAX_HOMEWORK} more homework units on the class page.`);

  const insights = classInsights(c.students, c.assignments, unitName, now);
  const reteach = insights.focusUnits.slice(0, MAX_RETEACH).map((u) => unitName(u.key));
  if (reteach.length) lines.push(`  Worth reteaching: ${names(reteach)}.`);
  const checkIn = insights.checkIn.slice(0, MAX_CHECK_IN).map((s) => `${s.name} (${lowerFirst(s.reasons[0])})`);
  if (checkIn.length) lines.push(`  Check in with: ${checkIn.join(", ")}${insights.checkIn.length > MAX_CHECK_IN ? ` and ${insights.checkIn.length - MAX_CHECK_IN} more` : ""}.`);
  if (!reteach.length && !checkIn.length) lines.push("  Nobody needs a check-in this week. 🎉");
  return lines;
}
