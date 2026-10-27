import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Georgia's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Georgia's alone.

/** Every Georgia unit with its course. */
const georgia = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ga"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Georgia", () => {
  it("teaches Georgia studies in its own units", () => {
    const own = georgia.filter(({ u }) => u.id.startsWith("ga-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ga-k-my-state", "ga-g2-creek-cherokee", "ga-g8-first-peoples-colony", "ga-g8-governing-georgia", "ga-g9-georgia-local-government", "ga-g3-georgia-habitats"]),
    );
  });

  it("teaches Georgia Studies in 8th grade, world regions in 6th and 7th, and civics in 9th", () => {
    const social = (grade: string) => georgia.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("8").filter((id) => id.startsWith("ga-g8-")).length).toBeGreaterThanOrEqual(8);
    expect(social("6")).toEqual(expect.arrayContaining(["ga-g6-latin-america", "ga-g6-europe", "ga-g6-australia"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ga-g7-africa", "ga-g7-southwest-asia", "ga-g7-southern-eastern-asia"]));
    expect(social("9")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "ga-g9-congress-president", "ga-g9-money-basics"]));
  });
});
