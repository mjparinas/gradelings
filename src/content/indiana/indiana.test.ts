import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Indiana's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Indiana's alone.

/** Every Indiana unit with its course. */
const indiana = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-in"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Indiana", () => {
  it("teaches Indiana studies in its own units", () => {
    const own = indiana.filter(({ u }) => u.id.startsWith("in-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["in-g2-pledge-harrison", "in-g4-first-peoples", "in-g4-governing-indiana", "in-g6-indiana-constitution", "in-g9-governing-indiana"]),
    );
  });

  it("teaches Indiana studies in 4th grade, the Indiana Constitution in 6th grade and Indiana government in 9th grade", () => {
    const social = (grade: string) => indiana.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("in-")).length).toBeGreaterThanOrEqual(6);
    expect(social("6")).toContain("in-g6-indiana-constitution");
    expect(social("2")).toContain("in-g2-pledge-harrison");
    expect(social("9")).toEqual(expect.arrayContaining(["in-g9-governing-indiana", "in-g9-economics"]));
  });
});
