import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { nds } from "./cite";

export { nds };

// Helpers shared by the North Dakota grade files. A North Dakota standard cites North Dakota's standards (mathematics
// and English language arts 2023; science 2019, built on the Next Generation Science Standards; social studies 2019),
// then a short plain description. The contract suite checks every
// citation against docs/research/north-dakota/outcomes.json.
//
// Most North Dakota units are shared: BC units as they are (`share`), and the other US states' and the provinces'
// units copied with North Dakota standards (`adopt`). Math, English language arts and science follow Michigan's (and
// so California's) placement, because North Dakota's standards grew out of the Common Core and the Next Generation
// Science Standards, with one Grades 6-8 science band. Social studies follows North Dakota's grade themes. Units are shown to North Dakota
// families in US English by src/content/locale.ts. North Dakota's own units (`nd-` ids) come from the grade's own file
// in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that North Dakota uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One North Dakota grade. `pool` is, per subject, the unit files North Dakota copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function northDakotaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-nd",
  name: "North Dakota",
  cite: (codes, text) => nds(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
