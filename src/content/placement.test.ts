import { describe, expect, it } from "vitest";
import type { Course, Unit } from "./types";
import { adoptUnits, citeFor, courseOf, followBcGrade, planGrade, poolOf, type PlanOptions } from "./placement";

const unit = (id: string, standards: Unit["standards"] = { "ca-on": "on" }): Unit => ({ id, title: id, standards, generate: () => [] }) as unknown as Unit;
const course = (subject: Course["subject"], units: Unit[], grade: Course["grade"] = "4"): Course => ({ grade, subject, bigIdeas: {}, units });

const cite = citeFor("us-wa");
const OPTIONS: PlanOptions = {
  framework: "us-wa",
  name: "Testland",
  cite,
  plan: {
    "4/math": [
      ["bc-shared", "share", "M.1", "shared"],
      ["on-frac", "adopt", "M.2", "fractions"],
      ["g3-time", "lift", "M.3", "time"],
    ],
  },
  focus: (grade, subject) => [`${grade} ${subject}`],
};

describe("placement", () => {
  it("writes standards as citation then text, for one framework only", () => {
    expect(cite("M.1", "counts")).toEqual({ "us-wa": "M.1 · counts" });
  });

  it("shares, adopts and lifts units from a plan, copying only adopted units", () => {
    const pool = [[course("math", [unit("on-frac")])]];
    const lift = [[course("math", [unit("g3-time")], "3")]];
    const [math] = planGrade(OPTIONS, "4", pool, { math: { units: [unit("wa-own", cite("M.9", "own"))] } }, lift);
    expect(math.shares).toEqual({ "bc-shared": { standards: { "us-wa": "M.1 · shared" } } });
    expect(math.units.map((u) => [u.id, u.standards])).toEqual([
      ["on-frac", { "us-wa": "M.2 · fractions" }],
      ["g3-time", { "us-wa": "M.3 · time" }],
      ["wa-own", { "us-wa": "M.9 · own" }],
    ]);
    expect(math.order).toEqual({ "us-wa": ["bc-shared", "on-frac", "g3-time", "wa-own"] });
    expect(math.bigIdeas).toEqual({ "us-wa": ["4 math"] });
    // The original keeps its own standards: a copy never leaks into the framework it came from.
    expect(pool[0][0].units[0].standards).toEqual({ "ca-on": "on" });
  });

  it("puts own units first when asked, and honours a given order", () => {
    const pool = [[course("math", [unit("on-frac")])]];
    const lift = [[course("math", [unit("g3-time")], "3")]];
    const own = { units: [unit("wa-own")] };
    expect(planGrade({ ...OPTIONS, ownFirst: true }, "4", pool, { math: own }, lift)[0].order?.["us-wa"]?.[0]).toBe("wa-own");
    expect(planGrade(OPTIONS, "4", pool, { math: { ...own, order: ["x"] } }, lift)[0].order).toEqual({ "us-wa": ["x"] });
  });

  it("adopts from a pool of unit files per subject", () => {
    const lift = [[course("math", [unit("g3-time")], "3")]];
    const [math] = planGrade(OPTIONS, "4", { math: [unit("on-frac")], science: [unit("other")] }, {}, lift);
    expect(math.units.map((u) => u.id)).toEqual(["on-frac", "g3-time"]);
    // A unit in another subject's list is not found.
    expect(() => planGrade(OPTIONS, "4", { science: [unit("on-frac")] }, {}, lift)).toThrow('no unit "on-frac" to adopt in 4/math');
  });

  it("names the framework and unit when a planned unit is missing", () => {
    expect(() => planGrade(OPTIONS, "4", [], {}, [])).toThrow('Testland: no unit "on-frac" to adopt in 4/math');
    expect(() => adoptUnits("Testland", cite, [], { gone: ["A", "b"] })).toThrow('Testland: no unit "gone" to adopt');
  });

  it("gives every listed subject a course, even an empty one", () => {
    const courses = planGrade({ ...OPTIONS, subjects: ["math", "science"] }, "4", [[course("math", [unit("on-frac")])]], {}, [[course("math", [unit("g3-time")])]]);
    expect(courses.map((c) => [c.subject, c.units.length])).toEqual([["math", 2], ["science", 0]]);
  });

  it("builds a course by hand with shared, adopted and own units", () => {
    const adopted = adoptUnits("Testland", cite, poolOf("math", [course("math", [unit("a")])]), { a: ["A1", "adopted"] }, { a: "a-copy" });
    const c = courseOf("us-wa", cite, "4", "math", ["focus"], { share: { s: ["S1", "shared"] }, adopted, own: [unit("o")] });
    expect(c.units.map((u) => u.id)).toEqual(["a-copy", "o"]);
    expect(c.order).toEqual({ "us-wa": ["s", "a-copy", "o"] });
  });

  it("follows BC by sharing every BC unit under the territory's id", () => {
    const bc = course("math", [unit("bc-1", { "ca-bc": "BC text" }), unit("on-only")]);
    const [c] = followBcGrade("ca-yt", [{ ...bc, bigIdeas: { "ca-bc": ["big"] } }], { math: [unit("yk-1")] });
    expect(c.shares).toEqual({ "bc-1": { standards: { "ca-yt": "BC text" } } });
    expect(c.units.map((u) => u.id)).toEqual(["yk-1"]);
    expect(c.order).toEqual({ "ca-yt": ["bc-1", "yk-1"] });
    expect(c.bigIdeas).toEqual({ "ca-yt": ["big"] });
  });
});
