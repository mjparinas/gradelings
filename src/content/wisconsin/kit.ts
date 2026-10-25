import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { wis } from "./cite";

export { wis };

// Helpers shared by the Wisconsin grade files. A Wisconsin standard cites the Wisconsin Academic Standards (mathematics
// 2021, English language arts 2020, science 2017, social studies 2018 and personal financial literacy 2020), then a
// short plain description. The contract suite checks every citation against docs/research/wisconsin/outcomes.json.
//
// Most Wisconsin units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Wisconsin standards (`adopt`). Math, English language arts and science follow California's placement,
// because Wisconsin's standards are built on the Common Core and the Next Generation Science Standards (DPI's science
// documents place the core ideas in the same grades); Wisconsin's citations replace California's. Units are shown to
// Wisconsin families in US English by src/content/locale.ts. Wisconsin's own units (`wi-` ids) come from the grade's
// own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Wisconsin uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Wisconsin grade. `pool` is, per subject, the unit files Wisconsin copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function wisconsinGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-wi",
  name: "Wisconsin",
  cite: (codes, text) => wis(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
