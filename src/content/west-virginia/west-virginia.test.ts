import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// West Virginia's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is West Virginia's alone.

/** Every West Virginia unit with its course. */
const westVirginia = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-wv"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

const social = (grade: string) => westVirginia.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);

describe("West Virginia", () => {
  it("teaches West Virginia in its own units", () => {
    const own = westVirginia.filter(({ u }) => u.id.startsWith("wv-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "wv-k-our-state",
        "wv-g1-our-state",
        "wv-g2-west-virginia",
        "wv-g3-wv-regions",
        "wv-g4-counties",
        "wv-g5-becoming-west-virginia",
        "wv-g8-civil-war-statehood",
      ]),
    );
  });

  it("follows the grade content of West Virginia's social studies standards", () => {
    // Grade 4, the colonies to westward expansion; Grade 5, the Civil War to a world power, with statehood.
    expect(social("4")).toEqual(expect.arrayContaining(["wa-g5-thirteen-colonies", "ca-g5-revolution", "wv-g4-counties"]));
    expect(social("5")).toEqual(expect.arrayContaining(["wa-g8-civil-war", "or-g8-reconstruction", "wv-g5-becoming-west-virginia"]));
    // Grade 6, the world in the 20th and 21st centuries; Grade 7, world geography and the ancient world.
    expect(social("6")).toEqual(expect.arrayContaining(["ny-g8-world-war-i", "ny-g8-world-war-ii", "ny-g8-cold-war"]));
    expect(social("7")).toEqual(expect.arrayContaining(["wv-g7-world-regions", "wa-g6-mesopotamia-egypt", "wa-g6-greece-rome"]));
    // Grade 8 is West Virginia Studies: mostly West Virginia's own units.
    expect(social("8").filter((id) => id.startsWith("wv-")).length).toBeGreaterThanOrEqual(7);
    // Grade 9 is World Studies.
    expect(social("9")).toEqual(expect.arrayContaining(["ca-g6-roman-empire", "al-g9-world-war-ii"]));
  });

  it("practises the state's middle school science in the grades West Virginia teaches it", () => {
    const science = (grade: string) => westVirginia.filter(({ c }) => c.grade === grade && c.subject === "science").map(({ u }) => u.id);
    expect(science("6")).toEqual(expect.arrayContaining(["ecosystems-7", "wv-g6-weather", "wv-g6-space"]));
    expect(science("7")).toEqual(expect.arrayContaining(["wa-g6-cells", "wa-g8-energy", "wv-g7-earth-surface"]));
    expect(science("8")).toEqual(expect.arrayContaining(["wa-g8-heredity", "wa-g7-reactions", "wv-g8-growth"]));
  });
});
