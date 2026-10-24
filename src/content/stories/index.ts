import { localizeText, type Locale } from "../locale";
import { hashSeed, shuffle, withSeed } from "../random";
import type { ChoiceQuestion } from "../types";
import { textReadingLevel } from "@/lib/readingLevel";
import type { Story, StoryTier } from "./types";

export type { Story, StoryPage, StoryQuiz, StoryTier } from "./types";

// Helpers for the Story Library. The stories themselves are in ./library.ts, a separate download
// (`loadStories`), so the kids' app doesn't carry them until a child opens the library.

/** The reading levels (grade scale) a tier's stories must read at, worked out from their text. */
export const TIER_LEVELS: Record<StoryTier, [number, number]> = {
  k1: [0, 1.5],
  "23": [0.5, 4],
  "45": [3.5, 6.5],
  "67": [4.5, 8],
  "89": [7, 10.5],
};

export const TIERS: StoryTier[] = ["k1", "23", "45", "67", "89"];

/** Stories in each tier anyone can read on the free plan: the first ones listed. */
export const FREE_STORIES_PER_TIER = 2;

export function storyText(story: Story): string {
  return story.pages.map((p) => p.text).join(" ");
}

const levels = new WeakMap<Story, number>();

/** The story's reading level on the grade scale (Flesch-Kincaid, like every passage), from its text. */
export function storyLevel(story: Story): number {
  let level = levels.get(story);
  if (level === undefined) {
    level = textReadingLevel(storyText(story)) ?? 0;
    levels.set(story, level);
  }
  return level;
}

/** Open on the free plan: the first few stories of each tier, in the order the library lists them. */
export function isFreeStory(story: Story, all: readonly Story[]): boolean {
  return all.filter((s) => s.tier === story.tier).indexOf(story) < FREE_STORIES_PER_TIER;
}

const localized: Record<Locale, WeakMap<Story, Story>> = { "en-CA": new WeakMap(), "en-US": new WeakMap() };

/** A story in a child's English: US spelling for a US child, as written for everyone else. */
export function localizeStory(story: Story, locale: Locale): Story {
  if (locale === "en-CA") return story;
  const hit = localized[locale].get(story);
  if (hit) return hit;
  const t = (s: string) => localizeText(s, locale);
  const out: Story = {
    ...story,
    title: t(story.title),
    pages: story.pages.map((p) => ({ ...p, text: t(p.text) })),
    quiz: story.quiz.map((q) => ({ ...q, q: t(q.q), a: t(q.a), wrong: q.wrong.map(t) })),
  };
  localized[locale].set(story, out);
  return out;
}

/**
 * Splits a page into sentences for read-along highlighting. A quotation that ends in "!" or "?" and goes on with a
 * small letter ("Hi!" she said.) stays one sentence.
 */
export function splitSentences(text: string): string[] {
  const parts = text.match(/[^.!?…]+(?:[.!?…]+["”’)]*|$)\s*/g) ?? [text];
  const out: string[] = [];
  for (const part of parts) {
    if (!part.trim()) continue;
    if (out.length && /^\s*[a-z]/.test(part)) out[out.length - 1] += part;
    else out.push(part);
  }
  return out.map((s) => s.trim());
}

/** The questions after a story, as ordinary choice questions with their choices in a fixed shuffled order. */
export function storyQuestions(story: Story): ChoiceQuestion[] {
  return story.quiz.map((item, i) =>
    withSeed(hashSeed(`${story.id}:${i}`), () => {
      const choices = shuffle([item.a, ...item.wrong].map((label, n) => ({ id: `c${n}`, label })));
      const page = story.pages[item.page - 1];
      return { kind: "choice", prompt: item.q, hint: `Page ${item.page} says: ${page?.text ?? ""}`, answer: "c0", choices };
    }),
  );
}

/** Downloads the library. Its own file, cached by the service worker once loaded. */
export async function loadStories(): Promise<Story[]> {
  return (await import("./library")).STORIES;
}
