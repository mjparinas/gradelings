import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { dcs } from "./cite";

export { dcs };

// Helpers shared by the Washington, DC grade files. A DC standard cites the District's standards (mathematics and English
// language arts 2010, the Common Core; science 2013, the Next Generation Science Standards; social studies 2023, the DC
// Social Studies Standards), then a short plain description. The contract suite checks every citation against
// docs/research/washington-dc/outcomes.json.
//
// Most DC units are shared: BC units as they are (`share`), and the US states' and the provinces' units copied with DC
// standards (`adopt`). Math, English language arts and science follow Vermont's (and so Michigan's and California's)
// placement, because the District teaches the Common Core and the Next Generation Science Standards with one Grades 6-8
// science band. Social studies follows the grade themes of the DC Social Studies Standards. Units are shown to DC
// families in US English by src/content/locale.ts. The District's own units (`dc-` ids) come from the grade's own file in
// ./units (own-g3.ts and so on).

/** One plan entry: a unit from another framework that the District uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Washington, DC grade. `pool` is, per subject, the unit files DC copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function dcGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-dc",
  name: "Washington, DC",
  cite: (codes, text) => dcs(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
