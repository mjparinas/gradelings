import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Alabama's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Alabama's alone.

/** Every Alabama unit with its course. */
const alabama = COURSES.flatMap((c) => c.units.filter((u) => u.standards["us-al"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof alabama)[number]["u"]) =>
  [u.title, u.blurb, u.id.startsWith("al-") ? (u.parentNote ?? "") : "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Alabama", () => {
  it("is a US framework in US English, offered to families", () => {
    const al = getFramework("alabama");
    expect(al.id).toBe("us-al");
    expect(al.country).toBe("US");
    expect(localeOf(al)).toBe("en-US");
    expect(al.subjects).toEqual(["math", "language", "science", "social"]);
    expect(al.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(al);
  });

  it("teaches Alabama history in Grades 3 to 5 with units written for Alabama", () => {
    for (const grade of ["3", "4", "5"]) {
      const own = alabama.filter(({ c, u }) => c.grade === grade && c.subject === "social" && u.id.startsWith("al-"));
      expect(own.length, grade).toBeGreaterThanOrEqual(5);
    }
  });

  it("never shows Alabama families a borrowed unit about another state", () => {
    // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. Alabama's own
    // units (al-) may name other states where the history calls for it; the 50 states and capitals unit names them all.
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    for (const { u, key } of alabama.filter(({ u }) => !u.id.startsWith("al-") && !ALL_STATES.has(u.id))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} mentions another state`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native
    // Americans" in a general US history unit such as the Columbian Exchange.
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of alabama.filter(({ u }) => /^(wa|or|ca|ny|tx)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });
});
