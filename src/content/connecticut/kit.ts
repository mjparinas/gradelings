import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ctcs } from "./cite";

export { ctcs };

// Helpers shared by the Connecticut grade files. A Connecticut standard cites the state's standards (the Connecticut Core
// Standards for mathematics and English language arts, the Common Core, 2010; the Next Generation Science Standards,
// 2015; the Connecticut Elementary and Secondary Social Studies Standards, 2023), then a short plain description. The
// contract suite checks every citation against docs/research/connecticut/outcomes.json.
//
// Most Connecticut units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Connecticut standards (`adopt`). Math, English language arts and science follow California's placement,
// because both states teach the Common Core and the Next Generation Science Standards; Connecticut's citations replace
// California's. Units are shown to Connecticut families in US English by src/content/locale.ts. Connecticut's own units
// (`ct-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Connecticut uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Connecticut grade. `pool` is, per subject, the unit files Connecticut copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function connecticutGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ct",
  name: "Connecticut",
  cite: (codes, text) => ctcs(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
