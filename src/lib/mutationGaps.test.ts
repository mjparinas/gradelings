// Tests added after a mutation run (`npm run test:mutation`) showed these rules could change without a test failing.
import { describe, expect, it } from "vitest";
import { derive, type DayStat } from "./derive";
import { dayKey, type AppEvent, type FamilyInfo } from "./model";
import { GROWTH_STAGES, growthStage, nextGrowthStage } from "./buddy";
import { goalOptions } from "./goal";
import { activeDay } from "./quests";
import { NOT_STARTED } from "./proficiency";
import { READING_SAMPLES_KEPT } from "./readingLevel";
import {
  MIN_TRIAL_CARRY_MS, currencyFor, firstChargeAt, giftCents, hasPaidPlan, isPremium, money, perChildMonthly, pricesFor,
} from "./plan";

const DAY = 86_400_000;
const HOUR = 3_600_000;
const UNIT = "2/math/tens-and-ones";
const T0 = new Date(2026, 9, 1, 15, 0).getTime();
let n = 0;
const ans = (t: number, extra: Record<string, unknown> = {}): AppEvent =>
  ({ id: `m${String(n++).padStart(6, "0")}`, profileId: "p1", t, type: "answer", unit: UNIT, correct: true, attempts: 1, revealed: false, ms: 5000, mode: "practice", ...extra }) as AppEvent;

describe("billing numbers", () => {
  it("carries a trial into checkout only when 49 hours or more are left", () => {
    expect(MIN_TRIAL_CARRY_MS).toBe(49 * HOUR);
    const now = 1_000_000_000;
    expect(firstChargeAt(now + 49 * HOUR, false, now)).toBe(now + 49 * HOUR);
    expect(firstChargeAt(now + 49 * HOUR - 1, false, now)).toBeNull();
    expect(firstChargeAt(now + 30 * DAY, true, now)).toBeNull();
  });

  it("prices a gift and each country's plan", () => {
    expect(giftCents("CAD")).toBe(11999);
    expect(giftCents("USD")).toBe(11999);
    expect(currencyFor("US")).toBe("USD");
    expect(currencyFor("CA")).toBe("CAD");
    expect(currencyFor(null)).toBe("CAD");
    expect(pricesFor("US").month.label).toBe("US$14.99/month");
    expect(pricesFor("CA").year.label).toBe("$119.99/year");
    expect(pricesFor("US").year.note).toBe("Save 33%");
    expect(money(2, "CAD")).toBe("$2.00");
    expect(money(2.5, "USD")).toBe("US$2.50");
    expect(perChildMonthly("CAD", "year")).toBe(2);
    expect(perChildMonthly("CAD", "month")).toBe(3);
  });

  it("treats active, trialing and past-due subscriptions as paid, and cancelled ones as not", () => {
    const base: FamilyInfo = { plan: "free", trialEndsAt: 0 } as FamilyInfo;
    for (const status of ["active", "trialing", "past_due"]) {
      const f = { ...base, subscription: { status } } as unknown as FamilyInfo;
      expect(hasPaidPlan(f, 5)).toBe(true);
      expect(isPremium(f, 5)).toBe(true);
    }
    const gone = { ...base, subscription: { status: "canceled" } } as unknown as FamilyInfo;
    expect(hasPaidPlan(gone, 5)).toBe(false);
    expect(isPremium(gone, 5)).toBe(false);
  });
});

describe("small rules", () => {
  it("rounds the easy and stretch daily goals to 5 minutes", () => {
    expect(goalOptions(15)).toEqual({ easy: 10, regular: 15, stretch: 20 });
    expect(goalOptions(30)).toEqual({ easy: 20, regular: 30, stretch: 40 });
    expect(goalOptions(60)).toEqual({ easy: 40, regular: 60, stretch: 60 });
    expect(goalOptions(5)).toEqual({ easy: 5, regular: 5, stretch: 10 });
  });

  it("counts a day as practised for a session, a story or 5 answers", () => {
    const day = (o: Partial<DayStat>) => ({ sessions: 0, stories: 0, answers: 0, ...o }) as DayStat;
    expect(activeDay(day({}))).toBe(false);
    expect(activeDay(day({ answers: 4 }))).toBe(false);
    expect(activeDay(day({ answers: 5 }))).toBe(true);
    expect(activeDay(day({ sessions: 1 }))).toBe(true);
    expect(activeDay(day({ stories: 1 }))).toBe(true);
  });

  it("grows the buddy at levels 1, 5, 15, 30 and 50", () => {
    expect(GROWTH_STAGES.map((s) => [s.stage, s.name, s.level, s.gain])).toEqual([
      [1, "Cub", 1, "Just getting started"],
      [2, "Explorer", 5, "A bow tie"],
      [3, "Adventurer", 15, "A flowing cape"],
      [4, "Hero", 30, "A shiny medal"],
      [5, "Legend", 50, "A golden crown"],
    ]);
    expect(growthStage(14).name).toBe("Explorer");
    expect(growthStage(15).name).toBe("Adventurer");
    expect(nextGrowthStage(1)?.name).toBe("Explorer");
    expect(nextGrowthStage(50)).toBeUndefined();
    expect(NOT_STARTED).toBe(-1);
  });
});

describe("derive gaps", () => {
  it("keeps only the latest reading samples", () => {
    const events = Array.from({ length: READING_SAMPLES_KEPT + 7 }, (_, i) => ans(T0 + i, { rl: 3 }));
    expect(derive(events).reading).toHaveLength(READING_SAMPLES_KEPT);
  });

  it("ignores answers without a fact when tracking facts", () => {
    expect(Object.keys(derive([ans(T0)]).facts)).toEqual([]);
  });

  it("only treats a 30-day gap as being away", () => {
    // Reach Proficient (8+ answers, 75%+), then keep going the next day: nothing is "kept" without the gap.
    const run = Array.from({ length: 8 }, (_, i) => ans(T0 + i));
    const next = Array.from({ length: 6 }, (_, i) => ans(T0 + DAY + i));
    expect(derive([...run, ...next]).units[UNIT].kept).toBeFalsy();
    const back = Array.from({ length: 5 }, (_, i) => ans(T0 + 31 * DAY + i));
    expect(derive([...run, ...back]).units[UNIT].kept).toBe(true);
  });

  it("counts consecutive practice days as a growing streak", () => {
    const five = (day: number) => Array.from({ length: 5 }, (_, i) => ans(T0 + day * DAY + i));
    const d = derive([...five(0), ...five(1), ...five(2)], T0 + 2 * DAY + 100);
    expect(d.streak.current).toBe(3);
    expect(d.streak.best).toBe(3);
    expect(dayKey(T0)).toBeTruthy();
  });

  it("adds a story's learning time rather than taking it away", () => {
    const story = { id: "s1", profileId: "p1", t: T0, type: "story", story: "theo-kite", rl: 2.1, results: [true], pages: 6, ms: 4 * 60_000 } as AppEvent;
    expect(derive([story]).totals.learnSeconds).toBeGreaterThan(0);
  });
});
