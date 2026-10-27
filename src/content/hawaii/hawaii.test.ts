import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";

// Hawaiʻi's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Hawaiʻi's alone.

/** Every Hawaiʻi unit with its course. */
const hawaii = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-hi"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof hawaii)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Hawaiʻi", () => {
  it("teaches Hawaiʻi studies in its own units", () => {
    const own = hawaii.filter(({ u }) => u.id.startsWith("hi-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "hi-k-island-home",
        "hi-g1-island-community",
        "hi-g3-coming-to-hawaii",
        "hi-g4-voyaging",
        "hi-g4-ahupuaa",
        "hi-g7-overthrow",
        "hi-g7-pacific-peoples",
        "hi-g9-annexation",
        "hi-g9-modern-hawaii",
      ]),
    );
  });

  it("teaches Hawaiʻi studies in 4th and 7th grade and modern Hawaiʻi in 9th", () => {
    const social = (grade: string) => hawaii.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toContain("hi-g3-coming-to-hawaii");
    expect(social("4").filter((id) => id.startsWith("hi-")).length).toBeGreaterThanOrEqual(6);
    expect(social("7").filter((id) => id.startsWith("hi-")).length).toBeGreaterThanOrEqual(6);
    expect(social("9")).toEqual(expect.arrayContaining(["hi-g9-annexation", "hi-g9-modern-hawaii", "hi-g9-us-government"]));
  });

  it("writes Hawaiian words with the ʻokina, never an apostrophe", () => {
    for (const { u, key } of hawaii.filter(({ u }) => u.id.startsWith("hi-"))) {
      const hit = linesOf(u).find((line) => /Hawai'i|Hawaii\b(?! State)/.test(line));
      expect(hit ?? "", `${key} spells Hawaiʻi without the ʻokina`).toBe("");
    }
  });
});
