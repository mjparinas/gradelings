import { describe, expect, it } from "vitest";
import type { DayStat } from "./derive";
import { parentHighlight } from "./parentHighlight";

const day = (answers: number, correct = answers): DayStat => ({ answers, correct, sessions: 1, stories: 0, learnSeconds: 600 }) as DayStat;
const week = (n: number) => Array.from({ length: 7 }, (_, i) => (i < n ? day(10, 8) : undefined));

describe("parentHighlight", () => {
  it("welcomes a child who has not started", () => {
    const h = parentHighlight({ name: "Maya", week: week(0), everPractised: false });
    expect(h.headline).toContain("ready to start");
  });
  it("is kind about a quiet week", () => {
    const h = parentHighlight({ name: "Maya", week: week(0), everPractised: true });
    expect(h.headline).toContain("quiet week");
    expect(h.headline).not.toMatch(/missed|failed|behind/i);
  });
  it("celebrates a habit and shows first-try accuracy", () => {
    const h = parentHighlight({ name: "Maya", week: week(5), everPractised: true });
    expect(h.headline).toContain("5 of the last 7 days");
    expect(h.detail).toBe("50 questions answered, 80% right on the first try.");
  });
  it("uses singular wording for one day", () => {
    expect(parentHighlight({ name: "Maya", week: week(1), everPractised: true }).headline).toContain("1 day this week");
  });
  it("points at the closest next level", () => {
    const h = parentHighlight({ name: "Maya", week: week(3), everPractised: true, next: { title: "Fractions", questions: 1, levelLabel: "Tree" } });
    expect(h.tip).toBe("Maya is 1 right answer away from growing into Tree in Fractions. A short lesson would get there.");
  });
});
