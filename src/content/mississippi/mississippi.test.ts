import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Mississippi's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Mississippi's alone.

/** Every Mississippi unit with its course. */
const mississippi = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ms"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Mississippi", () => {
  it("teaches Mississippi studies in its own units", () => {
    const own = mississippi.filter(({ u }) => u.id.startsWith("ms-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ms-k-symbols", "ms-g3-government", "ms-g4-regions", "ms-g4-beginnings", "ms-g4-civil-rights", "ms-g9-civil-rights", "ms-g9-modern"]),
    );
  });

  it("teaches local government in 3rd grade, Mississippi Studies in 4th and again in 9th", () => {
    const social = (grade: string) => mississippi.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toContain("ms-g3-government");
    expect(social("4").filter((id) => id.startsWith("ms-")).length).toBeGreaterThanOrEqual(6);
    expect(social("9").filter((id) => id.startsWith("ms-")).length).toBeGreaterThanOrEqual(4);
  });
});
