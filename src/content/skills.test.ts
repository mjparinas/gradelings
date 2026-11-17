import { describe, expect, it } from "vitest";
import { checkQuestion } from "./fairness/question";
import { COURSES } from "./all";
import { hashSeed, withSeed } from "./random";

// Skills are narrower practice inside a unit (Grade 3 math is the pilot). Every skill must give a full, fair, repeat-free
// set at every difficulty, because a child can practise it on its own.

const withSkills = COURSES.flatMap((c) => c.units.filter((u) => u.skills?.length).map((unit) => ({ course: c, unit })));

describe("skills", () => {
  it("exist for the Grade 3 math pilot", () => {
    const g3 = withSkills.filter((x) => x.course.grade === "3" && x.course.subject === "math");
    expect(g3.length).toBeGreaterThanOrEqual(10);
  });

  it("keep their ids: they are stored on answer events, so a skill id in use is never renamed or removed", () => {
    const ids = withSkills.flatMap(({ course, unit }) => unit.skills!.map((s) => `${course.grade}/${course.subject}/${unit.id}/${s.id}`));
    const frozen = [
      "3/math/numbers-to-1000/place-value", "3/math/numbers-to-1000/compare-order", "3/math/numbers-to-1000/number-line-more-less",
      "3/math/facts-to-20/adding-facts", "3/math/facts-to-20/subtracting-facts", "3/math/facts-to-20/fact-families",
      "3/math/add-subtract-1000/add-3-digit", "3/math/add-subtract-1000/subtract-3-digit", "3/math/add-subtract-1000/estimate-and-jump",
      "3/math/multiplication/arrays", "3/math/multiplication/equal-groups", "3/math/multiplication/times-facts",
      "3/math/division/sharing-and-grouping", "3/math/division/division-facts",
      "3/math/fractions/name-fractions", "3/math/fractions/compare-fractions", "3/math/fractions/fractions-of-sets",
      "3/math/patterns-and-equations/patterns", "3/math/patterns-and-equations/rules-and-tables", "3/math/patterns-and-equations/unknowns",
      "3/math/measuring/rulers", "3/math/measuring/units-and-estimating", "3/math/measuring/compare-and-perimeter",
      "3/math/time/read-clock", "3/math/time/elapsed-time", "3/math/time/calendar-and-units",
      "3/math/3d-objects/name-solids", "3/math/3d-objects/faces-edges-vertices",
      "3/math/graphs-and-chance/graphs", "3/math/graphs-and-chance/chance",
    ];
    for (const id of frozen) expect(ids, id).toContain(id);
  });

  it("have unique ids inside their unit and a title and blurb", () => {
    for (const { course, unit } of withSkills) {
      const ids = unit.skills!.map((s) => s.id);
      expect(new Set(ids).size, `${course.grade}/${course.subject}/${unit.id}`).toBe(ids.length);
      for (const s of unit.skills!) {
        expect(s.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        expect(s.title.length).toBeGreaterThan(3);
        expect(s.blurb.length).toBeGreaterThan(3);
      }
    }
  });

  it("make 8 fair questions with no repeated prompt at every difficulty", () => {
    for (const { course, unit } of withSkills) {
      for (const skill of unit.skills!) {
        for (const difficulty of [1, 2, 3] as const) {
          for (let n = 0; n < 6; n++) {
            const where = `${course.grade}/${course.subject}/${unit.id}/${skill.id} d${difficulty} seed ${n}`;
            const qs = withSeed(hashSeed(`skill-test:${where}`), () => skill.generate({ difficulty }));
            expect(qs.length, where).toBeGreaterThanOrEqual(6);
            expect(new Set(qs.map((q) => q.prompt + JSON.stringify(q.visual ?? null))).size, `repeat in ${where}`).toBe(qs.length);
            for (const q of qs) checkQuestion(q, course);
          }
        }
      }
    }
  });
});
