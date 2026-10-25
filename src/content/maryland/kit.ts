import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { mar } from "./cite";

export { mar };

// Helpers shared by the Maryland grade files. A Maryland standard cites MSDE's standards and frameworks (mathematics,
// revised 2025; English language arts, 2022; science, the Next Generation Science Standards; social studies), then a
// short plain description. The contract suite checks every citation against docs/research/maryland/outcomes.json.
//
// Most Maryland units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Maryland standards (`adopt`). Math, English language arts and science follow California's placement where
// Maryland teaches the same idea in the same grade, with Maryland's citations in place of California's. Units are shown
// to Maryland families in US English by src/content/locale.ts. Maryland's own units (`md-` ids) come from the grade's
// own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Maryland uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Maryland grade. `pool` is, per subject, the unit files Maryland copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function marylandGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-md",
  name: "Maryland",
  cite: (codes, text) => mar(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
