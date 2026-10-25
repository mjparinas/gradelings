import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Maryland's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Maryland's alone.

/** Every Maryland unit with its course. */
const maryland = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-md"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof maryland)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Maryland", () => {
  it("is a US framework in US English, offered to families", () => {
    const md = getFramework("maryland");
    expect(md.id).toBe("us-md");
    expect(md.country).toBe("US");
    expect(localeOf(md)).toBe("en-US");
    expect(md.subjects).toEqual(["math", "language", "science", "social"]);
    expect(md.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(md);
    expect(UPCOMING_FRAMEWORKS).not.toContain(md);
  });

  it("never shows Maryland families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Maryland's own units (md-) may name other
    // places where Maryland's story calls for it (the Mason-Dixon Line with Pennsylvania, Douglass's paper in New York),
    // and United States history and civics (Grades 4, 5, 8 and 9) name states where the history does (the colony of
    // Georgia, the Alamo, the Montgomery bus boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and
    // capitals unit names every state on purpose.
    const EXEMPT = new Set(["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["4", "5", "8", "9"].includes(grade);
    for (const { u, key } of maryland.filter(({ c, u }) => !u.id.startsWith("md-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Maryland's own units about the Native nations of Maryland are written for Maryland. Other states' units about
    // their Tribes, treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    for (const { u, key } of maryland.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh|nj|in)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Maryland studies in its own units, which carry only Maryland standards", () => {
    const own = maryland.filter(({ u }) => u.id.startsWith("md-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining([
        "md-g1-maryland-symbols",
        "md-g3-maryland-economy",
        "md-g3-early-maryland",
        "md-g4-maryland-colony",
        "md-g4-slavery-in-maryland",
        "md-g5-maryland-civil-war",
        "md-g5-civil-rights",
        "md-g8-maryland-and-nation",
        "md-g9-governing-maryland",
      ]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Maryland standards`).toEqual(["us-md"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Maryland in 3rd and 4th grade and American Government in 9th grade", () => {
    const social = (grade: string) => maryland.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("md-")).length).toBeGreaterThanOrEqual(4);
    expect(social("4").filter((id) => id.startsWith("md-")).length).toBeGreaterThanOrEqual(5);
    expect(social("9")).toEqual(expect.arrayContaining(["md-g9-governing-maryland", "md-g9-courts-and-rights", "md-g9-us-government"]));
  });
});
