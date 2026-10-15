import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ark } from "./cite";

export { ark };

// Helpers shared by the Arkansas grade files. An Arkansas standard cites the Arkansas Academic Standards of the Division of
// Elementary and Secondary Education (Mathematics 2023, "4.NPV.3"; English Language Arts 2023, "4.RC.8.RL"; the K-12
// Science Standards, "4-PS3-1", middle school by grade, "7-PS1-1"; Social Studies 2022, "H.1.4.1"; Grade 9 Algebra I
// "A1.LFE.3", the integrated high school science courses "BI-LS1-1", "PSI-PS2-1", and Civics "C.3.CIV.5"), then a short
// plain description. The framework contract checks every code against docs/research/arkansas/outcomes.json.
//
// Most Arkansas units are shared: BC units as they are (`share`), and other frameworks' units copied with Arkansas
// standards (`adopt`). Units are written in the app's house style and shown to Arkansas families in US English by
// src/content/locale.ts. Arkansas's own units (`ar-` ids) come from ./units.

/** One plan entry: a unit from another framework that Arkansas uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Arkansas grade. `pool` is, per subject, the unit files Arkansas copies from in this grade (./pools/<subject>-<grade>.ts,
 * so a grade's download carries only those files). A copy keeps the original's id and questions, so progress carries
 * over. `own` is the grade's own units (./units/own-<grade>.ts).
 */
export function arkansasGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ar",
  name: "Arkansas",
  cite: (codes, text) => ark(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
