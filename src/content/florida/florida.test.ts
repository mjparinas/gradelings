import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Florida's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Florida's alone.

/** Every Florida unit with its course. */
const florida = COURSES.flatMap((c) => c.units.filter((u) => u.standards["us-fl"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof florida)[number]["u"]) =>
  [u.title, u.blurb, u.id.startsWith("fl-") ? (u.parentNote ?? "") : "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Florida", () => {
  it("is a US framework in US English, offered to families", () => {
    const fl = getFramework("florida");
    expect(fl.id).toBe("us-fl");
    expect(fl.country).toBe("US");
    expect(localeOf(fl)).toBe("en-US");
    expect(fl.subjects).toEqual(["math", "language", "science", "social"]);
    expect(fl.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(fl);
    expect(UPCOMING_FRAMEWORKS).not.toContain(fl);
  });

  it("teaches Florida history in Grade 4 and civics in Grade 7 with units written for Florida", () => {
    for (const grade of ["4", "7"]) {
      const own = florida.filter(({ c, u }) => c.grade === grade && c.subject === "social" && u.id.startsWith("fl-"));
      expect(own.length, grade).toBeGreaterThanOrEqual(2);
    }
  });

  it("never shows Florida families a borrowed unit about another state", () => {
    // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. Florida's own
    // units (fl-) may name other states where the history calls for it; the 50 states and capitals unit names them all.
    // United States history (Grades 5 and 8) and civics (Grade 7) name states where the history does.
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    const usHistory = (grade: string, subject: string) => subject === "social" && ["5", "7", "8", "9"].includes(grade);
    for (const { c, u, key } of florida.filter(({ u }) => !u.id.startsWith("fl-") && !ALL_STATES.has(u.id))) {
      if (usHistory(c.grade, c.subject)) continue;
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} mentions another state`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native
    // Americans" in a general US history unit such as the Columbian Exchange.
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of florida.filter(({ u }) => /^(wa|or|ca|ny|tx|mn|me|ak|al|az|ar|pa)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });
});
