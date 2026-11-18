import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { hashSeed, withSeed } from "./random";
import type { Question } from "./types";

// Questions about the area of shapes made of rectangles show the shape, with the sides the prompt names, so a
// child never has to picture a floor plan from words alone (and "6 × 2 + 3 × 3" isn't handed over as a hint).

const SHAPE_PROMPT = /(L[- ]?shape|two rectangles|floor plan is split|floor is a .* rectangle plus|corner of a|corner cut away|shape made of two rectangles)/i;
const sizes = (prompt: string): number[] => [...prompt.matchAll(/(\d+) (?:cm|m|ft|in)? ?by (\d+)/g)].flatMap((m) => [Number(m[1]), Number(m[2])]);

describe("composite area questions are drawn", () => {
  const found: { unit: string; q: Question }[] = [];
  for (const course of COURSES.filter((c) => c.subject === "math")) {
    for (const unit of course.units) {
      for (let seed = 0; seed < 5; seed++) {
        for (const difficulty of [1, 2, 3] as const) {
          for (const q of withSeed(hashSeed(`joined${seed}${unit.id}`), () => unit.generate({ difficulty }))) {
            if (SHAPE_PROMPT.test(q.prompt) && /area|perimeter/i.test(q.prompt) && sizes(q.prompt).length >= 4) found.push({ unit: unit.id, q });
          }
        }
      }
    }
  }

  it("finds the questions it guards", () => {
    const units = new Set(found.map((f) => f.unit));
    for (const id of ["fl-g3-composite-area", "ny-g7-composite-area", "measure-6", "measure-8"]) expect(units, id).toContain(id);
  });

  it("gives each one a drawing whose sides are the ones in the prompt", () => {
    for (const { unit, q } of found) {
      const v = q.kind === "choice" || q.kind === "input" ? q.visual : undefined;
      expect(v?.type, `${unit}: ${q.prompt}`).toBe("joined");
      if (v?.type !== "joined") continue;
      const drawn = v.parts.flatMap((p) => (p.w === undefined ? [] : [p.w, p.h as number])).concat(v.cut ? [v.cut.w, v.cut.h] : []);
      const said = sizes(q.prompt);
      // Every pair of sides in the words is in the picture (the unknown part's sides aren't in the words).
      for (const n of said) expect(drawn, `${unit}: ${q.prompt}`).toContain(n);
    }
  });
});
