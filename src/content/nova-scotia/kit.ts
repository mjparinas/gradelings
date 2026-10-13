import type { Course, GradeId, SubjectId, Unit } from "../types";
import { adoptUnits, citeFor, courseOf, type CourseSpec, type Std } from "../placement";
import { overall } from "./overall";

// Helpers shared by the Nova Scotia grade files. The outcome codes in a standard are checked against the
// official outcomes in content.test.ts (docs/research/nova-scotia/outcomes.json).

export type { Std };
export { unitsOf, poolOf } from "../placement";

const CITE = citeFor("ca-ns");

/** Standards text for a unit: the citation, then a short plain description. */
export function ns(citation: string, text: string): Unit["standards"] {
  return CITE(citation, text);
}

/**
 * A Nova Scotia copy of units another grade or province already has, with Nova Scotia standards only (see ../placement.ts).
 * `rename` gives a copy a new id when the same id is already a different unit in this grade.
 */
export function adopt(pool: Unit[], plan: Record<string, Std>, rename: Record<string, string> = {}): Unit[] {
  return adoptUnits("Nova Scotia", CITE, pool, plan, rename);
}

/** One Nova Scotia course. The learning focus comes from the official course page (./overall.ts). */
export function course(grade: GradeId, subject: SubjectId, spec: CourseSpec): Course {
  return courseOf("ca-ns", CITE, grade, subject, overall(grade, subject), spec);
}
