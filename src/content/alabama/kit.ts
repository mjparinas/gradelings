import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ala } from "./cite";

export { ala };

// Helpers shared by the Alabama grade files. An Alabama standard cites the content standards of the Alabama Courses of
// Study (Mathematics 2019, English Language Arts 2021, Science 2023, Social Studies 2024) by grade and number ("4.12";
// Kindergarten "K.3"; recurring English language arts standards "4.R2"; Grade 9 math "GDA.5" or "AIP.5" and Biology
// "BIO.3"), then a short plain description. The framework contract checks every code against
// docs/research/alabama/outcomes.json.
//
// Most Alabama units are shared: BC units as they are (`share`), and other frameworks' units copied with Alabama
// standards (`adopt`). Units are written in the app's house style and shown to Alabama families in US English by
// src/content/locale.ts. Alabama's own units (`al-` ids) come from ./units.

/** One plan entry: a unit from another framework that Alabama uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Alabama grade. `pool` is, per subject, the unit files Alabama copies from in this grade (./pools/<subject>-<grade>.ts,
 * so a grade's download carries only those files). A copy keeps the original's id and questions, so progress carries
 * over. `own` is the grade's own units (./units/own-<grade>.ts).
 */
export function alabamaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-al",
  name: "Alabama",
  cite: (codes, text) => ala(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
