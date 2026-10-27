import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Michigan's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Michigan's alone.

/** Every Michigan unit with its course. */
const michigan = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-mi"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Michigan", () => {
  it("teaches Michigan studies in its own units", () => {
    const own = michigan.filter(({ u }) => u.id.startsWith("mi-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "mi-k-flag-and-state",
        "mi-g3-michigan-land",
        "mi-g3-first-peoples",
        "mi-g4-michigan-industry",
        "mi-g8-michigan-and-the-nation",
        "mi-g9-governing-michigan",
      ]),
    );
  });

  it("teaches Michigan Studies in 3rd grade, Michigan history from statehood in 4th and civics in 9th", () => {
    const social = (grade: string) => michigan.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("mi-")).length).toBeGreaterThanOrEqual(6);
    expect(social("4")).toEqual(expect.arrayContaining(["mi-g4-michigan-industry", "mi-g4-moving-to-michigan"]));
    expect(social("8")).toContain("mi-g8-michigan-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["mi-g9-governing-michigan", "mi-g9-us-government", "mi-g9-personal-finance"]));
  });
});
