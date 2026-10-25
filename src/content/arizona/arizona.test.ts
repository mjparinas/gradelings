import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";

// Arizona's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Arizona's alone.

/** Every Arizona unit with its course. */
const arizona = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-az"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof arizona)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Arizona", () => {
  it("is a US framework in US English, offered to families", () => {
    const az = getFramework("arizona");
    expect(az.id).toBe("us-az");
    expect(az.country).toBe("US");
    expect(localeOf(az)).toBe("en-US");
    expect(az.subjects).toEqual(["math", "language", "science", "social"]);
    expect(az.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(az);
    expect(UPCOMING_FRAMEWORKS).not.toContain(az);
  });

  it("never shows Arizona families a unit about another state", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine, and so are the Oregon Trail and California in
    // United States history (the Gold Rush, statehood, the Compromise of 1850).
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    const other = /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|California(?! Gold Rush| became|, a free state)/;
    const hits = arizona
      .filter(({ u }) => !ALL_STATES.has(u.id))
      .flatMap(({ u, key }) => {
        const hit = linesOf(u).find((line) => other.test(line.replace(/(George|Martha) Washington/g, "")));
        return hit ? [`${key}: ${hit}`] : [];
      });
    expect(hits).toEqual([]);
  });

  it("never borrows a unit built around another state", () => {
    // A borrowed unit may name another state in passing (New York in the Revolution, a Texas coast in a tides question),
    // but not be written around one: units whose description names another state are copied as az- units without it.
    const states = /Texas|New York|Minnesota|Maine\b|Alaska|Alabama|Washington State|Oregon(?! Trail)|California(?! Gold Rush)/;
    const framed = arizona
      .filter(({ u }) => !u.id.startsWith("az-") && !u.standards["ca-bc"])
      .filter(({ u }) => states.test([u.title, u.blurb, u.parentNote ?? ""].join(" ")))
      .map(({ key }) => key);
    expect(framed).toEqual([]);
  });

  it("never borrows another state's Tribal units", () => {
    // Arizona's own units about its Indian Nations are written for Arizona. Other states' units about their Tribes,
    // treaties or California Indian nations stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i;
    const borrowed = arizona.filter(({ u }) => /^(wa|or|ca|me|tx|ny|mn|ak|al)-/.test(u.id));
    const tribal = borrowed.filter(({ u }) => words.test([u.id, u.title, u.blurb, u.parentNote ?? ""].join(" "))).map(({ key }) => key);
    expect(tribal).toEqual([]);
  });

  it("teaches Arizona studies and Arizona government in its own units", () => {
    const own = arizona.filter(({ u }) => u.id.startsWith("az-"));
    const ids = own.map(({ u }) => u.id);
    expect(ids).toEqual(
      expect.arrayContaining(["az-g3-indian-nations", "az-g3-governing-arizona", "az-g9-arizona-constitution", "az-g9-civics-test"]),
    );
    for (const { u, key } of own) {
      // Florida, Pennsylvania, Indiana, Virginia, South Carolina and Wisconsin may copy Arizona's units, so they can carry their own standards beside Arizona's.
      expect(Object.keys(u.standards).filter((f) => f !== "us-fl" && f !== "us-pa" && f !== "us-in" && f !== "us-va" && f !== "us-sc" && f !== "us-wi"), `${key} carries only Arizona standards`).toEqual(["us-az"]);
    }
  });
});
