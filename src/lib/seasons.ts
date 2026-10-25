import type { AgeBand, SubjectId } from "@/content/types";
import type { DayStat, Derived } from "./derive";
import type { Sticker } from "./stickers";

// Seasonal festivals: four times a year, a few weeks with their own sticker page and a festival goal.
// Stickers are read from the days practised inside the festival's dates, so nothing is stored and
// nothing is ever taken away. A sticker missed this year comes back with the festival next year.
// The festivals are about the seasons, never a holiday, so every family can join in.

export type SeasonId = "leaf" | "snow" | "sprout" | "sun";

interface SeasonStats {
  days: number;
  answers: number;
  perfect: number;
  sessions: number;
  stories: number;
  /** Subjects with at least 3 answers during the festival. */
  subjects: number;
}

interface SeasonStickerDef {
  id: string;
  name: string;
  emoji: string;
  hint: (band: AgeBand) => string;
  earned: (s: SeasonStats, band: AgeBand) => boolean;
}

export interface Season {
  id: SeasonId;
  name: string;
  emoji: string;
  /** First and last day ("MM-DD"), inclusive. A festival that ends in an earlier month ends the next year. */
  start: string;
  end: string;
  colour: string;
  dark: string;
  /** Six sticker pictures and names, in the order of the goals below. */
  art: [emoji: string, name: string][];
}

export const SEASONS: Season[] = [
  {
    id: "leaf",
    name: "Leaf Festival",
    emoji: "🍂",
    start: "10-01",
    end: "11-15",
    colour: "#ff9636",
    dark: "#c96a12",
    art: [["🍂", "Falling leaf"], ["🌰", "Acorn"], ["🍎", "Apple"], ["🌽", "Corn"], ["🦊", "Fox"], ["🍁", "Golden leaf"]],
  },
  {
    id: "snow",
    name: "Snow Festival",
    emoji: "❄️",
    start: "12-15",
    end: "01-31",
    colour: "#8fd3f0",
    dark: "#3d93b8",
    art: [["❄️", "Snowflake"], ["🧣", "Scarf"], ["⛄", "Snow buddy"], ["🧤", "Mittens"], ["🐧", "Penguin"], ["🏔️", "Snowy peak"]],
  },
  {
    id: "sprout",
    name: "Sprout Festival",
    emoji: "🌱",
    start: "03-15",
    end: "04-30",
    colour: "#25b47e",
    dark: "#16805a",
    art: [["🌱", "Sprout"], ["🌷", "Tulip"], ["🐣", "Chick"], ["🐝", "Bee"], ["🌈", "Rainbow"], ["🦋", "Butterfly"]],
  },
  {
    id: "sun",
    name: "Sun Festival",
    emoji: "☀️",
    start: "07-01",
    end: "08-31",
    colour: "#f0bd2a",
    dark: "#b88905",
    art: [["☀️", "Sunshine"], ["🍉", "Watermelon"], ["🐚", "Seashell"], ["🪁", "Kite"], ["🐢", "Turtle"], ["🌻", "Sunflower"]],
  },
];

/** Answers needed for the second sticker. Little kids answer fewer questions a day. */
const answersGoal = (band: AgeBand) => (band === "little" ? 30 : 50);

/** The same six goals for every festival; only the pictures change. The last needs all the others. */
const GOALS: Omit<SeasonStickerDef, "emoji" | "name">[] = [
  { id: "first", hint: () => "Practise on a festival day", earned: (s) => s.days >= 1 },
  { id: "answers", hint: (b) => `Answer ${answersGoal(b)} questions in the festival`, earned: (s, b) => s.answers >= answersGoal(b) },
  { id: "days-3", hint: () => "Practise on 3 festival days", earned: (s) => s.days >= 3 },
  { id: "flawless", hint: () => "Finish a flawless lesson in the festival", earned: (s) => s.perfect >= 1 },
  { id: "subjects", hint: () => "Answer in 3 different subjects", earned: (s) => s.subjects >= 3 },
  { id: "days-6", hint: () => "Practise on 6 festival days", earned: (s) => s.days >= 6 },
];

export const SEASON_STICKERS = GOALS.length;

/** Coins for filling a festival's page, claimed like a quest (`seasonQuestId`). */
export const SEASON_REWARD = 50;

