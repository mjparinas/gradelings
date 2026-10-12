import { describe, expect, it } from "vitest";
import { COUNT_STEPS, countMilestonePath, countTitle, unitMilestonePath } from "./milestoneShare";

describe("shared milestone cards", () => {
  it("words every count milestone the parent area offers", () => {
    for (const n of COUNT_STEPS.right) expect(countTitle("right", n)).toContain("questions right on the first try");
    for (const n of COUNT_STEPS.days) expect(countTitle("days", n)).toContain("days of practice");
    expect(countTitle("grew", 1)).toBe("1 topic grown from tricky to strong");
    expect(countTitle("kept", 3)).toBe("Remembered 3 topics after a month away");
    expect(countTitle("streak", 21)).toBe("A 21-day practice streak");
    expect(countTitle("right", 1000)).toBe("1,000 questions right on the first try");
  });

  it("refuses links we never make, so a card can't be edited to say something else", () => {
    expect(countTitle("right", 123)).toBeUndefined();
    expect(countTitle("days", 31)).toBeUndefined();
    expect(countTitle("streak", 13)).toBeUndefined();
    expect(countTitle("grew", 0)).toBeUndefined();
    expect(countTitle("grew", 1.5)).toBeUndefined();
    expect(countTitle("name", 1)).toBeUndefined();
  });

  it("builds page paths with no child details", () => {
    expect(countMilestonePath("right", 100)).toBe("/milestone/count/right/100/");
    expect(unitMilestonePath("bc", "grade-4", "math", "fractions", 2)).toBe("/milestone/unit/bc/grade-4/math/fractions/2/");
  });
});
