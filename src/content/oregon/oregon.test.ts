import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "../frameworks";
import { localeOf, questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";

// Oregon's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Oregon's alone.

/** Every Oregon unit with its course. */
const oregon = COURSES.flatMap((c) => c.units.filter((u) => u.standards["us-or"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));

describe("Oregon", () => {
  it("is a US framework in US English, offered to families", () => {
    const or = getFramework("oregon");
    expect(or.id).toBe("us-or");
    expect(or.country).toBe("US");
    expect(localeOf(or)).toBe("en-US");
    expect(or.subjects).toEqual(["math", "language", "science", "social"]);
    expect(or.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(FRAMEWORKS).toContain(or);
    expect(UPCOMING_FRAMEWORKS).not.toContain(or);
  });

  it("never shows Oregon families a unit about Washington State", () => {
    // George Washington and Washington, D.C. are fine; "Washington" as a state is not.
    const state = /Washington(?!,? D\.?C\.?)(?<!George Washington)/;
    for (const { u, key } of oregon) {
      const text = [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n");
      const hit = text.split("\n").find((line) => state.test(line.replace(/George Washington/g, "")));
      expect(hit ?? "", `${key} mentions Washington State`).toBe("");
    }
  });

  it("never borrows another state's Tribal units", () => {
    // Oregon's Tribal History/Shared History is about Oregon's nine Tribes; Washington's Tribal units stay Washington's.
    const words = /\b(Tribe|Tribal|Native|treaty|treaties)\b/i;
    for (const { u, key } of oregon.filter(({ u }) => u.id.startsWith("wa-"))) {
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      expect(words.test(text) ? key : "", `${key} is a Washington unit about Tribes`).toBe("");
    }
  });
});
