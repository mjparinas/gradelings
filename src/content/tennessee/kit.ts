import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { tns } from "./cite";

export { tns };

// Helpers shared by the Tennessee grade files. A standard cites the Tennessee Academic Standards (mathematics 2021,
// English language arts 2019, science 2022 and social studies 2024), then a short plain description. The contract suite
// checks every citation against docs/research/tennessee/outcomes.json.
//
// Most Tennessee units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Tennessee standards (`adopt`). Math and English language arts follow California's placement, because
// Tennessee's standards keep the Common Core's grades for most topics; science follows Tennessee's own grade placement.
// Social studies follows Tennessee's grade themes: United States history in Grades 3 and 4, Tennessee history and
// geography in Grade 5, the ancient world in 6, the Middle Ages to exploration in 7 and United States history to
// Reconstruction in 8. Units are shown to Tennessee families in US English by src/content/locale.ts. Tennessee's own units
// (`tn-` ids) come from the grade's own file in ./units (own-g5.ts and so on).

/** One plan entry: a unit from another framework that Tennessee uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Tennessee grade. `pool` is, per subject, the unit files Tennessee copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function tennesseeGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-tn",
  name: "Tennessee",
  cite: (codes, text) => tns(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
