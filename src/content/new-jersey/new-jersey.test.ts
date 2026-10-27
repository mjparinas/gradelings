import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// New Jersey's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is New Jersey's alone.

/** Every New Jersey unit with its course. */
const newJersey = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-nj"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("New Jersey", () => {
  it("teaches New Jersey studies in its own units", () => {
    const own = newJersey.filter(({ u }) => u.id.startsWith("nj-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "nj-g1-new-jersey-symbols",
        "nj-g3-local-government",
        "nj-g4-lenape",
        "nj-g4-revolution",
        "nj-g4-governing-new-jersey",
        "nj-g8-new-jersey-plan",
        "nj-g9-governing-new-jersey",
      ]),
    );
  });

  it("teaches New Jersey history in 4th grade, ancient and medieval worlds in 6th and 7th, and civics in 9th", () => {
    const social = (grade: string) => newJersey.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("nj-")).length).toBeGreaterThanOrEqual(6);
    expect(social("6")).toEqual(expect.arrayContaining(["wa-g6-mesopotamia-egypt", "wa-g6-greece-rome"]));
    expect(social("7")).toEqual(expect.arrayContaining(["medieval-europe", "islamic-world", "nj-g7-japan"]));
    expect(social("8")).toEqual(expect.arrayContaining(["nj-g8-new-jersey-and-nation", "nj-g8-new-jersey-plan"]));
    expect(social("9")).toEqual(expect.arrayContaining(["nj-g9-governing-new-jersey", "nj-g9-us-government", "nj-g9-personal-finance"]));
  });

  it("practises money with coins in Kindergarten and 1st grade, as the 2023 math standards add", () => {
    const math = (grade: string) => newJersey.filter(({ c }) => c.grade === grade && c.subject === "math").map(({ u }) => u.id);
    expect(math("k")).toContain("ny-k-coins");
    expect(math("1")).toContain("ny-g1-coins");
  });
});
