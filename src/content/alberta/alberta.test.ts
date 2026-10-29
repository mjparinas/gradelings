import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { FRAMEWORKS, getFramework } from "../frameworks";
import { allUnitRefs, coursesForGrade, isGradeLoaded, loadGrade } from "../index";
import { head } from "../contract";

// Alberta's citations are checked by the framework contract (src/content/contract.test.ts, with ./contract.ts).

describe("Alberta framework", () => {
  const alberta = getFramework("ca-ab");

  it("is registered with Alberta names and Pre-K to Grade 9", () => {
    expect(FRAMEWORKS.map((f) => f.id)).toContain("ca-ab");
    expect(alberta.slug).toBe("alberta");
    expect(alberta.region).toBe("Alberta");
    expect(alberta.grades).toEqual(["pk", "k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  });

  it("uses one practice scale with four steps, never a provincial scale", () => {
    const scheme = alberta.scoringFor("4");
    expect(scheme.levels).toHaveLength(4);
    expect(scheme.levels.map((l) => l.kidLabel)).toEqual(["Seedling", "Sprout", "Tree", "Star"]);
    expect(alberta.reportCard.intro).toMatch(/doesn't use one provincial report card/);
    expect(alberta.scoringFor("k")).toBe(scheme);
  });
});

describe("Alberta content", () => {
  const mine = COURSES.flatMap((course) => course.units.filter((u) => u.standards["ca-ab"]).map((unit) => ({ course, unit, standard: unit.standards["ca-ab"]! })));

  it("checks every Grade 7 to 9 immersion unit against the immersion program's general outcomes", () => {
    for (const g of ["7", "8", "9"]) {
      const units = mine.filter((m) => m.course.grade === g && m.course.subject === "immersion");
      expect(units.length, `immersion ${g}`).toBeGreaterThanOrEqual(5);
      for (const { unit, standard } of units) expect(head(standard), `${g}/${unit.id}`).toMatch(/^(?:(?:CO|CÉ|PO|PÉ)[1-5]|V1)(?:; (?:(?:CO|CÉ|PO|PÉ)[1-5]|V1))*$/);
    }
  });

  it("has no repeated unit ids inside a course", () => {
    for (const course of COURSES) {
      const ids = course.units.map((u) => u.id);
      expect(new Set(ids).size, `${course.grade}/${course.subject}`).toBe(ids.length);
    }
  });

  it("loads an Alberta grade with the Ontario units it shares", async () => {
    await loadGrade("4", "ca-ab");
    expect(isGradeLoaded("4", "ca-ab")).toBe(true);
    const courses = coursesForGrade("4", "ca-ab");
    expect(courses.map((c) => c.subject)).toEqual(expect.arrayContaining(["math", "language", "science", "social"]));
    const refs = allUnitRefs("4", "ca-ab");
    expect(refs.length).toBeGreaterThan(0);
    for (const r of refs) expect(r.unit.standards["ca-ab"]).toBeTruthy();
  });
});
