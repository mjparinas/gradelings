import { parseUnitKey } from "@/content";
import type { SubjectId } from "@/content/types";
import { toCsv } from "./csv";
import { derive, learnSecondsFor } from "./derive";
import { dayKey, type AppEvent } from "./model";
import { unitLevel } from "./proficiency";
import { storyLearnSeconds } from "./stories";
import { schoolYearOf } from "./schoolYear";

// The homeschool pack's hours log and portfolio: what a child learned between two days, read from the event log only
// (like the year in review), so nothing is stored and nothing depends on which grades have loaded. Time is the same
// capped learning time as everywhere else (`learnSecondsFor`, `storyLearnSeconds`): leaving the app open adds
// nothing, and arcade games are never counted as learning. It describes practice, not a report-card mark.

const DAY = 86_400_000;

export type RangeKind = "week" | "month" | "year";

/** Midnight at the start of `t`'s day, local time. */
export const startOfDay = (t: number) => {
  const d = new Date(t);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
};

/** The last moment of `t`'s day, local time. */
export const endOfDay = (t: number) => {
  const d = new Date(t);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime() - 1;
};

/** A local day from "2026-10-05" (an `<input type="date">` value), at midnight. NaN for anything else. */
export function parseDay(value: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return NaN;
  const t = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).getTime();
  return dayKey(t) === value ? t : NaN;
}

/** This week (from Monday), this month, or this school year (from August 1), up to the end of today. */
export function rangeFor(kind: RangeKind, now: number): { from: number; to: number } {
  const d = new Date(now);
  const to = endOfDay(now);
  if (kind === "week") return { from: startOfDay(now) - ((d.getDay() + 6) % 7) * DAY, to };
  if (kind === "month") return { from: new Date(d.getFullYear(), d.getMonth(), 1).getTime(), to };
  return { from: new Date(schoolYearOf(now), 7, 1).getTime(), to };
}

/** The subject an event's learning time belongs to. Stories are reading, so they count as language. */
function subjectOf(e: AppEvent): SubjectId | null {
  if (e.type === "story") return "language";
  if (e.type === "answer") return parseUnitKey(e.unit)?.subject ?? null;
  return null;
}

function secondsOf(e: AppEvent): number {
  if (e.type === "answer") return learnSecondsFor(e.ms);
  if (e.type === "story") return storyLearnSeconds(e.ms, e.pages, e.results.length);
  return 0;
}

export interface HoursDay {
  day: string;
  seconds: number;
  subjects: Partial<Record<SubjectId, number>>;
  answers: number;
  stories: number;
}

export interface HoursLog {
  from: number;
  to: number;
  /** Days with learning time, oldest first. */
  days: HoursDay[];
  seconds: number;
  /** Learning time by subject, most first. */
  subjects: { subject: SubjectId; seconds: number }[];
}

/** Learning time per day and subject between `from` and `to` (inclusive). */
export function hoursLog(events: readonly AppEvent[], from: number, to: number): HoursLog {
  const byDay = new Map<string, HoursDay>();
  const totals: Partial<Record<SubjectId, number>> = {};
  let seconds = 0;
  for (const e of events) {
    if (e.t < from || e.t > to) continue;
    const secs = secondsOf(e);
    const subject = subjectOf(e);
    if (!secs || !subject) continue;
    const key = dayKey(e.t);
    let day = byDay.get(key);
    if (!day) byDay.set(key, (day = { day: key, seconds: 0, subjects: {}, answers: 0, stories: 0 }));
    day.seconds += secs;
    day.subjects[subject] = (day.subjects[subject] ?? 0) + secs;
    if (e.type === "answer") day.answers++;
    else day.stories++;
    totals[subject] = (totals[subject] ?? 0) + secs;
    seconds += secs;
  }
  const subjects = (Object.entries(totals) as [SubjectId, number][])
    .map(([subject, s]) => ({ subject, seconds: s }))
    .sort((a, b) => b.seconds - a.seconds || a.subject.localeCompare(b.subject));
  return { from, to, days: [...byDay.values()].sort((a, b) => a.day.localeCompare(b.day)), seconds, subjects };
}

/** Whole minutes, for the log's cells. */
export const minutesOf = (seconds: number) => Math.round(seconds / 60);

/** "3 h 25 min", "40 min" or "0 min". */
export function hoursText(seconds: number): string {
  const total = minutesOf(seconds);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h ? `${h} h${m ? ` ${m} min` : ""}` : `${m} min`;
}

