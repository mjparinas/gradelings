import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { mns } from "./cite";

export { mns };

// Helpers shared by the Minnesota grade files. A Minnesota standard cites the benchmark codes of the Minnesota K-12
// Academic Standards (Mathematics 2022, English Language Arts 2020, Science 2019, Social Studies 2021), then a short
// plain description. The framework contract checks every code against docs/research/minnesota/outcomes.json.
//
// Most Minnesota units are shared: BC units as they are (`share`), and other frameworks' units copied with Minnesota
// standards (`adopt`). Units are written in the app's house style and shown to Minnesota families in US English by
// src/content/locale.ts. Minnesota's own units (`mn-` ids) come from ./units.

/** One plan entry: a unit from another framework that Minnesota uses, the codes it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Minnesota grade. `pool` is, per subject, the unit files Minnesota copies from in this grade (./pools/<subject>-<grade>.ts,
 * so a grade's download carries only those files). A copy keeps the original's id and questions, so progress carries
 * over. `own` is the grade's own units (./units/own-<grade>.ts).
 */
export function minnesotaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-mn",
  name: "Minnesota",
  cite: (codes, text) => mns(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
