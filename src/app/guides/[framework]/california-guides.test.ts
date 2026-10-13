import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// California's guides: the hub, grade notes, CDE's social and emotional learning competencies and the CAASPP state tests.
describe("California parent guides", () => {
  const ca = getFramework("us-ca");
  const g = guidesFor("us-ca");

  it("is offered, so every California guide page is built", () => {
    expect(FRAMEWORKS).toContain(ca);
    expect(UPCOMING_FRAMEWORKS).not.toContain(ca);
    expect(GUIDE_FRAMEWORKS).toContain(ca);
    const paths = allGuidePaths().map((p) => p.path);
    for (const p of [guidePath.hub(ca), guidePath.grade(ca, "4"), "/guides/california/sel-standards/", "/guides/california/state-tests/"]) expect(paths, p).toContain(p);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(ca.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of ca.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

  it("uses route folders that already exist, so launching needs no new route", () => {
    expect(guidePath.competencies(ca)).toBe("/guides/california/sel-standards/");
    expect(guidePath.assessment(ca)).toBe("/guides/california/state-tests/");
    const wa = guidesFor("us-wa");
    expect(g.competencies.slug).toBe(wa.competencies.slug);
    expect(g.assessment.slug).toBe(wa.assessment.slug);
  });

  it("covers CAASPP and CAST with the Education Code 60615 exemption, and CDE's five SEL competencies, not graded", () => {
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    expect(g.assessment.name).toMatch(/CAASPP/);
    const tests = JSON.stringify(g.assessment);
    expect(tests).toContain("Education Code 60615");
    expect(tests).toContain("Smarter Balanced");
    expect(tests).toMatch(/grades 5 and 8, and once in high school/);
    expect(tests).toMatch(/grades 3 to 8, and 11th grade/);
    expect(tests).not.toMatch(/OSAS|WCAS|OSPI|ODE\b|opt-out/);
    expect(g.competencies.slug).toBe("sel-standards");
    expect(JSON.stringify(g.competencies)).toMatch(/not graded/);
    expect(g.competencies.items.map((i) => i.name)).toEqual(["Self-Awareness", "Self-Management", "Social Awareness", "Relationship Skills", "Responsible Decision-Making"]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("is written in US English and never names Washington or Oregon", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington|Oregon/);
  });
});
