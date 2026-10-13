import { describe, expect, it } from "vitest";
import { allGuidePaths, guidePath } from "@/components/site/guides";
import { FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Oregon's guides are written while the state is still upcoming: the hub, grade notes, ODE's Transformative SEL
// standards and the OSAS state tests. Guide pages are built only for FRAMEWORKS, so until launch these checks read the
// guide data directly, and confirm no Oregon page is published early.
describe("Oregon parent guides", () => {
  const or = getFramework("us-or");
  const g = guidesFor("us-or");

  it("is still upcoming, so no Oregon guide page is built yet", () => {
    expect(UPCOMING_FRAMEWORKS).toContain(or);
    expect(FRAMEWORKS).not.toContain(or);
    expect(GUIDE_FRAMEWORKS).not.toContain(or);
    expect(allGuidePaths().some((p) => p.path.startsWith("/guides/oregon/"))).toBe(false);
  });

  it("has a note for every grade and no French guide", () => {
    expect(g.french).toBeUndefined();
    expect(or.grades).toEqual(["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    for (const grade of or.grades) {
      expect(g.gradeNotes[grade]?.overview, grade).toBeTruthy();
      expect(g.gradeNotes[grade]?.lookFor, grade).toBeTruthy();
    }
  });

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

  it("is written in US English and never names Washington", () => {
    const text = JSON.stringify(g);
    expect(text).not.toMatch(/practis|colour|neighbour|favour|centre|behaviour|Grade \d/);
    expect(text).not.toMatch(/Washington/);
  });
});
