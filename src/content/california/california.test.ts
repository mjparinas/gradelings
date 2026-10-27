import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { research } from "../contract";

// California's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is California's alone.

/** Every California unit with its course. */
const california = COURSES.flatMap((c) =>
  c.units
    .filter((u) => u.standards["us-ca"])
    .map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("California", () => {
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
