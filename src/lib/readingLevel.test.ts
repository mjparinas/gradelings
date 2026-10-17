import { beforeAll, describe, expect, it } from "vitest";
import { allUnitRefs, loadGrade } from "@/content";
import { withSeed } from "@/content/random";
import type { ChoiceQuestion, Question } from "@/content/types";
import { generateFor } from "@/components/play/plans";
import { derive } from "./derive";
import type { AppEvent } from "./model";
import {
  closestSet,
  estimateReadingLevel,
  MAX_READING_LEVEL,
  MIN_READING_SAMPLES,
  questionReadingLevel,
  readingLevelNote,
  setReadingLevel,
  textReadingLevel,
  type ReadingSample,
} from "./readingLevel";

const EASY = "The cat sat on the mat. The dog ran to the log. We had fun in the sun. It was a big red hat.";
const HARD =
  "Photosynthesis transforms atmospheric carbon dioxide into carbohydrates, while chlorophyll absorbs electromagnetic radiation throughout the afternoon.";

const q = (visual: ChoiceQuestion["visual"], extra: Partial<ChoiceQuestion> = {}): ChoiceQuestion => ({
  kind: "choice",
  prompt: "What happened?",
  hint: "Reread.",
  choices: [{ id: "a", label: "A" }, { id: "b", label: "B" }],
  answer: "a",
  visual,
  ...extra,
});

describe("textReadingLevel", () => {
  it("rates short simple text low and dense text high", () => {
    const easy = textReadingLevel(EASY)!;
    const hard = textReadingLevel(HARD)!;
    expect(easy).toBeLessThan(2);
    expect(hard).toBeGreaterThan(10);
    expect(hard).toBeLessThanOrEqual(MAX_READING_LEVEL);
    expect(easy).toBeGreaterThanOrEqual(0);
  });

  it("gives no level to text too short to judge", () => {
    expect(textReadingLevel("Hi there.")).toBeUndefined();
    expect(textReadingLevel("")).toBeUndefined();
  });
});

describe("questionReadingLevel", () => {
  it("reads passages and stories, and nothing else", () => {
    expect(questionReadingLevel(q({ type: "passage", paragraphs: [EASY] }))).toBeLessThan(2);
    expect(questionReadingLevel(q({ type: "story", lines: EASY.split(". ") }))).toBeDefined();
    expect(questionReadingLevel(q({ type: "equation", text: "2 + 2" }))).toBeUndefined();
    expect(questionReadingLevel(q(undefined))).toBeUndefined();
  });

  it("leaves French passages out", () => {
    expect(questionReadingLevel(q({ type: "passage", paragraphs: [EASY] }, { lang: "fr" }))).toBeUndefined();
    expect(questionReadingLevel(q({ type: "passage", paragraphs: [EASY] }, { visualLang: "fr" }))).toBeUndefined();
  });
});

describe("estimateReadingLevel", () => {
  const run = (n: number, rl: number, ok: boolean): ReadingSample[] => Array.from({ length: n }, () => ({ rl, ok }));

  it("waits for enough answers", () => {
    expect(estimateReadingLevel(run(MIN_READING_SAMPLES - 1, 4, true), "4")).toBeUndefined();
    expect(estimateReadingLevel(run(MIN_READING_SAMPLES, 4, true), "4")).toBeDefined();
  });

  it("moves up when harder passages are read well", () => {
    expect(estimateReadingLevel(run(20, 7, true), "4")!).toBeGreaterThan(6);
  });

  it("moves down when easier passages are missed", () => {
    expect(estimateReadingLevel(run(20, 2, false), "4")!).toBeLessThan(3);
  });

  it("stays near the grade when answers are right about three times in four", () => {
    const mixed = Array.from({ length: 24 }, (_, i) => ({ rl: 4, ok: i % 4 !== 0 }));
    const level = estimateReadingLevel(mixed, "4")!;
    expect(level).toBeGreaterThan(3.3);
    expect(level).toBeLessThan(4.8);
  });

  it("stays on the scale", () => {
    expect(estimateReadingLevel(run(200, 12, true), "9")!).toBeLessThanOrEqual(MAX_READING_LEVEL);
    expect(estimateReadingLevel(run(200, 0, false), "k")!).toBeGreaterThanOrEqual(0);
  });

  it("describes the gap to the grade", () => {
    expect(readingLevelNote(6.2, "4")).toBe("above");
    expect(readingLevelNote(4.5, "4")).toBe("at");
    expect(readingLevelNote(2.5, "4")).toBe("below");
    expect(readingLevelNote(0.2, "k")).toBe("at");
  });
});

