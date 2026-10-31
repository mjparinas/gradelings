import { describe, expect, it } from "vitest";
import { classDigestLines, type DigestClass } from "./classDigest";
import type { StudentRow } from "./classroom";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 9, 26, 15);
const name = (k: string) => ({ "3/math/fractions": "Fractions", "3/math/old": "Old unit", "3/math/area": "Area" })[k] ?? k;
const student = (id: string, units: StudentRow["units"], lastActive: number | null = NOW - DAY): StudentRow => ({ profileId: id, name: id, avatar: "ollie", grade: "3", lastActive, units });
const unit = (key: string, over: Partial<StudentRow["units"][number]> = {}): StudentRow["units"][number] => ({ key, level: 1, attempts: 10, accuracy: 0.8, done: 0, ...over });

function cls(over: Partial<DigestClass> = {}): DigestClass {
  return {
    name: "Room 4",
    students: [
      student("Maya", [unit("3/math/fractions", { level: 2, done: 10 }), unit("3/math/old")]),
      student("Leo", [unit("3/math/fractions", { attempts: 10, accuracy: 0.3 }), unit("3/math/old")]),
      student("Ava", [unit("3/math/fractions", { attempts: 0, level: -1 }), unit("3/math/old")], null),
    ],
    assignments: ["3/math/fractions", "3/math/old"],
    due: { "3/math/fractions": NOW + 2 * DAY },
    goal: { "3/math/fractions": 10 },
    assignedAt: { "3/math/fractions": NOW - 3 * DAY, "3/math/old": NOW - 60 * DAY },
    ...over,
  };
}

describe("the Monday class email", () => {
  it("says who practised, current homework, what to reteach and who to check in with", () => {
    const lines = classDigestLines(cls(), name, NOW);
    expect(lines[0]).toBe("Room 4: 2 of 3 students practised in the last week.");
    expect(lines).toContain("  Homework, Fractions: 1 of 3 done, due this week.");
    // An old unit with no due date isn't current homework.
    expect(lines.join("\n")).not.toContain("Homework, Old unit");
    expect(lines.join("\n")).toContain("Worth reteaching: Fractions.");
    expect(lines.join("\n")).toContain("Leo (finding Fractions tricky)");
    expect(lines.join("\n")).toContain("Ava (hasn’t started yet)");
  });

  it("marks homework past its due date", () => {
    const lines = classDigestLines(cls({ due: { "3/math/fractions": NOW - DAY } }), name, NOW);
    expect(lines).toContain("  Homework, Fractions: 1 of 3 done, past due.");
  });

  it("says so when nobody needs a check-in", () => {
    const happy = cls({ students: [student("Maya", [unit("3/math/fractions", { level: 2, done: 10 }), unit("3/math/old", { level: 2 })])] });
    expect(classDigestLines(happy, name, NOW).at(-1)).toBe("  Nobody needs a check-in this week. 🎉");
  });

  it("counts a unit scheduled ahead as homework only once it starts, from its start date", () => {
    // Planned two months ago to start three days ago: current homework, though it was assigned long ago.
    const started = cls({ due: {}, assignedAt: { "3/math/fractions": NOW - 60 * DAY, "3/math/old": NOW - 60 * DAY }, startsAt: { "3/math/old": NOW - 3 * DAY } });
    expect(classDigestLines(started, name, NOW).join("\n")).toContain("Homework, Old unit");
    // Not started yet: not listed, even with every student marked as given it.
    const waiting = cls({ startsAt: { "3/math/fractions": NOW + 2 * DAY } });
    expect(classDigestLines(waiting, name, NOW).join("\n")).not.toContain("Homework, Fractions");
  });

  it("has nothing to say for a class with no students or nothing assigned", () => {
    expect(classDigestLines(cls({ students: [] }), name, NOW)).toEqual([]);
    expect(classDigestLines(cls({ assignments: [] }), name, NOW)).toEqual([]);
  });
});
