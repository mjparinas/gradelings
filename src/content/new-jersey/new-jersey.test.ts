import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// New Jersey's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is New Jersey's alone.

/** Every New Jersey unit with its course. */
const newJersey = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-nj"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof newJersey)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("New Jersey", () => {
  it("is a US framework in US English, offered to families", () => {
    const nj = getFramework("new-jersey");
    expect(nj.id).toBe("us-nj");
    expect(nj.country).toBe("US");
    expect(localeOf(nj)).toBe("en-US");
    expect(nj.subjects).toEqual(["math", "language", "science", "social"]);
    expect(nj.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(nj);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nj);
  });

  it("never shows New Jersey families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. New Jersey's own units (nj-) may name other
    // places where New Jersey's story calls for it (New York City across the Hudson, Philadelphia across the Delaware,
    // Salem County), United States history and civics (Grades 5, 8 and 9) name states where the history does, and so
    // does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and capitals unit names every state
    // on purpose.
    const EXEMPT = new Set(["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of newJersey.filter(({ c, u }) => !u.id.startsWith("nj-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // New Jersey's own units about the Lenape are written for New Jersey. Other states' units about their Tribes,
    // treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    for (const { u, key } of newJersey.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches New Jersey studies in its own units, which carry only New Jersey standards", () => {
    const own = newJersey.filter(({ u }) => u.id.startsWith("nj-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "nj-g1-new-jersey-symbols",
        "nj-g3-local-government",
        "nj-g4-lenape",
        "nj-g4-revolution",
        "nj-g4-governing-new-jersey",
        "nj-g8-new-jersey-plan",
        "nj-g9-governing-new-jersey",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only New Jersey standards`).toEqual(["us-nj"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches New Jersey history in 4th grade, ancient and medieval worlds in 6th and 7th, and civics in 9th", () => {
    const social = (grade: string) => newJersey.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("nj-")).length).toBeGreaterThanOrEqual(6);
    expect(social("6")).toEqual(expect.arrayContaining(["wa-g6-mesopotamia-egypt", "wa-g6-greece-rome"]));
    expect(social("7")).toEqual(expect.arrayContaining(["medieval-europe", "islamic-world", "nj-g7-japan"]));
    expect(social("8")).toEqual(expect.arrayContaining(["nj-g8-new-jersey-and-nation", "nj-g8-new-jersey-plan"]));
    expect(social("9")).toEqual(expect.arrayContaining(["nj-g9-governing-new-jersey", "nj-g9-us-government", "nj-g9-personal-finance"]));
  });

  it("practises money with coins in Kindergarten and 1st grade, as the 2023 math standards add", () => {
    const math = (grade: string) => newJersey.filter(({ c }) => c.grade === grade && c.subject === "math").map(({ u }) => u.id);
    expect(math("k")).toContain("ny-k-coins");
    expect(math("1")).toContain("ny-g1-coins");
  });
});
