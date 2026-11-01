import type { GradeId, SubjectId } from "@/content/types";
import { dayKey } from "./model";

// A goal a parent sets for one child ("Ready for Grade 5 math by Sep 1", "Catch up on Fractions"), turned into a
// week-by-week plan of units. The goal and its units are fixed when it is set and live in the child's synced settings
// (`ChildSettings.goalPlan`); which week it is, what's done and whether it's on track are worked out from the child's
// unit levels each time, so nothing else is stored. A unit counts as done at Proficient (level 2), as everywhere else.
// Family plan only (`canUse(family, "goalPlan")`). It describes practice, not a report-card mark.

export interface GoalPlan {
  /** "grade": every unit of a subject's course before the next grade. "units": a few units a parent picked. */
  kind: "grade" | "units";
  subject: SubjectId;
  /** The grade whose course the units come from (the subject's practice grade when the goal was set). */
  grade: GradeId;
  /** Unit keys in the order they are planned. Units already at Proficient when the goal was set are left out. */
  units: string[];
  /** The first day of the plan and the day the goal is for (local calendar days, "2026-11-01"). */
  start: string;
  until: string;
  setAt: number;
}

export type GoalStatus = "done" | "ahead" | "on-track" | "behind" | "ended";

export interface GoalWeek {
  /** 0 for the first week. */
  index: number;
  /** The week's first day. */
  start: string;
  units: string[];
}

export interface GoalProgress {
  weeks: GoalWeek[];
  /** The week today falls in (clamped to the plan), and whether today is past the goal's day. */
  current: number;
  over: boolean;
  done: number;
  total: number;
  /** Units the plan expected done by the start of this week. */
  expected: number;
  status: GoalStatus;
  /** Units to work on now: this week's and any earlier ones not yet done, in plan order. */
  upNext: string[];
  /** Days until the goal's day (0 on the day, negative after). */
  daysLeft: number;
}

/** Shortest and longest plans a parent can set. */
export const MIN_GOAL_DAYS = 7;
export const MAX_GOAL_DAYS = 366;
/** A catch-up goal holds this many units at most, so a week stays a week. */
export const MAX_CATCH_UP_UNITS = 6;
/** "Up next" lists at most this many units, so the card and the email stay short. */
export const UP_NEXT = 3;

const DAY = 86_400_000;

/** Whole days from one local day to another. */
export function daysBetween(from: string, to: string): number {
  const at = (d: string) => {
    const [y, m, dd] = d.split("-").map(Number);
    return Date.UTC(y, m - 1, dd);
  };
  return Math.round((at(to) - at(from)) / DAY);
}

