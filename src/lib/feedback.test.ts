import { describe, expect, it } from "vitest";
import { nudgeFor, praiseFor } from "./feedback";
import { STREAK_MILESTONES, streakMoment, welcomeBack } from "./streakMoments";

describe("praiseFor", () => {
  it("names the streak from 3 in a row", () => {
    expect(praiseFor({ run: 3 }, 0)).toContain("3 in a row");
    expect(praiseFor({ run: 12 }, 0)).toContain("12 in a row");
  });
  it("is kind about comebacks and hints, and never shames", () => {
    const words = [praiseFor({ run: 0, comeback: true }, 0), praiseFor({ run: 0, helped: true }, 0), nudgeFor(0)].join(" ");
    expect(words).not.toMatch(/wrong|fail|bad|stupid/i);
    expect(praiseFor({ run: 0, comeback: true }, 0)).not.toBe(praiseFor({ run: 0 }, 0));
  });
  it("stays in range for any roll", () => {
    for (const roll of [0, 0.5, 0.999999]) {
      expect(praiseFor({ run: 0 }, roll).length).toBeGreaterThan(0);
      expect(nudgeFor(roll).length).toBeGreaterThan(0);
    }
  });
});

describe("streakMoment", () => {
  it("fires once, on the day a milestone is crossed", () => {
    for (const m of STREAK_MILESTONES) {
      expect(streakMoment(m - 1, m)?.days).toBe(m);
      expect(streakMoment(m, m + 1)?.days).not.toBe(m);
    }
  });
  it("does nothing when the streak did not grow", () => {
    expect(streakMoment(7, 7)).toBeUndefined();
    expect(streakMoment(10, 3)).toBeUndefined();
  });
  it("gives the biggest milestone if several are passed", () => {
    expect(streakMoment(0, 30)?.days).toBe(30);
  });
});

describe("welcomeBack", () => {
  it("says nothing for a child who was here yesterday", () => {
    expect(welcomeBack("Maya", 0)).toBeUndefined();
    expect(welcomeBack("Maya", 1)).toBeUndefined();
  });
  it("uses the name and warms up the longer they were away", () => {
    expect(welcomeBack("Maya", 3, 0)).toContain("Maya");
    expect(welcomeBack("Maya", 20, 0)).toMatch(/missed|catch up/i);
    expect(welcomeBack("Maya", 6, 0)).not.toMatch(/lost|gone|behind/i);
  });
});
