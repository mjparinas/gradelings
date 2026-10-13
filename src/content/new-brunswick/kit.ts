import type { Course, GradeId, SubjectId, Unit } from "../types";
import { adoptUnits, citeFor, courseOf, type CourseSpec, type Std } from "../placement";
import { overall } from "./overall";

// Helpers shared by the New Brunswick grade files. New Brunswick's curriculum has no outcome codes: a standard cites the strand
// and big idea ("Reading: Phonics"), which content.test.ts checks against docs/research/new-brunswick/outcomes.json.

export type { Std };
export { unitsOf, poolOf } from "../placement";

const CITE = citeFor("ca-nb");

/** Standards text for a unit: the citation, then a short plain description. */
export function nb(citation: string, text: string): Unit["standards"] {
  return CITE(citation, text);
}

/**
 * A New Brunswick copy of units another grade or province already has, with New Brunswick standards only (see ../placement.ts).
 * `rename` gives a copy a new id when the same id is already a different unit in this grade.
 */
export function adopt(pool: Unit[], plan: Record<string, Std>, rename: Record<string, string> = {}): Unit[] {
  return adoptUnits("New Brunswick", CITE, pool, plan, rename);
}

/** One New Brunswick course. The learning focus comes from the official course page (./overall.ts). */
export function course(grade: GradeId, subject: SubjectId, spec: CourseSpec): Course {
  return courseOf("ca-nb", CITE, grade, subject, overall(grade, subject), spec);
}