function addDays(day: string, n: number): string {
  const [y, m, d] = day.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}-${String(t.getUTCDate()).padStart(2, "0")}`;
}

/** The default day for a "get ready for next grade" goal: the next September 1 at least four weeks away. */
export function defaultReadyDay(now: number): string {
  const d = new Date(now);
  let year = d.getFullYear();
  const sep1 = (y: number) => `${y}-09-01`;
  if (daysBetween(dayKey(now), sep1(year)) < 28) year++;
  return sep1(year);
}

/** The default day for a catch-up goal: four weeks from today. */
export function defaultCatchUpDay(now: number): string {
  return addDays(dayKey(now), 28);
}

/** Is `until` a day a goal can be set for, starting today? */
export function validGoalDay(until: string, now: number): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(until)) return false;
  const days = daysBetween(dayKey(now), until);
  return days >= MIN_GOAL_DAYS && days <= MAX_GOAL_DAYS;
}

/**
 * A new goal: `candidates` are the units in course order, and `level` says how far the child is in each. Units already
 * at Proficient are left out, and returns undefined when nothing is left to plan or the day is out of range.
 */
export function makeGoalPlan(
  input: { kind: GoalPlan["kind"]; subject: SubjectId; grade: GradeId; candidates: readonly string[]; until: string },
  level: (key: string) => number,
  now: number,
): GoalPlan | undefined {
  if (!validGoalDay(input.until, now)) return undefined;
  const units = [...new Set(input.candidates)].filter((k) => level(k) < 2);
  if (!units.length || (input.kind === "units" && units.length > MAX_CATCH_UP_UNITS)) return undefined;
  return { kind: input.kind, subject: input.subject, grade: input.grade, units, start: dayKey(now), until: input.until, setAt: now };
}

/** The plan's weeks, with its units spread evenly from the first week to the last. */
export function goalWeeks(goal: Pick<GoalPlan, "units" | "start" | "until">): GoalWeek[] {
  const count = Math.max(1, Math.ceil((daysBetween(goal.start, goal.until) + 1) / 7));
  const weeks: GoalWeek[] = Array.from({ length: count }, (_, i) => ({ index: i, start: addDays(goal.start, i * 7), units: [] }));
  const n = goal.units.length;
  goal.units.forEach((u, j) => weeks[Math.min(count - 1, Math.floor((j * count) / n))].units.push(u));
  return weeks;
}

/** The plan as rows to show: each week with units on its own, and each run of empty weeks folded into one row. */
export function goalRows(weeks: readonly GoalWeek[]): { first: number; last: number; start: string; units: string[] }[] {
  const rows: { first: number; last: number; start: string; units: string[] }[] = [];
  for (const w of weeks) {
    const prev = rows.at(-1);
    if (!w.units.length && prev && !prev.units.length) prev.last = w.index;
    else rows.push({ first: w.index, last: w.index, start: w.start, units: w.units });
  }
  return rows;
}

/** Where the plan stands today. `level` is the child's level in a unit (`unitLevel`), -1 or 0 when not started. */
export function goalProgress(goal: GoalPlan, level: (key: string) => number, now: number): GoalProgress {
  const weeks = goalWeeks(goal);
  const today = dayKey(now);
  const daysLeft = daysBetween(today, goal.until);
  const over = daysLeft < 0;
  const current = Math.min(weeks.length - 1, Math.max(0, Math.floor(daysBetween(goal.start, today) / 7)));
  const isDone = (k: string) => level(k) >= 2;
  const done = goal.units.filter(isDone).length;
  const total = goal.units.length;
  const expected = over ? total : weeks.slice(0, current).reduce((s, w) => s + w.units.length, 0);
  const upNext = weeks
    .slice(0, current + 1)
    .flatMap((w) => w.units)
    .filter((k) => !isDone(k));
  // A week with nothing planned (more weeks than units) still points at the next unit, so there is always something to do.
  if (!upNext.length) {
    const next = goal.units.find((k) => !isDone(k));
    if (next) upNext.push(next);
  }
  const status: GoalStatus = done >= total ? "done" : over ? "ended" : done > expected ? "ahead" : done === expected ? "on-track" : "behind";
  return { weeks, current, over, done, total, expected, status, upNext: upNext.slice(0, UP_NEXT), daysLeft };
}

/** Units Adventure should pick more often for this goal: the ones up next, until the goal's day has passed. */
export function goalBoostUnits(goal: GoalPlan | undefined, level: (key: string) => number, now: number): string[] {
  if (!goal) return [];
  const p = goalProgress(goal, level, now);
  return p.over || p.status === "done" ? [] : p.upNext;
}

/** A goal's name, from unit titles and grade labels the caller gives. */
export function goalTitle(
  goal: Pick<GoalPlan, "kind" | "units">,
  names: { subject: string; nextGrade?: string; grade: string; unit: (key: string) => string | undefined },
): string {
  if (goal.kind === "grade") return names.nextGrade ? `Ready for ${names.nextGrade} ${names.subject}` : `Finish ${names.grade} ${names.subject}`;
  const first = names.unit(goal.units[0]) ?? names.subject;
  if (goal.units.length === 1) return `Catch up on ${first}`;
  if (goal.units.length === 2) return `Catch up on ${first} and ${names.unit(goal.units[1]) ?? "one more"}`;
  return `Catch up on ${first} and ${goal.units.length - 1} more`;
}

/** "on track", "ahead of plan"... for a sentence. */
export const STATUS_WORDS: Record<GoalStatus, string> = {
  done: "goal reached",
  ahead: "ahead of plan",
  "on-track": "on track",
  behind: "a little behind plan",
  ended: "the goal's day has passed",
};

/**
 * The weekly email's lines for a child's goal, already indented: the goal and where it stands, then what's up next.
 * `unitName` gives a unit's title; `day` formats the goal's day ("Sep 1").
 */
export function goalEmailLines(
  childName: string,
  title: string,
  progress: GoalProgress,
  unitName: (key: string) => string | undefined,
  proficient: string,
  day: string,
): string[] {
  const head = `  ${childName}'s goal: ${title} by ${day}. ${progress.done} of ${progress.total} units at ${proficient}, ${STATUS_WORDS[progress.status]}.`;
  if (progress.status === "done" || progress.status === "ended") return [head];
  const next = progress.upNext.map(unitName).filter(Boolean);
  return next.length ? [head, `  Up next: ${next.join(", ")}.`] : [head];
}
