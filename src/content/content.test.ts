import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { allUnitRefs, AVAILABLE_GRADES, coursesForGrade, coursesInFramework, getUnitRef, isGradeLoaded, loadGrade, parseUnitKey, unitKey } from "./index";
import { GRADE_ORDER } from "./subjects";

describe("curriculum content", () => {
  it("has unique course and unit ids", () => {
    const courseIds = COURSES.map((c) => `${c.grade}/${c.subject}`);
    expect(new Set(courseIds).size).toBe(courseIds.length);
    for (const c of COURSES) expect(new Set(c.units.map((u) => u.id)).size).toBe(c.units.length);
  });

  it("downloads each grade on demand, with the same courses as the full set", async () => {
    for (const grade of AVAILABLE_GRADES) {
      const expected = coursesInFramework(
        COURSES.filter((c) => c.grade === grade),
        "ca-bc",
      );
      expect(expected.length, `${grade} has content`).toBeGreaterThan(0);
      expect(coursesForGrade(grade, "ca-bc")).toEqual([]);
      await loadGrade(grade);
      expect(isGradeLoaded(grade)).toBe(true);
      expect(coursesForGrade(grade, "ca-bc").map((c) => c.subject)).toEqual(expected.map((c) => c.subject));
      expect(allUnitRefs(grade, "ca-bc").length).toBe(expected.reduce((n, c) => n + c.units.length, 0));
      const first = expected[0];
      const key = unitKey(grade, first.subject, first.units[0].id);
      expect(getUnitRef(key)?.unit.title).toBe(first.units[0].title);
      expect(parseUnitKey(key)).toEqual({ grade, subject: first.subject, unitId: first.units[0].id });
    }
    expect(parseUnitKey("10/math/x")).toBeUndefined();
    expect(parseUnitKey("nonsense")).toBeUndefined();
  });

  it("never uses Math.random in content (pages need repeatable samples)", () => {
    const walk = (dir: string): string[] =>
      readdirSync(dir).flatMap((f) => {
        const p = join(dir, f);
        return f === "node_modules" ? [] : statSync(p).isDirectory() ? walk(p) : [p];
      });
    // Every content file, in every framework's folder. random.ts wraps it (seeded) and types.ts mentions it in a comment.
    const offenders = walk(__dirname)
      .filter((f) => /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f) && !/[\\/](random|types)\.ts$/.test(f))
      .filter((f) => readFileSync(f, "utf8").includes("Math.random"));
    expect(offenders).toEqual([]);
  });

  it("marks every French Immersion question as French so read-aloud uses a French voice", () => {
    for (const course of COURSES.filter((c) => c.subject === "immersion")) {
      for (const unit of course.units) {
        for (const q of unit.generate({ difficulty: 2 })) expect(q.lang, `${course.grade}/${unit.id}: ${q.prompt}`).toBe("fr");
      }
    }
  });

  // The fair-questions checks run in one file per grade (fairness/), so they can run side by side.
  it("has a fairness test file for every grade", () => {
    for (const grade of GRADE_ORDER) expect(existsSync(join(__dirname, "fairness", `grade-${grade}.test.ts`)), `fairness/grade-${grade}.test.ts`).toBe(true);
  });
});
