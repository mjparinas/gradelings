import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";

// Alaska's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Alaska's alone.

/** Every Alaska unit with its course. */
const alaska = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ak"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof alaska)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Alaska", () => {
  it("is a US framework in US English, offered to families", () => {
    const ak = getFramework("alaska");
    expect(ak.id).toBe("us-ak");
    expect(ak.country).toBe("US");
    expect(localeOf(ak)).toBe("en-US");
    expect(ak.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ak.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(ak);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ak);
  });

  it("never shows Alaska families a unit about Washington State, Oregon or California", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine, and so are the Oregon Trail and California in
    // United States history (the Gold Rush, statehood, the Compromise of 1850).
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    const other = /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|California(?! Gold Rush| became|, a free state)/;
    for (const { u, key } of alaska.filter(({ u }) => !ALL_STATES.has(u.id))) {
      const hit = linesOf(u).find((line) => other.test(line.replace(/(George|Martha) Washington/g, "")));
      expect(hit ?? "", `${key} mentions Washington State, Oregon or California`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Alaska's own units about Alaska Native peoples are written for Alaska. Other states' units about their Tribes,
    // treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    for (const { u, key } of alaska.filter(({ u }) => /^(wa|or|ca|me|tx|ny)-/.test(u.id))) {
      const about = [u.id, u.title, u.blurb, u.parentNote ?? ""].join(" ");
      expect(words.test(about) ? key : "", `${key} is another state's unit about Tribes`).toBe("");
    }
  });

  it("teaches Alaska studies in its own units", () => {
    const own = alaska.filter(({ u }) => u.id.startsWith("ak-"));
    const ids = own.map(({ u }) => u.id);
    expect(ids).toEqual(
      expect.arrayContaining(["ak-g3-alaska-native-cultures", "ak-g6-alaska-governments", "ak-g9-alaska-constitution", "ak-g9-land-and-statehood"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Alaska standards`).toEqual(["us-ak"]);
      expect(key.split("/")[1], `${key} is a social studies unit`).toBe("social");
    }
  });
});
