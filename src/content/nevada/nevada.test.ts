import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Nevada's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Nevada's alone.

/** Every Nevada unit with its course. */
const nevada = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-nv"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Nevada", () => {
  it("teaches Nevada studies in its own units", () => {
    const own = nevada.filter(({ u }) => u.id.startsWith("nv-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "nv-k-flag-and-state",
        "nv-g3-people-on-the-move",
        "nv-g4-first-peoples",
        "nv-g4-silver-state",
        "nv-g7-nevada-in-the-world",
        "nv-g8-nevada-and-the-nation",
        "nv-g9-governing-nevada",
      ]),
    );
  });

  it("teaches migration in 3rd grade, Nevada past and present in 4th and civics in 9th", () => {
    const social = (grade: string) => nevada.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toContain("nv-g3-people-on-the-move");
    expect(social("4").filter((id) => id.startsWith("nv-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("nv-g8-nevada-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["nv-g9-governing-nevada", "nv-g9-us-government", "nv-g9-personal-finance"]));
  });
});
