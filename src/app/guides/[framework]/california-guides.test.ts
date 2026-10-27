import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// California's guides: the hub, grade notes, CDE's social and emotional learning competencies and the CAASPP state tests.
describe("California parent guides", () => {
  const ca = getFramework("us-ca");
  const g = guidesFor("us-ca");

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

  it("never names Washington or Oregon", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington|Oregon/);
  });
});
