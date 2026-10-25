import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { va } from "./cite";

export { va };

// Helpers shared by the Virginia grade files. A Virginia standard cites the Standards of Learning (Mathematics 2023,
// English 2024, Science 2018 with its technical edits, and History and Social Science 2023), then a short plain
// description. The contract suite checks every citation against docs/research/virginia/outcomes.json.
//
// Most Virginia units are shared: BC units as they are (`share`), and the other US states' and the provinces' units
// copied with Virginia standards (`adopt`). Virginia's Standards of Learning are its own, not the Common Core, so units
// are matched by what each standard asks, grade by grade, and science and history and social science follow Virginia's
// own grade placement. Units are shown to Virginia families in US English by src/content/locale.ts. Virginia's own
// units (`va-` ids) come from the grade's own file in ./units (own-g4.ts and so on).

/** One plan entry: a unit from another framework that Virginia uses, the standards it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Virginia grade. `pool` is, per subject, the unit files Virginia copies from in this grade (listed in each grade
 * file, so its download carries only those files). A copy keeps the original's id and questions, so progress carries over.
 */
export function virginiaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-va",
  name: "Virginia",
  cite: (codes, text) => va(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
