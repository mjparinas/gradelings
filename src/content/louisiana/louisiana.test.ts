import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Louisiana's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Louisiana's alone.

/** Every Louisiana unit with its course. */
const louisiana = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-la"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof louisiana)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Louisiana", () => {
  it("is a US framework in US English, offered to families", () => {
    const la = getFramework("louisiana");
    expect(la.id).toBe("us-la");
    expect(la.country).toBe("US");
    expect(localeOf(la)).toBe("en-US");
    expect(la.subjects).toEqual(["math", "language", "science", "social"]);
    expect(la.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(la);
    expect(UPCOMING_FRAMEWORKS).not.toContain(la);
  });

  it("never shows Louisiana families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Louisiana's own units (la-) may name other
    // places where the story calls for it (its neighbor states, national landmarks), and the United States history and
    // civics grades (3, 6, 7, 8 and 9) name states where the history does. Louisiana's standards name the national
    // landmarks (2.7) and the land bridge from Asia (4.19); Memphis in the ancient world is Egypt's; the rhetoric unit
    // quotes Dr. King's letter from Birmingham.
    const EXEMPT = new Set(["ny-g1-american-symbols", "ny-g5-early-civilizations", "ca-g6-hebrews-kush", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["3", "6", "7", "8", "9"].includes(grade);
    for (const { u, key } of louisiana.filter(({ c, u }) => !u.id.startsWith("la-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Louisiana's own units about its four federally recognized Tribes are written for Louisiana. Treaties alone aren't
    // a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of louisiana.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("la-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Louisiana studies in its own units, which carry only Louisiana standards", () => {
    const own = louisiana.filter(({ u }) => u.id.startsWith("la-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["la-k-louisiana-traditions", "la-g1-louisiana-regions", "la-g3-big-events", "la-g4-poverty-point", "la-g6-colonial-louisiana", "la-g7-civil-war-louisiana", "la-g8-louisiana-1900s", "la-g9-louisiana-government"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Louisiana standards`).toEqual(["us-la"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Louisiana in 1st grade, the ancient world in 4th, colonial Louisiana in 6th and civics in high school", () => {
    const social = (grade: string) => louisiana.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("1").filter((id) => id.startsWith("la-")).length).toBeGreaterThanOrEqual(5);
    expect(social("4")).toEqual(expect.arrayContaining(["wa-g6-mesopotamia-egypt", "ca-g6-greece-rome", "la-g4-poverty-point"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ca-g5-thirteen-colonies", "la-g6-colonial-louisiana", "la-g6-spanish-louisiana"]));
    expect(social("9")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "la-g9-louisiana-government"]));
  });

  it("says “the Gulf” in its own units, never naming it", () => {
    for (const { u, key } of louisiana.filter(({ u }) => u.id.startsWith("la-"))) {
      expect(linesOf(u).find((line) => /Gulf of (Mexico|America)/.test(line)) ?? "", key).toBe("");
    }
  });
});
