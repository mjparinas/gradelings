import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Wisconsin's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Wisconsin's alone.

/** Every Wisconsin unit with its course. */
const wisconsin = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-wi"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof wisconsin)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Wisconsin", () => {
  it("is a US framework in US English, offered to families", () => {
    const wi = getFramework("wisconsin");
    expect(wi.id).toBe("us-wi");
    expect(wi.country).toBe("US");
    expect(localeOf(wi)).toBe("en-US");
    expect(wi.subjects).toEqual(["math", "language", "science", "social"]);
    expect(wi.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(wi);
    expect(UPCOMING_FRAMEWORKS).not.toContain(wi);
  });

  it("never shows Wisconsin families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Wisconsin's own units (wi-) may name other
    // places where Wisconsin's story calls for it (its neighbors Illinois and Minnesota), United States history and civics
    // (Grades 5, 8 and 9) name states where the history does (Spanish Florida, the Alaska Purchase, the Montgomery bus
    // boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and capitals unit
    // names every state on purpose.
    const EXEMPT = new Set(["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of wisconsin.filter(({ c, u }) => !u.id.startsWith("wi-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Wisconsin's own units about the First Nations of Wisconsin are written for Wisconsin. Other states' units about
    // their Tribes, treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    for (const { u, key } of wisconsin.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh|nj|in)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Wisconsin studies in its own units, which carry only Wisconsin standards", () => {
    const own = wisconsin.filter(({ u }) => u.id.startsWith("wi-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["wi-g1-wisconsin-symbols", "wi-g4-first-nations", "wi-g4-governing-wisconsin", "wi-g8-constitutions", "wi-g9-governing-wisconsin"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Wisconsin standards`).toEqual(["us-wi"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Wisconsin studies in 4th grade and the constitutions in 8th grade", () => {
    const social = (grade: string) => wisconsin.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("wi-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("wi-g8-constitutions");
    expect(social("9")).toEqual(expect.arrayContaining(["wi-g9-governing-wisconsin", "wi-g9-us-government"]));
  });
});
