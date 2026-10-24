import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

// Illinois's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Illinois's alone.

/** Every Illinois unit with its course. */
const illinois = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-il"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof illinois)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Illinois", () => {
  it("is a US framework in US English, offered to families", () => {
    const il = getFramework("illinois");
    expect(il.id).toBe("us-il");
    expect(il.country).toBe("US");
    expect(localeOf(il)).toBe("en-US");
    expect(il.subjects).toEqual(["math", "language", "science", "social"]);
    expect(il.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(il);
    expect(UPCOMING_FRAMEWORKS).not.toContain(il);
  });

  it("never shows Illinois families a unit about another state's places", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine. Illinois's own units (il-) may name other
    // places where Illinois's story calls for it (New Salem, the Miami nation), United States history and civics
    // (Grades 5, 8 and 9) name states where the history does (Spanish Florida, the Alaska Purchase, the Montgomery bus
    // boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and capitals unit
    // names every state on purpose.
    const EXEMPT = new Set(["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"]);
    const history = (grade: string, subject: string) => subject === "social" && ["5", "8", "9"].includes(grade);
    for (const { u, key } of illinois.filter(({ c, u }) => !u.id.startsWith("il-") && !EXEMPT.has(u.id) && !history(c.grade, c.subject))) {
      const hit = linesOf(u).find((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} names another state's places`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Illinois's own units about the Native nations of Illinois are written for Illinois. Other states' units about
    // their Tribes, treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    for (const { u, key } of illinois.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Illinois studies in its own units, which carry only Illinois standards", () => {
    const own = illinois.filter(({ u }) => u.id.startsWith("il-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["il-g1-illinois-symbols", "il-g4-first-peoples", "il-g4-governing-illinois", "il-g8-constitutions", "il-g9-governing-illinois"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Illinois standards`).toEqual(["us-il"]);
      expect(["math", "language", "social", "science"], `${key} is a core subject`).toContain(key.split("/")[1]);
    }
  });

  it("teaches Illinois history in 4th grade and the constitutions in 8th grade", () => {
    const social = (grade: string) => illinois.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("4").filter((id) => id.startsWith("il-")).length).toBeGreaterThanOrEqual(6);
    expect(social("8")).toContain("il-g8-constitutions");
    expect(social("9")).toEqual(expect.arrayContaining(["il-g9-governing-illinois", "il-g9-us-government"]));
  });
});
