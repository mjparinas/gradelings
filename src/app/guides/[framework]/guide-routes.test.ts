import { describe, expect, it } from "vitest";
import { AssessmentView, CompetenciesView, guidePageKind } from "@/components/site/GuideExtras";
import { gradesWithContent } from "@/components/site/curriculum";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";
import { gradeSlug } from "@/content/subjects";
import Image from "./[grade]/opengraph-image";
import GradeGuide, { generateMetadata, generateStaticParams } from "./[grade]/page";

// Each province serves its competencies and assessment guides at its own slug (core-competencies, learning-skills,
// fsa, eqao, pat, ...), taken from its guide copy. They share the [grade] route, so a new slug needs no route folder;
// these checks keep the route and the guide copy in step.

const params = (framework: string, grade: string) => Promise.resolve({ framework, grade });

describe("competencies and assessment guide pages", () => {
  const built = generateStaticParams();

  it.each(GUIDE_FRAMEWORKS.map((f) => [f.slug, f] as const))("%s: builds both pages, at slugs no grade uses", (_, f) => {
    const g = guidesFor(f.id);
    const grades = gradesWithContent(f).map(gradeSlug);
    for (const slug of [g.competencies.slug, g.assessment.slug]) {
      expect(grades, `${f.id} ${slug}`).not.toContain(slug);
      expect(built).toContainEqual({ framework: f.slug, grade: slug });
    }
    expect(g.competencies.slug).not.toBe(g.assessment.slug);
  });

  it("builds a slug only for the frameworks whose guides use it", () => {
    for (const p of built) {
      const f = GUIDE_FRAMEWORKS.find((x) => x.slug === p.framework)!;
      const isGrade = gradesWithContent(f).map(gradeSlug).includes(p.grade);
      expect(isGrade || guidePageKind(p.framework, p.grade) !== undefined, `${p.framework}/${p.grade}`).toBe(true);
    }
    expect(guidePageKind("bc", "eqao")).toBeUndefined();
    expect(guidePageKind("ontario", "eqao")).toBe("assessment");
    expect(guidePageKind("nowhere", "eqao")).toBeUndefined();
  });

  it.each(GUIDE_FRAMEWORKS.map((f) => [f.slug, f] as const))("%s: renders the right guide with a canonical at its own URL", async (slug, f) => {
    const g = guidesFor(f.id);
    for (const [page, view] of [
      [g.competencies.slug, CompetenciesView],
      [g.assessment.slug, AssessmentView],
    ] as const) {
      const el = (await GradeGuide({ params: params(slug, page) } as never)) as { type: unknown };
      expect(el.type).toBe(view);
      expect((await generateMetadata({ params: params(slug, page) } as never)).alternates?.canonical).toBe(`/guides/${slug}/${page}/`);
    }
  });

  it("gives the two pages the framework's share card", async () => {
    const f = GUIDE_FRAMEWORKS[0];
    await expect(Image({ params: params(f.slug, guidesFor(f.id).assessment.slug) })).resolves.toBeInstanceOf(Response);
  });
});
