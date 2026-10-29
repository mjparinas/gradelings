import { gradeNumber } from "@/content/subjects";
import { storyLevel, type Story } from "@/content/stories";
import type { GradeId } from "@/content/types";
import type { Derived } from "./derive";
import type { ChildSettings } from "./model";
import { estimateReadingLevel } from "./readingLevel";

// Which stories suit a child. The library groups them around the child's reading level (estimated from their
// passage and story answers, see readingLevel.ts), or around their grade until there are enough answers.


/** How far either side of the child's level a story still counts as "just right". */
export const JUST_RIGHT_SPAN = 1.2;
/** The "just right" shelf always offers at least this many stories, taking the nearest ones when few are in the span. */
export const MIN_JUST_RIGHT = 4;

/** The reading level stories are chosen around: the child's estimate when matching is on and known, else their grade. */
export function storyTarget(d: Pick<Derived, "reading">, grade: GradeId, matchLevel: boolean): number {
  return (matchLevel ? estimateReadingLevel(d.reading, grade) : undefined) ?? gradeNumber(grade);
}

export interface Shelves {
  justRight: Story[];
  /** Easier stories, nearest first. */
  easier: Story[];
  /** Harder stories, nearest first. */
  harder: Story[];
}

/** Sorts the library into three shelves around a target level. Every story lands on exactly one shelf. */
export function shelves(stories: readonly Story[], target: number): Shelves {
  const gap = (s: Story) => Math.abs(storyLevel(s) - target);
  const byGap = [...stories].sort((a, b) => gap(a) - gap(b) || storyLevel(a) - storyLevel(b));
  const inSpan = byGap.filter((s) => gap(s) <= JUST_RIGHT_SPAN);
  const justRight = (inSpan.length >= MIN_JUST_RIGHT ? inSpan : byGap.slice(0, MIN_JUST_RIGHT)).sort((a, b) => storyLevel(a) - storyLevel(b));
  const rest = byGap.filter((s) => !justRight.includes(s));
  return {
    justRight,
    easier: rest.filter((s) => storyLevel(s) < target).sort((a, b) => storyLevel(b) - storyLevel(a)),
    harder: rest.filter((s) => storyLevel(s) >= target).sort((a, b) => storyLevel(a) - storyLevel(b)),
  };
}

/** Learning time a finished story counts: its reading time, capped at a minute a page and a minute a question. */
export function storyLearnSeconds(ms: number, pages: number, questions: number): number {
  return Math.min(ms, (pages + questions) * 60_000) / 1000;
}

/** Whether a child gets the Story Library (and its quests): the flag is on and language arts is one of their subjects. */
export function storiesFor(settings: Pick<ChildSettings, "enabledSubjects"> | undefined, flagOn: boolean): boolean {
  return flagOn && (settings?.enabledSubjects ?? ["language"]).includes("language");
}
