import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { vts } from "./cite";

export { vts };

// Helpers shared by the Vermont grade files. A Vermont standard cites Vermont's standards (mathematics and English
// language arts 2010, the Common Core; science 2013, the Next Generation Science Standards; social studies 2017, the
// College, Career, and Civic Life (C3) Framework for Social Studies State Standards), then a short plain description.
// The contract suite checks every citation against docs/research/vermont/outcomes.json.
//
// Most Vermont units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Vermont standards (`adopt`). Math, English language arts and science follow Michigan's (and so
// California's) placement, because these states teach the Common Core and the Next Generation Science Standards with
// one Grades 6-8 science band. Social studies follows the Agency of Education's Vermont Framework for K-8 Social
// Studies, grade by grade. Units are shown to Vermont families in US English by src/content/locale.ts. Vermont's own
// units (`vt-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Vermont uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Vermont grade. `pool` is, per subject, the unit files Vermont copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function vermontGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-vt",
  name: "Vermont",
  cite: (codes, text) => vts(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
