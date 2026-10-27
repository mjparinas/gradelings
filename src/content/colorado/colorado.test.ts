import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Colorado's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Colorado's alone.

/** Every Colorado unit with its course. */
const colorado = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-co"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Colorado", () => {
  it("teaches Colorado studies in its own units", () => {
    const own = colorado.filter(({ u }) => u.id.startsWith("co-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["co-g1-colorado-symbols", "co-g4-first-peoples", "co-g4-governing-colorado", "co-g8-westward", "co-g9-governing-colorado"]),
    );
  });

  it("teaches Colorado history in 4th grade, the Western and Eastern Hemispheres in 6th and 7th, and civics in 9th", () => {
    const social = (grade: string) => colorado.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("co-")).length).toBeGreaterThanOrEqual(6);
    expect(social("6")).toEqual(expect.arrayContaining(["co-g6-americas-geography", "ca-g7-aztec-inca"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ny-g6-eastern-hemisphere", "world-beliefs", "co-g7-japan"]));
    expect(social("8")).toEqual(expect.arrayContaining(["co-g8-westward", "co-g8-rights-citizenship"]));
    expect(social("9")).toEqual(expect.arrayContaining(["co-g9-governing-colorado", "co-g9-us-government"]));
  });
});
