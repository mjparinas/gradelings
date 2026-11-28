import { describe, expect, it } from "vitest";
import { cheerMessage, cheerStreak, childMessage, daysBetween, homeworkWaiting, reminderMessage, weeklyMessage } from "./pushMessages";
import type { HomeworkItem } from "./homework";

const DAY = 86_400_000;
const hw = (o: Partial<HomeworkItem>): HomeworkItem => ({ key: "3/math/x", className: "C", answered: 0, done: false, overdue: false, ...o });

describe("push messages", () => {
  it("counts whole days between two days", () => {
    expect(daysBetween("2026-11-15", "2026-11-19")).toBe(4);
    expect(daysBetween(null, "2026-11-19")).toBe(Infinity);
  });
  it("names the child in a parent's weekly message only when there is one", () => {
    expect(weeklyMessage(["Maya"]).body).toContain("Maya's week");
    expect(weeklyMessage(["Maya", "Leo"]).body).toContain("This week");
  });
  it("words reminders kindly and without results", () => {
    const m = reminderMessage([{ name: "Maya", daysQuiet: 4 }]);
    expect(m.body).toContain("hasn't practised");
    expect(m.body).not.toMatch(/\d+%|missed|behind/);
  });
  it("only nudges for unfinished homework that is due soon, late or undated", () => {
    const now = 1_000 * DAY;
    const items = [hw({ key: "a", dueAt: now + DAY }), hw({ key: "b", dueAt: now + 5 * DAY }), hw({ key: "c" }), hw({ key: "d", done: true }), hw({ key: "e", dueAt: now - DAY, overdue: true })];
    expect(homeworkWaiting(items, now).map((h) => h.key)).toEqual(["a", "c", "e"]);
  });
  it("tells a child about their homework without naming anyone and sets the badge", () => {
    const one = childMessage(1, "Fractions");
    expect(one.body).toContain("Fractions");
    expect(one.badge).toBe(1);
    expect(childMessage(3, undefined).body).toContain("3 things");
  });
  it("cheers only on an exact milestone streak that was practised today", () => {
    expect(cheerStreak({ current: 3, activeToday: true })).toBe(3);
    expect(cheerStreak({ current: 7, activeToday: true })).toBe(7);
    expect(cheerStreak({ current: 3, activeToday: false })).toBeUndefined();
    expect(cheerStreak({ current: 4, activeToday: true })).toBeUndefined();
    expect(cheerStreak({ current: 0, activeToday: true })).toBeUndefined();
  });
  it("words a cheer kindly, names the longest streak and shares no results", () => {
    const m = cheerMessage([{ name: "Leo", days: 3 }, { name: "Maya", days: 14 }])!;
    expect(m.title).toContain("Maya");
    expect(m.title).toContain("14-day");
    expect(m.body).not.toMatch(/\d+%|missed|behind|score/);
    expect(m.tag).toBe("cheer");
    expect(cheerMessage([])).toBeUndefined();
  });
});
