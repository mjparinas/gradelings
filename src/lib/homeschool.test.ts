import { describe, expect, it } from "vitest";
import type { AppEvent } from "./model";
import { hoursCsv, hoursLog, hoursText, parseDay, portfolio, rangeFor, SAMPLES } from "./homeschool";

const at = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h).getTime();
let n = 0;
const answer = (t: number, unit: string, correct = true, extra: Partial<AppEvent> = {}): AppEvent =>
  ({ id: `e${++n}`, profileId: "a", type: "answer", t, unit, correct, attempts: 1, revealed: false, ms: 30_000, mode: "practice", ...extra }) as AppEvent;
const story = (t: number): AppEvent => ({ id: `e${++n}`, profileId: "a", type: "story", t, story: "k1-lost-mitten", rl: 1, results: [true, false], pages: 6, ms: 300_000 }) as AppEvent;

describe("ranges", () => {
  it("starts this week on Monday, this month on the 1st and this school year on August 1", () => {
    const now = at(2026, 11, 5, 15); // a Thursday
    expect(new Date(rangeFor("week", now).from)).toEqual(new Date(2026, 10, 2));
    expect(new Date(rangeFor("month", now).from)).toEqual(new Date(2026, 10, 1));
    expect(new Date(rangeFor("year", now).from)).toEqual(new Date(2026, 7, 1));
    expect(new Date(rangeFor("year", at(2027, 3, 1)).from)).toEqual(new Date(2026, 7, 1));
    expect(rangeFor("week", now).to).toBe(new Date(2026, 10, 6).getTime() - 1);
  });

  it("on a Sunday the week still began on Monday", () => {
    expect(new Date(rangeFor("week", at(2026, 11, 8)).from)).toEqual(new Date(2026, 10, 2));
  });

  it("reads date inputs and refuses anything else", () => {
    expect(parseDay("2026-10-05")).toBe(new Date(2026, 9, 5).getTime());
    expect(parseDay("2026-02-30")).toBeNaN();
    expect(parseDay("")).toBeNaN();
  });
});

describe("hoursLog", () => {
  const events = [
    answer(at(2026, 10, 5, 9), "2/math/tens-and-ones"),
    answer(at(2026, 10, 5, 10), "2/science/weather", false, { ms: 600_000 }),
    story(at(2026, 10, 5, 11)),
    answer(at(2026, 10, 7), "2/math/facts", true, { fact: "add:3:4" }),
    { id: "p1", profileId: "a", type: "play", t: at(2026, 10, 7), game: "munchers", seconds: 600 } as AppEvent,
    answer(at(2026, 9, 1), "2/math/tens-and-ones"),
  ];

  it("adds capped learning time per day and subject, stories as language, and never games", () => {
    const log = hoursLog(events, at(2026, 10, 1, 0), at(2026, 10, 31, 23));
    expect(log.days.map((d) => d.day)).toEqual(["2026-10-05", "2026-10-07"]);
    const oct5 = log.days[0];
    // 30 s math, 60 s science (capped from 10 min), story time capped by its pages and questions.
    expect(oct5.subjects.math).toBe(30);
    expect(oct5.subjects.science).toBe(60);
    expect(oct5.subjects.language).toBeGreaterThan(0);
    expect(oct5.answers).toBe(2);
    expect(oct5.stories).toBe(1);
    expect(log.days[1].subjects).toEqual({ math: 30 });
    expect(log.seconds).toBe(log.days.reduce((s, d) => s + d.seconds, 0));
    expect(log.subjects[0].seconds).toBeGreaterThanOrEqual(log.subjects[1].seconds);
  });

  it("leaves out time before or after the range", () => {
    const log = hoursLog(events, at(2026, 10, 6, 0), at(2026, 10, 31, 23));
    expect(log.days.map((d) => d.day)).toEqual(["2026-10-07"]);
  });

  it("makes a spreadsheet with a column per subject and a total row", () => {
    const log = hoursLog(events, at(2026, 10, 1, 0), at(2026, 10, 31, 23));
    const lines = hoursCsv(log, (s) => s.toUpperCase()).trim().split("\r\n");
    expect(lines[0]).toBe(`Date,Total minutes,${log.subjects.map((s) => `${s.subject.toUpperCase()} minutes`).join(",")},Questions,Stories read`);
    expect(lines).toHaveLength(4);
    expect(lines[1].startsWith("2026-10-05,")).toBe(true);
    expect(lines[3].startsWith("Total,")).toBe(true);
    expect(lines[3].endsWith(",3,1")).toBe(true);
  });

  it("writes time in hours and minutes", () => {
    expect(hoursText(0)).toBe("0 min");
    expect(hoursText(40 * 60)).toBe("40 min");
    expect(hoursText(3 * 3600)).toBe("3 h");
    expect(hoursText(3 * 3600 + 25 * 60 + 10)).toBe("3 h 25 min");
  });
});

describe("portfolio", () => {
  it("lists units with levels before and after, and the latest right answers as samples", () => {
    const before = Array.from({ length: 4 }, (_, i) => answer(at(2026, 9, 1) + i, "2/math/tens-and-ones", i % 2 === 0));
    const during = Array.from({ length: 12 }, (_, i) => answer(at(2026, 10, 5) + i * 60_000, "2/math/tens-and-ones", true, { q: `What is ${i} + 1?` }));
    const work = portfolio([...before, ...during, answer(at(2026, 10, 6), "2/math/tens-and-ones", false, { q: "Missed one" }), story(at(2026, 10, 7))], at(2026, 10, 1, 0), at(2026, 10, 31, 23));
    expect(work.answers).toBe(13);
    expect(work.daysLearning).toBe(3);
    const math = work.subjects.find((s) => s.subject === "math")!;
    expect(math.units).toHaveLength(1);
    const unit = math.units[0];
    expect(unit.answers).toBe(13);
    expect(unit.firstTry).toBe(12);
    expect(unit.before).toBe(1);
    expect(unit.after).toBe(2);
    expect(unit.samples).toEqual(["What is 11 + 1?", "What is 10 + 1?", "What is 9 + 1?"].slice(0, SAMPLES));
    expect(unit.samples).not.toContain("Missed one");
    expect(work.grown).toBe(1);
    expect(work.stories).toEqual([{ story: "k1-lost-mitten", t: at(2026, 10, 7), right: 1, questions: 2 }]);
  });

  it("counts Math Facts answers as math questions without making a unit of them", () => {
    const work = portfolio([answer(at(2026, 10, 5), "3/math/facts", true, { fact: "mul:7:8" })], at(2026, 10, 1, 0), at(2026, 10, 31, 23));
    expect(work.answers).toBe(1);
    expect(work.subjects).toEqual([{ subject: "math", seconds: 30, answers: 1, units: [] }]);
  });

  it("is empty with nothing in the range", () => {
    const work = portfolio([answer(at(2026, 9, 1), "2/math/tens-and-ones")], at(2026, 10, 1, 0), at(2026, 10, 31, 23));
    expect(work).toMatchObject({ answers: 0, seconds: 0, daysLearning: 0, firstTry: null, subjects: [], stories: [] });
  });
});
