import type { Course, GradeId, SubjectId, Unit } from "../types";
import { citeFor, planGrade, type OwnUnits, type PlanOptions } from "../placement";
import { overall } from "./overall";
import { PLAN } from "./plan";

// Helpers shared by the Newfoundland and Labrador grade files. The province's English program follows the Atlantic Canada
// foundation documents, which state outcomes for the end of Grade 3, Grade 6 and Grade 9 (key stages). A standard cites the
// strand (general curriculum outcome) and the key stage ("Operation sense (by Grade 6)"), which content.test.ts checks against
// docs/research/newfoundland-and-labrador/outcomes.json.

/** Standards text for a unit: the strand and key stage, then a short plain description. */
export function nl(citation: string, text: string): Unit["standards"] {
  return CITE(citation, text);
}

const CITE = citeFor("ca-nl");

export type { OwnUnits };

/**
 * One Newfoundland and Labrador grade. `pool` is the grade's courses from the provinces whose units are adopted (Ontario,
 * Manitoba, Alberta, Saskatchewan, Nova Scotia and New Brunswick). The plan in ./plan.ts lists, for each course, the units
 * used and the strand each one practises: BC units are shared as they are, and the rest are copied with Newfoundland and
 * Labrador standards only, so they never show up for another province by accident. A copy keeps the original's id and questions.
 */
export function nlGrade(grade: GradeId, pool: Course[][], own: Partial<Record<SubjectId, OwnUnits>> = {}): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const OPTIONS: PlanOptions = {
  framework: "ca-nl",
  name: "Newfoundland and Labrador",
  cite: CITE,
  plan: PLAN,
  focus: overall,
};
