import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// South Carolina's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is South Carolina's alone.

/** Every South Carolina unit with its course. */
const southCarolina = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-sc"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("South Carolina", () => {
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

});
