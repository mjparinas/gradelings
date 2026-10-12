import { describe, expect, it } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import { gradeSlug } from "@/content/subjects";
import { coursesFor, gradesWithContent } from "./curriculum";
import { curriculumCard, guideCard, reportCardCard } from "./ogText";
import { GUIDE_FRAMEWORKS } from "@/content/guides";

describe("share cards", () => {
  it("names the province, grade and subject on a curriculum subject page", () => {
    const card = curriculumCard({ framework: "bc", grade: "grade-4", subject: "math" });
    expect(card).toMatchObject({ kicker: "British Columbia curriculum · Grade 4", title: "Grade 4 Math", colour: "#4f8ef7" });
    expect(card?.line).toBeTruthy();
  });

  it("has a card for every curriculum, guide and report-card page that gets one", () => {
    for (const f of FRAMEWORKS) {
      expect(curriculumCard({ framework: f.slug })?.title).toMatch(/Kindergarten to Grade 9 practice|to Grade/);
      expect(reportCardCard(f.slug)?.title).toContain(f.shortName);
      for (const g of gradesWithContent(f)) {
        expect(curriculumCard({ framework: f.slug, grade: gradeSlug(g) })).toBeDefined();
        for (const c of coursesFor(f, g)) expect(curriculumCard({ framework: f.slug, grade: gradeSlug(g), subject: c.subject })?.title).toBeTruthy();
      }
    }
    for (const f of GUIDE_FRAMEWORKS) {
      expect(guideCard({ framework: f.slug })).toBeDefined();
      for (const g of gradesWithContent(f)) for (const c of coursesFor(f, g)) expect(guideCard({ framework: f.slug, grade: gradeSlug(g), subject: c.subject })?.title).toContain("help at home");
    }
  });

  it("has no card for a page that doesn't exist", () => {
    expect(curriculumCard({ framework: "nowhere" })).toBeUndefined();
    expect(reportCardCard("nowhere")).toBeUndefined();
  });
});
