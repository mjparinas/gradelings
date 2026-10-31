import { describe, expect, it } from "vitest";
import type { Classwork } from "./classroom";
import { childHomework, homeworkEmailLines } from "./homework";

const DAY = 86_400_000;
const NOW = Date.UTC(2026, 9, 25, 15);
const answers = (unit: string, n: number, t: number) => Array.from({ length: n }, (_, i) => ({ type: "answer", unit, t: t + i }));

const work: Classwork[] = [
  {
    profileId: "maya",
    classId: "c1",
    className: "Room 4",
    unitKeys: ["3/math/fractions", "3/math/area", "3/language/poems", "3/math/old", "3/science/plants"],
    due: { "3/math/fractions": NOW + 2 * DAY, "3/math/area": NOW - DAY, "3/language/poems": NOW + 10 * DAY },
    goal: { "3/math/fractions": 10, "3/math/area": 5, "3/language/poems": 5 },
    since: { "3/math/fractions": NOW - 3 * DAY, "3/math/area": NOW - 5 * DAY, "3/language/poems": NOW - DAY, "3/math/old": NOW - 60 * DAY, "3/science/plants": NOW - 2 * DAY },
  },
  { profileId: "leo", classId: "c1", className: "Room 4", unitKeys: ["3/math/fractions"], since: { "3/math/fractions": NOW - DAY } },
];
const events = [
  ...answers("3/math/fractions", 4, NOW - 10 * DAY), // before it was assigned: not counted
  ...answers("3/math/fractions", 6, NOW - DAY),
  ...answers("3/math/area", 2, NOW - 2 * DAY),
  ...answers("3/language/poems", 7, NOW - 1000),
];
const levels: Record<string, number> = { "3/science/plants": 2 };
const level = (key: string) => levels[key] ?? -1;

describe("a child's homework for their parent", () => {
  const items = childHomework(work, "maya", events, level, NOW);

  it("lists only current homework for that child, past due first, then by due date, then finished", () => {
    expect(items.map((h) => h.key)).toEqual(["3/math/area", "3/math/fractions", "3/language/poems", "3/science/plants"]);
    // An old unit with no due date isn't current, and Leo's list isn't Maya's.
    expect(childHomework(work, "leo", events, level, NOW).map((h) => h.key)).toEqual(["3/math/fractions"]);
  });

  it("counts questions answered since the unit was assigned, and Proficient for units with no count", () => {
    const by = Object.fromEntries(items.map((h) => [h.key, h]));
    expect(by["3/math/fractions"]).toMatchObject({ answered: 6, goal: 10, done: false, overdue: false });
    expect(by["3/math/area"]).toMatchObject({ answered: 2, done: false, overdue: true });
    expect(by["3/language/poems"]).toMatchObject({ answered: 5, done: true, overdue: false });
    expect(by["3/science/plants"]).toMatchObject({ done: true, goal: undefined });
  });

  it("writes the weekly email lines with progress and when it's due, and skips units it can't name", () => {
    const name = (k: string) => ({ "3/math/fractions": "Fractions", "3/math/area": "Area", "3/language/poems": "Poems" })[k];
    expect(homeworkEmailLines("Maya", items, name, "Proficient", NOW)).toEqual([
      "  Homework: Maya has finished 1 of 3 units from the teacher.",
      "    Area: 2 of 5 questions, past its due date.",
      "    Fractions: 6 of 10 questions, due this week.",
    ]);
    const open = childHomework([{ ...work[0], goal: {} }], "maya", events, level, NOW);
    expect(homeworkEmailLines("Maya", open, name, "Proficient", NOW)).toContain("    Fractions: working toward Proficient, due this week.");
    expect(homeworkEmailLines("Maya", [], name, "Proficient", NOW)).toEqual([]);
  });

  it("says how many more there are past three", () => {
    const many: Classwork[] = [{ profileId: "maya", classId: "c", className: "Room 4", unitKeys: ["a", "b", "c", "d", "e"], since: Object.fromEntries(["a", "b", "c", "d", "e"].map((k) => [k, NOW])), goal: {} }];
    const lines = homeworkEmailLines("Maya", childHomework(many, "maya", [], level, NOW), (k) => k.toUpperCase(), "Proficient", NOW);
    expect(lines).toHaveLength(5);
    expect(lines.at(-1)).toBe("    …and 2 more in the Parent area.");
  });
});
