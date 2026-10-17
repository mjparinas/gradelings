import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { coursesInFramework } from "./index";
import { hashSeed, withSeed } from "./random";

// Where the shade and place question kinds are used. A unit listed here must keep producing the kind, so a
// refactor can't quietly drop the hands-on questions from a grade.
const EXPECTED: Record<string, "shade" | "place"> = {
  "ca-bc/2/math/tens-and-ones": "place",
  "ca-bc/3/math/fractions": "shade",
  "ca-bc/5/math/equivalent-fractions": "shade",
  "ca-bc/5/math/decimals": "place",
  "ca-bc/6/math/mixed-numbers-and-ratios": "place",
  "ca-bc/6/math/percents-and-budgets": "shade",
  "ca-bc/7/math/integer-add-subtract": "place",
  "ca-bc/7/math/fractions-decimals-percents": "place",
};

describe("shade and place questions", () => {
  for (const [path, kind] of Object.entries(EXPECTED)) {
    it(`${path} asks ${kind} questions`, () => {
      const [framework, grade, subject, unitId] = path.split("/");
      const course = coursesInFramework(COURSES, framework as never).find((c) => String(c.grade) === grade && c.subject === subject);
      const unit = course?.units.find((u) => u.id === unitId);
      expect(unit, path).toBeDefined();
      let found = 0;
      for (let s = 0; s < 6; s++)
        for (const difficulty of [1, 2, 3] as const)
          for (const q of withSeed(hashSeed(`${path}:${s}:${difficulty}`), () => unit!.generate({ difficulty })))
            if (q.kind === kind) found++;
      expect(found).toBeGreaterThan(0);
    });
  }
});
