import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { oks } from "./cite";

export { oks };

// Helpers shared by the Oklahoma grade files. A standard cites the Oklahoma Academic Standards (mathematics 2022,
// English language arts 2021, science 2026 and social studies 2026), then a short plain description. The contract suite
// checks every citation against docs/research/oklahoma/outcomes.json.
//
// Most Oklahoma units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Oklahoma standards (`adopt`). Math and English language arts keep the Common Core's grades for most
// topics (Grade 8 math is Pre-Algebra and Grade 9 is Algebra 1); science follows Oklahoma's own grade placement, which
// matches the NGSS to Grade 5. Social studies follows Oklahoma's grade themes: Oklahoma studies in Grade 3, United States
// geography and early history in 4, the colonies to the early republic in 5, the Western Hemisphere in 6, the Eastern
// Hemisphere in 7, United States history from 1754 to 1877 in 8, and Oklahoma history and government with United States
// government in Grade 9. Units are shown to Oklahoma families in US English by src/content/locale.ts. Oklahoma's own
// units (`ok-` ids) come from the grade's own file in ./units (own-g3.ts and so on).

/** One plan entry: a unit from another framework that Oklahoma uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Oklahoma grade. `pool` is, per subject, the unit files Oklahoma copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function oklahomaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ok",
  name: "Oklahoma",
  cite: (codes, text) => oks(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
