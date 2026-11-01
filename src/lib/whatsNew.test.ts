import { describe, expect, it } from "vitest";
import { dayLabel, WHATS_NEW } from "./whatsNew";

describe("what's new posts", () => {
  it("are newest first, one per day, with real dates", () => {
    const days = WHATS_NEW.map((d) => d.day);
    expect(new Set(days).size).toBe(days.length);
    expect([...days].sort().reverse()).toEqual(days);
    for (const d of days) expect(dayLabel(d)).not.toMatch(/Invalid/);
  });
  it("each day has items, and titles are unique within the day", () => {
    for (const d of WHATS_NEW) {
      expect(d.items.length).toBeGreaterThan(0);
      expect(new Set(d.items.map((i) => i.title)).size).toBe(d.items.length);
    }
  });
  it("keep to plain language: no file paths, code or pull request numbers", () => {
    for (const d of WHATS_NEW) {
      const text = [d.headline, ...d.items.flatMap((i) => [i.title, i.body])].join(" ");
      expect(text).not.toMatch(/\.tsx?\b|src\/|\bPR\b|#\d{3}|`/);
    }
  });
});
