import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { des } from "./cite";

export { des };

// Helpers shared by the Delaware grade files. A Delaware standard cites Delaware's standards
// (mathematics and English language arts 2010, the Common Core; science 2013, the Next Generation Science Standards;
// social studies 2018, the Delaware Standards for Civics, Economics, Geography and History), then a short plain description. The contract suite checks every
// citation against docs/research/delaware/outcomes.json.
//
// Most Delaware units are shared: BC units as they are (`share`), and the other US states' and the provinces'
// units copied with Delaware standards (`adopt`). Math, English language arts and science follow Michigan's (and
// so California's) placement, because these states teach the Common Core and the Next Generation Science Standards with
// one Grades 6-8 science band. Social studies places units within Delaware's grade clusters. Units are shown to
// Delaware families in US English by src/content/locale.ts. Delaware's own units (`de-` ids) come from the grade's
// own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Delaware uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Delaware grade. `pool` is, per subject, the unit files Delaware copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function delawareGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-de",
  name: "Delaware",
  cite: (codes, text) => des(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
