import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { mas } from "./cite";

export { mas };

// Helpers shared by the Massachusetts grade files. A standard cites the Massachusetts Curriculum Frameworks (mathematics
// 2017, English language arts and literacy 2017, science and technology/engineering 2016, history and social science
// 2018), then a short plain description. The contract suite checks every citation against
// docs/research/massachusetts/outcomes.json.
//
// Most Massachusetts units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Massachusetts standards (`adopt`). Math and English language arts follow California's placement, because
// the Massachusetts frameworks keep the Common Core's grades and numbering; science follows Massachusetts's own grade
// placement, which places the middle school standards by grade. Units are shown to Massachusetts families in US English
// by src/content/locale.ts. Massachusetts's own units (`ma-` ids) come from the grade's own file in ./units (own-g3.ts
// and so on).

/** One plan entry: a unit from another framework that Massachusetts uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Massachusetts grade. `pool` is, per subject, the unit files Massachusetts copies from in this grade (listed in
 * each grade file, so its download carries only those files). A copy keeps the original's id and questions, so progress
 * carries over.
 */
export function massachusettsGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ma",
  name: "Massachusetts",
  cite: (codes, text) => mas(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
