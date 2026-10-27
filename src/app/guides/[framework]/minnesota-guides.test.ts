import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Minnesota's guides: the hub, grade notes, MDE's five SEL competencies and the Minnesota Comprehensive Assessments.
describe("Minnesota parent guides", () => {
  const mn = getFramework("us-mn");
  const g = guidesFor("us-mn");

  it("uses route folders that already exist, so launching needs no new route", () => {
    expect(guidePath.competencies(mn)).toBe("/guides/minnesota/sel-standards/");
    expect(guidePath.assessment(mn)).toBe("/guides/minnesota/state-tests/");
    const wa = guidesFor("us-wa");
    expect(g.competencies.slug).toBe(wa.competencies.slug);
    expect(g.assessment.slug).toBe(wa.assessment.slug);
  });

  it("covers the MCA in grades 3 to 8, science in grades 5 and 8, the four achievement levels and the refusal form, with no dates", () => {
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Minnesota Comprehensive Assessments");
    expect(tests).toMatch(/grades 3 to 8/);
    expect(tests).toMatch(/grades 5 and 8/);
    expect(tests).toContain("Partially Meets the Standards");
    expect(tests).toContain("MTAS");
    expect(tests).toContain("ACCESS for ELLs");
    expect(tests).toMatch(/refus/);
    expect(tests).not.toMatch(/CAASPP|Smarter Balanced|OSAS|WCAS|OSPI|Regents|NYSED|\bCDE\b|\bODE\b/);
    expect(tests).not.toMatch(/\b(January|February|March|April|May|June)\b|20\d\d/);
  });

  it("explains MDE's five SEL competencies, not graded", () => {
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name)).toEqual([
      "Self-awareness",
      "Self-management",
      "Social awareness",
      "Relationship skills",
      "Responsible decision-making",
    ]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("follows the grade themes of Minnesota's 2021 social studies standards", () => {
    const notes = g.gradeNotes;
    expect(notes.k?.overview).toContain("Family and Community");
    expect(notes["1"]?.overview).toContain("Communities and Culture");
    expect(notes["2"]?.overview).toContain("People and the Environment");
    expect(notes["3"]?.overview).toContain("The Ancient World");
    expect(notes["4"]?.overview).toContain("The Contemporary World");
    expect(notes["5"]?.overview).toContain("Early American Studies");
    expect(notes["6"]?.overview).toContain("Minnesota Studies");
    expect(notes["7"]?.overview).toContain("United States Studies");
    expect(notes["8"]?.overview).toContain("Global Studies");
  });

  it("never names another state's tests or a province", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/[Pp]rovince/);
    expect(text).not.toMatch(/Washington|Oregon|California|New York/);
  });
});