/** One festival in one year, for example the Leaf Festival of 2026 (`leaf-2026`). */
export interface SeasonRun {
  season: Season;
  /** The year the festival starts in. */
  year: number;
  key: string;
  /** First and last day keys ("2026-10-01"). */
  from: string;
  to: string;
}

function runOf(season: Season, year: number): SeasonRun {
  const endYear = season.end < season.start ? year + 1 : year;
  return { season, year, key: `${season.id}-${year}`, from: `${year}-${season.start}`, to: `${endYear}-${season.end}` };
}

/** The festival on a day ("2026-10-24"), if there is one. */
export function seasonOn(day: string): SeasonRun | null {
  const year = Number(day.slice(0, 4));
  for (const season of SEASONS) {
    for (const y of [year, year - 1]) {
      const run = runOf(season, y);
      if (day >= run.from && day <= run.to) return run;
    }
  }
  return null;
}

/** A festival by its key ("snow-2026"). */
export function seasonRun(key: string): SeasonRun | null {
  const [id, year] = key.split("-");
  const season = SEASONS.find((s) => s.id === id);
  return season && /^\d{4}$/.test(year ?? "") ? runOf(season, Number(year)) : null;
}

/** Whole days left in a festival, counting today. */
export function daysLeft(run: SeasonRun, today: string): number {
  const n = (k: string) => Math.round(new Date(`${k}T12:00:00`).getTime() / 86_400_000);
  return Math.max(0, n(run.to) - n(today) + 1);
}

const practised = (d: DayStat) => d.sessions > 0 || d.stories > 0 || d.answers >= 5;

function statsFor(run: SeasonRun, d: Derived): SeasonStats {
  const s: SeasonStats = { days: 0, answers: 0, perfect: 0, sessions: 0, stories: 0, subjects: 0 };
  const bySubject: Partial<Record<SubjectId, number>> = {};
  for (const day of Object.values(d.days)) {
    if (day.day < run.from || day.day > run.to) continue;
    if (practised(day)) s.days++;
    s.answers += day.answers;
    s.perfect += day.perfect;
    s.sessions += day.sessions;
    s.stories += day.stories;
    for (const [k, v] of Object.entries(day.subjects)) bySubject[k as SubjectId] = (bySubject[k as SubjectId] ?? 0) + (v ?? 0);
  }
  s.subjects = Object.values(bySubject).filter((v) => (v ?? 0) >= 3).length;
  return s;
}

/** A festival's six stickers. The last one shines once the whole page is full. */
export function seasonStickers(run: SeasonRun, d: Derived, band: AgeBand): Sticker[] {
  const stats = statsFor(run, d);
  const list = GOALS.map((g, i) => ({
    id: `${run.key}:${g.id}`,
    name: run.season.art[i][1],
    emoji: run.season.art[i][0],
    earned: g.earned(stats, band),
    hint: g.hint(band),
  }));
  const full = list.every((s) => s.earned);
  return list.map((s, i) => (i === list.length - 1 && full ? { ...s, shiny: true } : s));
}

/** The quest id a filled festival page is claimed under (its day is the festival's first day). */
export const seasonQuestId = (run: SeasonRun) => `s-${run.season.id}`;

/** Festivals whose page was filled, by key, read from the claimed quests. */
export function seasonsFilled(d: Derived): string[] {
  const keys: string[] = [];
  for (const [day, ids] of Object.entries(d.questsClaimed)) {
    for (const id of ids) {
      if (!id.startsWith("s-")) continue;
      const run = seasonOn(day);
      if (run && seasonQuestId(run) === id && run.from === day) keys.push(run.key);
    }
  }
  return keys;
}

/**
 * The festivals that get a page in the sticker book: the one on today, plus earlier ones where the
 * child found at least one sticker (newest first).
 */
export function seasonPages(d: Derived, band: AgeBand, today: string): { run: SeasonRun; stickers: Sticker[]; live: boolean }[] {
  const now = seasonOn(today);
  const runs = new Map<string, SeasonRun>();
  if (now) runs.set(now.key, now);
  for (const k of Object.keys(d.days)) {
    const run = seasonOn(k);
    if (run && run.to < today) runs.set(run.key, run);
  }
  return [...runs.values()]
    .sort((a, b) => (a.from < b.from ? 1 : -1))
    .map((run) => ({ run, stickers: seasonStickers(run, d, band), live: run.key === now?.key }))
    .filter((p) => p.live || p.stickers.some((s) => s.earned));
}
