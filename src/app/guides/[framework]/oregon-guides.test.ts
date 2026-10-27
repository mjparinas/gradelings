import { describe, expect, it } from "vitest";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";

// Oregon's guides: the hub, grade notes, ODE's Transformative SEL standards and the OSAS state tests.
describe("Oregon parent guides", () => {
  const or = getFramework("us-or");
  const g = guidesFor("us-or");

  it("uses route folders that already exist (shared with Washington), so launching needs no new route", () => {
    expect(guidePath.competencies(or)).toBe("/guides/oregon/sel-standards/");
    expect(guidePath.assessment(or)).toBe("/guides/oregon/state-tests/");
    const wa = guidesFor("us-wa");
    expect(g.competencies.slug).toBe(wa.competencies.slug);
    expect(g.assessment.slug).toBe(wa.assessment.slug);
  });

  it("covers OSAS in grades 3 to 8 with the opt-out right, and ODE's five Transformative SEL domains", () => {
    expect(g.assessment.grades).toEqual(["3", "4", "5", "6", "7", "8"]);
    expect(g.assessment.name).toMatch(/OSAS/);
    expect(JSON.stringify(g.assessment)).toContain("ORS 329.479");
    expect(JSON.stringify(g.assessment)).not.toMatch(/Smarter Balanced|WCAS|OSPI/);
    expect(g.competencies.items.map((i) => i.name)).toEqual([
      "Self-Awareness and Identity",
      "Self-Management and Agency",
      "Social Awareness and Belonging",
      "Relationship Skills and Collaborative Problem-Solving",
      "Responsible Decision-Making and Curiosity",
    ]);
    for (const item of g.competencies.items) {
      expect(item.parts.length, item.id).toBeGreaterThan(0);
      expect(item.atHome.length, item.id).toBeGreaterThan(0);
    }
  });

  it("never names Washington", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/Washington/);
  });
});
