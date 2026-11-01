import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Kansas's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Kansas's alone.

/** Every Kansas unit with its course. */
const kansas = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ks"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

const idsIn = (grade: string, subject: string) =>
  kansas.filter(({ c }) => c.grade === grade && c.subject === subject).map(({ u }) => u.id);

describe("Kansas", () => {
  it("teaches Kansas studies in its own units", () => {
    const own = kansas.filter(({ u }) => u.id.startsWith("ks-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "ks-k-flag-and-state",
        "ks-g3-people-on-the-move",
        "ks-g4-first-peoples",
        "ks-g4-free-state",
        "ks-g4-us-regions",
        "ks-g7-kansas-history",
        "ks-g8-kansas-and-the-nation",
        "ks-g9-governing-kansas",
      ]),
    );
  });

  it("teaches Kansas and the regions in 4th grade, Kansas history in 7th and government in 9th", () => {
    expect(idsIn("3", "social")).toContain("ks-g3-people-on-the-move");
    expect(idsIn("4", "social").filter((id) => id.startsWith("ks-")).length).toBeGreaterThanOrEqual(7);
    expect(idsIn("7", "social")).toContain("ks-g7-kansas-history");
    expect(idsIn("8", "social")).toContain("ks-g8-kansas-and-the-nation");
    expect(idsIn("9", "social")).toEqual(expect.arrayContaining(["ks-g9-governing-kansas", "ks-g9-us-government", "ks-g9-personal-finance"]));
  });

  it("cites social studies by the five standards' benchmarks, only those each early grade teaches", () => {
    // Pre-K cites the early learning standards instead (the framework contract checks them). Kindergarten teaches standard 1, Grade 1 standards 1 and 2, Grade 2 standards 1, 2 and 4, Grade 3 standards 1 to 4.
    const allowed: Record<string, string[]> = { k: ["1"], "1": ["1", "2"], "2": ["1", "2", "4"], "3": ["1", "2", "3", "4"] };
    for (const { c, u, key } of kansas.filter(({ c }) => c.subject === "social" && c.grade !== "pk")) {
      const codes = u.standards["us-ks"]!.split(" · ")[0].split("; ");
      for (const code of codes) {
        expect(code, `${key} cites a benchmark`).toMatch(/^[1-5]\.[1-4]$/);
        if (allowed[c.grade]) expect(allowed[c.grade], `${key} cites ${code}`).toContain(code.split(".")[0]);
      }
    }
  });

  it("follows Kansas's own math and English language arts placement", () => {
    // Kansas moved angle measure from 4th grade to 8th and systems of equations from 8th grade to high school, and its
    // 2023 English language arts standards have no Language strand.
    expect(idsIn("4", "math")).not.toContain("ca-g4-measure-angles");
    expect(idsIn("8", "math")).toContain("angles-8");
    expect(idsIn("8", "math")).not.toContain("wa-g8-systems");
    for (const { u, key } of kansas.filter(({ c }) => c.subject === "language")) {
      expect(u.standards["us-ks"], `${key} cites a Language strand code`).not.toMatch(/(^|; )L\.\d/);
    }
  });
});
