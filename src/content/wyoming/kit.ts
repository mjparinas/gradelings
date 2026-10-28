import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { wys } from "./cite";

export { wys };

// Helpers shared by the Wyoming grade files. A Wyoming standard cites the Wyoming Content and Performance Standards
// (English language arts 2012, the Common Core; mathematics 2023, a priority set built on the Common Core; science 2023,
// a priority set of the NGSS; social studies 2014, with the 2018 benchmarks on the Eastern Shoshone and Northern
// Arapaho), then a short plain description. The contract suite checks every citation against
// docs/research/wyoming/outcomes.json.
//
// Most Wyoming units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Wyoming standards (`adopt`). Math, English language arts and science follow Michigan's (and so
// California's) placement, keeping only units that practise a Wyoming standard, because Wyoming's 2023 math and science
// standards are priority sets. Social studies follows the order of Wyoming's grade bands. Units are shown to Wyoming
// families in US English by src/content/locale.ts. Wyoming's own units (`wy-` ids) come from the grade's own file in
// ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Wyoming uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Wyoming grade. `pool` is, per subject, the unit files Wyoming copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function wyomingGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-wy",
  name: "Wyoming",
  cite: (codes, text) => wys(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
