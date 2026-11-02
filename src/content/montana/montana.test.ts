import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Montana's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Montana's alone.

/** Every Montana unit with its course. */
const montana = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-mt"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof montana)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Montana", () => {
  it("is a US framework in US English, offered to families", () => {
    const mt = getFramework("montana");
    expect(mt.id).toBe("us-mt");
    expect(mt.country).toBe("US");
    expect(localeOf(mt)).toBe("en-US");
    expect(mt.subjects).toEqual(["math", "language", "science", "social"]);
    expect(mt.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(mt);
    expect(UPCOMING_FRAMEWORKS).not.toContain(mt);
  });

  it("never shows Montana families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Montana's own units (mt-) may name other
    // places where the story calls for it (the Northern Cheyenne journey from Oklahoma), and the United States and
    // world history and geography grades (5 to 9) name states where the lesson does. The Grade 9 rhetoric unit quotes
    // Dr. King's letter from Birmingham.
    const EXEMPT = new Set(["ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "6", "7", "8", "9"].includes(grade);
    for (const { u, key } of montana.filter(({ c, u }) => !u.id.startsWith("mt-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Montana's own units about the Tribal Nations of Montana are written for Montana. Treaties alone aren't a sign
    // (adopted civics units ask about the Treaty of Paris).
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of montana.filter(({ u }) => /^[a-z]{2}-/.test(u.id) && !u.id.startsWith("mt-") && !u.standards["ca-bc"])) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Montana studies in its own units, which carry only Montana standards", () => {
    const own = montana.filter(({ u }) => u.id.startsWith("mt-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "mt-k-made-in-montana",
        "mt-g1-montana-on-the-map",
        "mt-g2-montana-tribes",
        "mt-g3-tribal-nations",
        "mt-g4-tribal-nations",
        "mt-g4-governing-montana",
        "mt-g5-treaties",
        "mt-g8-montana-story",
        "mt-g9-governing-montana",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Montana standards`).toEqual(["us-mt"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches the Tribal Nations of Montana in every grade from 2 to 9, as Indian Education for All asks", () => {
    // SS.H.2.2 (twelve Tribal Nations), SS.H.3.1 (their names), SS.G.4.2 (homelands and reservations), SS.H.5.5
    // (treaties), SS.H.6-8.3 (since contact) and SS.CG.9-12.7 (sovereignty) are each practised by a Montana unit.
    const cited = (code: string) =>
      montana.some(({ u }) => u.id.startsWith("mt-") && u.standards["us-mt"]!.split(" · ")[0].split("; ").includes(code));
    for (const code of ["SS.H.2.2", "SS.H.3.1", "SS.G.4.2", "SS.CG.4.4", "SS.H.5.5", "SS.H.6-8.3", "SS.CG.9-12.7"]) {
      expect(cited(code), code).toBe(true);
    }
  });

  it("follows the Montana Social Studies Content Standards (2021) in its grade themes", () => {
    const social = (grade: string) => montana.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    // Grade 4 is Montana studies: mostly Montana's own units.
    expect(social("4").filter((id) => id.startsWith("mt-")).length).toBeGreaterThanOrEqual(5);
    expect(social("5")).toEqual(expect.arrayContaining(["mt-g5-treaties", "wa-g5-thirteen-colonies", "wa-g5-constitution"]));
    expect(social("8")).toEqual(expect.arrayContaining(["mt-g8-montana-story", "or-g8-founding-ideas", "or-g8-reconstruction"]));
    // Grade 9 is civics and government.
    expect(social("9")).toEqual(expect.arrayContaining(["mt-g9-governing-montana", "mt-g9-us-government", "ca-g9-civic-action"]));
  });

  it("cites the 2026 math standards and has no high school standard for linear inequalities", () => {
    // Pre-K cites the Early Learning Standards (`Std 4.10`), checked by the contract tests.
    const math = montana.filter(({ c }) => c.subject === "math" && c.grade !== "pk").map(({ u }) => u.standards["us-mt"]!);
    expect(math.every((s) => /^MT\./.test(s))).toBe(true);
    expect(montana.some(({ u }) => u.id === "wa-g9-inequalities")).toBe(false);
  });
});
