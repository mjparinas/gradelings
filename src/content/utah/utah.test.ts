import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Utah's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Utah's alone.

/** Every Utah unit with its course. */
const utah = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ut"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof utah)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Utah", () => {
  it("is a US framework in US English, offered to families", () => {
    const ut = getFramework("utah");
    expect(ut.id).toBe("us-ut");
    expect(ut.country).toBe("US");
    expect(localeOf(ut)).toBe("en-US");
    expect(ut.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ut.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ut);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ut);
  });

  it("never shows Utah families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Utah's own units (ut-) may name other places
    // where the story calls for it (the Four Corners, the trails west), and the United States and world history and
    // geography grades (5, 6, 8 and 9) name states where the history does. The national symbols and landmarks unit
    // and the American symbols units name the Golden Gate Bridge and the Liberty Bell's Pennsylvania; Ruby Bridges's
    // New Orleans school and the Constitution's Philadelphia are national history.
    const EXEMPT = new Set(["ca-g1-american-symbols", "ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g5-constitution"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "6", "8", "9"].includes(grade);
    for (const { u, key } of utah.filter(({ c, u }) => !u.id.startsWith("ut-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Utah's own units about its Tribal nations are written for Utah. Treaties alone aren't a sign (adopted units ask
    // about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of utah.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("ut-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Utah studies in its own units, which carry only Utah standards", () => {
    const own = utah.filter(({ u }) => u.id.startsWith("ut-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ut-g4-utah-land", "ut-g4-first-peoples", "ut-g4-railroad-statehood", "ut-g4-government", "ut-g7-native-peoples", "ut-g7-statehood", "ut-g7-utah-in-world"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Utah standards`).toEqual(["us-ut"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Utah in 4th grade and Utah Studies in 7th, mostly in Utah's own units", () => {
    const social = (grade: string) => utah.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    for (const grade of ["4", "7"]) {
      const ids = social(grade);
      expect(ids.filter((id) => id.startsWith("ut-")).length, `Grade ${grade}`).toBeGreaterThanOrEqual(6);
      expect(ids.filter((id) => id.startsWith("ut-")).length / ids.length, `Grade ${grade}`).toBeGreaterThan(0.7);
    }
  });

  it("gives its science copies Utah examples in place of another state's", () => {
    const copies = utah.filter(({ c, u }) => c.subject === "science" && u.id.startsWith("ut-"));
    expect(copies.length).toBeGreaterThanOrEqual(15);
    for (const { u, key } of copies) {
      expect(linesOf(u).some((line) => /Utah|Great Salt Lake|Wasatch/.test(line)), `${key} has Utah examples`).toBe(true);
      expect(linesOf(u).find((line) => OTHER_STATE.test(line)) ?? "", `${key} names another state`).toBe("");
    }
  });
});