/** The hours log as a spreadsheet: a row per day, a minutes column per subject, and a total row. */
export function hoursCsv(log: HoursLog, subjectName: (s: SubjectId) => string): string {
  const subjects = log.subjects.map((s) => s.subject);
  const header = ["Date", "Total minutes", ...subjects.map((s) => `${subjectName(s)} minutes`), "Questions", "Stories read"];
  const rows = log.days.map((d) => [d.day, minutesOf(d.seconds), ...subjects.map((s) => minutesOf(d.subjects[s] ?? 0)), d.answers, d.stories]);
  const answers = log.days.reduce((n, d) => n + d.answers, 0);
  const stories = log.days.reduce((n, d) => n + d.stories, 0);
  rows.push(["Total", minutesOf(log.seconds), ...log.subjects.map((s) => minutesOf(s.seconds)), answers, stories]);
  return toCsv(header, rows);
}

export interface PortfolioUnit {
  key: string;
  /** Questions answered on the unit in the range, and how many were right on the first try. */
  answers: number;
  firstTry: number;
  /** The unit's level at the start of the range and at its end (0 to 3, -1 for not started). */
  before: number;
  after: number;
  /** Up to `SAMPLES` questions answered right on the first try in the range, newest first. */
  samples: string[];
}

export interface PortfolioSubject {
  subject: SubjectId;
  seconds: number;
  answers: number;
  units: PortfolioUnit[];
}

export interface Portfolio {
  from: number;
  to: number;
  seconds: number;
  daysLearning: number;
  answers: number;
  firstTry: number | null;
  /** Units that reached the second level or higher during the range. */
  grown: number;
  subjects: PortfolioSubject[];
  /** Stories read to the end in the range, oldest first, with first-try results. */
  stories: { story: string; t: number; right: number; questions: number }[];
}

/** Sample questions kept per unit, so a page of work shows what was practised without listing every question. */
export const SAMPLES = 3;

/** What a child worked on between `from` and `to`, by subject and unit, with sample questions, for a printable portfolio. */
export function portfolio(events: readonly AppEvent[], from: number, to: number): Portfolio {
  const upTo = events.filter((e) => e.t <= to);
  const start = derive(
    upTo.filter((e) => e.t < from),
    from - 1,
  );
  const end = derive(upTo, to);
  const log = hoursLog(events, from, to);
  const units = new Map<string, PortfolioUnit>();
  const stories: Portfolio["stories"] = [];
  const answersBySubject: Partial<Record<SubjectId, number>> = {};
  let answers = 0;
  let correct = 0;
  // Newest first, so samples are the latest work.
  const inRange = upTo.filter((e) => e.t >= from).sort((a, b) => b.t - a.t);
  for (const e of inRange) {
    if (e.type === "story") {
      stories.push({ story: e.story, t: e.t, right: e.results.filter(Boolean).length, questions: e.results.length });
      continue;
    }
    if (e.type !== "answer" || e.fact) continue;
    const ref = parseUnitKey(e.unit);
    if (!ref) continue;
    let u = units.get(e.unit);
    if (!u) units.set(e.unit, (u = { key: e.unit, answers: 0, firstTry: 0, before: unitLevel(start.units[e.unit]), after: unitLevel(end.units[e.unit]), samples: [] }));
    u.answers++;
    answers++;
    answersBySubject[ref.subject] = (answersBySubject[ref.subject] ?? 0) + 1;
    if (e.correct) {
      u.firstTry++;
      correct++;
      if (e.q && u.samples.length < SAMPLES && !u.samples.includes(e.q)) u.samples.push(e.q);
    }
  }
  // Math Facts answers count as math time and questions, but belong to no unit.
  for (const e of inRange) {
    if (e.type !== "answer" || !e.fact) continue;
    answers++;
    answersBySubject.math = (answersBySubject.math ?? 0) + 1;
    if (e.correct) correct++;
  }
  const subjects: PortfolioSubject[] = log.subjects.map(({ subject, seconds }) => ({
    subject,
    seconds,
    answers: answersBySubject[subject] ?? 0,
    units: [...units.values()].filter((u) => parseUnitKey(u.key)?.subject === subject).sort((a, b) => b.answers - a.answers || a.key.localeCompare(b.key)),
  }));
  return {
    from,
    to,
    seconds: log.seconds,
    daysLearning: log.days.length,
    answers,
    firstTry: answers ? Math.round((correct / answers) * 100) : null,
    grown: [...units.values()].filter((u) => u.after >= 2 && u.before < 2).length,
    subjects,
    stories: stories.reverse(),
  };
}
