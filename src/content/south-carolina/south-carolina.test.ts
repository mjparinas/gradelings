import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// South Carolina's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is South Carolina's alone.

/** Every South Carolina unit with its course. */
const southCarolina = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-sc"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof southCarolina)[number]["u"]) =>
  [u.title, u.blurb, u.id.startsWith("sc-") ? (u.parentNote ?? "") : "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("South Carolina", () => {
  it("is a US framework in US English, offered to families", () => {
    const sc = getFramework("south-carolina");
    expect(sc.id).toBe("us-sc");
    expect(sc.country).toBe("US");
    expect(localeOf(sc)).toBe("en-US");
    expect(sc.subjects).toEqual(["math", "language", "science", "social"]);
    expect(sc.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(sc);
  });

  it("teaches South Carolina's history, land and government with units written for South Carolina", () => {
    // Life in South Carolina (1), US and South Carolina Studies (4 and 5), South Carolina and the United States (8) and
    // South Carolina's government (9); Grades 2 and 3 add American symbols and land, natural hazards and migration.
    for (const grade of ["1", "2", "3", "4", "5", "8", "9"]) {
      const own = southCarolina.filter(({ c, u }) => c.grade === grade && c.subject === "social" && u.id.startsWith("sc-"));
      expect(own.length, grade).toBeGreaterThanOrEqual(1);
    }
    const grade8 = southCarolina.filter(({ c, u }) => c.grade === "8" && c.subject === "social" && u.id.startsWith("sc-"));
    expect(grade8.length).toBeGreaterThanOrEqual(5);
  });

  it("never shows South Carolina families a borrowed unit about another state", () => {
    // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. South
    // Carolina's own units (sc-) may name other states where the history calls for it. United States history (Grades 4,
    // 5 and 8) and civics (Grade 9) name states where the history does: the Alamo, buying Alaska, the Montgomery bus
    // boycott and Miranda v. Arizona.
    const usHistory = (grade: string, subject: string) => subject === "social" && ["4", "5", "8", "9"].includes(grade);
    for (const { c, u, key } of southCarolina.filter(({ u }) => !u.id.startsWith("sc-"))) {
      if (usHistory(c.grade, c.subject)) continue;
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} mentions another state`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native
    // Americans" in a general US history unit such as the Columbian Exchange.
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of southCarolina.filter(({ u }) => /^(wa|or|ca|ny|tx|mn|me|ak|al|az|ar|fl|il|co|pa|ga|oh|nj|in)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });
});
