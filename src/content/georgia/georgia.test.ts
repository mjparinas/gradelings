import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { adoptersOf } from "../adopters";
import { OTHER_STATE } from "./units/kit";

// Georgia's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Georgia's alone.

/** Every Georgia unit with its course. */
const georgia = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ga"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof georgia)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Georgia", () => {
  it("is a US framework in US English, offered to families", () => {
    const ga = getFramework("georgia");
    expect(ga.id).toBe("us-ga");
    expect(ga.country).toBe("US");
    expect(localeOf(ga)).toBe("en-US");
    expect(ga.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ga.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ga);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ga);
  });

  it("never shows Georgia families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Georgia's own units (ga-) may name other
    // places where Georgia's story calls for it (the Trail of Tears to Oklahoma, Chattanooga's railroad), and United
    // States history and civics (Grades 4, 5, 8 and 9) name states where the history does.
    const EXEMPT = new Set(["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["4", "5", "8", "9"].includes(grade);
    for (const { u, key } of georgia.filter(({ c, u }) => !u.id.startsWith("ga-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Georgia's own units about the Muscogee (Creek) and Cherokee are written for Georgia. Treaties alone aren't a sign
    // (adopted civics units ask about the Treaty of Paris), and neither is "Native nations" in a general unit about
    // European explorers.
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of georgia.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Georgia studies in its own units, which carry only Georgia standards", () => {
    const own = georgia.filter(({ u }) => u.id.startsWith("ga-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ga-k-my-state", "ga-g2-creek-cherokee", "ga-g8-first-peoples-colony", "ga-g8-governing-georgia", "ga-g9-georgia-local-government", "ga-g3-georgia-habitats"]),
    );
    for (const { u, key } of own) {
      // States that adopt Georgia's units (their contracts' adoptsFrom) add their own standards to the shared unit.
      const others = Object.keys(u.standards).filter((k) => k !== "us-ga" && !adoptersOf("us-ga").includes(k));
      expect(u.standards["us-ga"] ? others : ["no us-ga"], `${key} carries only Georgia standards`).toEqual([]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Georgia Studies in 8th grade, world regions in 6th and 7th, and civics in 9th", () => {
    const social = (grade: string) => georgia.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("8").filter((id) => id.startsWith("ga-g8-")).length).toBeGreaterThanOrEqual(8);
    expect(social("6")).toEqual(expect.arrayContaining(["ga-g6-latin-america", "ga-g6-europe", "ga-g6-australia"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ga-g7-africa", "ga-g7-southwest-asia", "ga-g7-southern-eastern-asia"]));
    expect(social("9")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "ga-g9-congress-president", "ga-g9-money-basics"]));
  });
});
