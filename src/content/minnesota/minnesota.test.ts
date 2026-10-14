import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Minnesota's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Minnesota's alone.

/** Every Minnesota unit with its course. */
const minnesota = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-mn"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof minnesota)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Minnesota", () => {
  it("is a US framework in US English, offered to families", () => {
    const mn = getFramework("minnesota");
    expect(mn.id).toBe("us-mn");
    expect(mn.country).toBe("US");
    expect(localeOf(mn)).toBe("en-US");
    expect(mn.subjects).toEqual(["math", "language", "science", "social"]);
    expect(mn.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(mn);
  });

  it("never shows Minnesota families a borrowed unit about Washington State, Oregon, California or New York", () => {
    // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. Minnesota's own
    // units (mn-) may name other states where the history calls for it; the 50 states and capitals unit names them all.
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    for (const { u, key } of minnesota.filter(({ u }) => !u.id.startsWith("mn-") && !ALL_STATES.has(u.id))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} mentions Washington State, Oregon, California or New York`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    const words = /\b(Tribes?|Tribal|treaty|treaties|California Indian)\b|\bNative\b/;
    for (const { u, key } of minnesota.filter(({ u }) => /^(wa|or|ca|ny)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });
});
