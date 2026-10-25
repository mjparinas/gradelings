import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Massachusetts's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Massachusetts's alone.

/** Every Massachusetts unit with its course. */
const massachusetts = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ma"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof massachusetts)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Massachusetts", () => {
  it("is a US framework in US English, offered to families", () => {
    const ma = getFramework("massachusetts");
    expect(ma.id).toBe("us-ma");
    expect(ma.country).toBe("US");
    expect(localeOf(ma)).toBe("en-US");
    expect(ma.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ma.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ma);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ma);
  });

  it("never shows Massachusetts families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Massachusetts's own units (ma-) may name other
    // places where New England's story calls for it (Maine, once part of Massachusetts, and its neighbors), Grade 4
    // studies the regions and states of the United States, and United States history and civics (Grades 3, 5, 8 and 9)
    // name states where the history does. The Grade 9 rhetoric unit quotes the "Letter from Birmingham Jail".
    const EXEMPT = new Set(["ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["3", "4", "5", "8", "9"].includes(grade);
    for (const { u, key } of massachusetts.filter(({ c, u }) => !u.id.startsWith("ma-g") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal or California Indian units", () => {
    // Massachusetts's own units about the Native Peoples of New England are written for Massachusetts. Treaties alone
    // aren't a sign (adopted history units ask about the Treaty of Paris), and neither is "Native nations" in a general
    // unit about European explorers.
    const words = /\b(Tribes?|Tribal)\b|California Indian/;
    for (const { u, key } of massachusetts.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh)-/.test(u.id))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Massachusetts studies in its own units, which carry only Massachusetts standards", () => {
    const own = massachusetts.filter(({ u }) => u.id.startsWith("ma-g"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ma-gk-my-state", "ma-g3-plymouth", "ma-g3-massachusetts-bay", "ma-g3-revolution", "ma-g8-governing-massachusetts", "ma-g9-massachusetts-history"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Massachusetts standards`).toEqual(["us-ma"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Massachusetts and New England in 3rd grade, civics in 8th and United States History I in 9th", () => {
    const social = (grade: string) => massachusetts.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("ma-g")).length).toBeGreaterThanOrEqual(5);
    expect(social("4")).toEqual(expect.arrayContaining(["ma-g4-us-regions", "ma-g4-first-peoples"]));
    expect(social("6")).toEqual(expect.arrayContaining(["wa-g6-mesopotamia-egypt", "ma-g6-central-america-caribbean"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ca-g6-ancient-india", "wa-g6-greece-rome", "ma-g7-asia-geography"]));
    expect(social("8")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "ma-g8-two-constitutions", "ma-g8-governing-massachusetts"]));
    expect(social("9")).toEqual(expect.arrayContaining(["wa-g5-road-to-revolution", "ca-g8-civil-war", "ma-g9-massachusetts-history"]));
  });
});
