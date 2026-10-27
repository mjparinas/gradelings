import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ris } from "./cite";

export { ris };

// Helpers shared by the Rhode Island grade files. A Rhode Island standard cites Rhode Island's standards (mathematics
// and English language arts 2010, the Common Core; science 2013, the Next Generation Science Standards; social studies
// 2023, the Rhode Island Social Studies Standards), then a short plain description. The contract suite checks every
// citation against docs/research/rhode-island/outcomes.json.
//
// Most Rhode Island units are shared: BC units as they are (`share`), and the other US states' and the provinces'
// units copied with Rhode Island standards (`adopt`). Math, English language arts and science follow Michigan's (and
// so California's) placement, because these states teach the Common Core and the Next Generation Science Standards
// with one Grades 6-8 science band. Social studies follows Rhode Island's grade themes. Units are shown to Rhode Island
// families in US English by src/content/locale.ts. Rhode Island's own units (`ri-` ids) come from the grade's own file
// in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Rhode Island uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Rhode Island grade. `pool` is, per subject, the unit files Rhode Island copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function rhodeIslandGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ri",
  name: "Rhode Island",
  cite: (codes, text) => ris(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
