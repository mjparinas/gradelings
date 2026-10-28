import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Wyoming's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Wyoming's alone.

/** Every Wyoming unit with its course. */
const wyoming = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-wy"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Wyoming", () => {
  it("teaches Wyoming studies in its own units", () => {
    const own = wyoming.filter(({ u }) => u.id.startsWith("wy-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "wy-k-flag-and-state",
        "wy-g1-then-and-now",
        "wy-g3-regions",
        "wy-g4-first-peoples",
        "wy-g4-equality-state",
        "wy-g4-governing-wyoming",
        "wy-g8-wyoming-and-the-west",
        "wy-g9-governing-wyoming",
      ]),
    );
  });

  it("teaches Wyoming's regions in 3rd grade, its history in 4th and its government in 9th", () => {
    const social = (grade: string) => wyoming.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3")).toEqual(expect.arrayContaining(["wy-g3-regions", "wy-g3-people-on-the-move"]));
    expect(social("4").filter((id) => id.startsWith("wy-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("wy-g8-wyoming-and-the-west");
    expect(social("9")).toEqual(expect.arrayContaining(["wy-g9-governing-wyoming", "wy-g9-us-government", "wy-g9-personal-finance"]));
  });

  it("cites social studies by the standards' grade band", () => {
    // The social studies standards set benchmarks for K-2, 3-5, 6-8 and 9-12, so a grade cites its own band.
    const band: Record<string, string> = { k: "2", "1": "2", "2": "2", "3": "5", "4": "5", "5": "5", "6": "8", "7": "8", "8": "8", "9": "12" };
    for (const { c, u, key } of wyoming.filter(({ c }) => c.subject === "social")) {
      const codes = (u.standards["us-wy"] ?? "").split(" · ")[0].split("; ");
      for (const code of codes) {
        const m = /^SS(\d+)\.\d\.\d+(\.[a-z](\.[ivx]+)?)?$/.exec(code);
        expect(m?.[1], `${key} cites ${code}`).toBe(band[c.grade]);
      }
    }
  });

  it("teaches the Eastern Shoshone and Northern Arapaho in Grades 4, 8 and 9", () => {
    // Wyoming law (W.S. 21-4-602) puts the Tribes' history, culture and government in the social studies standards.
    for (const id of ["wy-g4-first-peoples", "wy-g8-wyoming-and-the-west", "wy-g9-governing-wyoming"]) {
      const unit = wyoming.find(({ u }) => u.id === id);
      expect(unit?.u.parentNote, id).toMatch(/Northern Arapaho/);
    }
  });
});
