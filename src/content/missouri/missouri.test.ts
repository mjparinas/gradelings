import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Missouri's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Missouri's alone.

/** Every Missouri unit with its course. */
const missouri = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-mo"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof missouri)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Missouri", () => {
  it("is a US framework in US English, offered to families", () => {
    const mo = getFramework("missouri");
    expect(mo.id).toBe("us-mo");
    expect(mo.country).toBe("US");
    expect(localeOf(mo)).toBe("en-US");
    expect(mo.subjects).toEqual(["math", "language", "science", "social"]);
    expect(mo.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(mo);
    expect(UPCOMING_FRAMEWORKS).not.toContain(mo);
  });

  it("never shows Missouri families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Missouri's own units (mo-) may name other
    // places where Missouri's story calls for it (Kansas across the border, the trails west), and United States
    // history and civics (Grades 4, 5, 8 and 9) name states where the history does. The Grade 9 rhetoric unit quotes
    // the "Letter from Birmingham Jail".
    const EXEMPT = new Set(["ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["4", "5", "8", "9"].includes(grade);
    for (const { u, key } of missouri.filter(({ c, u }) => !u.id.startsWith("mo-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Missouri's own units about the Osage, Missouria and other nations are written for Missouri. Other states'
    // units about their Tribes, treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    for (const { u, key } of missouri.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|ga|oh)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Missouri studies in its own units, which carry only Missouri standards", () => {
    const own = missouri.filter(({ u }) => u.id.startsWith("mo-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["mo-k-flag-and-holidays", "mo-g2-missouri-regions", "mo-g3-first-peoples", "mo-g3-governing-missouri", "mo-g8-missouri-crossroads", "mo-g9-governing-missouri"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Missouri standards`).toEqual(["us-mo"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Missouri studies in 3rd grade, US history in 4th and 5th, world geography in 6th and government in 9th", () => {
    const social = (grade: string) => missouri.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("mo-")).length).toBeGreaterThanOrEqual(8);
    expect(social("4")).toEqual(expect.arrayContaining(["mo-g4-first-americans", "ca-g5-thirteen-colonies"]));
    expect(social("5")).toEqual(expect.arrayContaining(["mo-g5-growing-nation", "wa-g8-reconstruction", "mo-g5-civil-rights"]));
    expect(social("6")).toEqual(expect.arrayContaining(["mo-g6-world-maps", "ga-g7-africa"]));
    expect(social("8")).toEqual(expect.arrayContaining(["mo-g8-missouri-crossroads", "mo-g8-westward"]));
    expect(social("9")).toEqual(expect.arrayContaining(["mo-g9-governing-missouri", "mo-g9-civics-test"]));
  });
});
