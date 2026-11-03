import { describe, expect, it } from "vitest";
import { allWorksheetPaths, allWorksheetSkills, worksheetGrades, worksheetPath, worksheetSkills, resolveSkill, sheetQuestions } from "./worksheets";

describe("skill worksheets", () => {
  it("covers Kindergarten to Grade 9 and leaves out Pre-K", () => {
    const grades = worksheetGrades();
    expect(grades).not.toContain("pk");
    expect(grades[0]).toBe("k");
    expect(grades[grades.length - 1]).toBe("9");
    for (const g of grades) expect(worksheetSkills(g).length, g).toBeGreaterThan(3);
  });

  it("leaves out units about one country's money and taxes", () => {
    for (const s of allWorksheetSkills()) expect(s.unit.id).not.toMatch(/money|coins|tax|budget/);
  });

  it("has a page for every skill, with unique addresses", () => {
    const paths = allWorksheetPaths().map((p) => p.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain(worksheetPath.hub());
    for (const s of allWorksheetSkills()) expect(resolveSkill({ grade: worksheetPath.skill(s.grade, s.unit.id).split("/")[2], skill: s.unit.id })).toEqual(s);
    expect(resolveSkill({ grade: "grade-4", skill: "nope" })).toBeUndefined();
    expect(resolveSkill({ grade: "pre-k" })).toBeUndefined();
  });

  it("prints at least 8 different questions for every skill, and 10 for most", () => {
    const counts = allWorksheetSkills().map((s) => sheetQuestions(s).length);
    for (const n of counts) expect(n).toBeGreaterThanOrEqual(8);
    expect(counts.filter((n) => n === 10).length).toBeGreaterThan(counts.length / 2);
    for (const s of allWorksheetSkills()) expect(new Set(sheetQuestions(s).map((q) => q.prompt)).size).toBe(sheetQuestions(s).length);
  });
});
