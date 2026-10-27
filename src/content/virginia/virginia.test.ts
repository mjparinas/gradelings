import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Virginia's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Virginia's alone.

/** Every Virginia unit with its course. */
const virginia = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-va"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Virginia", () => {
  it("teaches Virginia's own units", () => {
    const own = virginia.filter(({ u }) => u.id.startsWith("va-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["va-k-virginia-symbols", "va-g1-virginia-history", "va-g2-first-peoples", "va-g3-mali", "va-g7-governing-virginia", "va-g4-virginia-resources", "va-g6-watersheds"]),
    );
  });

  it("teaches Virginia Studies in 4th grade, US history in 5th and 6th, civics in 7th, world geography in 8th and world history in 9th", () => {
    const social = (grade: string) => virginia.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("va-g4-")).length).toBeGreaterThanOrEqual(10);
    expect(social("5")).toEqual(expect.arrayContaining(["ca-g5-thirteen-colonies", "ca-g8-civil-war"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ny-g8-world-war-ii", "ny-g8-civil-rights"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "va-g7-governing-virginia", "va-g7-local-government"]));
    expect(social("8")).toEqual(expect.arrayContaining(["va-g8-united-states", "va-g8-world-regions"]));
    expect(social("9")).toEqual(expect.arrayContaining(["first-farmers", "ca-g7-renaissance-cities"]));
  });
});
