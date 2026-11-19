import { describe, expect, it, vi } from "vitest";
import { applyBadge, badgeCount, MAX_BADGE } from "./appBadge";
import type { Classwork } from "./classroom";

const now = Date.parse("2026-11-19T12:00:00Z");
const cw = (keys: string[], goal?: Record<string, number>): Classwork => ({ profileId: "p1", classId: "c", className: "Class", unitKeys: keys, goal, since: Object.fromEntries(keys.map((k) => [k, now - 86_400_000])) }) as Classwork;
const base = { profileId: "p1", events: [], level: () => 0, unfinished: null, now };

describe("badgeCount", () => {
  it("is 0 with nothing waiting", () => {
    expect(badgeCount({ ...base, classwork: [] })).toBe(0);
  });
  it("counts unfinished homework units and skips finished ones", () => {
    expect(badgeCount({ ...base, classwork: [cw(["a", "b"])], level: (k) => (k === "a" ? 2 : 0) })).toBe(1);
  });
  it("adds one for a lesson left partway", () => {
    const lesson = { mode: "practice" as const, scope: "x", title: "T", icon: "i", results: [true], total: 8, ms: 1, at: now - 1000 };
    expect(badgeCount({ ...base, classwork: [], unfinished: lesson })).toBe(1);
  });
  it("ignores another child's homework and caps the number", () => {
    expect(badgeCount({ ...base, profileId: "other", classwork: [cw(["a"])] })).toBe(0);
    const many = Array.from({ length: 20 }, (_, i) => `u${i}`);
    expect(badgeCount({ ...base, classwork: [cw(many)] })).toBe(MAX_BADGE);
  });
});

describe("applyBadge", () => {
  it("sets and clears the badge", async () => {
    const nav = { setAppBadge: vi.fn().mockResolvedValue(undefined), clearAppBadge: vi.fn().mockResolvedValue(undefined) };
    await applyBadge(3, nav);
    expect(nav.setAppBadge).toHaveBeenCalledWith(3);
    await applyBadge(0, nav);
    expect(nav.clearAppBadge).toHaveBeenCalled();
  });
  it("does nothing where the Badging API is missing or refuses", async () => {
    await expect(applyBadge(2, {})).resolves.toBeUndefined();
    await expect(applyBadge(2, { setAppBadge: () => Promise.reject(new Error("no")) })).resolves.toBeUndefined();
  });
});
