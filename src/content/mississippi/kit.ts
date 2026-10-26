import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { mss } from "./cite";

export { mss };

// Helpers shared by the Mississippi grade files. A Mississippi standard cites the Mississippi College- and
// Career-Readiness Standards (mathematics 2025, English language arts 2025, science 2026, social studies 2022), then a
// short plain description. The contract suite checks every citation against docs/research/mississippi/outcomes.json.
//
// Most Mississippi units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Mississippi standards (`adopt`). Math and English language arts follow the grade-by-grade standards, which
// keep the Common Core's structure; science and social studies follow Mississippi's own grade themes. Units are shown to
// Mississippi families in US English by src/content/locale.ts. Mississippi's own units (`ms-` ids) come from the grade's
// own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Mississippi uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Mississippi grade. `pool` is, per subject, the unit files Mississippi copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function mississippiGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ms",
  name: "Mississippi",
  cite: (codes, text) => mss(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
