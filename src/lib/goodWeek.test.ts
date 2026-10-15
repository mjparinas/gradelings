// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import type { DayStat } from "./derive";
import { dayKey } from "./model";
import { isGoodWeek, practisedDays, SHARE_SNOOZE_MS, shareSnoozed, snoozeShare } from "./goodWeek";

const DAY = 86_400_000;
const now = new Date(2026, 9, 14, 12).getTime();
const stat = (over: Partial<DayStat>): DayStat => ({ day: "", learnSeconds: 0, answers: 0, correct: 0, sessions: 0, perfect: 0, playSeconds: 0, ...over }) as DayStat;
const week = (...ago: number[]) => Object.fromEntries(ago.map((a) => [dayKey(now - a * DAY), stat({ sessions: 1 })]));

describe("good week", () => {
  it("counts days with a finished lesson or at least 5 answers, in the last 7 days", () => {
    expect(practisedDays({ [dayKey(now)]: stat({ answers: 5 }), [dayKey(now - DAY)]: stat({ answers: 4 }), [dayKey(now - 2 * DAY)]: stat({ sessions: 1 }) }, now)).toBe(2);
    expect(practisedDays(week(0, 6, 7), now)).toBe(2);
  });

  it("is a good week from 3 days", () => {
    expect(isGoodWeek(week(0, 2), now)).toBe(false);
    expect(isGoodWeek(week(0, 2, 5), now)).toBe(true);
  });
});

describe("Not now", () => {
  beforeEach(() => localStorage.clear());

  it("keeps the card away on this device for a month", () => {
    expect(shareSnoozed(now)).toBe(false);
    snoozeShare(now);
    expect(shareSnoozed(now + SHARE_SNOOZE_MS - 1)).toBe(true);
    expect(shareSnoozed(now + SHARE_SNOOZE_MS)).toBe(false);
  });
});
