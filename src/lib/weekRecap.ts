import { derive, type Derived } from "./derive";
import type { AppEvent } from "./model";
import { unitLevel } from "./proficiency";
import { activeDay, weekDays, weekStart } from "./quests";
import { momentStickers } from "./stickers";

// The kids' weekly "you grew" recap: what changed for a child over last week (Monday to Sunday), read
// from the event log alone. Nothing is stored; the recap is the difference between the child's stats
// at the start of last week and at the start of this one, so it is the same on every device and never
// depends on which grades have loaded. It describes practice, not a report-card mark.

export interface RecapUnit {
  key: string;
  /** Level at the start of the week (-1 = not started) and at its end. */
  from: number;
  to: number;
}

export interface WeekRecap {
  /** The Monday (day key) of the week recapped. */
  week: string;
  /** Days practised: a finished lesson, a story read to the end or 5 answers. */
  days: number;
  /** Which of the seven days (Monday first) counted. */
  dayDots: boolean[];
  answers: number;
  correct: number;
  minutes: number;
  /** Units already started that went up at least one level, biggest jumps first. */
  grew: RecapUnit[];
  /** Units tried for the first time. */
  started: RecapUnit[];
  /** New Sticker Book stickers: lessons grown to the second level, moments and mystery-box surprises. */
  stickers: number;
  /** Stories read to the end. */
  stories: number;
  /** Trophy ids earned during the week, in the order they came. */
  trophies: string[];
}

const startOf = (day: string) => new Date(`${day}T00:00:00`).getTime();

/** The Monday before `monday`. */
export function previousWeek(monday: string): string {
  return weekStart(startOf(monday) - 3 * 86_400_000);
}

function stickerCount(d: Derived): number {
  const lessons = Object.values(d.units).filter((u) => unitLevel(u) >= 2).length;
  const moments = momentStickers(d).filter((s) => s.earned).length;
  return lessons + moments + Object.keys(d.surprises).length;
}

/**
 * Last week's recap as of `now`, or null when the child didn't practise that week. Events after the
 * week (this week's practice) never change it.
 */
export function weekRecap(events: AppEvent[], now: number): WeekRecap | null {
  const week = previousWeek(weekStart(now));
  const from = startOf(week);
  const to = startOf(weekStart(now));
  const inWeek = events.filter((e) => e.t >= from && e.t < to);
  if (!inWeek.some((e) => e.type === "answer" || e.type === "story")) return null;

  const before = derive(events.filter((e) => e.t < from), from);
  const after = derive(events.filter((e) => e.t < to), to - 1);
  const days = weekDays(week).map((k) => after.days[k]);
  if (!days.some((s) => s && activeDay(s))) return null;

  const grew: RecapUnit[] = [];
  const started: RecapUnit[] = [];
  for (const [key, stat] of Object.entries(after.units)) {
    const level = unitLevel(stat);
    const then = unitLevel(before.units[key]);
    if (level <= then) continue;
    (then < 0 ? started : grew).push({ key, from: then, to: level });
  }
  grew.sort((a, b) => b.to - b.from - (a.to - a.from) || b.to - a.to || a.key.localeCompare(b.key));
  started.sort((a, b) => b.to - a.to || a.key.localeCompare(b.key));

  const trophies = Object.entries(after.trophies)
    .filter(([, t]) => t >= from && t < to)
    .sort((a, b) => a[1] - b[1])
    .map(([id]) => id);

  return {
    week,
    days: days.filter((s) => s && activeDay(s)).length,
    dayDots: days.map((s) => Boolean(s && activeDay(s))),
    answers: days.reduce((n, s) => n + (s?.answers ?? 0), 0),
    correct: days.reduce((n, s) => n + (s?.correct ?? 0), 0),
    minutes: Math.round(days.reduce((n, s) => n + (s?.learnSeconds ?? 0), 0) / 60),
    grew,
    started,
    stickers: Math.max(0, stickerCount(after) - stickerCount(before)),
    stories: days.reduce((n, s) => n + (s?.stories ?? 0), 0),
    trophies,
  };
}

// Two full derives over a child's history is real work on a slow tablet, and last week's events almost
// never change, so the answer is kept per child and week until an event inside the window arrives.
const cache = new Map<string, { size: number; recap: WeekRecap | null }>();

export function cachedWeekRecap(profileId: string, events: AppEvent[], now: number): WeekRecap | null {
  const to = startOf(weekStart(now));
  const key = `${profileId}:${weekStart(now)}`;
  const size = events.reduce((n, e) => (e.t < to ? n + 1 : n), 0);
  const hit = cache.get(key);
  if (hit && hit.size === size) return hit.recap;
  const recap = weekRecap(events, now);
  cache.set(key, { size, recap });
  return recap;
}

/** The headline a child hears first: the biggest thing that grew. */
export function recapHeadline(r: WeekRecap): string {
  if (r.grew.length) return `You grew in ${r.grew.length} ${r.grew.length === 1 ? "lesson" : "lessons"} last week!`;
  if (r.started.length) return `You planted ${r.started.length} new ${r.started.length === 1 ? "lesson" : "lessons"} last week!`;
  if (r.stickers) return `You found ${r.stickers} new ${r.stickers === 1 ? "sticker" : "stickers"} last week!`;
  return `You practised on ${r.days} ${r.days === 1 ? "day" : "days"} last week!`;
}

// Which week's card a child has closed on this device. A convenience only: losing it shows the card again.
const seenKey = (profileId: string) => `grademap.grew.seen.${profileId}`;

export function recapSeen(profileId: string): string | null {
  try {
    return localStorage.getItem(seenKey(profileId));
  } catch {
    return null;
  }
}

export function markRecapSeen(profileId: string, week: string): void {
  try {
    localStorage.setItem(seenKey(profileId), week);
  } catch {}
}
