// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import type { AppEvent, Mode } from "./model";
import { cachedWeekRecap, markRecapSeen, previousWeek, recapHeadline, recapSeen, weekRecap, type WeekRecap } from "./weekRecap";

const DAY = 86_400_000;
// Wednesday, October 28, 2026: last week ran from Monday the 19th to Sunday the 25th.
const NOW = new Date(2026, 9, 28, 15, 0).getTime();
const LAST_MON = new Date(2026, 9, 19, 9, 0).getTime();
const A = "3/math/add";
const B = "3/science/plants";
let n = 0;
const id = () => `e${String(n++).padStart(6, "0")}`;
const answer = (unit: string, t: number, correct = true): AppEvent => ({ id: id(), profileId: "p1", t, type: "answer", unit, correct, attempts: correct ? 1 : 2, revealed: false, ms: 20_000, mode: "practice" });
const answers = (unit: string, count: number, t: number) => Array.from({ length: count }, (_, i) => answer(unit, t + i * 1000));
const session = (t: number, mode: Mode = "practice"): AppEvent => ({ id: id(), profileId: "p1", t, type: "session", mode, scope: A, total: 6, correct: 6, ms: 60_000 });

describe("weekRecap", () => {
  it("is null when the child didn't practise last week", () => {
    expect(weekRecap([], NOW)).toBeNull();
    // Only this week, or only the week before.
    expect(weekRecap(answers(A, 10, NOW - DAY), NOW)).toBeNull();
    expect(weekRecap(answers(A, 10, LAST_MON - 2 * DAY), NOW)).toBeNull();
    // Two answers don't make a practice day.
    expect(weekRecap(answers(A, 2, LAST_MON), NOW)).toBeNull();
  });

  it("reads last week's days, answers, lessons that grew and lessons started", () => {
    const events = [
      // Before the week: 3 right is Developing (🌿 Sprout).
      ...answers(A, 3, LAST_MON - 10 * DAY),
      // Monday: 6 more right, so 9 attempts at 100% is Proficient.
      ...answers(A, 6, LAST_MON),
      session(LAST_MON + 10_000),
      // Thursday: a first go at a science unit.
      ...answers(B, 5, LAST_MON + 3 * DAY),
      { id: id(), profileId: "p1", t: LAST_MON + 3 * DAY + 9000, type: "trophy", trophy: "first-answer" } as AppEvent,
      // This week doesn't change last week's recap.
      ...answers(A, 10, NOW - DAY),
    ];
    const r = weekRecap(events, NOW)!;
    expect(r.week).toBe("2026-10-19");
    expect(r.days).toBe(2);
    expect(r.dayDots).toEqual([true, false, false, true, false, false, false]);
    expect(r.answers).toBe(11);
    expect(r.correct).toBe(11);
    expect(r.minutes).toBe(4);
    expect(r.grew).toEqual([{ key: A, from: 1, to: 2 }]);
    expect(r.started.map((u) => u.key)).toEqual([B]);
    expect(r.trophies).toEqual(["first-answer"]);
    // A lesson sticker for Proficient, and the "First lesson", "Perfect lesson" and "On a roll" moments.
    expect(r.stickers).toBe(4);
    expect(weekRecap(events.slice(0, -10), NOW)).toEqual(r);
  });

  it("counts stories read to the end as practice", () => {
    const story: AppEvent = { id: id(), profileId: "p1", t: LAST_MON + DAY, type: "story", story: "theo-kite", rl: 2, results: [true, true], pages: 6, ms: 120_000 };
    const r = weekRecap([story], NOW)!;
    expect(r.stories).toBe(1);
    expect(r.days).toBe(1);
    expect(recapHeadline(r)).toMatch(/new sticker/);
  });

  it("is the same week all week, and the next one on Monday", () => {
    const events = [...answers(A, 6, LAST_MON), session(LAST_MON + 10_000)];
    expect(weekRecap(events, new Date(2026, 9, 26, 0, 1).getTime())?.week).toBe("2026-10-19");
    expect(weekRecap(events, new Date(2026, 10, 1, 23, 59).getTime())?.week).toBe("2026-10-19");
    expect(weekRecap(events, new Date(2026, 10, 2, 0, 1).getTime())).toBeNull();
  });
});

describe("previousWeek", () => {
  it("steps back one Monday, across a month and a clock change", () => {
    expect(previousWeek("2026-10-26")).toBe("2026-10-19");
    expect(previousWeek("2026-11-02")).toBe("2026-10-26");
    expect(previousWeek("2026-03-09")).toBe("2026-03-02");
  });
});

describe("cachedWeekRecap", () => {
  it("works it out again only when an event from before this week arrives", () => {
    const events = [...answers(A, 6, LAST_MON), session(LAST_MON + 10_000)];
    const first = cachedWeekRecap("p-cache", events, NOW);
    expect(cachedWeekRecap("p-cache", [...events, ...answers(A, 5, NOW - 1000)], NOW)).toBe(first);
    const more = cachedWeekRecap("p-cache", [...events, ...answers(B, 5, LAST_MON + DAY)], NOW);
    expect(more).not.toBe(first);
    expect(more?.days).toBe(2);
  });
});

describe("recapHeadline", () => {
  const base: WeekRecap = { week: "2026-10-19", days: 3, dayDots: [], answers: 30, correct: 25, minutes: 12, grew: [], started: [], stickers: 0, stories: 0, trophies: [] };
  it("leads with what grew, then what was started, then stickers, then days", () => {
    expect(recapHeadline({ ...base, grew: [{ key: A, from: 1, to: 2 }], started: [{ key: B, from: -1, to: 0 }] })).toBe("You grew in 1 lesson last week!");
    expect(recapHeadline({ ...base, started: [{ key: B, from: -1, to: 0 }, { key: A, from: -1, to: 1 }] })).toBe("You planted 2 new lessons last week!");
    expect(recapHeadline({ ...base, stickers: 1 })).toBe("You found 1 new sticker last week!");
    expect(recapHeadline(base)).toBe("You practised on 3 days last week!");
  });
});

describe("recapSeen", () => {
  beforeEach(() => localStorage.clear());
  it("remembers the week a child closed, per child", () => {
    expect(recapSeen("p1")).toBeNull();
    markRecapSeen("p1", "2026-10-19");
    expect(recapSeen("p1")).toBe("2026-10-19");
    expect(recapSeen("p2")).toBeNull();
  });
});
