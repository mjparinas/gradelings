import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Utah's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Utah's alone.

/** Every Utah unit with its course. */
const utah = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ut"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof utah)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Utah", () => {
  it("teaches Utah studies in its own units", () => {
    const own = utah.filter(({ u }) => u.id.startsWith("ut-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ut-g4-utah-land", "ut-g4-first-peoples", "ut-g4-railroad-statehood", "ut-g4-government", "ut-g7-native-peoples", "ut-g7-statehood", "ut-g7-utah-in-world"]),
    );
  });

  it("teaches Utah in 4th grade and Utah Studies in 7th, mostly in Utah's own units", () => {
    const social = (grade: string) => utah.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    for (const grade of ["4", "7"]) {
      const ids = social(grade);
      expect(ids.filter((id) => id.startsWith("ut-")).length, `Grade ${grade}`).toBeGreaterThanOrEqual(6);
      expect(ids.filter((id) => id.startsWith("ut-")).length / ids.length, `Grade ${grade}`).toBeGreaterThan(0.7);
    }
  });

  it("gives its science copies Utah examples in place of another state's", () => {
    const copies = utah.filter(({ c, u }) => c.subject === "science" && u.id.startsWith("ut-"));
    expect(copies.length).toBeGreaterThanOrEqual(15);
    for (const { u, key } of copies) {
      expect(linesOf(u).some((line) => /Utah|Great Salt Lake|Wasatch/.test(line)), `${key} has Utah examples`).toBe(true);
      expect(linesOf(u).find((line) => OTHER_STATE.test(line)) ?? "", `${key} names another state`).toBe("");
    }
  });
});
