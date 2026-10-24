import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { pa } from "./cite";

export { pa };

// Helpers shared by the Pennsylvania grade files. A Pennsylvania standard cites the codes of the Pennsylvania Department of
// Education's academic standards: the PA Core Standards for math ("CC.2.1.4.B.1") and English language arts ("CC.1.2.4.A"),
// the STEELS science standards ("3.1.4.A"; middle school "3.1.6-8.A"; high school "3.1.9-12.A") and, for social studies,
// the civics ("5.1.4.A"), economics, geography ("7.1.4.A") and history ("8.1.4.A") standards. Grade 9 math is Algebra I
// ("CC.2.2.HS.D.1"). A citation is the codes, then a short plain description. The framework contract checks every code
// against docs/research/pennsylvania/outcomes.json.
//
// Most Pennsylvania units are shared: BC units as they are (`share`), and other frameworks' units copied with Pennsylvania
// standards (`adopt`). Units are written in the app's house style and shown to Pennsylvania families in US English by
// src/content/locale.ts. Pennsylvania's own units (`pa-` ids) come from ./units.

/** One plan entry: a unit from another framework that Pennsylvania uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Pennsylvania grade. `pool` is, per subject, the unit files Pennsylvania copies from in this grade (./pools/<subject>-<grade>.ts,
 * so a grade's download carries only those files). A copy keeps the original's id and questions, so progress carries
 * over. `own` is the grade's own units (./units/own-<grade>.ts).
 */
export function pennsylvaniaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-pa",
  name: "Pennsylvania",
  cite: (codes, text) => pa(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
