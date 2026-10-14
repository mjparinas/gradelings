import type { Course, GradeId, SubjectId, Unit } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN, FOCUS } from "./plan";
import { tx } from "./cite";

export { tx };

// Helpers shared by the Texas grade files. A Texas standard cites the Texas Essential Knowledge and Skills (TEKS) by
// student expectation: the grade (K to 8) or course (A. Algebra I, E1. English I, B. Biology, GOV. United States
// Government), the knowledge and skills statement and the letter, so "4.4(A)" is 19 TAC §111.6(b)(4)(A). Then a short
// plain description. The framework contract checks every code against docs/research/texas/outcomes.json.
//
// Most Texas units are shared: BC units as they are (`share`), and Washington's, Oregon's, California's or a province's
// units copied with Texas standards (`adopt`). Texas's own units (`tx-` ids) are in ./units, including filtered copies
// of other states' units with their state-specific questions taken out. Units are shown to Texas families in US English
// by src/content/locale.ts.

/** One subject's course file in ./courses: the units it copies from (POOL) and the units written for Texas (OWN). */
export interface CourseFile {
  POOL: readonly Unit[];
  OWN: readonly Unit[];
  /** The whole course order, when the planned units then the own ones isn't right. */
  ORDER?: readonly string[];
}

/** One Texas grade, from its four subject files. */
export function texasGrade(grade: GradeId, files: Record<(typeof SUBJECTS)[number], CourseFile>): Course[] {
  const pool: Pool = {};
  const own: Partial<Record<SubjectId, OwnUnits>> = {};
  for (const s of SUBJECTS) {
    pool[s] = files[s].POOL;
    if (files[s].OWN.length || files[s].ORDER) own[s] = { units: [...files[s].OWN], order: files[s].ORDER ? [...files[s].ORDER] : undefined };
  }
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-tx",
  name: "Texas",
  cite: (codes, text) => tx(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
