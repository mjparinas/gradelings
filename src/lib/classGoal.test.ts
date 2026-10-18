import { describe, expect, it } from "vitest";
import { cleanGoalTarget, cleanTzOffset, goalWeekStart, suggestedTarget } from "./classGoal";

describe("class goal helpers", () => {
  it("accepts only whole targets from 10 to 5000", () => {
    for (const ok of [10, 240, 5000]) expect(cleanGoalTarget(ok)).toBe(ok);
    for (const bad of [9, 5001, 1.5, "50", null, NaN]) expect(cleanGoalTarget(bad)).toBeNull();
  });
  it("clamps a suggestion to the allowed range", () => {
    expect(suggestedTarget(1)).toBe(20);
    expect(suggestedTarget(0)).toBe(10);
    expect(suggestedTarget(1000)).toBe(5000);
  });
  it("starts the week on the teacher's Monday midnight", () => {
    // Wednesday 2026-10-14 15:00 UTC; Vancouver (PDT, 420 minutes behind UTC) is 08:00 that day.
    const wed = Date.UTC(2026, 9, 14, 15);
    expect(goalWeekStart(wed, 0)).toBe(Date.UTC(2026, 9, 12));
    expect(goalWeekStart(wed, 420)).toBe(Date.UTC(2026, 9, 12, 7));
    // Monday 03:00 UTC is still Sunday evening in Vancouver, so it belongs to the week before.
    const mon = Date.UTC(2026, 9, 12, 3);
    expect(goalWeekStart(mon, 420)).toBe(Date.UTC(2026, 9, 5, 7));
    expect(goalWeekStart(mon, 0)).toBe(Date.UTC(2026, 9, 12));
  });
  it("treats a silly time zone as UTC", () => {
    expect(cleanTzOffset(480)).toBe(480);
    expect(cleanTzOffset(5000)).toBe(0);
    expect(cleanTzOffset("x")).toBe(0);
  });
});
