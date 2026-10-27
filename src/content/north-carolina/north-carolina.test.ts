import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// North Carolina's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is North Carolina's alone.

/** Every North Carolina unit with its course. */
const northCarolina = COURSES.flatMap((c) =>
  c.units
    .filter((u) => u.standards["us-nc"])
    .map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("North Carolina", () => {
  it("teaches North Carolina history in Grades 4 and 8 with its own units", () => {
    for (const grade of ["4", "8"]) {
      const social = COURSES.find(
        (c) =>
          c.grade === grade &&
          c.subject === "social" &&
          c.units.some((u) => u.standards["us-nc"]),
      );
      const own = social?.units.filter((u) => u.id.startsWith("nc-")) ?? [];
      expect(own.length, `Grade ${grade}`).toBeGreaterThanOrEqual(5);
    }
  });

  it("gives its own units only US standards", () => {
    const own = northCarolina.filter(({ u }) => u.id.startsWith("nc-"));
    expect(own.length).toBeGreaterThan(30);
    for (const { u, key } of own)
      expect(
        Object.keys(u.standards).every((f) => f.startsWith("us-")),
        key,
      ).toBe(true);
  });
});
