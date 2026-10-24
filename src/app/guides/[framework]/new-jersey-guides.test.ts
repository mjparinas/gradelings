import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// New Jersey's guides: the hub, grade notes, the Life Literacies and Key Skills standards (NJSLS-CLKS 9.4) and the
// state tests (the NJSLA-Adaptive, NJSLA-Science and the NJGPA-Adaptive graduation test).
describe("New Jersey parent guides", () => {
  const nj = getFramework("us-nj");
  const g = guidesFor("us-nj");

  it("is offered, so every New Jersey guide page is built", () => {
    expect(FRAMEWORKS).toContain(nj);
    expect(UPCOMING_FRAMEWORKS).not.toContain(nj);
    expect(GUIDE_FRAMEWORKS).toContain(nj);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(nj), guidePath.grade(nj, "4"), "/guides/new-jersey/life-literacies/", "/guides/new-jersey/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(nj.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of nj.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("covers the NJSLA and the six Life Literacies and Key Skills", () => {
    expect(guidePath.competencies(nj)).toBe("/guides/new-jersey/life-literacies/");
    expect(guidePath.assessment(nj)).toBe("/guides/new-jersey/state-tests/");
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    const tests = JSON.stringify(g.assessment);
    for (const name of ["NJSLA", "adaptive", "NJSLA-Science", "Graduation Proficiency Assessment", "Dynamic Learning Maps"]) expect(tests).toContain(name);
    expect(tests).not.toMatch(/IAR|ATLAS|ACAP|AASA|CAASPP|OSAS|WCAS|Smarter Balanced|MeCAS|STAAR|AK STAR|FAST|PSSA|CMAS|Milestones/);
    expect(g.competencies.items.map((i) => i.name)).toEqual([
      "Creativity and Innovation",
      "Critical Thinking and Problem-Solving",
      "Digital Citizenship",
      "Global and Cultural Awareness",
      "Information and Media Literacy",
      "Technology Literacy",
    ]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names another state", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon|California|Maine|Texas|Alaska|Alabama|Arizona|Arkansas|Florida|Illinois|Colorado|Pennsylvania|Georgia/);
  });
});
