import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Missouri's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Missouri's alone.

/** Every Missouri unit with its course. */
const missouri = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-mo"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Missouri", () => {
  it("teaches Missouri studies in its own units", () => {
    const own = missouri.filter(({ u }) => u.id.startsWith("mo-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["mo-k-flag-and-holidays", "mo-g2-missouri-regions", "mo-g3-first-peoples", "mo-g3-governing-missouri", "mo-g8-missouri-crossroads", "mo-g9-governing-missouri"]),
    );
  });

  it("teaches Missouri studies in 3rd grade, US history in 4th and 5th, world geography in 6th and government in 9th", () => {
    const social = (grade: string) => missouri.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("mo-")).length).toBeGreaterThanOrEqual(8);
    expect(social("4")).toEqual(expect.arrayContaining(["mo-g4-first-americans", "ca-g5-thirteen-colonies"]));
    expect(social("5")).toEqual(expect.arrayContaining(["mo-g5-growing-nation", "wa-g8-reconstruction", "mo-g5-civil-rights"]));
    expect(social("6")).toEqual(expect.arrayContaining(["mo-g6-world-maps", "ga-g7-africa"]));
    expect(social("8")).toEqual(expect.arrayContaining(["mo-g8-missouri-crossroads", "mo-g8-westward"]));
    expect(social("9")).toEqual(expect.arrayContaining(["mo-g9-governing-missouri", "mo-g9-civics-test"]));
  });
});
