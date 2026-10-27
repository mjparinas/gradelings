import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Massachusetts's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Massachusetts's alone.

/** Every Massachusetts unit with its course. */
const massachusetts = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ma"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Massachusetts", () => {
  it("teaches Massachusetts studies in its own units", () => {
    const own = massachusetts.filter(({ u }) => u.id.startsWith("ma-g"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ma-gk-my-state", "ma-g3-plymouth", "ma-g3-massachusetts-bay", "ma-g3-revolution", "ma-g8-governing-massachusetts", "ma-g9-massachusetts-history"]),
    );
  });

  it("teaches Massachusetts and New England in 3rd grade, civics in 8th and United States History I in 9th", () => {
    const social = (grade: string) => massachusetts.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("ma-g")).length).toBeGreaterThanOrEqual(5);
    expect(social("4")).toEqual(expect.arrayContaining(["ma-g4-us-regions", "ma-g4-first-peoples"]));
    expect(social("6")).toEqual(expect.arrayContaining(["wa-g6-mesopotamia-egypt", "ma-g6-central-america-caribbean"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ca-g6-ancient-india", "wa-g6-greece-rome", "ma-g7-asia-geography"]));
    expect(social("8")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "ma-g8-two-constitutions", "ma-g8-governing-massachusetts"]));
    expect(social("9")).toEqual(expect.arrayContaining(["wa-g5-road-to-revolution", "ca-g8-civil-war", "ma-g9-massachusetts-history"]));
  });
});
