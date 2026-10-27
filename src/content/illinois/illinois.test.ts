import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Illinois's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Illinois's alone.

/** Every Illinois unit with its course. */
const illinois = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-il"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Illinois", () => {
  it("teaches Illinois studies in its own units", () => {
    const own = illinois.filter(({ u }) => u.id.startsWith("il-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["il-g1-illinois-symbols", "il-g4-first-peoples", "il-g4-governing-illinois", "il-g8-constitutions", "il-g9-governing-illinois"]),
    );
  });

  it("teaches Illinois history in 4th grade and the constitutions in 8th grade", () => {
    const social = (grade: string) => illinois.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("il-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("il-g8-constitutions");
    expect(social("9")).toEqual(expect.arrayContaining(["il-g9-governing-illinois", "il-g9-us-government"]));
  });
});
