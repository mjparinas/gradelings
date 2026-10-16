import { describe, expect, it } from "vitest";
import { cleanTimerLabel, formatClock, TIMER_LABEL_MAX, timeLeft, timerMinutes } from "./classTimer";

describe("class timer helpers", () => {
  it("formats the clock, rounding up so 0:00 only means done", () => {
    expect(formatClock(605_000)).toBe("10:05");
    expect(formatClock(59_001)).toBe("1:00");
    expect(formatClock(1)).toBe("0:01");
    expect(formatClock(0)).toBe("0:00");
    expect(formatClock(-5)).toBe("0:00");
    expect(formatClock(3_723_000)).toBe("1:02:03");
  });
  it("counts down from when the answer arrived, ignoring the device's own clock offset", () => {
    expect(timeLeft({ left: 60_000, running: true }, 1000, 11_000)).toBe(50_000);
    expect(timeLeft({ left: 5_000, running: true }, 1000, 99_000)).toBe(0);
    expect(timeLeft({ left: 30_000, running: false }, 1000, 99_000)).toBe(30_000);
  });
  it("accepts whole minutes from 1 to 120 only", () => {
    expect(timerMinutes(10)).toBe(10);
    for (const bad of [0, 121, 2.5, "5", null, NaN]) expect(timerMinutes(bad)).toBeNull();
  });
  it("cleans a teacher's note to one short line", () => {
    expect(cleanTimerLabel("  Silent\n reading\u0007 ")).toBe("Silent reading");
    expect(cleanTimerLabel("x".repeat(100))).toHaveLength(TIMER_LABEL_MAX);
    expect(cleanTimerLabel(42)).toBe("");
  });
});
