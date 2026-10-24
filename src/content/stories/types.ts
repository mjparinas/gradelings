// Read-along stories: short, original picture stories for the Story Library (`src/components/play/Stories.tsx`).
// Each story's reading level is worked out from its text (`storyLevel` in ./index.ts), never typed by hand.

/** The grades a story is written for. Its computed reading level must fall in the tier's range (stories.test.ts). */
export type StoryTier = "k1" | "23" | "45" | "67" | "89";

/** A mood for a critter drawn on a page (the same moods as `Critter`). */
export type StoryMood = "happy" | "cheer" | "think" | "oops" | "wave" | "sleepy";

export interface StoryPage {
  /** What the page says, in Canadian English (US children see it through the locale layer). */
  text: string;
  /** A few emoji that set the scene. */
  art: string;
  /** A critter from the cast who appears on this page. */
  critter?: { id: string; mood?: StoryMood };
}

/** One question after the story. The right answer is `a`; `page` (from 1) is where the story answers it. */
export interface StoryQuiz {
  q: string;
  a: string;
  wrong: string[];
  page: number;
}

export interface Story {
  id: string;
  title: string;
  /** Cover emoji. */
  cover: string;
  tier: StoryTier;
  pages: StoryPage[];
  quiz: StoryQuiz[];
}
