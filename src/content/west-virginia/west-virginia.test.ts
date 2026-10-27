import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// West Virginia's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is West Virginia's alone.

/** Every West Virginia unit with its course. */
const westVirginia = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-wv"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof westVirginia)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

const social = (grade: string) => westVirginia.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);

describe("West Virginia", () => {
  it("is a US framework in US English, offered to families", () => {
    const wv = getFramework("west-virginia");
    expect(wv.id).toBe("us-wv");
    expect(wv.country).toBe("US");
    expect(localeOf(wv)).toBe("en-US");
    expect(wv.subjects).toEqual(["math", "language", "science", "social"]);
    expect(wv.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(wv);
    expect(UPCOMING_FRAMEWORKS).not.toContain(wv);
  });

  it("never shows West Virginia families a borrowed unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine, and so is Virginia, which West Virginia was
    // part of. West Virginia's own units (wv-) are written for it, and the United States and world history and
    // geography grades (4 to 9) name states where the lesson does. The Grade 9 rhetoric unit quotes Dr. King's letter
    // from Birmingham.
    const EXEMPT = new Set(["ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["4", "5", "6", "7", "8", "9"].includes(grade);
    for (const { u, key } of westVirginia.filter(({ c, u }) => !u.id.startsWith("wv-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of westVirginia.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("wv-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches West Virginia in its own units, which carry only West Virginia standards", () => {
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
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only West Virginia standards`).toEqual(["us-wv"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
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
