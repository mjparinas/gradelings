import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { fl } from "./cite";

export { fl };

// Helpers shared by the Florida grade files. A Florida standard cites the benchmarks of the Florida Department of Education
// (B.E.S.T. Mathematics "MA.4.NSO.1.1", B.E.S.T. English Language Arts "ELA.4.R.1.1", the Next Generation Sunshine State
// Standards for Science "SC.4.L.16.1" and Social Studies "SS.4.A.1.1"; Grade 9 Algebra 1 and Geometry "MA.912.AR.3.1",
// English "ELA.9.R.1.1", the 9-12 science benchmarks "SC.912.L.14.1" and World History "SS.912.W.1.1"), then a short plain
// description. The framework contract checks every code against docs/research/florida/outcomes.json.
//
// Most Florida units are shared: BC units as they are (`share`), and other frameworks' units copied with Florida
// standards (`adopt`). Units are written in the app's house style and shown to Florida families in US English by
// src/content/locale.ts. Florida's own units (`fl-` ids) come from ./units.

/** One plan entry: a unit from another framework that Florida uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Florida grade. `pool` is, per subject, the unit files Florida copies from in this grade (./pools/<subject>-<grade>.ts,
 * so a grade's download carries only those files). A copy keeps the original's id and questions, so progress carries
 * over. `own` is the grade's own units (./units/own-<grade>.ts).
 */
export function floridaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-fl",
  name: "Florida",
  cite: (codes, text) => fl(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
