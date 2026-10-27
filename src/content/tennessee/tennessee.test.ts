import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Tennessee's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Tennessee's alone.

/** Every Tennessee unit with its course. */
const tennessee = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-tn"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Tennessee", () => {
  it("teaches Tennessee studies in its own units", () => {
    const own = tennessee.filter(({ u }) => u.id.startsWith("tn-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["tn-k-flags-and-leaders", "tn-g1-tennessee-map", "tn-g2-tennessee-neighbors", "tn-g3-volunteer-state", "tn-g5-statehood", "tn-g8-jacksonian-tennessee", "tn-g9-governing-tennessee"]),
    );
  });

  it("teaches United States history in 3rd and 4th grade, Tennessee history in 5th, the ancient world in 6th and civics in 9th", () => {
    const social = (grade: string) => tennessee.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toEqual(expect.arrayContaining(["wa-g5-thirteen-colonies", "ca-g5-revolution", "tn-g3-volunteer-state"]));
    expect(social("4")).toEqual(expect.arrayContaining(["ca-g8-civil-war", "ny-g8-civil-rights"]));
    expect(social("5").filter((id) => id.startsWith("tn-")).length).toBeGreaterThanOrEqual(8);
    expect(social("6")).toEqual(expect.arrayContaining(["wa-g6-mesopotamia-egypt", "ca-g6-greece-rome"]));
    expect(social("9")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "tn-g9-governing-tennessee", "or-g9-supply-demand"]));
  });
});
