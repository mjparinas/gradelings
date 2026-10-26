import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ics } from "./cite";

export { ics };

// Helpers shared by the Idaho grade files. An Idaho standard cites the Idaho Content Standards (mathematics, English
// language arts and science 2022; social studies 2024, revised 2025), then a short plain description. The contract suite
// checks every citation against docs/research/idaho/outcomes.json.
//
// Most Idaho units are shared: BC units as they are (`share`), and the other US states' and the provinces' units copied
// with Idaho standards (`adopt`). Math and English language arts follow the Common Core placement other states use.
// Science follows Idaho's grade standards in Kindergarten to 5th grade and places the middle school band (MS-LS-2.1)
// across Grades 6 to 8. Social studies follows Idaho's grade content: Idaho history and government in 4th grade, early
// United States history in 5th and 8th, world geography and history in 6th and 7th, and American government and
// economics in 9th. Units are shown to Idaho families in US English by src/content/locale.ts. Idaho's own units (`id-`
// ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Idaho uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Idaho grade. `pool` is, per subject, the unit files Idaho copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function idahoGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-id",
  name: "Idaho",
  cite: (codes, text) => ics(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
