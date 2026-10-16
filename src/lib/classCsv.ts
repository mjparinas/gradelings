import { toCsv, type Cell } from "./csv";
import type { StudentRow } from "./classroom";

/**
 * The class table as a CSV for a gradebook or spreadsheet: one row per student, and for each assigned unit its
 * level, first-try accuracy, questions answered and homework progress. First names and practice only, never a mark.
 */
export function classCsv(opts: {
  students: StudentRow[];
  assignments: string[];
  unitName: (key: string) => string;
  levelName: (level: number) => string;
  goal: Record<string, number>;
  due: Record<string, number>;
  appName: string;
}): string {
  const { students, assignments, unitName, levelName, goal, due, appName } = opts;
  const header = ["Student", "Grade", "Last active"];
  for (const k of assignments) {
    const name = unitName(k);
    header.push(`${name}: level`, `${name}: first-try accuracy`, `${name}: questions answered`, `${name}: homework`);
  }
  const day = (t: number) => new Date(t).toISOString().slice(0, 10);
  const rows: Cell[][] = students.map((s) => {
    const row: Cell[] = [s.name, s.grade, s.lastActive ? day(s.lastActive) : ""];
    for (const k of assignments) {
      const u = s.units.find((x) => x.key === k);
      if (!u || u.assigned === false) {
        row.push("Not assigned", "", "", "");
        continue;
      }
      const homework = goal[k] ? `${u.done ?? 0} of ${goal[k]}${(u.done ?? 0) >= goal[k] ? " (done)" : ""}` : u.level >= 2 ? "Done (Proficient)" : "";
      row.push(u.level < 0 ? "Not started" : levelName(u.level), u.attempts > 0 ? `${Math.round(u.accuracy * 100)}%` : "", u.attempts, homework);
    }
    return row;
  });
  // A first line says what the numbers are, like every other place they appear.
  const dues = assignments.filter((k) => due[k]).map((k) => `${unitName(k)} due ${day(due[k])}`);
  const note = `This reflects practice in ${appName}, not a report-card mark.${dues.length ? ` Due dates: ${dues.join("; ")}.` : ""}`;
  return toCsv([note], []) + toCsv(header, rows);
}
