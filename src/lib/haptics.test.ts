// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { buzz, setHapticsCheck, vibrate } from "./haptics";

describe("haptics", () => {
  afterEach(() => {
    setHapticsCheck(() => true);
    vi.restoreAllMocks();
  });

  it("uses short patterns when enabled and motion is allowed", () => {
    const vibration = vi.fn(() => true);
    Object.defineProperty(navigator, "vibrate", { configurable: true, value: vibration });
    Object.defineProperty(window, "matchMedia", { configurable: true, value: () => ({ matches: false }) });

    vibrate(buzz.correct);

    expect(vibration).toHaveBeenCalledWith([10, 40, 18]);
    expect(buzz.tap).toBe(8);
    expect(buzz.tryAgain).toBe(28);
  });

  it("respects the parent setting and reduced motion", () => {
    const vibration = vi.fn();
    Object.defineProperty(navigator, "vibrate", { configurable: true, value: vibration });
    Object.defineProperty(window, "matchMedia", { configurable: true, value: () => ({ matches: false }) });
    setHapticsCheck(() => false);
    vibrate(buzz.tap);
    expect(vibration).not.toHaveBeenCalled();

    setHapticsCheck(() => true);
    Object.defineProperty(window, "matchMedia", { configurable: true, value: () => ({ matches: true }) });
    vibrate(buzz.pop);
    expect(vibration).not.toHaveBeenCalled();
  });

  it("treats vibration as an optional device feature and ignores blocked calls", () => {
    Object.defineProperty(navigator, "vibrate", { configurable: true, value: undefined });
    expect(() => vibrate(buzz.tap)).not.toThrow();
    Object.defineProperty(navigator, "vibrate", { configurable: true, value: () => { throw new Error("blocked"); } });
    Object.defineProperty(window, "matchMedia", { configurable: true, value: () => ({ matches: false }) });
    expect(() => vibrate(buzz.tap)).not.toThrow();
  });
});

describe("haptic patterns", () => {
  it("are all brief, so nothing buzzes for long", () => {
    for (const [name, pattern] of Object.entries(buzz)) {
      const total = Array.isArray(pattern) ? pattern.reduce((a, b) => a + b, 0) : pattern;
      expect(total, name).toBeLessThanOrEqual(250);
    }
  });
  it("give big moments a longer pattern than a tap", () => {
    expect((buzz.levelUp as number[]).length).toBeGreaterThan(buzz.correct.length);
    expect((buzz.complete as number[]).length).toBeGreaterThan(buzz.correct.length);
  });
});
