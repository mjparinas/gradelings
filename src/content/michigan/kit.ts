import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { mic } from "./cite";

export { mic };

// Helpers shared by the Michigan grade files. A Michigan standard cites the Michigan K-12 Standards (mathematics and
// English language arts 2010, the Common Core; science 2015, the Next Generation Science Standards; social studies
// 2019), then a short plain description. The contract suite checks every citation against
// docs/research/michigan/outcomes.json.
//
// Most Michigan units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Michigan standards (`adopt`). Math, English language arts and science follow California's placement,
// because both states teach the Common Core and the Next Generation Science Standards; Michigan's citations replace
// California's. Units are shown to Michigan families in US English by src/content/locale.ts. Michigan's own units
// (`mi-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Michigan uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Michigan grade. `pool` is, per subject, the unit files Michigan copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function michiganGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-mi",
  name: "Michigan",
  cite: (codes, text) => mic(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
