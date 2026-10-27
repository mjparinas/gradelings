import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Florida's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Florida's alone.

/** Every Florida unit with its course. */
const florida = COURSES.flatMap((c) => c.units.filter((u) => u.standards["us-fl"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

describe("Florida", () => {
  it("teaches Florida history in Grade 4 and civics in Grade 7 with units written for Florida", () => {
    for (const grade of ["4", "7"]) {
      const own = florida.filter(({ c, u }) => c.grade === grade && c.subject === "social" && u.id.startsWith("fl-"));
      expect(own.length, grade).toBeGreaterThanOrEqual(2);
    }
  });

});
