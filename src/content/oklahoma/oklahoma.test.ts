import { describe, expect, it } from "vitest";
import { COURSES } from "../all";

// Oklahoma's citations, own units, plan and US rules are checked by the framework and country contracts
// (src/content/contract.test.ts, with ./contract.ts). This file keeps what is Oklahoma's alone.

/** Every Oklahoma unit with its course. */
const oklahoma = COURSES.flatMap((c) =>
  c.units.filter((u) => u.standards["us-ok"]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })),
);

describe("Oklahoma", () => {
  it("teaches Oklahoma studies in its own units, which carry only Oklahoma standards", () => {
    const own = oklahoma.filter(({ u }) => u.id.startsWith("ok-"));
    expect(own.map(({ u }) => u.id)).toEqual(
      expect.arrayContaining(["ok-g3-symbols", "ok-g3-first-peoples", "ok-g3-growth", "ok-g9-statehood", "ok-g9-oklahoma-government", "ok-g9-modern-oklahoma"]),
    );
    for (const { u, key } of own) {
      expect(Object.keys(u.standards), `${key} carries only Oklahoma standards`).toEqual(["us-ok"]);
      expect(u.lesson, `${key} has a lesson`).toBeDefined();
    }
  });

  it("follows Oklahoma's social studies themes, grade by grade", () => {
    const social = (grade: string) => oklahoma.filter(({ c }) => c.grade === grade && c.subject === "social").map(({ u }) => u.id);
    expect(social("3").filter((id) => id.startsWith("ok-")).length).toBeGreaterThanOrEqual(6);
    expect(social("4")).toEqual(expect.arrayContaining(["wa-g5-us-geography", "ca-g5-explorers"]));
    expect(social("5")).toEqual(expect.arrayContaining(["ca-g5-thirteen-colonies", "ca-g5-constitution"]));
    expect(social("6")).toEqual(expect.arrayContaining(["ny-g5-hemisphere-geography", "ok-g6-world-maps"]));
    expect(social("7")).toEqual(expect.arrayContaining(["ny-g6-eastern-hemisphere", "ga-g7-africa"]));
    expect(social("8")).toEqual(expect.arrayContaining(["ca-g8-civil-war", "or-g8-reconstruction"]));
    expect(social("9")).toEqual(expect.arrayContaining(["ok-g9-statehood", "ca-g9-three-branches", "ok-g9-elections"]));
  });

  it("cites Pre-Algebra in 8th grade math and Algebra 1 in 9th", () => {
    const codes = (grade: string) => oklahoma.filter(({ c }) => c.grade === grade && c.subject === "math").map(({ u }) => u.standards["us-ok"]!);
    for (const s of codes("8")) expect(s, s).toMatch(/^PA\./);
    for (const s of codes("9")) expect(s, s).toMatch(/^A1\./);
  });
});
