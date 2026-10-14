import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ak } from "./cite";

export { ak };

// Helpers shared by the Alaska grade files. An Alaska standard cites the Alaska Department of Education and Early
// Development's standards (mathematics and English language arts 2012, science 2019, social studies 2024), then a short
// plain description. The contract suite checks every citation against docs/research/alaska/outcomes.json.
//
// Most Alaska units are shared: BC units as they are (`share`), and the other US states' and the provinces' units copied
// with Alaska standards (`adopt`). Math, English language arts and science follow California's placement, because
// Alaska's standards are close to the Common Core and the Next Generation Science Standards; Alaska's own codes replace
// California's. Units are shown to Alaska families in US English by src/content/locale.ts. Alaska's own units (`ak-`
// ids) come from the grade's own file in ./units (own-g3.ts and so on).

/** One plan entry: a unit from another framework that Alaska uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Alaska grade. `pool` is, per subject, the unit files Alaska copies from in this grade (listed in each grade file, so
 * its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function alaskaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ak",
  name: "Alaska",
  cite: (codes, text) => ak(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
