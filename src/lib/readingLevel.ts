import type { GradeId, Question } from "@/content/types";

// Reading levels for language-arts passages and the child's own level.
//
// A passage gets a level on the grade scale (about 1.0 reads like an early Grade 1 text) from
// the Flesch-Kincaid formula, so existing content is tagged without being rewritten. A child's
// level is worked out from how they answer passage questions (an Elo-style update on a
// grade-scale ability), and is recomputed from events like everything else, never stored.

export const MAX_READING_LEVEL = 12;

/** Passage-question answers kept for the estimate. */
export const READING_SAMPLES_KEPT = 100;
/** Answers needed before a level is trusted enough to change what a child sees. */
export const MIN_READING_SAMPLES = 8;

export interface ReadingSample {
  /** The passage's reading level when the question was asked. */
  rl: number;
  /** Right on the first try. */
  ok: boolean;
}

function syllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const groups = w
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "")
    .match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups?.length ?? 1);
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const round1 = (n: number) => Math.round(n * 10) / 10;

/** The grade level a text reads at (Flesch-Kincaid), 0 to 12, one decimal. Undefined when there is no text. */
export function textReadingLevel(text: string): number | undefined {
  const words = text.match(/[A-Za-z][A-Za-z'’-]*/g);
  if (!words || words.length < 8) return undefined;
  // A closing quotation mark can follow the full stop: "Hi!" she said.
  const sentences = Math.max(1, (text.match(/[.!?…]+["”’)]*(?:\s|$)/g) ?? []).length);
  const syl = words.reduce((n, w) => n + syllables(w), 0);
  const grade = 0.39 * (words.length / sentences) + 11.8 * (syl / words.length) - 15.59;
  return round1(clamp(grade, 0, MAX_READING_LEVEL));
}

/**
 * The reading level of the text a question asks about, when it has a passage or story to read in
 * English. Other questions (maths, single words, French) have none.
 */
export function questionReadingLevel(q: Question): number | undefined {
  if (q.lang || q.visualLang) return undefined;
  const v = q.visual;
  if (v?.type === "passage") return textReadingLevel(v.paragraphs.join(" ").replace(/\n/g, " "));
  if (v?.type === "story") return textReadingLevel(v.lines.join(" "));
  return undefined;
}

/** The middle reading level of a set of questions, or undefined when none has a passage. */
export function setReadingLevel(qs: Question[]): number | undefined {
  const levels = qs.map(questionReadingLevel).filter((n): n is number => n !== undefined);
  if (!levels.length) return undefined;
  levels.sort((a, b) => a - b);
  return levels[Math.floor(levels.length / 2)];
}

const gradeNumber = (g: GradeId): number => (g === "k" ? 0 : Number(g));

/** Chance of a first-try right answer when the child's level equals the passage's level. */
const AT_LEVEL = 0.75;
const STEP = 0.5;

/**
 * The reading level a child is comfortable at, on the grade scale, or undefined until enough
 * passage answers have been given. Starts at their grade and moves up when they get passages
 * right that are harder than expected, down when they miss easier ones.
 */
export function estimateReadingLevel(samples: ReadingSample[], grade: GradeId): number | undefined {
  if (samples.length < MIN_READING_SAMPLES) return undefined;
  let ability = gradeNumber(grade);
  const offset = Math.log(AT_LEVEL / (1 - AT_LEVEL));
  for (const s of samples) {
    const expected = 1 / (1 + Math.exp(-(ability - s.rl + offset)));
    ability = clamp(ability + STEP * ((s.ok ? 1 : 0) - expected), 0, MAX_READING_LEVEL);
  }
  return round1(ability);
}

/** How far a child's level is from their grade, in plain words for parents. */
export function readingLevelNote(level: number, grade: GradeId): "below" | "at" | "above" {
  const diff = level - gradeNumber(grade);
  return diff <= -1 ? "below" : diff >= 1 ? "above" : "at";
}

/**
 * Of several candidate sets of questions, the one whose passages are closest to `target`. Sets with
 * no passage are ignored; the first set wins ties, and wins outright when none has a passage.
 */
export function closestSet(sets: Question[][], target: number): Question[] {
  let best = sets[0];
  let bestGap = Infinity;
  for (const set of sets) {
    const level = setReadingLevel(set);
    if (level === undefined) continue;
    const gap = Math.abs(level - target);
    if (gap < bestGap - 1e-9) {
      best = set;
      bestGap = gap;
    }
  }
  return best;
}
