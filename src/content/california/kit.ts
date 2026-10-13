import type { Course, GradeId } from "../types";
import { planGrade, type PlanOptions } from "../placement";
import { PLAN } from "./plan";
import { OWN } from "./units";
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
 * One California grade. `pool` is the courses whose units California may copy: Washington's grade first, then
 * Oregon's, then the provinces'. Oregon's courses already hold the units it lifts from other grades (California's
 * integrated middle school science places a few topics a grade earlier or later than Washington). A copy keeps the
 * original's id and questions, so progress carries over.
 */
export function californiaGrade(grade: GradeId, pool: Course[][]): Course[] {
  const own = Object.fromEntries(SUBJECTS.map((subject) => [subject, { units: OWN[subject]?.[grade] ?? [] }]));
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
