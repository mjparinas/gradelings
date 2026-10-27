import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { mtcs } from "./cite";

export { mtcs };

// Helpers shared by the Montana grade files. A Montana standard cites the state's standards (the Montana Content
// Standards for Mathematics, 2026 edition; for English Language Arts and Literacy, 2011; for Science, 2016; and for
// Social Studies, 2021), then a short plain description. The contract suite checks every citation against
// docs/research/montana/outcomes.json.
//
// Most Montana units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Montana standards (`adopt`). Math, English language arts and science follow California's placement,
// because Montana's math and English language arts standards grew from the Common Core and its science standards are
// drawn from the Next Generation Science Standards; Montana's citations replace California's. Units are shown to
// Montana families in US English by src/content/locale.ts. Montana's own units (`mt-` ids) come from the grade's own
// file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Montana uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Montana grade. `pool` is, per subject, the unit files Montana copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function montanaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-mt",
  name: "Montana",
  cite: (codes, text) => mtcs(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
