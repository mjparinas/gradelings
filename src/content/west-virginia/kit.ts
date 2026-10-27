import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { wvs } from "./cite";

export { wvs };

// Helpers shared by the West Virginia grade files. A West Virginia standard cites the state's West Virginia College- and
// Career-Readiness Standards (mathematics, Policy 2520.2B, 2024; English language arts, Policy 2520.1A, 2021; science,
// Policy 2520.3C, 2022; social studies, Policy 2520.4, 2024), then a short plain description. The contract suite checks
// every citation against docs/research/west-virginia/outcomes.json.
//
// Most West Virginia units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with West Virginia standards (`adopt`). Math and English language arts grew out of the Common Core and science
// out of the Next Generation Science Standards, so their placement follows Connecticut's (and so California's), with
// West Virginia's codes in place of the national ones and middle school science moved to the grades West Virginia
// teaches it. Units are shown to West Virginia families in US English by src/content/locale.ts. West Virginia's own units
// (`wv-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that West Virginia uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One West Virginia grade. `pool` is, per subject, the unit files West Virginia copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function westVirginiaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-wv",
  name: "West Virginia",
  cite: (codes, text) => wvs(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
