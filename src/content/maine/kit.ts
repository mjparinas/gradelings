import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { mai } from "./cite";

export { mai };

// Helpers shared by the Maine grade files. A Maine standard cites the Maine Learning Results (math 2020, English
// language arts 2020, science and engineering 2019, social studies 2019), then a short plain description. The contract
// suite checks every citation against docs/research/maine/outcomes.json.
//
// Most Maine units are shared: BC units as they are (`share`), and the other US states' and the provinces' units copied
// with Maine standards (`adopt`). Math, English language arts and science follow California's placement, because both
// states teach the Common Core and the Next Generation Science Standards; Maine's citations replace California's. Units
// are shown to Maine families in US English by src/content/locale.ts. Maine's own units (`me-` ids) come from the
// grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Maine uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Maine grade. `pool` is, per subject, the unit files Maine copies from in this grade (listed in each grade file, so
 * its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function maineGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-me",
  name: "Maine",
  cite: (codes, text) => mai(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
