import { describe, expect, it } from "vitest";
import type { AppEvent } from "./model";
import { isYearReviewEmailDay, isYearReviewSeason, reviewYearOf, schoolYearName, schoolYearStart, yearReview, yearReviewLines } from "./yearReview";

const at = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h).getTime();
let n = 0;
const answer = (t: number, unit: string, correct = true): AppEvent =>
  ({ id: `e${++n}`, profileId: "a", type: "answer", t, unit, correct, attempts: 1, revealed: false, ms: 30_000, mode: "practice", difficulty: 1 }) as AppEvent;
/** `count` first-try answers on a unit, one a minute from `t`. */
const run = (t: number, unit: string, count: number, correct = true) => Array.from({ length: count }, (_, i) => answer(t + i * 60_000, unit, correct));

describe("the year in review's calendar", () => {
  it("covers the school year from August 1", () => {
    expect(reviewYearOf(at(2027, 6, 20))).toBe(2026);
    expect(schoolYearStart(2026)).toBe(new Date(2026, 7, 1).getTime());
    expect(schoolYearName(2026)).toBe("2026–27");
    expect(schoolYearName(2099)).toBe("2099–00");
  });

  it("shows the card in June and July, and emails from June 15 to the end of June", () => {
    expect(isYearReviewSeason(at(2027, 5, 31))).toBe(false);
    expect(isYearReviewSeason(at(2027, 6, 1))).toBe(true);
    expect(isYearReviewSeason(at(2027, 7, 31))).toBe(true);
    expect(isYearReviewSeason(at(2027, 8, 1))).toBe(false);
    expect(isYearReviewEmailDay(at(2027, 6, 14))).toBe(false);
    expect(isYearReviewEmailDay(at(2027, 6, 15))).toBe(true);
    expect(isYearReviewEmailDay(at(2027, 6, 30))).toBe(true);
    expect(isYearReviewEmailDay(at(2027, 7, 1))).toBe(false);
  });
});

describe("yearReview", () => {
  const now = at(2027, 6, 20);

  it("counts only this school year's practice", () => {
    const events = [...run(at(2026, 5, 3), "3/math/old", 5), ...run(at(2026, 9, 10), "4/math/fractions", 6, false), ...run(at(2026, 9, 11), "4/math/fractions", 4)];
    const r = yearReview(events, now);
    expect(r.year).toBe(2026);
    expect(r.answers).toBe(10);
    expect(r.daysPractised).toBe(2);
    expect(r.firstTry).toBe(40);
    expect(r.minutes).toBe(5); // 30 s an answer
    expect(r.subjects).toEqual([{ subject: "math", answers: 10 }]);
    expect(r.topSubject).toBe("math");
    expect(r.unitsStarted).toBe(1);
  });

  it("lists units that reached Proficient this year, not ones already there", () => {
    const events = [...run(at(2026, 5, 3), "3/math/already", 10), ...run(at(2026, 10, 1), "4/math/grew", 10), ...run(at(2026, 10, 2), "4/science/started", 2, false)];
    const r = yearReview(events, now);
    expect(r.grown.map((g) => g.key)).toEqual(["4/math/grew"]);
    expect(r.grown[0].level).toBe(2);
    expect(r.stickers).toBeGreaterThanOrEqual(1); // the lesson sticker, plus any moment stickers first earned this year
  });

  it("finds the longest run of days in a row this year", () => {
    const events = [5, 6, 7, 9].flatMap((d) => run(at(2026, 10, d), "4/math/a", 1));
    expect(yearReview(events, now).bestStreak).toBe(3);
  });

  it("is empty for a child who hasn't practised this year", () => {
    const r = yearReview(run(at(2026, 4, 3), "3/math/old", 5), now);
    expect(r).toMatchObject({ answers: 0, daysPractised: 0, firstTry: null, grown: [], topSubject: null, bestStreak: 0 });
  });
});

describe("yearReviewLines", () => {
  it("gives totals and up to three unit names, nothing for no practice", () => {
    expect(yearReviewLines({ name: "Maya", daysPractised: 40, minutes: 600, answers: 900, grown: 5, grownTitles: ["Fractions", "Decimals", "Area"] })).toEqual([
      "Maya practised on 40 days this school year: 600 min and 900 questions.",
      "  5 units grew into a 🌳 Tree or ⭐ Star: Fractions, Decimals, Area and 2 more.",
    ]);
    expect(yearReviewLines({ name: "Leo", daysPractised: 1, minutes: 3, answers: 8, grown: 0, grownTitles: [] })).toEqual(["Leo practised on 1 day this school year: 3 min and 8 questions."]);
    expect(yearReviewLines({ name: "Ada", daysPractised: 0, minutes: 0, answers: 0, grown: 0, grownTitles: [] })).toEqual([]);
  });
});
