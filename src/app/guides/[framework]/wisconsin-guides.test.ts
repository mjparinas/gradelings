import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Wisconsin's guides: the hub, grade notes, DPI's six Guiding Principles for Teaching and Learning and the state tests
// (the Forward Exam, PreACT Secure and the ACT, and Dynamic Learning Maps).
describe("Wisconsin parent guides", () => {
  const wi = getFramework("us-wi");
  const g = guidesFor("us-wi");

  it("is offered, so every Wisconsin guide page is built", () => {
    expect(FRAMEWORKS).toContain(wi);
    expect(UPCOMING_FRAMEWORKS).not.toContain(wi);
    expect(GUIDE_FRAMEWORKS).toContain(wi);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(wi), guidePath.grade(wi, "4"), "/guides/wisconsin/guiding-principles/", "/guides/wisconsin/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(wi.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of wi.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers the Forward Exam and the six Guiding Principles", () => {
    expect(guidePath.competencies(wi)).toBe("/guides/wisconsin/guiding-principles/");
    expect(guidePath.assessment(wi)).toBe("/guides/wisconsin/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["Forward Exam", "PreACT Secure", "Dynamic Learning Maps", "Developing, Approaching, Meeting and Advanced"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/ILEARN|IAR|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|NJSLA|PSSA|Milestones/);
    expect(g.competencies.items).toHaveLength(6);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Illinois|Indiana|Minnesota|Michigan/);
  });
});
