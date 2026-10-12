import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { getFramework } from "../frameworks";
import { GUIDES } from "../guides";
import type { GradeId } from "../types";

// The official outcomes (docs/research/prince-edward-island/README.md). Unit standards cite them by code.
const OUTCOMES = JSON.parse(readFileSync(join(__dirname, "../../../docs/research/prince-edward-island/outcomes.json"), "utf8")) as Record<
  string,
  { code: string; group: string; text: string }[]
>;

const GRADES: GradeId[] = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const pe = (grade: GradeId, subject: string) => COURSES.find((c) => c.grade === grade && c.subject === subject)?.units.filter((u) => u.standards["ca-pe"]) ?? [];

describe("Prince Edward Island", () => {
  it("is selectable and reports on four plain practice steps", () => {
    const f = getFramework("prince-edward-island");
    expect(f.id).toBe("ca-pe");
    expect(f.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(f.scoringFor("4").source).toMatch(/not a Prince Edward Island/);
    expect(f.scoringFor("9").levels.map((l) => l.kidLabel)).toEqual(["Seedling", "Sprout", "Tree", "Star"]);
  });

  it("covers every grade in math, language, science and social studies", () => {
    for (const g of GRADES) for (const s of ["math", "language", "science", "social"]) expect(pe(g, s).length, `${g}/${s}`).toBeGreaterThanOrEqual(3);
  });

  it("offers Core French in Grades 4 to 9 and no French Immersion", () => {
    for (const g of GRADES) {
      expect(pe(g, "core-french").length > 0, `core-french ${g}`).toBe(Number(g) >= 4);
      expect(pe(g, "immersion").length, `immersion ${g}`).toBe(0);
    }
  });

  it("cites only codes that exist in the official outcomes for that grade and subject", () => {
    for (const c of COURSES) {
      for (const u of c.units) {
        const standard = u.standards["ca-pe"];
        if (!standard) continue;
        const codes = new Set((OUTCOMES[`${c.grade}/${c.subject}`] ?? []).map((o) => o.code));
        expect(codes.size, `${c.grade}/${c.subject} has no Prince Edward Island outcomes, but ${u.id} cites one`).toBeGreaterThan(0);
        for (const code of standard.split(" · ")[0].split("; ")) expect(codes.has(code), `${u.id} cites "${code}", which is not in Prince Edward Island ${c.grade}/${c.subject}`).toBe(true);
      }
    }
  });

  it("has a learning focus for every course", () => {
    for (const g of GRADES) {
      for (const s of ["math", "language", "science", "social"]) {
        const course = COURSES.find((c) => c.grade === g && c.subject === s)!;
        expect(course.bigIdeas["ca-pe"]?.length, `${g}/${s}`).toBeGreaterThan(0);
      }
    }
  });

  it("adds the Prince Edward Island-only units for Prince Edward Island alone", () => {
    const own = COURSES.flatMap((c) => c.units.filter((u) => u.id.startsWith("pe-")).map((u) => ({ g: c.grade, u })));
    expect(own.length).toBeGreaterThan(10);
    // Nunavut may copy a unit that names no province (src/content/nunavut/plan.ts); the copy carries Nunavut standards only.
    for (const { g, u } of own) expect([["ca-pe"], ["ca-nu"]], `${g}/${u.id}`).toContainEqual(Object.keys(u.standards));
    expect(own.filter(({ u }) => u.standards["ca-pe"]).length).toBeGreaterThan(10);
  });

  it("has parent guides for French, the CAMET competencies and the provincial assessments", () => {
    const guides = GUIDES["ca-pe"]!;
    expect(guides.competencies.slug).toBe("camet-competencies");
    expect(guides.competencies.items).toHaveLength(6);
    expect(guides.assessment.grades).toEqual(["3", "6"]);
    expect(guides.french?.browse).toEqual(["4"]);
    for (const g of GRADES) expect(guides.gradeNotes[g], g).toBeDefined();
  });
});
