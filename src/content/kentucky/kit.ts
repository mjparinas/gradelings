import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { kyc } from "./cite";

export { kyc };

// Helpers shared by the Kentucky grade files. A Kentucky standard cites the Kentucky Academic Standards (mathematics
// 2019; reading and writing 2025; science 2022, built on the Next Generation Science Standards; social studies 2022),
// then a short plain description. The contract suite checks every citation against
// docs/research/kentucky/outcomes.json.
//
// Most Kentucky units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Kentucky standards (`adopt`). Math, reading and writing, and science in Kindergarten to Grade 5 follow
// California's placement, because Kentucky's math and reading standards grew out of the Common Core and its science
// out of the Next Generation Science Standards; Kentucky's citations replace California's. Units are shown to Kentucky
// families in US English by src/content/locale.ts. Kentucky's own units (`ky-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Kentucky uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Kentucky grade. `pool` is, per subject, the unit files Kentucky copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function kentuckyGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ky",
  name: "Kentucky",
  cite: (codes, text) => kyc(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
