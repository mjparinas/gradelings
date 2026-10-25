import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { nca } from "./cite";

export { nca };

// Helpers shared by the North Carolina grade files. A North Carolina standard cites the North Carolina Standard Course
// of Study (the 2023 mathematics standards, the 2017 English language arts standards, the 2023 science standards and
// the 2021 social studies standards), then a short plain description. The contract suite checks every citation against
// docs/research/north-carolina/outcomes.json.
//
// Most North Carolina units are shared: BC units as they are (`share`), and the other US states' and the provinces'
// units copied with North Carolina standards (`adopt`). North Carolina's math and English language arts standards are
// built on the Common Core with North Carolina's own numbering, so the placement follows Illinois's (which uses the
// Common Core) with North Carolina's codes; science and social studies follow North Carolina's own grade placement.
// Units are shown to North Carolina families in US English by src/content/locale.ts. North Carolina's own units
// (`nc-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that North Carolina uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One North Carolina grade. `pool` is, per subject, the unit files North Carolina copies from in this grade (listed in
 * each grade file, so its download carries only those files). A copy keeps the original's id and questions, so
 * progress carries over.
 */
export function northCarolinaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-nc",
  name: "North Carolina",
  cite: (codes, text) => nca(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
