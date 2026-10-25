import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Connecticut's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Connecticut's alone.

/** Every Connecticut unit with its course. */
const connecticut = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ct"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof connecticut)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Connecticut", () => {
  it("is a US framework in US English, offered to families", () => {
    const ct = getFramework("connecticut");
    expect(ct.id).toBe("us-ct");
    expect(ct.country).toBe("US");
    expect(localeOf(ct)).toBe("en-US");
    expect(ct.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ct.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ct);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ct);
  });

  it("never shows Connecticut families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Connecticut's own units (ct-) may name other
    // places where the story calls for it (the regions of the United States, Superstorm Sandy), and the United States
    // geography, history and world regions grades (4 to 9) name states where the lesson does. The Grade 9 rhetoric unit
    // quotes Dr. King's letter from Birmingham.
    const EXEMPT = new Set(["ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["4", "5", "6", "7", "8", "9"].includes(grade);
    for (const { u, key } of connecticut.filter(({ c, u }) => !u.id.startsWith("ct-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Connecticut's own units about the Native nations of Connecticut are written for Connecticut. Treaties alone
    // aren't a sign (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of connecticut.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("ct-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Connecticut studies in its own units, which carry only Connecticut standards", () => {
    const own = connecticut.filter(({ u }) => u.id.startsWith("ct-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "ct-g1-connecticut-our-state",
        "ct-g3-connecticut-government",
        "ct-g3-native-nations",
        "ct-g4-us-regions",
        "ct-g5-colonial-connecticut",
        "ct-g8-connecticut-and-nation",
        "ct-g9-governing-connecticut",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Connecticut standards`).toEqual(["us-ct"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("follows the grade themes of Connecticut's 2023 social studies standards", () => {
    const social = (grade: string) => connecticut.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    // Grade 3, Connecticut and Local History: mostly Connecticut's own units.
    expect(social("3").filter((id) => id.startsWith("ct-")).length).toBeGreaterThanOrEqual(5);
    // Grade 4, United States Geography; Grade 5, United States History I; Grade 8, United States History II.
    expect(social("4")).toEqual(expect.arrayContaining(["ct-g4-us-regions", "ct-g4-moving-and-settling", "ct-g4-hazards-and-climate"]));
    expect(social("5")).toEqual(expect.arrayContaining(["ct-g5-colonial-connecticut", "ct-g5-connecticut-revolution", "wa-g5-thirteen-colonies"]));
    expect(social("8")).toEqual(expect.arrayContaining(["ct-g8-connecticut-and-nation", "ct-g8-founding-documents", "or-g8-reconstruction"]));
    // Grade 9 is the Civics and Government course.
    expect(social("9")).toEqual(expect.arrayContaining(["ct-g9-governing-connecticut", "ct-g9-us-government", "ca-g9-civic-action"]));
  });
});
