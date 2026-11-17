import { describe, expect, it } from "vitest";
import type { AppEvent } from "./model";
import { problemSolution, recentProblems } from "./recentProblems";

const DAY = 86_400_000;
const now = 100 * DAY;
let n = 0;
const ans = (extra: Record<string, unknown>): AppEvent =>
  ({ id: `e${n++}`, profileId: "p1", type: "answer", unit: "3/math/fractions", t: now - DAY, correct: false, attempts: 2, revealed: false, ms: 5000, mode: "practice", q: "What is 47 + 38?", ...extra }) as AppEvent;

describe("recentProblems", () => {
  it("lists first-try misses with the wrong and right answer", () => {
    const list = recentProblems([ans({ g: "75", a: "85" })], "p1", now);
    expect(list).toEqual([{ unit: "3/math/fractions", q: "What is 47 + 38?", answer: "85", given: ["75"], count: 1, lastT: now - DAY, gotItSince: false }]);
  });

  it("groups repeats, newest wrong answer first, and counts them", () => {
    const list = recentProblems([ans({ g: "75", t: now - 3 * DAY }), ans({ g: "83", t: now - DAY })], "p1", now);
    expect(list).toHaveLength(1);
    expect(list[0]).toMatchObject({ count: 2, given: ["83", "75"] });
  });

  it("notes a later first-try right answer and sorts still-tricky questions first", () => {
    const list = recentProblems(
      [ans({ g: "75", t: now - 3 * DAY }), ans({ correct: true, attempts: 1, t: now - 2 * DAY }), ans({ q: "What is 9 × 7?", g: "56", t: now - 5 * DAY })],
      "p1",
      now,
    );
    expect(list.map((p) => [p.q, p.gotItSince])).toEqual([["What is 9 × 7?", false], ["What is 47 + 38?", true]]);
  });

  it("ignores other children, old events, answers with no text, hints and the reset day", () => {
    const list = recentProblems(
      [ans({ profileId: "p2", g: "1" }), ans({ g: "1", t: now - 20 * DAY }), ans({ q: undefined, g: "1" }), ans({ attempts: 2 }), ans({ g: "1", t: now - 3 * DAY })],
      "p1",
      now,
      now - 2 * DAY,
    );
    expect(list).toEqual([]);
  });

  it("keeps a revealed answer that has no recorded wrong answer", () => {
    expect(recentProblems([ans({ revealed: true })], "p1", now)[0]).toMatchObject({ given: [], count: 1 });
  });

  it("counts an event once, and skips unknown units", () => {
    const e = ans({ g: "75" });
    expect(recentProblems([e, e], "p1", now)[0].count).toBe(1);
    expect(recentProblems([ans({ g: "1", unit: "nope" })], "p1", now)).toEqual([]);
  });
});

describe("problemSolution", () => {
  it("works out plain arithmetic whose answer is known", () => {
    expect(problemSolution({ q: "What is 47 + 38?", answer: "85" })?.answer).toBe("85");
  });
  it("shows nothing without the answer, with a cut-off question or a disagreeing answer", () => {
    expect(problemSolution({ q: "What is 47 + 38?" })).toBeNull();
    expect(problemSolution({ q: "What is 47 + 38 and then some of the…", answer: "85" })).toBeNull();
    expect(problemSolution({ q: "What is 47 + 38?", answer: "86" })).toBeNull();
  });
});
