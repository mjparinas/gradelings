import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ias } from "./cite";

export { ias };

// Helpers shared by the Iowa grade files. An Iowa standard cites the Iowa Academic Standards (mathematics
// and English language arts 2024, built on the Common Core; science 2025, built on the Next Generation Science Standards
// with grade-by-grade middle school standards; social studies 2026), then a short plain description. The contract suite
// checks every citation against docs/research/iowa/outcomes.json.
//
// Most Iowa units are shared: BC units as they are (`share`), and the other US states' and the provinces' units copied
// with Iowa standards (`adopt`). Math and English language arts follow the Common Core placement other states use.
// Science follows Iowa's grade standards, so the middle school units are placed by the grade Iowa names in each code
// (6-PS4-1, 7-LS2-1, 8-ESS2-5). Social studies follows Iowa's grade themes. Units are shown to Iowa families in US
// English by src/content/locale.ts. Iowa's own units (`ia-` ids) come from the grade's own file in ./units (own-g4.ts
// and so on).

/** One plan entry: a unit from another framework that Iowa uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Iowa grade. `pool` is, per subject, the unit files Iowa copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function iowaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ia",
  name: "Iowa",
  cite: (codes, text) => ias(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
