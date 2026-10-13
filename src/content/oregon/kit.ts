import type { Course, GradeId, SubjectId, Unit } from "../types";
import { PLAN } from "./plan";
import { OWN } from "./units";
import { FOCUS } from "./focus";
import { ore } from "./cite";

export { ore };

// Helpers shared by the Oregon grade files. An Oregon standard cites the official codes from the Oregon Department of
// Education's standards (math 2021, English language arts 2026, science 2022, social science 2024), then a short plain
// description. oregon.test.ts checks every code against docs/research/oregon/outcomes.json.
//
// Most Oregon units are shared: BC units as they are (`share`), and Washington's or a province's units copied with
// Oregon standards (`adopt`). Units are written in the app's house style and shown to Oregon families in US English by
// src/content/locale.ts. Oregon's own units (`or-` ids) come from ./units.

/** One plan entry: a unit from another framework that Oregon uses, the codes it practises and what they say. */
export type Entry = readonly [id: string, kind: "share" | "adopt", codes: string, text: string];

/**
 * One Oregon grade. `pool` is the courses whose units Oregon may copy: Washington's grade first, then the provinces',
 * plus any other grade a plan entry lifts from (Oregon places a few topics a grade earlier or later than Washington).
 * A copy keeps the original's id and questions, so progress carries over.
 */
export function oregonGrade(grade: GradeId, pool: Course[][]): Course[] {
  const subjects: SubjectId[] = ["math", "language", "science", "social"];
  return subjects.map((subject) => {
    const entries = PLAN[`${grade}/${subject}`] ?? [];
    const available = pool.flatMap((courses) => courses.filter((c) => c.subject === subject).flatMap((c) => c.units));
    const shares: NonNullable<Course["shares"]> = {};
    const units: Unit[] = [];
    for (const [id, kind, codes, text] of entries) {
      if (kind === "share") {
        shares[id] = { standards: ore(codes, text) };
        continue;
      }
      const unit = available.find((u) => u.id === id);
      if (!unit) throw new Error(`Oregon: no unit "${id}" to adopt in ${grade}/${subject}`);
      units.push({ ...unit, standards: ore(codes, text) });
    }
    const own = OWN[subject]?.[grade] ?? [];
    units.push(...own);
    return {
      grade,
      subject,
      bigIdeas: { "us-or": FOCUS[`${grade}/${subject}`] ?? [] },
      units,
      shares,
      order: { "us-or": [...entries.map((e) => e[0]), ...own.map((u) => u.id)] },
    };
  });
}
