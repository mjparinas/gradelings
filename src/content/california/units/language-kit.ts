import { sample, textChoice } from "../../random";
import type { GenerateOptions, Question, Unit, Visual } from "../../types";
import { cal } from "../cite";

// Helpers for California's own English language arts units: reading questions about short original passages,
// stories and pictures. Each item is a passage (or picture, or nothing), a question, the right answer, the wrong
// answers, a hint and `true` for a stretch item. Easy sets use only the core items; harder sets mix in the stretch
// items, as `bankUnit` does. Every passage, poem and script line is original.

/** A short story shown one sentence per line (best for Kindergarten to Grade 2). */
export const story = (...lines: string[]): Visual => ({ type: "story", lines });

/** A titled reading passage, one string per paragraph. */
export const passage = (title: string, ...paragraphs: string[]): Visual => ({
  type: "passage",
  title,
  paragraphs,
});

/** A row of pictures, such as two of the same thing. */
export const row = (...items: string[]): Visual => ({ type: "emojiRow", items });

/** A picture to talk about, with an optional caption. */
export const pic = (emoji: string, caption?: string): Visual => ({
  type: "emoji",
  emoji,
  caption,
});

/** visual (or null), prompt, right answer, wrong answers, hint, and `true` for a stretch item. */
export type R = readonly [
  visual: Visual | null,
  prompt: string,
  right: string,
  wrong: string[],
  hint: string,
  hard?: true,
];

interface Spec {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** California codes ("RL.4.1; RI.4.3"), then a short plain description. */
  standards: readonly [codes: string, text: string];
  items: R[];
  /** Questions per set (8 by convention). */
  size?: number;
}

const toQuestion = ([visual, prompt, right, wrong, hint]: R): Question =>
  textChoice(prompt, right, wrong, hint, visual ?? undefined);

/** A reading unit from hand-written items about passages, stories and pictures. */
export function readingUnit(spec: Spec): Unit {
  const easy = spec.items.filter((q) => !q[5]);
  const hard = spec.items.filter((q) => q[5]);
  const size = spec.size ?? 8;
  return {
    id: spec.id,
    title: spec.title,
    emoji: spec.emoji,
    blurb: spec.blurb,
    parentNote: spec.parentNote,
    standards: cal(spec.standards[0], spec.standards[1]),
    generate: (opts?: GenerateOptions): Question[] => {
      const d = opts?.difficulty ?? 2;
      const want = d === 1 ? 0 : d === 2 ? Math.ceil(size / 3) : Math.ceil((size * 2) / 3);
      const nHard = Math.min(want, hard.length);
      return [...sample(easy, size - nHard), ...sample(hard, nHard)].map(toQuestion);
    },
  };
}
