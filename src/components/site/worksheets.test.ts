import { describe, expect, it } from "vitest";
import { gradeSlug } from "@/content/subjects";
import { allSkillSheets, allWorksheetPaths, allWorksheetSkills, resolveSkill, sheetPath, sheetQuestions, skillSheetsOf, subjectPages, subjectSlug, worksheetGrades, worksheetPath, worksheetSkills, worksheetSubjects, type WorksheetSkill } from "./worksheets";

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

describe("skill sheets (Grade 3 math pilot)", () => {
  it("make a sheet for each skill with enough printable questions, at /worksheets/{grade}/{unit}/{skill}/", () => {
    const sheets = allSkillSheets();
    expect(sheets.length).toBeGreaterThanOrEqual(15);
    for (const s of sheets) {
      expect(s.grade).toBe("3");
      expect(s.subject).toBe("math");
      expect(sheetPath(s)).toBe(`/worksheets/grade-3/${s.skillOf!.id}/${s.unit.id}/`);
      expect(sheetQuestions(s).length, sheetPath(s)).toBeGreaterThanOrEqual(8);
    }
  });

  it("has one address and one title per sheet, none matching a unit's", () => {
    const paths = [...allWorksheetSkills().map((s) => worksheetPath.skill(s.grade, s.unit.id, s.subject)), ...allSkillSheets().map(sheetPath)];
    expect(new Set(paths).size).toBe(paths.length);
    const grade3 = [...allWorksheetSkills().filter((s) => s.grade === "3"), ...allSkillSheets()].map((s) => s.unit.title);
    expect(new Set(grade3).size).toBe(grade3.length);
  });

  it("resolve from their address and are in the sitemap, and a wrong skill is a 404", () => {
    const s = allSkillSheets()[0];
    expect(resolveSkill({ grade: "grade-3", skill: s.skillOf!.id, unit: s.unit.id })).toMatchObject({ unit: { id: s.unit.id }, skillOf: { id: s.skillOf!.id } });
    expect(resolveSkill({ grade: "grade-3", skill: s.skillOf!.id, unit: "no-such-skill" })).toBeUndefined();
    expect(resolveSkill({ grade: "grade-3", skill: "no-such-unit", unit: s.unit.id })).toBeUndefined();
    expect(resolveSkill({ grade: "pre-k", skill: s.skillOf!.id, unit: s.unit.id })).toBeUndefined();
    const paths = allWorksheetPaths().map((p) => p.path);
    for (const k of allSkillSheets()) expect(paths).toContain(sheetPath(k));
  });

  it("draw their questions from the skill alone, and are seeded apart from the unit's sheet", () => {
    const k = allSkillSheets().find((x) => x.unit.id === "subtract-3-digit")!;
    const unitSheet = worksheetSkills("3").find((x) => x.unit.id === "add-subtract-1000")!;
    const skillPrompts = sheetQuestions(k).map((q) => q.prompt);
    expect(skillPrompts).not.toEqual(sheetQuestions(unitSheet).map((q) => q.prompt));
    expect(skillSheetsOf(unitSheet).map((x) => x.unit.id)).toContain("subtract-3-digit");
    expect(skillSheetsOf(k)).toEqual([]);
  });
});
