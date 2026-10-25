import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { nvs } from "./cite";

export { nvs };

// Helpers shared by the Nevada grade files. A Nevada standard cites the Nevada Academic Content Standards (mathematics
// and English language arts 2010, the Common Core; science 2014, the Next Generation Science Standards; social studies
// 2018), then a short plain description. The contract suite checks every citation against
// docs/research/nevada/outcomes.json.
//
// Most Nevada units are shared: BC units as they are (`share`), and the other US states' and the provinces' units copied
// with Nevada standards (`adopt`). Math, English language arts and science follow Michigan's (and so California's)
// placement, because all three states teach the Common Core and the Next Generation Science Standards with one Grades
// 6-8 science band. Social studies follows Nevada's grade themes. Units are shown to Nevada families in US English by
// src/content/locale.ts. Nevada's own units (`nv-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Nevada uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Nevada grade. `pool` is, per subject, the unit files Nevada copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function nevadaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-nv",
  name: "Nevada",
  cite: (codes, text) => nvs(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
