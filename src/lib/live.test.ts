import { describe, expect, it } from "vitest";
import { liveCounts, liveDesks, livePercents } from "./live";

describe("liveCounts", () => {
  it("counts answers per choice in the question's order, including choices nobody picked", () => {
    const q = { choices: [{ id: "a", label: "1" }, { id: "b", label: "2" }, { id: "c", label: "3" }] };
    expect(liveCounts(q, [{ choice: "b" }, { choice: "b" }, { choice: "a" }, { choice: "zzz" }])).toEqual([
      { id: "a", count: 1 },
      { id: "b", count: 2 },
      { id: "c", count: 0 },
    ]);
  });
});

describe("liveDesks and livePercents", () => {
  const students = [{ profileId: "a", name: "Maya" }, { profileId: "b", name: "Sam" }, { profileId: "c", name: "Alex" }, { profileId: "d", name: "Jo" }];
  it("marks unanswered desks waiting and answered ones right or wrong", () => {
    const desks = liveDesks(students, [{ profileId: "a", correct: true }, { profileId: "b", correct: false }, { profileId: "zzz", correct: true }]);
    expect(desks.map((d) => d.state)).toEqual(["right", "wrong", "waiting", "waiting"]);
    expect(livePercents(desks)).toEqual({ right: 25, wrong: 25, waiting: 50 });
  });
  it("handles an empty class", () => {
    expect(livePercents([])).toEqual({ right: 0, wrong: 0, waiting: 0 });
  });
});
