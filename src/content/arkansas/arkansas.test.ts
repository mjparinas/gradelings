import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Arkansas's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Arkansas's alone.

/** Every Arkansas unit with its course. */
const arkansas = COURSES.flatMap((c) => c.units.filter((u) => u.standards["us-ar"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

describe("Arkansas", () => {
  it("teaches Arkansas in elementary social studies and Arkansas History in Grades 7 and 8 with units written for Arkansas", () => {
    for (const grade of ["k", "1", "2", "3", "4", "7", "8", "9"]) {
      const own = arkansas.filter(({ c, u }) => c.grade === grade && c.subject === "social" && u.id.startsWith("ar-"));
      expect(own.length, grade).toBeGreaterThanOrEqual(1);
    }
  });

});
