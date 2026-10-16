import { describe, expect, it } from "vitest";
import { classCsv } from "./classCsv";
import type { StudentRow } from "./classroom";

const u = (key: string, level: number, attempts: number, accuracy: number, done?: number, assigned?: boolean) => ({ key, level, attempts, accuracy, done, assigned });
const st = (profileId: string, name: string, units: StudentRow["units"], lastActive: number | null): StudentRow => ({ profileId, name, avatar: "ollie", grade: "3", lastActive, units });
const base = { unitName: (k: string) => k.split("/")[2], levelName: (l: number) => ["Emerging", "Developing", "Proficient", "Extending"][l], goal: {}, due: {}, appName: "Gradelings" };

describe("classCsv", () => {
  it("writes a practice note, a header per unit and one row per student", () => {
    const csv = classCsv({
      ...base,
      students: [
        st("a", "Maya", [u("3/math/counting", 1, 10, 0.5, 6), u("3/math/shapes", -1, 0, 0, 0)], Date.UTC(2026, 9, 3, 15)),
        st("b", "Sam", [u("3/math/counting", 2, 8, 0.875, 12), u("3/math/shapes", 0, 2, 1, 2, false)], null),
      ],
      assignments: ["3/math/counting", "3/math/shapes"],
      goal: { "3/math/counting": 10 },
      due: { "3/math/counting": Date.UTC(2026, 9, 20, 12) },
    });
    expect(csv.split("\r\n")).toEqual([
      // The note has a comma, so it is quoted into one cell.
      '"This reflects practice in Gradelings, not a report-card mark. Due dates: counting due 2026-10-20."',
      "Student,Grade,Last active,counting: level,counting: first-try accuracy,counting: questions answered,counting: homework,shapes: level,shapes: first-try accuracy,shapes: questions answered,shapes: homework",
      "Maya,3,2026-10-03,Developing,50%,10,6 of 10,Not started,,0,",
      // 87.5% rounds to 88%; Sam has finished the homework and the second unit isn't his.
      "Sam,3,,Proficient,88%,8,12 of 10 (done),Not assigned,,,",
      "",
    ]);
  });

  it("marks a unit done at Proficient when no number of questions was asked for", () => {
    const csv = classCsv({ ...base, students: [st("a", "Maya", [u("3/math/counting", 2, 8, 0.9, 8), ], 0)], assignments: ["3/math/counting"] });
    expect(csv).toContain("Maya,3,,Proficient,90%,8,Done (Proficient)");
  });

  it("never lets a typed name run as a formula, and quotes names with commas", () => {
    const csv = classCsv({ ...base, students: [st("a", "=SUM(A1)", [], 0), st("b", "Lee, J.", [], 0)], assignments: [] });
    expect(csv).toContain("'=SUM(A1),3,");
    expect(csv).toContain('"Lee, J.",3,');
  });
});
