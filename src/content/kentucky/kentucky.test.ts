import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Kentucky's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Kentucky's alone.

/** Every Kentucky unit with its course. */
const kentucky = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ky"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Kentucky", () => {
  it("teaches Kentucky studies in its own units", () => {
    const own = kentucky.filter(({ u }) => u.id.startsWith("ky-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "ky-k-symbols",
        "ky-g1-kentucky-government",
        "ky-g2-kentucky-laws",
        "ky-g3-kentucky-and-the-world",
        "ky-g4-colonial-kentucky",
        "ky-g5-kentucky-settlers",
        "ky-g8-kentucky-and-the-nation",
        "ky-g9-governing-kentucky",
      ]),
    );
  });

  it("follows Kentucky's social studies themes: colonies in 4th, the Constitution in 5th, the ancient world in 6th, 1600 to 1877 in 8th and civics in 9th", () => {
    const social = (grade: string) => kentucky.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4")).toEqual(expect.arrayContaining(["wa-g5-thirteen-colonies", "ky-g4-colonial-kentucky", "ky-g4-colonial-government"]));
    expect(social("5")).toEqual(expect.arrayContaining(["ca-g5-revolution", "ca-g5-constitution", "ky-g5-citizenship"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ca-g6-greece-rome", "ky-g6-greece-rome-kentucky"]));
    expect(social("8")).toContain("ky-g8-kentucky-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "ky-g9-governing-kentucky", "ky-g9-personal-finance"]));
  });

  it("places middle school science where Kentucky does", () => {
    const science = (grade: string) => kentucky.filter(({ c }) => c.grade === grade && c.subject === "science").map(({ u }) => u.id);
    expect(science("6")).toEqual(expect.arrayContaining(["ky-g6-weather", "ky-g6-earth-surface", "ky-g6-space"]));
    expect(science("8")).toEqual(expect.arrayContaining(["ky-g8-growth", "ky-g8-earth-history", "ky-g8-biodiversity"]));
  });
});
