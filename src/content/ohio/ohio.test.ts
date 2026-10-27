import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Ohio's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Ohio's alone.

/** Every Ohio unit with its course. */
const ohio = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-oh"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Ohio", () => {
  it("teaches Ohio studies in its own units", () => {
    const own = ohio.filter(({ u }) => u.id.startsWith("oh-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["oh-k-ohio-symbols", "oh-g2-ohio-regions", "oh-g4-first-peoples", "oh-g4-governing-ohio", "oh-g8-westward", "oh-g9-governing-ohio"]),
    );
  });

  it("teaches Ohio history in 4th grade, the Western and Eastern Hemispheres in 5th and 6th, world history in 7th and American Government in 9th", () => {
    const social = (grade: string) => ohio.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("oh-")).length).toBeGreaterThanOrEqual(6);
    expect(social("5")).toEqual(expect.arrayContaining(["oh-g5-americas-geography", "ca-g7-aztec-inca"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ny-g6-eastern-hemisphere", "oh-g6-world-regions"]));
    expect(social("7")).toEqual(expect.arrayContaining(["wa-g6-greece-rome", "world-beliefs", "oh-g7-japan"]));
    expect(social("8")).toEqual(expect.arrayContaining(["oh-g8-westward", "oh-g8-rights-citizenship"]));
    expect(social("9")).toEqual(expect.arrayContaining(["oh-g9-governing-ohio", "oh-g9-us-government", "oh-g9-economics"]));
  });
});
