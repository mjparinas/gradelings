import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { kss } from "./cite";

export { kss };

// Helpers shared by the Kansas grade files. A Kansas standard cites the Kansas standards (mathematics 2017, reviewed in
// 2024; English language arts 2023; science 2013, the Next Generation Science Standards; history, government and social
// studies 2020), then a short plain description. The contract suite checks every citation against
// docs/research/kansas/outcomes.json.
//
// Most Kansas units are shared: BC units as they are (`share`), and the other US states' and the provinces' units copied
// with Kansas standards (`adopt`). Math, English language arts and science follow Michigan's (and so California's)
// placement where Kansas teaches the same skill in the same grade, because Kansas's math and English language arts
// standards grew out of the Common Core and its science standards are the Next Generation Science Standards. Social
// studies follows Kansas's grade themes. Units are shown to Kansas families in US English by src/content/locale.ts.
// Kansas's own units (`ks-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Kansas uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Kansas grade. `pool` is, per subject, the unit files Kansas copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function kansasGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ks",
  name: "Kansas",
  cite: (codes, text) => kss(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
