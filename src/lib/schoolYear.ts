import { GRADE_ORDER } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { gradeLabel } from "./gradeLabel";
import type { Profile } from "./model";

// Prompts that follow the school year, so the app stays useful at the moments school matters to a family:
// moving children up a grade when school starts, a sneak peek at next year's lessons over the summer, and
// a pointer to the report-card conversation sheet when report cards usually come home. Read from the date
// and the child's profile; the only thing stored is which school year a child's grade was last set for
// (`Profile.gradeYear`, synced) and the device's own "Got it" for a card. Dates are the device's local date
// (UTC on the server). Windows are broad on purpose: school calendars differ by province, state and district.

/** A school year runs from August 1. The 2026-27 school year is 2026. */
export const SCHOOL_YEAR_START_MONTH = 7; // August (0-based)

export function schoolYearOf(t: number): number {
  const d = new Date(t);
  return d.getMonth() >= SCHOOL_YEAR_START_MONTH ? d.getFullYear() : d.getFullYear() - 1;
}

/** The grade after this one, or null after the last grade the app teaches. */
export function nextGrade(grade: GradeId): GradeId | null {
  const i = GRADE_ORDER.indexOf(grade);
  return i >= 0 && i < GRADE_ORDER.length - 1 ? GRADE_ORDER[i + 1] : null;
}

/** Month and day as one number (August 15 is 815), for comparing against the windows below. */
const monthDay = (t: number) => {
  const d = new Date(t);
  return (d.getMonth() + 1) * 100 + d.getDate();
};

/** When school starts: from August 1 to September 30 a parent is asked whether each child moved up. */
export const isBackToSchool = (t: number) => monthDay(t) >= 801 && monthDay(t) <= 930;

/** The summer holidays (June 15 to August 31): children can try next grade's lessons. */
export const isSummer = (t: number) => monthDay(t) >= 615 && monthDay(t) <= 831;

/**
 * Times report cards or progress reports often come home in Canada and the US: mid-November to mid-December,
 * late January to the end of February, and June. Each has an id, so "Got it" hides one window, not the next.
 */
const REPORT_WINDOWS = [
  { id: "fall", from: 1110, to: 1215 },
  { id: "winter", from: 120, to: 229 },
  { id: "spring", from: 601, to: 630 },
] as const;

/** The report-card window `t` is in ("2026-fall", "2027-winter"), or null outside them. */
export function reportCardSeason(t: number): string | null {
  const md = monthDay(t);
  const w = REPORT_WINDOWS.find((x) => md >= x.from && md <= x.to);
  return w ? `${schoolYearOf(t)}-${w.id}` : null;
}

/** The school year a child's grade was last set for. Children from before this was kept count from when they were added. */
export const gradeYearOf = (p: Pick<Profile, "gradeYear" | "createdAt">) => p.gradeYear ?? schoolYearOf(p.createdAt);

/**
 * The grade to suggest when school starts, or null when there is nothing to ask: outside the back-to-school
 * window, a grade already set (or kept) this school year, or a child in the last grade.
 */
export function gradeUpFor(p: Pick<Profile, "grade" | "gradeYear" | "createdAt" | "deleted">, now: number): GradeId | null {
  if (p.deleted || !isBackToSchool(now) || gradeYearOf(p) >= schoolYearOf(now)) return null;
  return nextGrade(p.grade);
}

/** The grade a child can peek at over the summer, or null outside the summer or in the last grade. */
export function summerPeekFor(p: Pick<Profile, "grade">, now: number): GradeId | null {
  return isSummer(now) ? nextGrade(p.grade) : null;
}

// ---------- The weekly email ----------

const WEEK = 7 * 86_400_000;

/**
 * School-year lines for a Sunday's weekly email, so the email says what the Overview cards say without
 * repeating it every week: the grade question on the first Sunday of August and of September while a child's
 * grade is still last year's, and the summer and report-card lines on the first Sunday of their window.
 */
export function schoolYearLines(children: Pick<Profile, "name" | "grade" | "framework" | "gradeYear" | "createdAt">[], now: number): string[] {
  const lines: string[] = [];
  const firstWeekOfMonth = new Date(now).getDate() <= 7;
  if (firstWeekOfMonth) {
    for (const c of children) {
      const next = gradeUpFor(c, now);
      if (next) lines.push(`New school year: is ${c.name} starting ${gradeLabel(next, c.framework)}? You can move ${c.name} up in one tap on the parent Overview.`);
    }
  }
  const peeks = children.flatMap((c) => {
    const next = summerPeekFor(c, now);
    return next ? [`${c.name} can try ${gradeLabel(next, c.framework)} lessons`] : [];
  });
  if (peeks.length && !isSummer(now - WEEK)) lines.push(`Summer sneak peek: ${peeks.join(", ")} from the Lessons screen. Whatever they practise counts once they move up.`);
  const season = reportCardSeason(now);
  if (season && reportCardSeason(now - WEEK) !== season && children.length) {
    lines.push("Report cards often come home around now. The parent area has a printable conversation sheet with what to ask the teacher (it reflects practice, not a report-card mark).");
  }
  return lines;
}

// ---------- "Got it" for a card, on this device ----------

const KEY = "gradelings.schoolYear";

function seen(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Whether "Got it" was pressed for this card ("summer-2026", "2026-fall") on this device. */
export const cardDismissed = (id: string) => seen().includes(id);

export function dismissCard(id: string) {
  try {
    // Keep the last few, so the list never grows.
    localStorage.setItem(KEY, JSON.stringify([...seen().filter((x) => x !== id), id].slice(-8)));
  } catch {
    // Blocked storage: the card just comes back next time.
  }
}

/** The summer card's id for the summer `t` is in. */
export const summerCardId = (t: number) => `summer-${new Date(t).getFullYear()}`;
