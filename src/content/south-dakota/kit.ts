import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { sds } from "./cite";

export { sds };

// Helpers shared by the South Dakota grade files. A South Dakota standard cites South Dakota's standards (mathematics
// 2018, English language arts 2025, science 2024 and social studies 2023), then a short plain description. The contract
// suite checks every citation against docs/research/south-dakota/outcomes.json.
//
// Most South Dakota units are shared: BC units as they are (`share`), and the other US states' and the provinces'
// units copied with South Dakota standards (`adopt`). Math, English language arts and science follow California's
// placement, because South Dakota's math and English language arts standards keep the Common Core's grade-by-grade
// codes and its science standards keep the Next Generation Science Standards' codes, with one Grades 6-8 science band.
// Social studies follows South Dakota's grade themes, which move through world and American history in order. Units
// are shown to South Dakota families in US English by src/content/locale.ts. South Dakota's own units (`sd-` ids) come
// from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that South Dakota uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One South Dakota grade. `pool` is, per subject, the unit files South Dakota copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function southDakotaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-sd",
  name: "South Dakota",
  cite: (codes, text) => sds(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
