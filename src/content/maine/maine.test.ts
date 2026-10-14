import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";

// Maine's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Maine's alone.

/** Every Maine unit with its course. */
const maine = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-me"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof maine)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Maine", () => {
  it("is a US framework in US English, offered to families", () => {
    const me = getFramework("maine");
    expect(me.id).toBe("us-me");
    expect(me.country).toBe("US");
    expect(localeOf(me)).toBe("en-US");
    expect(me.subjects).toEqual(["math", "language", "science", "social"]);
    expect(me.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(me);
    expect(UPCOMING_FRAMEWORKS).not.toContain(me);
  });

  it("never shows Maine families a unit about Washington State, Oregon or California", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine, and so are the Oregon Trail and California in
    // United States history (the Gold Rush, statehood, the Mexican-American War).
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    const other = /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|California(?! Gold Rush| became)/;
    for (const { u, key } of maine.filter(({ u }) => !ALL_STATES.has(u.id))) {
      const hit = linesOf(u).find((line) => other.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} mentions Washington State, Oregon or California`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Maine's own units about the Wabanaki Nations are written for Maine. Washington's, Oregon's and California's units
    // about their Tribes, treaties or California Indian nations stay theirs; a borrowed US history unit may still say
    // plainly that Native nations lived here first.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?)\b/i;
    for (const { u, key } of maine.filter(({ u }) => /^(wa|or|ca)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Maine studies and the Wabanaki Nations in its own units", () => {
    const own = maine.filter(({ u }) => u.id.startsWith("me-"));
    const ids = own.map(({ u }) => u.id);
    expect(ids).toEqual(expect.arrayContaining(["me-g1-wabanaki-traditions", "me-g4-wabanaki-nations", "me-g4-governing-maine"]));
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Maine standards`).toEqual(["us-me"]);
      expect(key.split("/")[1], `${key} is a social studies unit`).toBe("social");
    }
  });
});
