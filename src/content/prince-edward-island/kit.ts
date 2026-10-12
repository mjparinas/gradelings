import type { Course, GradeId, SubjectId, Unit } from "../types";
import { overall } from "./overall";
import { PLAN } from "./plan";

// Helpers shared by the Prince Edward Island grade files. A standard cites the specific curriculum outcome codes a unit
// practises ("N1; N3"), the unit title in science, or the course theme in Grades 7 and 8, which content.test.ts checks against
// docs/research/prince-edward-island/outcomes.json. Citations are joined with "; " because some science titles contain commas.

/** Standards text for a unit: the strand and key stage, then a short plain description. */
export function pe(citation: string, text: string): Unit["standards"] {
  return { "ca-pe": `${citation} · ${text}` };
}

/** Units written for Prince Edward Island, with the order they sit in (own units come after the planned ones unless `order` says otherwise). */
export interface OwnUnits {
  units: Unit[];
  order?: string[];
  /** Put the own units before the planned ones. */
  first?: boolean;
}

/**
 * One Prince Edward Island grade. `pool` is the grade's courses from the provinces whose units are adopted (Ontario,
 * Manitoba, Alberta, Saskatchewan, Nova Scotia and New Brunswick). The plan in ./plan.ts lists, for each course, the units
 * used and the strand each one practises: BC units are shared as they are, and the rest are copied with Newfoundland and
 * Labrador standards only, so they never show up for another province by accident. A copy keeps the original's id and questions.
 */
export function peGrade(grade: GradeId, pool: Course[][], own: Partial<Record<SubjectId, OwnUnits>> = {}): Course[] {
  const subjects = new Set<string>([...Object.keys(PLAN).filter((k) => k.startsWith(`${grade}/`)).map((k) => k.split("/")[1]), ...Object.keys(own)]);
  return [...subjects].map((subject) => {
    const entries = PLAN[`${grade}/${subject}`] ?? [];
    const available = pool.flatMap((courses) => courses.find((c) => c.subject === subject)?.units ?? []);
    const shares: NonNullable<Course["shares"]> = {};
    const units: Unit[] = [];
    for (const [id, kind, citation, text] of entries) {
      if (kind === "share") {
        shares[id] = { standards: pe(citation, text) };
        continue;
      }
      const unit = available.find((u) => u.id === id);
      if (!unit) throw new Error(`Prince Edward Island: no unit "${id}" to adopt in ${grade}/${subject}`);
      units.push({ ...unit, standards: pe(citation, text) });
    }
    const mine = own[subject as SubjectId];
    units.push(...(mine?.units ?? []));
    return {
      grade,
      subject: subject as SubjectId,
      bigIdeas: { "ca-pe": overall(grade, subject as SubjectId) },
      units,
      shares,
      order: { "ca-pe": mine?.order ?? (mine?.first ? [...mine.units.map((u) => u.id), ...entries.map((e) => e[0])] : [...entries.map((e) => e[0]), ...(mine?.units ?? []).map((u) => u.id)]) },
    };
  });
}
