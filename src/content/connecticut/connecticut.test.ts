import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Connecticut's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Connecticut's alone.

/** Every Connecticut unit with its course. */
const connecticut = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ct"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Connecticut", () => {
  it("teaches Connecticut studies in its own units", () => {
    const own = connecticut.filter(({ u }) => u.id.startsWith("ct-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "ct-g1-connecticut-our-state",
        "ct-g3-connecticut-government",
        "ct-g3-native-nations",
        "ct-g4-us-regions",
        "ct-g5-colonial-connecticut",
        "ct-g8-connecticut-and-nation",
        "ct-g9-governing-connecticut",
      ]),
    );
  });

  it("follows the grade themes of Connecticut's 2023 social studies standards", () => {
    const social = (grade: string) => connecticut.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    // Grade 3, Connecticut and Local History: mostly Connecticut's own units.
    expect(social("3").filter((id) => id.startsWith("ct-")).length).toBeGreaterThanOrEqual(5);
    // Grade 4, United States Geography; Grade 5, United States History I; Grade 8, United States History II.
    expect(social("4")).toEqual(expect.arrayContaining(["ct-g4-us-regions", "ct-g4-moving-and-settling", "ct-g4-hazards-and-climate"]));
    expect(social("5")).toEqual(expect.arrayContaining(["ct-g5-colonial-connecticut", "ct-g5-connecticut-revolution", "wa-g5-thirteen-colonies"]));
    expect(social("8")).toEqual(expect.arrayContaining(["ct-g8-connecticut-and-nation", "ct-g8-founding-documents", "or-g8-reconstruction"]));
    // Grade 9 is the Civics and Government course.
    expect(social("9")).toEqual(expect.arrayContaining(["ct-g9-governing-connecticut", "ct-g9-us-government", "ca-g9-civic-action"]));
  });
});
