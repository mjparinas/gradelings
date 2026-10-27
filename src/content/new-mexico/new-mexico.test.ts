import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// New Mexico's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is New Mexico's alone.

/** Every New Mexico unit with its course. */
const newMexico = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-nm"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("New Mexico", () => {
  it("teaches New Mexico studies in its own units", () => {
    const own = newMexico.filter(({ u }) => u.id.startsWith("nm-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "nm-k-flag-and-state",
        "nm-g1-then-and-now",
        "nm-g3-people-on-the-move",
        "nm-g4-first-peoples",
        "nm-g4-land-of-enchantment",
        "nm-g7-spanish-colonial",
        "nm-g8-new-mexico-and-the-nation",
        "nm-g9-governing-new-mexico",
      ]),
    );
  });

  it("teaches migration in 3rd grade, New Mexico history in 4th and 7th and civics in 9th", () => {
    const social = (grade: string) => newMexico.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toContain("nm-g3-people-on-the-move");
    expect(social("4").filter((id) => id.startsWith("nm-")).length).toBeGreaterThanOrEqual(6);
    expect(social("7").filter((id) => id.startsWith("nm-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("nm-g8-new-mexico-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["nm-g9-governing-new-mexico", "nm-g9-us-government", "nm-g9-personal-finance"]));
  });

  it("cites New Mexico's own science expectations where it teaches them", () => {
    const cites = (code: string) => newMexico.some(({ u }) => (u.standards["us-nm"] ?? "").includes(code));
    expect(cites("MS-ESS3-3 NM")).toBe(true);
    expect(cites("HS-LS2-7 NM")).toBe(true);
  });
});
