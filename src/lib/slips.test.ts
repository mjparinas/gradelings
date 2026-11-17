import { describe, expect, it } from "vitest";
import { commonSlips, slipLabel, studentSlips } from "./slips";

const ans = (unit: string, q: string | undefined, w: string | undefined, over: Record<string, unknown> = {}) => ({ type: "answer", unit, t: 100, q, w, correct: false, ...over });

describe("slips", () => {
  it("cleans a wrong answer", () => {
    expect(slipLabel("  54 \n cm ")).toBe("54 cm");
    expect(slipLabel("x".repeat(40))).toHaveLength(24);
  });

  it("reads one student's wrong first answers once each, on the assigned units since they were assigned", () => {
    const since = { "3/math/a": 50 };
    const r = studentSlips(
      [ans("3/math/a", "7 × 8", "54"), ans("3/math/a", "7 × 8", "54"), ans("3/math/a", "7 × 8", "63", { skill: "times-7" }), ans("3/math/a", "1 + 1", "3", { correct: true }), ans("3/math/a", "2 + 2", undefined), ans("3/math/a", "old", "1", { t: 10 }), ans("3/math/b", "other", "2"), { type: "session", t: 100 }],
      since,
    );
    expect(r).toEqual([
      { unit: "3/math/a", q: "7 × 8", w: "54" },
      { unit: "3/math/a", skill: "times-7", q: "7 × 8", w: "63" },
    ]);
  });

  it("lists, per unit, wrong answers at least two students gave, most common first, three at most", () => {
    const s = (w: string, q = "q") => ({ unit: "u", q, w });
    const out = commonSlips([[s("a"), s("b"), s("c"), s("d")], [s("a"), s("b"), s("c"), s("d")], [s("a"), s("b"), s("d")], [s("a")]]);
    expect(out.u.map((x) => [x.w, x.students])).toEqual([["a", 4], ["b", 3], ["d", 3]]);
    // One student's slip isn't a pattern, and different wrong answers to one question don't add up.
    expect(commonSlips([[s("x")], [s("y")]])).toEqual({});
  });

  it("keeps skills apart", () => {
    const out = commonSlips([[{ unit: "u", skill: "k", q: "q", w: "1" }], [{ unit: "u", skill: "k", q: "q", w: "1" }]]);
    expect(out.u).toEqual([{ q: "q", w: "1", students: 2, skill: "k" }]);
  });
});
