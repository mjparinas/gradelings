import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Michigan's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Michigan's alone.

/** Every Michigan unit with its course. */
const michigan = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-mi"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof michigan)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Michigan", () => {
  it("is a US framework in US English, offered to families", () => {
    const mi = getFramework("michigan");
    expect(mi.id).toBe("us-mi");
    expect(mi.country).toBe("US");
    expect(localeOf(mi)).toBe("en-US");
    expect(mi.subjects).toEqual(["math", "language", "science", "social"]);
    expect(mi.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(mi);
    expect(UPCOMING_FRAMEWORKS).not.toContain(mi);
  });

  it("never shows Michigan families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Michigan's own units (mi-) may name other
    // places where Michigan's story calls for it (the Toledo War with Ohio, the Erie Canal), United States history and
    // civics (Grades 5, 8 and 9) name states where the history does (Spanish Florida, the Alaska Purchase, the
    // Montgomery bus boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and
    // capitals unit names every state on purpose.
    const EXEMPT = new Set(["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of michigan.filter(({ c, u }) => !u.id.startsWith("mi-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Michigan's own units about the Anishinaabek and Michigan's Tribes are written for Michigan. Other states' units
    // about their Tribes, treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    for (const { u, key } of michigan.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|oh)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Michigan studies in its own units, which carry only Michigan standards", () => {
    const own = michigan.filter(({ u }) => u.id.startsWith("mi-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "mi-k-flag-and-state",
        "mi-g3-michigan-land",
        "mi-g3-first-peoples",
        "mi-g4-michigan-industry",
        "mi-g8-michigan-and-the-nation",
        "mi-g9-governing-michigan",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Michigan standards`).toEqual(["us-mi"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Michigan Studies in 3rd grade, Michigan history from statehood in 4th and civics in 9th", () => {
    const social = (grade: string) => michigan.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("mi-")).length).toBeGreaterThanOrEqual(6);
    expect(social("4")).toEqual(expect.arrayContaining(["mi-g4-michigan-industry", "mi-g4-moving-to-michigan"]));
    expect(social("8")).toContain("mi-g8-michigan-and-the-nation");
    expect(social("9")).toEqual(expect.arrayContaining(["mi-g9-governing-michigan", "mi-g9-us-government", "mi-g9-personal-finance"]));
  });
});
