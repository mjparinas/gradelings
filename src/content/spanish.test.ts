import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { coursesInFramework } from "./index";
import { REGISTRY } from "./registry";
import { withSeed } from "./random";
import type { GradeId } from "./types";

// The shared Spanish course (src/content/spanish.ts): one course per grade from 3 to 9, offered by every framework.
// Fairness, depth, citations and lessons are checked with every other course; these are the rules that are Spanish's own.

const SPANISH_GRADES: GradeId[] = ["3", "4", "5", "6", "7", "8", "9"];
const spanish = COURSES.filter((c) => c.subject === "spanish");

describe("the Spanish course", () => {
  it("has a course in Grades 3 to 9 only", () => {
    expect(spanish.map((c) => c.grade).sort()).toEqual([...SPANISH_GRADES].sort());
  });

  it("is offered by every framework in every grade it teaches, with Big Ideas", () => {
    for (const m of REGISTRY) {
      for (const grade of SPANISH_GRADES.filter((g) => m.framework.grades.includes(g))) {
        const course = coursesInFramework(
          spanish.filter((c) => c.grade === grade),
          m.id,
        )[0];
        expect(course?.units.length ?? 0, `${m.id} Grade ${grade}`).toBeGreaterThanOrEqual(5);
        expect(course?.bigIdeas[m.id]?.length ?? 0, `${m.id} Grade ${grade} Big Ideas`).toBeGreaterThan(0);
      }
    }
  });

  it("marks the Spanish in every question so read-aloud uses a Spanish voice", () => {
    for (const c of spanish) {
      for (const u of c.units) {
        for (const difficulty of [1, 2, 3] as const) {
          for (const q of withSeed(7, () => u.generate({ difficulty }))) {
            expect(q.quoteLang, `${c.grade}/${u.id}: ${q.prompt}`).toBe("es");
            // Prompts are English, so nothing reads the whole prompt in Spanish.
            expect(q.lang, `${c.grade}/${u.id}`).toBeUndefined();
          }
        }
      }
    }
  });

  it("gives every unit a lesson that marks its Spanish", () => {
    for (const c of spanish) {
      for (const u of c.units) {
        expect(u.lesson, `${c.grade}/${u.id}`).toBeDefined();
        expect(JSON.stringify(u.lesson), `${c.grade}/${u.id}`).toContain("«");
      }
    }
  });
});
