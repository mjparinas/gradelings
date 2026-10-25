import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { sca } from "./cite";

export { sca };

// Helpers shared by the South Carolina grade files. A South Carolina standard cites the South Carolina College- and
// Career-Ready Standards of the South Carolina Department of Education (Mathematics 2025, "4.NR.1.2"; English Language
// Arts 2023, "ELA.4.AOR.1.2"; Science 2021, "4-PS3-1", middle school by grade, "7-PS1-1"; Social Studies 2019, "4.2.CX",
// Grade 3 and 7 by indicator, "3.1.2.AG"; Grade 9 Algebra 1 "A1.PAFR.2.3", English 1 "ELA.E1.AOR.2.1", Biology 1, Chemistry
// and Physics "B-LS1-1", "C-PS1-1", "P-PS2-1", United States Government "USG.2.CC" and Economics and Personal Finance
// "EPF.3.ER"), then a short plain description. The framework contract checks every code against
// docs/research/south-carolina/outcomes.json.
//
// Most South Carolina units are shared: BC units as they are (`share`), and other frameworks' units copied with South
// Carolina standards (`adopt`). Units are written in the app's house style and shown to South Carolina families in US
// English by src/content/locale.ts. South Carolina's own units (`sc-` ids) come from ./units.

/** One plan entry: a unit from another framework that South Carolina uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One South Carolina grade. `pool` is, per subject, the unit files South Carolina copies from in this grade
 * (./pools/<subject>-<grade>.ts, so a grade's download carries only those files). A copy keeps the original's id and
 * questions, so progress carries over. `own` is the grade's own units (./units/own-<grade>.ts).
 */
export function southCarolinaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-sc",
  name: "South Carolina",
  cite: (codes, text) => sca(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
