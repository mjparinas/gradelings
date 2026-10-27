import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Pennsylvania's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Pennsylvania's alone.

/** Every Pennsylvania unit with its course. */
const pennsylvania = COURSES.flatMap((c) => c.units.filter((u) => u.standards["us-pa"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

describe("Pennsylvania", () => {
  it("teaches Pennsylvania studies in Grade 4 with units written for Pennsylvania", () => {
    const own = pennsylvania.filter(({ c, u }) => c.grade === "4" && c.subject === "social" && u.id.startsWith("pa-"));
    expect(own.length).toBeGreaterThanOrEqual(3);
  });

});
