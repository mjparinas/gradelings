import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { research } from "../contract";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";

// California's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is California's alone.

/** Every California unit with its course. */
const california = COURSES.flatMap((c) =>
  c.units
    .filter((u) => u.standards["us-ca"])
    .map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) =>
      withSeed(seed * 101 + difficulty, () => generate({ difficulty })),
    ),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof california)[number]["u"]) =>
  [
    u.title,
    u.blurb,
    u.parentNote ?? "",
    ...sampleOf((o) => u.generate(o)).map(questionText),
  ]
    .join("\n")
    .split("\n");

describe("California", () => {
  it("is a US framework in US English, offered to families", () => {
    const ca = getFramework("california");
    expect(ca.id).toBe("us-ca");
    expect(ca.country).toBe("US");
    expect(localeOf(ca)).toBe("en-US");
    expect(ca.subjects).toEqual(["math", "language", "science", "social"]);
    expect(ca.scoringFor("4").levels.map((l) => l.label)).toEqual([
      "Beginning",
      "Approaching",
      "Meeting",
      "Exceeding",
    ]);
    expect(FRAMEWORKS).toContain(ca);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ca);
  });

  it("never shows California families a unit about Washington State or Oregon", () => {
    // George Washington, Martha Washington and Washington, D.C. are fine, and so is the Oregon Trail as US history.
    // The 50 states and capitals unit names every state, Washington and Oregon among them.
    const ALL_STATES = new Set(["or-g5-states-capitals"]);
    const other = /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)/;
    for (const { u, key } of california.filter(
      ({ u }) => !ALL_STATES.has(u.id),
    )) {
      const hit = linesOf(u).find((line) =>
        other.test(line.replace(/(George|Martha) Washington/g, "")),
      );
      expect(hit ?? "", `${key} mentions Washington State or Oregon`).toBe("");
    }
  });

  it("never borrows Washington's or Oregon's Tribal units", () => {
    // California's own units about California Indian nations are written for California; Washington's and Oregon's
    // Tribal units (and any of their units about Tribes or treaties) stay theirs.
    const words = /\b(Tribes?|Tribal|treaty|treaties)\b|\bNative\b/;
    for (const { u, key } of california.filter(({ u }) =>
      /^(wa|or)-/.test(u.id),
    )) {
      const text = sampleOf((o) => u.generate(o))
        .map(questionText)
        .join("\n");
      expect(
        words.test(text) ? key : "",
        `${key} is a Washington or Oregon unit about Tribes`,
      ).toBe("");
    }
  });

  it("has a unit for every standard a child can practise in the app", () => {
    const outcomes = research<Record<string, { idx: string; courses?: string[] }[]>>("california/outcomes.json");
    // Left out on purpose: writing, speaking and listening, reading fluency and "read a range of texts" need free text or
    // voice from the child, which the app never takes. Grade 9 science covers every high school expectation, Living
    // Earth's and those taught in Chemistry in the Earth System and Physics of the Universe.
    const practisable = (key: string, o: { idx: string }) =>
      !key.endsWith("/language") ||
      (!/^(W|SL)\./.test(o.idx) && !/^RF\.\w+\.4$/.test(o.idx) && !/^R[LI]\.[\w-]+\.10$/.test(o.idx));
    const cited = new Map<string, Set<string>>();
    for (const { c, u } of california) {
      const key = `${c.grade}/${c.subject}`;
      const set = cited.get(key) ?? new Set<string>();
      for (const code of u.standards["us-ca"]!.split(" · ")[0].split("; ")) set.add(code);
      cited.set(key, set);
    }
    const missing = Object.entries(outcomes).flatMap(([key, list]) => {
      const set = [...(cited.get(key) ?? [])];
      // A standard counts as covered when one of its numbered parts is cited (social studies "4.2" by "4.2.1").
      return list
        .filter((o) => practisable(key, o) && !set.some((c) => c === o.idx || c.startsWith(`${o.idx}.`)))
        .map((o) => `${key} ${o.idx}`);
    });
    expect(missing).toEqual([]);
  });
});
