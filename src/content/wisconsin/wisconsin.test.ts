import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Wisconsin's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Wisconsin's alone.

/** Every Wisconsin unit with its course. */
const wisconsin = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-wi"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Wisconsin", () => {
  it("teaches Wisconsin studies in its own units", () => {
    const own = wisconsin.filter(({ u }) => u.id.startsWith("wi-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["wi-g1-wisconsin-symbols", "wi-g4-first-nations", "wi-g4-governing-wisconsin", "wi-g8-constitutions", "wi-g9-governing-wisconsin"]),
    );
  });

  it("teaches Wisconsin studies in 4th grade and the constitutions in 8th grade", () => {
    const social = (grade: string) => wisconsin.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("wi-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("wi-g8-constitutions");
    expect(social("9")).toEqual(expect.arrayContaining(["wi-g9-governing-wisconsin", "wi-g9-us-government"]));
  });
});
