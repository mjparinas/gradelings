import { describe, expect, it } from "vitest";
import { activeFocus, focusDaysLeft } from "./focus";
import { dayKey } from "./model";

const NOW = new Date(2026, 9, 14, 15, 0).getTime();
const DAY = 86_400_000;
const focus = (until?: string) => ({ focus: { unit: "3/math/fractions", until, setAt: NOW } });

describe("activeFocus", () => {
  it("is undefined with no focus", () => {
    expect(activeFocus(undefined, NOW)).toBeUndefined();
    expect(activeFocus({}, NOW)).toBeUndefined();
  });

  it("stays on with no day, and through the whole of its last day", () => {
    expect(activeFocus(focus(), NOW)?.unit).toBe("3/math/fractions");
    expect(activeFocus(focus(dayKey(NOW)), NOW + 8 * 3_600_000)?.unit).toBe("3/math/fractions");
  });

  it("goes away the day after its day", () => {
    expect(activeFocus(focus(dayKey(NOW - DAY)), NOW)).toBeUndefined();
  });
});

describe("focusDaysLeft", () => {
  it("counts calendar days, and is undefined without a day", () => {
    expect(focusDaysLeft({ unit: "u", setAt: NOW }, NOW)).toBeUndefined();
    expect(focusDaysLeft({ unit: "u", until: dayKey(NOW + 3 * DAY), setAt: NOW }, NOW)).toBe(3);
    expect(focusDaysLeft({ unit: "u", until: dayKey(NOW), setAt: NOW }, NOW)).toBe(0);
  });
});
