import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ohi } from "./cite";

export { ohi };

// Helpers shared by the Ohio grade files. A standard cites Ohio's Learning Standards (mathematics adopted 2017,
// English language arts Kindergarten to Grade 8 adopted 2026 and Grades 9 to 12 adopted 2017, science adopted 2018, social
// studies Kindergarten to Grade 8 updated 2026 and high school adopted 2018), then a short plain description. The contract
// suite checks every citation against docs/research/ohio/outcomes.json.
//
// Most Ohio units are shared: BC units as they are (`share`), and the other US states' and the provinces' units copied
// with Ohio standards (`adopt`). Math and English language arts follow California's placement, because Ohio's standards
// keep the Common Core's grades and numbering; science follows Ohio's own grade placement, which is not the Next
// Generation Science Standards'. Units are shown to Ohio families in US English by src/content/locale.ts. Ohio's own
// units (`oh-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Ohio uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Ohio grade. `pool` is, per subject, the unit files Ohio copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function ohioGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-oh",
  name: "Ohio",
  cite: (codes, text) => ohi(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
