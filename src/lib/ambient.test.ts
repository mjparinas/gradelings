import { describe, expect, it } from "vitest";
import { ambientEmoji, PARTICLES } from "./ambient";

describe("ambientEmoji", () => {
  it("uses the holiday's emoji when a holiday is on, even during a festival", () => {
    expect(ambientEmoji("2026-10-20", "halloween")).toBe("🎃");
  });
  it("falls back to the festival's emoji, and to nothing on an ordinary day", () => {
    expect(ambientEmoji("2026-10-20", null)).toBe("🍂");
    expect(ambientEmoji("2026-12-20", null)).toBe("❄️");
    expect(ambientEmoji("2026-09-10", null)).toBeNull();
  });
});

describe("PARTICLES", () => {
  it("are spread out, none moving in step and none big enough to cover a button", () => {
    expect(new Set(PARTICLES.map((p) => p.left)).size).toBe(PARTICLES.length);
    expect(new Set(PARTICLES.map((p) => `${p.duration}/${p.delay}`)).size).toBe(PARTICLES.length);
    for (const p of PARTICLES) expect(p.size).toBeLessThanOrEqual(44);
  });
});
