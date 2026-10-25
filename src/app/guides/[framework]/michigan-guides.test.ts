import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Michigan's guides: the hub, grade notes, the Michigan Department of Education's Social and Emotional Learning
// Competencies and Indicators and the state tests (the M-STEP, the PSAT, the Michigan Merit Examination and the Read by
// Grade Three Law).
describe("Michigan parent guides", () => {
  const mi = getFramework("us-mi");
  const g = guidesFor("us-mi");

  it("is offered, so every Michigan guide page is built", () => {
    expect(FRAMEWORKS).toContain(mi);
    expect(UPCOMING_FRAMEWORKS).not.toContain(mi);
    expect(GUIDE_FRAMEWORKS).toContain(mi);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(mi), guidePath.grade(mi, "4"), "/guides/michigan/sel-standards/", "/guides/michigan/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(mi.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of mi.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers the M-STEP, the PSAT and MME and the Read by Grade Three Law, and the five SEL competencies", () => {
    expect(guidePath.competencies(mi)).toBe("/guides/michigan/sel-standards/");
    expect(guidePath.assessment(mi)).toBe("/guides/michigan/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["M-STEP", "PSAT 8/9", "PSAT 10", "Michigan Merit Examination", "MI-Access", "Read by Grade Three Law"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/CMAS|READ Act|IAR|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PreACT|CoAlt|Third Grade Reading Guarantee/);
    expect(g.competencies.items).toHaveLength(5);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Illinois|Colorado|Ohio|Pennsylvania|ISBE|ALSDE|DESE|CDE\b/);
  });
});
