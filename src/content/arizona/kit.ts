import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { az } from "./cite";

export { az };

// Helpers shared by the Arizona grade files. An Arizona standard cites the Arizona Department of Education's standards
// (mathematics and English language arts 2016, science 2018, history and social science 2018), then a short
// plain description. The contract suite checks every citation against docs/research/arizona/outcomes.json.
//
// Most Arizona units are shared: BC units as they are (`share`), and the other US states' and the provinces' units copied
// with Arizona standards (`adopt`). Math, English language arts and science follow California's placement, because
// Arizona's standards are close to the Common Core and the Next Generation Science Standards; Arizona's own codes replace
// California's. Units are shown to Arizona families in US English by src/content/locale.ts. Arizona's own units (`az-`
// ids) come from the grade's own file in ./units (own-g3.ts and so on).

/** One plan entry: a unit from another framework that Arizona uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Arizona grade. `pool` is, per subject, the unit files Arizona copies from in this grade (listed in each grade file, so
 * its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function arizonaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-az",
  name: "Arizona",
  cite: (codes, text) => az(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
