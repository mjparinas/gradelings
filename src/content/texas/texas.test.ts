import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";

// Texas's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Texas's alone.

/** Every Texas unit with its course. */
const texas = COURSES.flatMap((c) => c.units.filter((u) => u.standards["us-tx"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));

/**
 * Every line a unit shows: title, blurb, parent note and a spread of its questions. A shared unit here carries the
 * first framework's parent note (California's, for a unit California also uses), so only Texas's own notes are checked.
 */
const linesOf = (u: (typeof texas)[number]["u"]) =>
  [u.title, u.blurb, u.id.startsWith("tx-") ? (u.parentNote ?? "") : "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Texas", () => {
  it("teaches Texas history in Grades 4 and 7 with units written for Texas", () => {
    for (const grade of ["4", "7"]) {
      const own = texas.filter(({ c, u }) => c.grade === grade && c.subject === "social" && u.id.startsWith("tx-"));
      expect(own.length, grade).toBeGreaterThanOrEqual(5);
    }
  });

  it("never shows Texas families a unit about Washington State, Oregon or California", () => {
    // George and Martha Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history, and
    // US history and civics (Grades 5, 8 and 9) may name California as a state. A 50 states unit names every state.
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    const other = /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)/;
    const california = /California(?! Gold Rush)/;
    for (const { c, u, key } of texas.filter(({ u }) => !ALL_STATES.has(u.id))) {
      const usHistory = c.subject === "social" && ["5", "8", "9"].includes(c.grade);
      const hit = linesOf(u).find((line) => {
        const text = line.replace(/(George|Martha) Washington|Washington-on-the-Brazos/g, "");
        return other.test(text) || (!usHistory && california.test(text));
      });
      expect(hit ?? "", `${key} mentions another state`).toBe("");
    }
  });

});
