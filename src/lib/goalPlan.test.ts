import { describe, expect, it } from "vitest";
import {
  MAX_CATCH_UP_UNITS,
  daysBetween,
  defaultCatchUpDay,
  defaultReadyDay,
  goalBoostUnits,
  goalEmailLines,
  goalProgress,
  goalTitle,
  goalWeeks,
  makeGoalPlan,
  validGoalDay,
  type GoalPlan,
} from "./goalPlan";

const at = (day: string) => new Date(`${day}T12:00:00`).getTime();
const NOW = at("2026-11-02"); // a Monday
const units = ["4/math/a", "4/math/b", "4/math/c", "4/math/d", "4/math/e", "4/math/f"];
const levels = (done: string[]) => (key: string) => (done.includes(key) ? 2 : 1);
const plan = (over: Partial<GoalPlan> = {}): GoalPlan => ({ kind: "grade", subject: "math", grade: "4", units, start: "2026-11-02", until: "2026-12-13", setAt: NOW, ...over });

describe("goal days", () => {
  it("counts whole days between local days, across months and years", () => {
    expect(daysBetween("2026-11-02", "2026-11-09")).toBe(7);
    expect(daysBetween("2026-12-30", "2027-01-02")).toBe(3);
    expect(daysBetween("2026-11-09", "2026-11-02")).toBe(-7);
  });

  it("defaults a next-grade goal to the next September 1 at least four weeks away, and a catch-up to four weeks", () => {
    expect(defaultReadyDay(NOW)).toBe("2027-09-01");
    expect(defaultReadyDay(at("2027-06-01"))).toBe("2027-09-01");
    expect(defaultReadyDay(at("2027-08-15"))).toBe("2028-09-01");
    expect(defaultCatchUpDay(NOW)).toBe("2026-11-30");
  });

  it("takes a day from a week to a year away", () => {
    expect(validGoalDay("2026-11-08", NOW)).toBe(false);
    expect(validGoalDay("2026-11-09", NOW)).toBe(true);
    expect(validGoalDay("2027-11-03", NOW)).toBe(true);
    expect(validGoalDay("2027-11-04", NOW)).toBe(false);
    expect(validGoalDay("soon", NOW)).toBe(false);
  });
});

describe("makeGoalPlan", () => {
  it("keeps the units in course order, leaving out the ones already at Proficient", () => {
    const g = makeGoalPlan({ kind: "grade", subject: "math", grade: "4", candidates: units, until: "2027-09-01" }, levels(["4/math/b"]), NOW)!;
    expect(g.units).toEqual(["4/math/a", "4/math/c", "4/math/d", "4/math/e", "4/math/f"]);
    expect(g).toMatchObject({ start: "2026-11-02", until: "2027-09-01", setAt: NOW });
  });

  it("refuses a goal with nothing left to do, a day out of range, or too many catch-up units", () => {
    expect(makeGoalPlan({ kind: "grade", subject: "math", grade: "4", candidates: units, until: "2027-09-01" }, levels(units), NOW)).toBeUndefined();
    expect(makeGoalPlan({ kind: "units", subject: "math", grade: "4", candidates: [], until: "2026-11-30" }, levels([]), NOW)).toBeUndefined();
    expect(makeGoalPlan({ kind: "units", subject: "math", grade: "4", candidates: units, until: "2026-11-03" }, levels([]), NOW)).toBeUndefined();
    const many = Array.from({ length: MAX_CATCH_UP_UNITS + 1 }, (_, i) => `4/math/u${i}`);
    expect(makeGoalPlan({ kind: "units", subject: "math", grade: "4", candidates: many, until: "2026-11-30" }, levels([]), NOW)).toBeUndefined();
    expect(makeGoalPlan({ kind: "grade", subject: "math", grade: "4", candidates: many, until: "2026-11-30" }, levels([]), NOW)?.units).toHaveLength(MAX_CATCH_UP_UNITS + 1);
  });
});

