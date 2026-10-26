import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { nes } from "./cite";

export { nes };

// Helpers shared by the Nebraska grade files. A Nebraska standard cites Nebraska's College and Career Ready Standards
// (mathematics 2022, English language arts 2021, science 2017 with its December 2024 update, social studies 2019), then
// a short plain description. The contract suite checks every citation against docs/research/nebraska/outcomes.json.
//
// Most Nebraska units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Nebraska standards (`adopt`). Nebraska writes its own standards rather than using the Common Core or the
// Next Generation Science Standards, so every unit is placed by what Nebraska's indicators ask for in each grade (math
// keeps ratios and proportions in Grades 6 and 7 and high school in its own strands; science sits close to the NGSS
// topics by grade). Social studies follows Nebraska's grade themes. Units are shown to Nebraska families in US English
// by src/content/locale.ts. Nebraska's own units (`neb-` ids) come from the grade's own file in ./units (own-g4.ts and
// so on).

/** One plan entry: a unit from another framework that Nebraska uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Nebraska grade. `pool` is, per subject, the unit files Nebraska copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function nebraskaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ne",
  name: "Nebraska",
  cite: (codes, text) => nes(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
