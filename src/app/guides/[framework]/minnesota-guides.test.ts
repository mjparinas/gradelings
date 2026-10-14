import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Minnesota's guides: the hub, grade notes, MDE's five SEL competencies and the Minnesota Comprehensive Assessments.
describe("Minnesota parent guides", () => {
  const mn = getFramework("us-mn");
  const g = guidesFor("us-mn");

  it("is offered, so every Minnesota guide page is built", () => {
    expect(mn.id).toBe("us-mn");
    expect(FRAMEWORKS).toContain(mn);
    expect(UPCOMING_FRAMEWORKS).not.toContain(mn);
    expect(GUIDE_FRAMEWORKS).toContain(mn);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(mn), guidePath.grade(mn, "6"), "/guides/minnesota/sel-standards/", "/guides/minnesota/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(mn.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of mn.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

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

  it("is written in US English and never names another state's tests or a province", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d|[Pp]rovince/);
    expect(text).not.toMatch(/Washington|Oregon|California|New York/);
  });
});
