import { describe, expect, it } from "vitest";
import { checkQuestion } from "./question";
import { COURSES } from "../all";
import type { FrameworkId, GradeId } from "../types";

const RUNS = 120;

/** Every unit of every framework in one grade generates fair questions. */
export function fairnessTests(grade: GradeId) {
  describe(`curriculum content, grade ${grade}`, () => {
    for (const course of COURSES.filter((c) => c.grade === grade)) {
      describe(`${course.grade}/${course.subject}`, () => {
        it("has an overview and complete unit info for each framework", () => {
          const frameworks = new Set(course.units.flatMap((u) => Object.keys(u.standards)));
          for (const f of frameworks) expect(course.bigIdeas[f as FrameworkId]?.length ?? 0, `${f} overview`).toBeGreaterThan(0);
          for (const u of course.units) {
            expect(u.title.trim()).not.toBe("");
            expect(u.emoji.trim()).not.toBe("");
            expect(u.blurb.trim()).not.toBe("");
            expect(u.parentNote.trim()).not.toBe("");
            expect(Object.keys(u.standards).length, `${u.id} has standards`).toBeGreaterThan(0);
            for (const text of Object.values(u.standards)) expect((text ?? "").trim()).not.toBe("");
          }
        });

        it("lists shared and ordered units that exist", () => {
          const ids = new Set(course.units.map((u) => u.id));
          for (const id of Object.keys(course.shares ?? {})) expect(ids.has(id), `shared unit ${id}`).toBe(true);
          for (const order of Object.values(course.order ?? {})) for (const id of order ?? []) expect(ids.has(id), `ordered unit ${id}`).toBe(true);
        });

        for (const unit of course.units) {
          it(`${unit.id} generates fair questions`, () => {
            for (let run = 0; run < RUNS; run++) {
              const difficulty = ((run % 3) + 1) as 1 | 2 | 3;
              const qs = unit.generate({ difficulty });
              expect(qs.length).toBeGreaterThanOrEqual(6);
              expect(qs.length).toBeLessThanOrEqual(10);
              qs.forEach((q) => checkQuestion(q, course));
            }
          });
        }
      });
    }
  });
}
