import type { Course, GradeId, SubjectId, Unit } from "../types";
import { citeFor, planGrade, type OwnUnits, type PlanOptions } from "../placement";
import { overall } from "./overall";
import { PLAN } from "./plan";

// Helpers shared by the Prince Edward Island grade files. A standard cites the specific curriculum outcome codes a unit
// practises ("N1; N3"), the unit title in science, or the course theme in Grades 7 and 8, which content.test.ts checks against
// docs/research/prince-edward-island/outcomes.json. Citations are joined with "; " because some science titles contain commas.

/** Standards text for a unit: the strand and key stage, then a short plain description. */
export function pe(citation: string, text: string): Unit["standards"] {
  return CITE(citation, text);
}

const CITE = citeFor("ca-pe");

export type { OwnUnits };

/**
 * One Prince Edward Island grade. `pool` is the grade's courses from the provinces whose units are adopted (Ontario,
 * Manitoba, Alberta, Saskatchewan, Nova Scotia and New Brunswick). The plan in ./plan.ts lists, for each course, the units
 * used and the strand each one practises: BC units are shared as they are, and the rest are copied with Newfoundland and
 * Labrador standards only, so they never show up for another province by accident. A copy keeps the original's id and questions.
 */
export function peGrade(grade: GradeId, pool: Course[][], own: Partial<Record<SubjectId, OwnUnits>> = {}): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const OPTIONS: PlanOptions = {
  framework: "ca-pe",
  name: "Prince Edward Island",
  cite: CITE,
  plan: PLAN,
  focus: overall,
};
