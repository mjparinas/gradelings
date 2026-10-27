import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Maryland's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Maryland's alone.

/** Every Maryland unit with its course. */
const maryland = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-md"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Maryland", () => {
  it("teaches Maryland studies in its own units", () => {
    const own = maryland.filter(({ u }) => u.id.startsWith("md-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "md-g1-maryland-symbols",
        "md-g3-maryland-economy",
        "md-g3-early-maryland",
        "md-g4-maryland-colony",
        "md-g4-slavery-in-maryland",
        "md-g5-maryland-civil-war",
        "md-g5-civil-rights",
        "md-g8-maryland-and-nation",
        "md-g9-governing-maryland",
      ]),
    );
  });

  it("teaches Maryland in 3rd and 4th grade and American Government in 9th grade", () => {
    const social = (grade: string) => maryland.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("md-")).length).toBeGreaterThanOrEqual(4);
    expect(social("4").filter((id) => id.startsWith("md-")).length).toBeGreaterThanOrEqual(5);
    expect(social("9")).toEqual(expect.arrayContaining(["md-g9-governing-maryland", "md-g9-courts-and-rights", "md-g9-us-government"]));
  });
});
