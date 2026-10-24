import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ill } from "./cite";

export { ill };

// Helpers shared by the Illinois grade files. An Illinois standard cites the Illinois Learning Standards (mathematics and
// English language arts 2010, the Common Core; science 2014, the Next Generation Science Standards; social science
// 2016), then a short plain description. The contract suite checks every citation against
// docs/research/illinois/outcomes.json.
//
// Most Illinois units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Illinois standards (`adopt`). Math, English language arts and science follow California's placement,
// because both states teach the Common Core and the Next Generation Science Standards; Illinois's citations replace
// California's. Units are shown to Illinois families in US English by src/content/locale.ts. Illinois's own units
// (`il-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Illinois uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Illinois grade. `pool` is, per subject, the unit files Illinois copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function illinoisGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-il",
  name: "Illinois",
  cite: (codes, text) => ill(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
