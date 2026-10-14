import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { nys } from "./cite";

export { nys };

// Helpers shared by the New York grade files. A New York standard cites the official codes from NYSED's standards
// (NYS Next Generation Mathematics and English Language Arts Learning Standards, NYS P-12 Science Learning Standards,
// NYS K-12 Social Studies Framework), then a short plain description. The framework contract checks every code against
// docs/research/new-york/outcomes.json.
//
// Most New York units are shared: BC units as they are (`share`), and other frameworks' units copied with New York
// standards (`adopt`). Units are written in the app's house style and shown to New York families in US English by
// src/content/locale.ts. New York's own units (`ny-` ids) come from ./units.

/** One plan entry: a unit from another framework that New York uses, the codes it practises and what they say. */
export type Entry = readonly [
  id: string,
  kind: "share" | "adopt",
  codes: string,
  text: string,
];

/**
 * One New York grade. `pool` is, per subject, the unit files New York copies from in this grade (./pools/<subject>-<grade>.ts,
 * so a grade's download carries only those files). A copy keeps the original's id and questions, so progress carries
 * over. `own` is the grade's own units (./units/own-<grade>.ts).
 */
export function newYorkGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ny",
  name: "New York",
  cite: (codes, text) => nys(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
