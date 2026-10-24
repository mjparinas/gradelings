import type { SubjectId } from "@/content/types";
import { derive, type Derived } from "./derive";
import { dayKey, type AppEvent } from "./model";
import { unitLevel } from "./proficiency";
import { momentStickers, countEarned } from "./stickers";
import { schoolYearOf } from "./schoolYear";

// A year in review: what a child practised over one school year (August 1 to today), for a printable page in the
// parent area and one email in June. Read from the event log only, like "Is it working?" (src/lib/progressSince.ts),
// so nothing is stored and it never depends on which grades have loaded. It describes practice, not a report-card mark.
// It goes to every family in June whatever their renewal date, so it never reads as a renewal reminder.

const DAY = 86_400_000;

/** The school year (2025 for 2025-26) that a review on `t` covers: the one `t` is in. */
export const reviewYearOf = schoolYearOf;

/** August 1 of a school year, local time. */
export const schoolYearStart = (year: number) => new Date(year, 7, 1).getTime();

/** "2025–26" */
export const schoolYearName = (year: number) => `${year}–${String((year + 1) % 100).padStart(2, "0")}`;

/** June and July: the Overview offers the year in review, and the June email goes out. */
export const isYearReviewSeason = (t: number) => {
  const m = new Date(t).getMonth();
  return m === 5 || m === 6;
};

/** The email goes from June 15 (most of the year is in by then) to the end of June, once per school year. */
export const isYearReviewEmailDay = (t: number) => {
  const d = new Date(t);
  return d.getMonth() === 5 && d.getDate() >= 15;
};

export interface GrownUnit {
  key: string;
  /** The level now: 2 (Proficient or the framework's equivalent) or 3. */
  level: number;
}

export interface YearReview {
  year: number;
  from: number;
  to: number;
  daysPractised: number;
  minutes: number;
  answers: number;
  /** Share right on the first try, 0 to 100, or null with no answers. */
  firstTry: number | null;
  /** Units that reached Proficient (or Extending) this school year, Extending first. */
  grown: GrownUnit[];
  unitsStarted: number;
  /** Trophies earned this school year. */
  trophies: number;
  /** Stickers earned this school year: a lesson sticker for each unit grown, plus moment stickers. */
  stickers: number;
  /** The most days practised in a row this school year. */
  bestStreak: number;
  /** The subject with the most answers this year, or null. */
  topSubject: SubjectId | null;
  /** Answers by subject this year, most first. */
  subjects: { subject: SubjectId; answers: number }[];
}

/** The year in review for the school year `now` is in. `current` is the child's derived stats now, when already worked out. */
export function yearReview(events: AppEvent[], now: number, current?: Derived): YearReview {
  const year = reviewYearOf(now);
  const from = schoolYearStart(year);
  const then = derive(
    events.filter((e) => e.t < from),
    from - 1,
  );
  const today = current ?? derive(events, now);
  const fromDay = dayKey(from);
  let daysPractised = 0;
  let seconds = 0;
  let answers = 0;
  let correct = 0;
  const bySubject: Partial<Record<SubjectId, number>> = {};
  for (const d of Object.values(today.days)) {
    if (d.day < fromDay) continue;
    if (d.answers > 0) daysPractised++;
    seconds += d.learnSeconds;
    answers += d.answers;
    correct += d.correct;
    for (const [s, n] of Object.entries(d.subjects) as [SubjectId, number][]) bySubject[s] = (bySubject[s] ?? 0) + n;
  }
  const grown: GrownUnit[] = [];
  let unitsStarted = 0;
  for (const [key, stat] of Object.entries(today.units)) {
    if (stat.lastT >= from) unitsStarted++;
    const level = unitLevel(stat);
    if (level >= 2 && unitLevel(then.units[key]) < 2) grown.push({ key, level });
  }
  grown.sort((a, b) => b.level - a.level || a.key.localeCompare(b.key));
  const subjects = (Object.entries(bySubject) as [SubjectId, number][])
    .filter(([, n]) => n > 0)
    .map(([subject, n]) => ({ subject, answers: n }))
    .sort((a, b) => b.answers - a.answers || a.subject.localeCompare(b.subject));
  const trophies = Object.values(today.trophies).filter((t) => t >= from).length;
  const moments = countEarned(momentStickers(today)) - countEarned(momentStickers(then));
  return {
    year,
    from,
    to: now,
    daysPractised,
    minutes: Math.round(seconds / 60),
    answers,
    firstTry: answers ? Math.round((correct / answers) * 100) : null,
    grown,
    unitsStarted,
    trophies,
    stickers: Math.max(0, moments) + grown.length,
    bestStreak: bestStreakSince(today, fromDay),
    topSubject: subjects[0]?.subject ?? null,
    subjects,
  };
}

/** The longest run of practice days in a row since `fromDay`. Rest-day shields aren't counted: this is days actually practised. */
function bestStreakSince(d: Derived, fromDay: string): number {
  const days = Object.values(d.days)
    .filter((x) => x.day >= fromDay && x.answers > 0)
    .map((x) => new Date(`${x.day}T12:00:00`).getTime())
    .sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  let last = -Infinity;
  for (const t of days) {
    run = Math.round((t - last) / DAY) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    last = t;
  }
  return best;
}

/** One child's year for the June email: first name and practice totals only. */
export interface YearReviewChild {
  name: string;
  daysPractised: number;
  minutes: number;
  answers: number;
  grown: number;
  /** Up to three unit titles that grew, Extending first. */
  grownTitles: string[];
}

export function yearReviewLines(c: YearReviewChild): string[] {
  if (!c.answers) return [];
  const lines = [`${c.name} practised on ${c.daysPractised} ${c.daysPractised === 1 ? "day" : "days"} this school year: ${c.minutes} min and ${c.answers} questions.`];
  if (c.grown) {
    const more = c.grown - c.grownTitles.length;
    lines.push(`  ${c.grown} ${c.grown === 1 ? "unit" : "units"} grew into a 🌳 Tree or ⭐ Star: ${c.grownTitles.join(", ")}${more > 0 ? ` and ${more} more` : ""}.`);
  }
  return lines;
}