describe("closestSet", () => {
  const easy: Question[] = [q({ type: "passage", paragraphs: [EASY] })];
  const hard: Question[] = [q({ type: "passage", paragraphs: [HARD] })];
  const none: Question[] = [q(undefined)];

  it("picks the set whose passage is nearest the target", () => {
    expect(closestSet([easy, hard], 1)).toBe(easy);
    expect(closestSet([easy, hard], 11)).toBe(hard);
  });

  it("keeps the first set when none has a passage, and skips sets without one", () => {
    expect(closestSet([none, none], 5)).toBeDefined();
    expect(closestSet([none, hard], 1)).toBe(hard);
    expect(setReadingLevel(none)).toBeUndefined();
  });
});

describe("derive", () => {
  it("collects passage samples from answers that carry a level", () => {
    const ev = (id: string, rl?: number, correct = true): AppEvent => ({
      id,
      profileId: "p",
      t: Number(id.slice(1)),
      type: "answer",
      unit: "4/language/main-idea",
      correct,
      attempts: 1,
      revealed: false,
      ms: 1000,
      mode: "practice",
      ...(rl === undefined ? {} : { rl }),
    });
    const d = derive([ev("e1", 4.5), ev("e2"), ev("e3", 6, false)]);
    expect(d.reading).toEqual([
      { rl: 4.5, ok: true },
      { rl: 6, ok: false },
    ]);
  });
});

describe("language arts content", () => {
  beforeAll(async () => {
    await Promise.all(["1", "4", "7", "9"].map((g) => loadGrade(g as "1")));
  });

  const levels = (grade: "1" | "4" | "7" | "9") => {
    const out: number[] = [];
    for (const r of allUnitRefs(grade, "ca-bc").filter((x) => x.course.subject === "language")) {
      const l = setReadingLevel(withSeed(7, () => r.unit.generate({ difficulty: 2 })));
      if (l !== undefined) out.push(l);
    }
    return out.sort((a, b) => a - b);
  };
  const median = (xs: number[]) => xs[Math.floor(xs.length / 2)];

  it("tags passages in every grade, and later grades read harder", () => {
    for (const g of ["1", "4", "7", "9"] as const) {
      const l = levels(g);
      expect(l.length, `grade ${g} has passages`).toBeGreaterThan(0);
      expect(l.every((x) => x >= 0 && x <= MAX_READING_LEVEL)).toBe(true);
    }
    expect(median(levels("9"))).toBeGreaterThan(median(levels("4")));
    expect(median(levels("4"))).toBeGreaterThan(median(levels("1")));
  });

  it("offers an easier or harder set of the same unit by reading level", () => {
    const ref = allUnitRefs("7", "ca-bc")
      .filter((r) => r.course.subject === "language")
      .find((r) => {
        const ls = ([1, 2, 3] as const).map((d) => setReadingLevel(withSeed(d, () => r.unit.generate({ difficulty: d }))));
        return ls.every((x) => x !== undefined) && new Set(ls).size > 1;
      });
    expect(ref).toBeDefined();
    const at = (target: number) => setReadingLevel(withSeed(3, () => generateFor(ref!, 2, target)))!;
    expect(at(0)).toBeLessThanOrEqual(at(12));
  });
});
