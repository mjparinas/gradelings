import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Kansas's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Kansas's alone.

/** Every Kansas unit with its course. */
const kansas = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ks"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof kansas)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

const idsIn = (grade: string, subject: string) =>
  kansas.filter(({ c }) => c.grade === grade && c.subject === subject).map(({ u }) => u.id);

describe("Kansas", () => {
  it("is a US framework in US English, offered to families", () => {
    const ks = getFramework("kansas");
    expect(ks.id).toBe("us-ks");
    expect(ks.country).toBe("US");
    expect(localeOf(ks)).toBe("en-US");
    expect(ks.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ks.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ks);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ks);
  });

  it("never shows Kansas families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Kansas's own units (ks-) may name other places
    // where Kansas's story calls for it (its neighbor states, the trails west, the regions of the U.S.), and the United
    // States history and civics grades (5, 8 and 9) name states where the history does. The national symbols unit names
    // national landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit
    // tells Ruby Bridges's story in New Orleans, which Kansas's rights and responsibilities standard calls for.
    const EXEMPT = new Set(["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of kansas.filter(({ c, u }) => !u.id.startsWith("ks-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Kansas's own units about the Kansa, Wichita and other nations in Kansas are written for Kansas. Treaties alone
    // aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of kansas.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("ks-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Kansas studies in its own units, which carry only Kansas standards", () => {
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
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Kansas standards`).toEqual(["us-ks"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Kansas and the regions in 4th grade, Kansas history in 7th and government in 9th", () => {
    expect(idsIn("3", "social")).toContain("ks-g3-people-on-the-move");
    expect(idsIn("4", "social").filter((id) => id.startsWith("ks-")).length).toBeGreaterThanOrEqual(7);
    expect(idsIn("7", "social")).toContain("ks-g7-kansas-history");
    expect(idsIn("8", "social")).toContain("ks-g8-kansas-and-the-nation");
    expect(idsIn("9", "social")).toEqual(expect.arrayContaining(["ks-g9-governing-kansas", "ks-g9-us-government", "ks-g9-personal-finance"]));
  });

  it("cites social studies by the five standards' benchmarks, only those each early grade teaches", () => {
    // Kindergarten teaches standard 1, Grade 1 standards 1 and 2, Grade 2 standards 1, 2 and 4, Grade 3 standards 1 to 4.
    const allowed: Record<string, string[]> = { k: ["1"], "1": ["1", "2"], "2": ["1", "2", "4"], "3": ["1", "2", "3", "4"] };
    for (const { c, u, key } of kansas.filter(({ c }) => c.subject === "social")) {
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
