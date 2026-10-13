import type { Course, GradeId, SubjectId } from "../types";
import { planGrade, type OwnUnits, type PlanOptions, type Pool } from "../placement";
import { PLAN } from "./plan";
import { FOCUS } from "./focus";
import { cal } from "./cite";

export { cal };

// Helpers shared by the California grade files. A California standard cites the official codes from the California
// Department of Education's standards (CA CCSS for mathematics and for ELA/literacy, CA NGSS, History–Social Science
// Content Standards), then a short plain description. california.test.ts checks every code against
// docs/research/california/outcomes.json.
//
// Most California units are shared: BC units as they are (`share`), and Washington's, Oregon's or a province's units
// copied with California standards (`adopt`). Units are written in the app's house style and shown to California
// families in US English by src/content/locale.ts. California's own units (`ca-` ids) come from ./units, including
// filtered copies of Washington and Oregon units with their state-specific questions taken out.

/** One plan entry: a unit from another framework that California uses, the codes it practises and what they say. */
export type Entry = readonly [
  id: string,
  kind: "share" | "adopt",
  codes: string,
  text: string,
];

/**
 * One California grade. `pool` is, per subject, the unit files California copies from in this grade (listed in each
 * grade file, so its download carries only those files): Washington's and Oregon's units and the provinces', plus
 * units from another grade where California's integrated middle school science places a topic a grade earlier or
 * later than Washington. A copy keeps the original's id and questions, so progress carries over. `own` is the grade's own units (./units/own-<grade>.ts), so a
 * grade's download carries only its own grade's units.
 */
export function californiaGrade(grade: GradeId, pool: Pool, own: Partial<Record<SubjectId, OwnUnits>>): Course[] {
  return planGrade(OPTIONS, grade, pool, own);
}

const SUBJECTS = ["math", "language", "science", "social"] as const;

const OPTIONS: PlanOptions = {
  framework: "us-ca",
  name: "California",
  cite: (codes, text) => cal(codes, text),
  plan: PLAN,
  focus: (grade, subject) => FOCUS[`${grade}/${subject}`] ?? [],
  subjects: [...SUBJECTS],
};
