import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// New York's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is New York's alone.

/** Every New York unit with its course. */
const newYork = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ny"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof newYork)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("New York", () => {
  it("is a US framework in US English, offered to families", () => {
    const ny = getFramework("new-york");
    expect(ny.id).toBe("us-ny");
    expect(ny.country).toBe("US");
    expect(localeOf(ny)).toBe("en-US");
    expect(ny.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ny.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ny);
  });

  it("never shows New York families a borrowed unit about Washington State, Oregon or California", () => {
    // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. New York's own
    // units (ny-) may name other states where the history calls for it; the 50 states and capitals unit names them all.
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    for (const { u, key } of newYork.filter(({ u }) => !u.id.startsWith("ny-") && !ALL_STATES.has(u.id))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} mentions Washington State, Oregon or California`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    const words = /\b(Tribes?|Tribal|treaty|treaties|California Indian)\b|\bNative\b/;
    for (const { u, key } of newYork.filter(({ u }) => /^(wa|or|ca)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });
});
