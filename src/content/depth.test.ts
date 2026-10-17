import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { FRAMEWORKS, UPCOMING_FRAMEWORKS } from "./frameworks";
import { coursesInFramework } from "./index";
import { CORE_SUBJECTS } from "./subjects";
import { hashSeed, withSeed } from "./random";
import type { Course, Question, Unit } from "./types";

// Depth checks: every course a framework offers has enough to practise, so a child doesn't see the same few
// questions over and over. A course is one framework's grade and subject. These fail when a province is left
// with a thin course; fill it with units that fit that province's curriculum (see "Content rules" in AGENTS.md).

/** Minimum units, and distinct question-and-answer pairs across them, per course. */
const MIN = {
  core: { units: 5, distinct: 250 },
  french: { units: 5, distinct: 120 },
};

/**
 * Courses allowed below the minimum for now, each with the reason. Remove a line when the course is filled.
 * Key: `framework/grade/subject`.
 */
const KNOWN_THIN: Record<string, string> = {
};

const SEEDS = 20;

/** The distinct prompt, picture and right answer combinations a unit can produce. */
function distinctPairs(key: string, unit: Unit): number {
  const seen = new Set<string>();
  for (let s = 0; s < SEEDS; s++) {
    for (const difficulty of [1, 2, 3] as const) {
      for (const q of withSeed(hashSeed(`${key}:${s}:${difficulty}`), () => unit.generate({ difficulty }))) seen.add(fingerprint(q));
    }
  }
  return seen.size;
}

function fingerprint(q: Question): string {
  const right =
    q.kind === "choice"
      ? q.choices.find((c) => c.id === q.answer)?.label
      : q.kind === "input"
        ? q.answer
        : q.kind === "build" || q.kind === "coins" || q.kind === "shade" || q.kind === "place"
          ? q.target
          : JSON.stringify(q.items);
  return `${q.prompt}|${JSON.stringify(q.visual ?? "")}|${right}`;
}

const cache = new Map<string, number>();
function courseDepth(course: Course): number {
  let total = 0;
  for (const unit of course.units) {
    const key = `${course.grade}/${course.subject}/${unit.id}`;
    if (!cache.has(key)) cache.set(key, distinctPairs(key, unit));
    total += cache.get(key)!;
  }
  return total;
}

describe("every course has enough practice", () => {
  it("meets the minimum units and distinct questions in every framework, grade and subject", () => {
    const thin: string[] = [];
    // Frameworks not offered yet are checked too, so they launch complete.
    for (const f of [...FRAMEWORKS, ...UPCOMING_FRAMEWORKS]) {
      for (const course of coursesInFramework(COURSES, f.id)) {
        const key = `${f.id}/${course.grade}/${course.subject}`;
        if (KNOWN_THIN[key]) continue;
        const min = (CORE_SUBJECTS as readonly string[]).includes(course.subject) ? MIN.core : MIN.french;
        const distinct = courseDepth(course);
        if (course.units.length < min.units || distinct < min.distinct)
          thin.push(`${key}: ${course.units.length} units, ${distinct} distinct questions (needs ${min.units} and ${min.distinct})`);
      }
    }
    expect(thin, "thin courses").toEqual([]);
  }, 120000);

  it("lists only known-thin courses that are still thin", () => {
    for (const key of Object.keys(KNOWN_THIN)) {
      const [framework, grade, subject] = key.split("/");
      const course = coursesInFramework(COURSES, framework as never).find((c) => c.grade === grade && c.subject === subject);
      expect(course, key).toBeDefined();
      const min = (CORE_SUBJECTS as readonly string[]).includes(subject) ? MIN.core : MIN.french;
      expect(course!.units.length < min.units || courseDepth(course!) < min.distinct, `${key} is no longer thin; remove it from KNOWN_THIN`).toBe(true);
    }
  });
});
