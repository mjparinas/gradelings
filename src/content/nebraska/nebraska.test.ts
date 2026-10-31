import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Nebraska's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Nebraska's alone.

/** Every Nebraska unit with its course. */
const nebraska = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ne"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

const idsIn = (grade: string, subject: string) =>
  nebraska.filter(({ c }) => c.grade === grade && c.subject === subject).map(({ u }) => u.id);

const codesOf = (u: (typeof nebraska)[number]["u"]) => u.standards["us-ne"]!.split(" · ")[0].split("; ");

describe("Nebraska", () => {
  it("teaches Nebraska studies in its own units", () => {
    const own = nebraska.filter(({ u }) => u.id.startsWith("neb-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "neb-k-flag-and-state",
        "neb-g3-people-on-the-move",
        "neb-g4-first-peoples",
        "neb-g4-trails-statehood",
        "neb-g4-unicameral",
        "neb-g4-us-regions",
        "neb-g8-nebraska-and-the-nation",
        "neb-g9-governing-nebraska",
      ]),
    );
  });

  it("follows Nebraska's grade themes in social studies", () => {
    // Grade 4 is Nebraska Studies, Grade 7 World Studies II (post-classical societies), Grade 8 U.S. history with
    // Nebraska's part in it, and Grade 9 the high school civics and economics standards.
    expect(idsIn("3", "social")).toContain("neb-g3-people-on-the-move");
    expect(idsIn("4", "social").filter((id) => id.startsWith("neb-")).length).toBeGreaterThanOrEqual(7);
    expect(idsIn("7", "social")).toEqual(expect.arrayContaining(["ca-g7-rome-byzantium", "ca-g7-arabia-islam", "ca-g7-medieval-japan"]));
    expect(idsIn("8", "social")).toContain("neb-g8-nebraska-and-the-nation");
    expect(idsIn("9", "social")).toEqual(expect.arrayContaining(["neb-g9-governing-nebraska", "neb-g9-us-government", "neb-g9-personal-finance"]));
  });

  it("cites each subject's codes for the course's own grade", () => {
    // Grade 9 cites the high school standards, and the Grades 9-10 band of English language arts, which the document
    // codes with a 10.
    const prefix = { math: "MA", language: "LA", science: "SC", social: "SS" } as const;
    // The shared Spanish course cites the World-Readiness Standards, checked by spanishCite in the contract tests.
    for (const { c, u, key } of nebraska.filter(({ c }) => c.subject !== "spanish")) {
      const g = c.grade === "k" ? "K" : c.grade === "9" ? (c.subject === "language" ? "10" : "HS") : c.grade;
      const p = prefix[c.subject as keyof typeof prefix];
      const sep = c.subject === "social" ? " " : ".";
      for (const code of codesOf(u)) expect(code.startsWith(`${p}${sep}${g}.`), `${key} cites ${code}`).toBe(true);
    }
  });

  it("follows Nebraska's own math placement", () => {
    // Nebraska measures angles in 4th grade, and keeps its ratios and proportions strand to 6th and 7th grade.
    expect(idsIn("4", "math")).toContain("ca-g4-measure-angles");
    for (const { u, key } of nebraska.filter(({ c }) => c.subject === "math" && !["6", "7"].includes(c.grade))) {
      expect(codesOf(u).some((code) => /^MA\.\w+\.R\./.test(code)), `${key} cites the ratios strand`).toBe(false);
    }
  });
});
