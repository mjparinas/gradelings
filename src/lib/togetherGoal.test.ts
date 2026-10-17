import { describe, expect, it } from "vitest";
import type { Derived, DayStat } from "./derive";
import { togetherProgress, TOGETHER_PER_CHILD } from "./togetherGoal";

// Wednesday 14 October 2026.
const NOW = new Date(2026, 9, 14, 12).getTime();
const day = (answers: number, sessions = 0) => ({ answers, sessions }) as DayStat;
const kid = (days: Record<string, DayStat>) => ({ days }) as Pick<Derived, "days">;

describe("togetherProgress", () => {
  it("needs two or more children", () => {
    expect(togetherProgress([], NOW)).toBeUndefined();
    expect(togetherProgress([kid({})], NOW)).toBeUndefined();
  });

  it("adds this week's answers across children, with a target per child", () => {
    const p = togetherProgress([kid({ "2026-10-12": day(20), "2026-10-14": day(10) }), kid({ "2026-10-13": day(15) })], NOW)!;
    expect(p.answers).toBe(45);
    expect(p.target).toBe(2 * TOGETHER_PER_CHILD);
    expect(p.met).toBe(false);
    expect(p.dots.map((d) => d.practised)).toEqual([true, true, true, false, false, false, false]);
  });

  it("ignores days outside the week and is met when the target is reached", () => {
    const p = togetherProgress([kid({ "2026-10-11": day(500), "2026-10-15": day(70) }), kid({ "2026-10-16": day(50) })], NOW)!;
    expect(p.answers).toBe(120);
    expect(p.met).toBe(true);
  });
});