describe("goalWeeks", () => {
  it("spreads the units evenly over the weeks to the goal's day", () => {
    const weeks = goalWeeks(plan());
    expect(weeks.map((w) => w.start)).toEqual(["2026-11-02", "2026-11-09", "2026-11-16", "2026-11-23", "2026-11-30", "2026-12-07"]);
    expect(weeks.map((w) => w.units.length)).toEqual([1, 1, 1, 1, 1, 1]);
    expect(goalWeeks(plan({ until: "2026-11-15" })).map((w) => w.units)).toEqual([units.slice(0, 3), units.slice(3)]);
  });

  it("leaves catch-up weeks between units when there are more weeks than units", () => {
    const weeks = goalWeeks(plan({ units: units.slice(0, 2), until: "2026-12-13" }));
    expect(weeks.map((w) => w.units)).toEqual([["4/math/a"], [], [], ["4/math/b"], [], []]);
  });
});

describe("goalProgress", () => {
  it("is on track when the units planned for earlier weeks are done", () => {
    const p = goalProgress(plan(), levels(["4/math/a", "4/math/b"]), at("2026-11-17"));
    expect(p).toMatchObject({ current: 2, done: 2, total: 6, expected: 2, status: "on-track", over: false, upNext: ["4/math/c"], daysLeft: 26 });
  });

  it("is behind when an earlier week's unit isn't done yet, and lists it first", () => {
    const p = goalProgress(plan(), levels(["4/math/a"]), at("2026-11-17"));
    expect(p.status).toBe("behind");
    expect(p.upNext).toEqual(["4/math/b", "4/math/c"]);
  });

  it("is ahead when more is done than planned, and still points at the next unit", () => {
    const p = goalProgress(plan(), levels(["4/math/a", "4/math/b"]), NOW);
    expect(p.status).toBe("ahead");
    expect(p.upNext).toEqual(["4/math/c"]);
  });

  it("is reached when every unit is done, and ended after the day if not", () => {
    expect(goalProgress(plan(), levels(units), at("2027-01-10")).status).toBe("done");
    const late = goalProgress(plan(), levels(["4/math/a"]), at("2026-12-14"));
    expect(late).toMatchObject({ status: "ended", over: true, current: 5, expected: 6 });
  });

  it("keeps up next short", () => {
    expect(goalProgress(plan(), levels([]), at("2026-12-10")).upNext).toHaveLength(3);
  });
});

describe("goalBoostUnits", () => {
  it("boosts the units up next, and nothing once the goal is reached or its day has passed", () => {
    expect(goalBoostUnits(undefined, levels([]), NOW)).toEqual([]);
    expect(goalBoostUnits(plan(), levels([]), NOW)).toEqual(["4/math/a"]);
    expect(goalBoostUnits(plan(), levels(units), NOW)).toEqual([]);
    expect(goalBoostUnits(plan(), levels([]), at("2026-12-14"))).toEqual([]);
  });
});

describe("goal wording", () => {
  const names = { subject: "Math", grade: "Grade 4", nextGrade: "Grade 5", unit: (k: string) => ({ "4/math/a": "Fractions", "4/math/b": "Decimals" })[k] };

  it("names a next-grade goal, or finishing the last grade", () => {
    expect(goalTitle(plan(), names)).toBe("Ready for Grade 5 Math");
    expect(goalTitle(plan(), { ...names, nextGrade: undefined, grade: "Grade 9" })).toBe("Finish Grade 9 Math");
  });

  it("names a catch-up goal by its units", () => {
    expect(goalTitle(plan({ kind: "units", units: ["4/math/a"] }), names)).toBe("Catch up on Fractions");
    expect(goalTitle(plan({ kind: "units", units: ["4/math/a", "4/math/b"] }), names)).toBe("Catch up on Fractions and Decimals");
    expect(goalTitle(plan({ kind: "units", units: ["4/math/a", "4/math/b", "4/math/c"] }), names)).toBe("Catch up on Fractions and 2 more");
  });

  it("writes the weekly email's lines: where the goal stands, then what's up next", () => {
    const p = goalProgress(plan(), levels(["4/math/a"]), at("2026-11-17"));
    expect(goalEmailLines("Maya", "Ready for Grade 5 Math", p, names.unit, "Proficient", "Dec 13")).toEqual([
      "  Maya's goal: Ready for Grade 5 Math by Dec 13. 1 of 6 units at Proficient, a little behind plan.",
      "  Up next: Decimals.",
    ]);
    const done = goalProgress(plan(), levels(units), NOW);
    expect(goalEmailLines("Maya", "Ready for Grade 5 Math", done, names.unit, "Proficient", "Dec 13")).toEqual([
      "  Maya's goal: Ready for Grade 5 Math by Dec 13. 6 of 6 units at Proficient, goal reached.",
    ]);
  });
});
