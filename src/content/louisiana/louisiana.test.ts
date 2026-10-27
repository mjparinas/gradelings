import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";

// Louisiana's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Louisiana's alone.

/** Every Louisiana unit with its course. */
const louisiana = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-la"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3].flatMap((seed) =>
    ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))),
  );

/** Every line a unit shows: title, blurb, parent note and a spread of its questions. */
const linesOf = (u: (typeof louisiana)[number]["u"]) =>
  [u.title, u.blurb, u.parentNote ?? "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");

describe("Louisiana", () => {
  it("teaches Louisiana studies in its own units", () => {
    const own = louisiana.filter(({ u }) => u.id.startsWith("la-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["la-k-louisiana-traditions", "la-g1-louisiana-regions", "la-g3-big-events", "la-g4-poverty-point", "la-g6-colonial-louisiana", "la-g7-civil-war-louisiana", "la-g8-louisiana-1900s", "la-g9-louisiana-government"]),
    );
  });

  it("teaches Louisiana in 1st grade, the ancient world in 4th, colonial Louisiana in 6th and civics in high school", () => {
    const social = (grade: string) => louisiana.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("1").filter((id) => id.startsWith("la-")).length).toBeGreaterThanOrEqual(5);
    expect(social("4")).toEqual(expect.arrayContaining(["wa-g6-mesopotamia-egypt", "ca-g6-greece-rome", "la-g4-poverty-point"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ca-g5-thirteen-colonies", "la-g6-colonial-louisiana", "la-g6-spanish-louisiana"]));
    expect(social("9")).toEqual(expect.arrayContaining(["ca-g9-three-branches", "la-g9-louisiana-government"]));
  });

  it("says “the Gulf” in its own units, never naming it", () => {
    for (const { u, key } of louisiana.filter(({ u }) => u.id.startsWith("la-"))) {
      expect(linesOf(u).find((line) => /Gulf of (Mexico|America)/.test(line)) ?? "", key).toBe("");
    }
  });
});
