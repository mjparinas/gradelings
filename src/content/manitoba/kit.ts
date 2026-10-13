import type { Course, GradeId, SubjectId, Unit } from "../types";
import { adoptUnits, citeFor, courseOf, type CourseSpec, type Std } from "../placement";
import { overall } from "./overall";

// Helpers shared by the Manitoba grade files. The outcome codes in a standard are checked against the
// official outcomes in content.test.ts (docs/research/manitoba/outcomes.json).

export type { Std };
export { unitsOf } from "../placement";

const CITE = citeFor("ca-mb");

/** Standards text for a unit: the citation, then a short plain description. */
export function mb(citation: string, text: string): Unit["standards"] {
  return CITE(citation, text);
}

/**
 * A Manitoba copy of units another grade or province already has, with Manitoba standards only (see ../placement.ts).
 * `rename` gives a copy a new id when the same id is already a different unit in this grade.
 */
export function adopt(pool: Unit[], plan: Record<string, Std>, rename: Record<string, string> = {}): Unit[] {
  return adoptUnits("Manitoba", CITE, pool, plan, rename);
}

/** One Manitoba course. The learning focus comes from the official course page (./overall.ts). */
export function course(grade: GradeId, subject: SubjectId, spec: CourseSpec): Course {
  return courseOf("ca-mb", CITE, grade, subject, overall(grade, subject), spec);
}
