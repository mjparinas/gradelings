import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Alabama's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Alabama's alone.

/** Every Alabama unit with its course. */
const alabama = COURSES.flatMap((c) => c.units.filter((u) => u.standards["us-al"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

describe("Alabama", () => {
  it("teaches Alabama history in Grades 3 to 5 with units written for Alabama", () => {
    for (const grade of ["3", "4", "5"]) {
      const own = alabama.filter(({ c, u }) => c.grade === grade && c.subject === "social" && u.id.startsWith("al-"));
      expect(own.length, grade).toBeGreaterThanOrEqual(5);
    }
  });

});
