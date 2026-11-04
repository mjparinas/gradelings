import { describe, expect, it } from "vitest";
import { gradeSlug } from "@/content/subjects";
import { allWorksheetPaths, allWorksheetSkills, resolveSkill, sheetQuestions, subjectPages, subjectSlug, worksheetGrades, worksheetPath, worksheetSkills, worksheetSubjects, type WorksheetSkill } from "./worksheets";

const addressOf = (s: WorksheetSkill) => worksheetPath.skill(s.grade, s.unit.id, s.subject).split("/").filter(Boolean).slice(1);

describe("skill worksheets", () => {
  it("covers Pre-K and Kindergarten to Grade 9", () => {
    const grades = worksheetGrades();
    expect(grades[0]).toBe("pk");
    expect(grades[1]).toBe("k");
    expect(grades[grades.length - 1]).toBe("9");
    for (const g of grades) expect(worksheetSkills(g).length, g).toBeGreaterThan(g === "pk" ? 2 : 3);
  });

  it("has math, language arts and science in Kindergarten to Grade 9, and all four subjects in Pre-K", () => {
    for (const g of worksheetGrades().filter((x) => x !== "pk")) {
      expect(worksheetSubjects(g)).toEqual(["math", "language", "science"]);
      for (const sub of worksheetSubjects(g)) expect(worksheetSkills(g, sub).length, `${g} ${sub}`).toBeGreaterThanOrEqual(2);
    }
    expect(worksheetSubjects("pk")).toEqual(["math", "language", "science", "social"]);
    for (const sub of worksheetSubjects("pk")) expect(worksheetSkills("pk", sub).length, sub).toBeGreaterThanOrEqual(3);
  });

  it("leaves out social studies, French and Spanish after Pre-K, whose content differs by region", () => {
    for (const s of allWorksheetSkills().filter((x) => x.grade !== "pk")) expect(["math", "language", "science"]).toContain(s.subject);
  });

  it("leaves out units about one country's money and taxes", () => {
    for (const s of allWorksheetSkills()) expect(s.unit.id).not.toMatch(/money|coins|tax|budget/);
  });

  it("names no country, province or people in a science, language arts or Pre-K question", () => {
    const re = /canad|province|quebec|ontario|toonie|loonie|\$|¢|first nations|inuit|métis|indigenous/i;
    for (const s of allWorksheetSkills().filter((x) => x.subject !== "math"))
      for (const q of sheetQuestions(s)) expect(JSON.stringify(q), `${s.grade} ${s.unit.id}`).not.toMatch(re);
  });

  it("has a page for every skill and subject, with unique addresses", () => {
    const paths = allWorksheetPaths().map((p) => p.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain(worksheetPath.hub());
    for (const s of allWorksheetSkills()) {
      const [grade, a, b] = addressOf(s);
      expect(gradeSlug(s.grade)).toBe(grade);
      expect(resolveSkill(b ? { grade, skill: a, unit: b } : { grade, skill: a })).toEqual(s);
      expect(paths).toContain(worksheetPath.skill(s.grade, s.unit.id, s.subject));
    }
    for (const p of subjectPages()) {
      expect(resolveSkill({ grade: gradeSlug(p.grade), skill: subjectSlug(p.subject) })).toEqual(p);
      expect(paths).toContain(worksheetPath.subject(p.grade, p.subject));
    }
    expect(resolveSkill({ grade: "grade-4", skill: "nope" })).toBeUndefined();
    expect(resolveSkill({ grade: "grade-4", skill: "science", unit: "nope" })).toBeUndefined();
    expect(resolveSkill({ grade: "pre-k", skill: "nope" })).toBeUndefined();
    expect(resolveSkill({ grade: "pre-k" })).toEqual({ grade: "pk" });
  });

  it("keeps Kindergarten to Grade 9 math at its first addresses, with no duplicate under a subject", () => {
    const m = worksheetSkills("4", "math")[0];
    expect(worksheetPath.skill("4", m.unit.id)).toBe(`/worksheets/grade-4/${m.unit.id}/`);
    expect(resolveSkill({ grade: "grade-4", skill: "math", unit: m.unit.id })).toBeUndefined();
    expect(resolveSkill({ grade: "grade-4", skill: "math" })).toBeUndefined();
    // A math unit id never shadows a subject's page.
    for (const g of worksheetGrades().filter((x) => x !== "pk"))
      for (const s of worksheetSkills(g, "math")) expect(["language-arts", "science", "social-studies"]).not.toContain(s.unit.id);
  });

  it("prints enough different questions for every skill: 10 (6 in Pre-K) for most", () => {
    for (const s of allWorksheetSkills()) {
      const n = sheetQuestions(s).length;
      expect(n, `${s.grade} ${s.subject} ${s.unit.id}`).toBeGreaterThanOrEqual(s.grade === "pk" ? 6 : 8);
      expect(n).toBeLessThanOrEqual(s.grade === "pk" ? 6 : 10);
      expect(new Set(sheetQuestions(s).map((q) => q.prompt)).size).toBe(n);
    }
    const counts = allWorksheetSkills().filter((s) => s.grade !== "pk").map((s) => sheetQuestions(s).length);
    expect(counts.filter((n) => n === 10).length).toBeGreaterThan(counts.length / 2);
  });
});
