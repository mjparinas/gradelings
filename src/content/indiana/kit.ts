import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { ind } from "./cite";

export { ind };

// Helpers shared by the Indiana grade files. An Indiana standard cites the 2023 Indiana Academic Standards (mathematics,
// English/language arts, science and social studies, adopted by the State Board of Education in June 2023), then a short
// plain description. The contract suite checks every citation against docs/research/indiana/outcomes.json.
//
// Most Indiana units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Indiana standards (`adopt`). Indiana's math and English/language arts standards are its own, so units are
// matched through IDOE's correlation guides to the Common Core: a unit Illinois places with a Common Core standard goes
// to the Indiana standards that guide pairs with it in the same grade. Science follows Indiana's own grade placement of
// the performance expectations (Earth and space, ecosystems and waves in Grade 6; cells, forces and energy in 7; matter,
// heredity, evolution and Earth's systems in 8). Units are shown to Indiana families in US English by
// src/content/locale.ts. Indiana's own units (`in-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Indiana uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Indiana grade. `pool` is, per subject, the unit files Indiana copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function indianaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-in",
  name: "Indiana",
  cite: (codes, text) => ind(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
