import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { geo } from "./cite";

export { geo };

// Helpers shared by the Georgia grade files. A Georgia standard cites the Georgia standards (the K-12 Mathematics
// Standards, taught from 2023-24; the K-12 English Language Arts Standards, taught from 2025-26; and the Georgia
// Standards of Excellence for science and social studies), then a short plain description. The contract suite checks
// every citation against docs/research/georgia/outcomes.json.
//
// Most Georgia units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Georgia standards (`adopt`). Georgia's math and English language arts standards are its own, not the
// Common Core, so units are matched by what each Georgia standard asks, grade by grade, and science and social studies
// follow Georgia's own grade placement. Units are shown to Georgia families in US English by src/content/locale.ts.
// Georgia's own units (`ga-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Georgia uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Georgia grade. `pool` is, per subject, the unit files Georgia copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function georgiaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ga",
  name: "Georgia",
  cite: (codes, text) => geo(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
