import type { Metadata } from "next";
import { describe, expect, it } from "vitest";
import { AssessmentView, CompetenciesView } from "@/components/site/GuideExtras";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";

// Each province serves its competencies and assessment guides at its own slug (core-competencies, learning-skills,
// fsa, eqao, pat, ...). Every slug is a thin route folder here; these checks keep the folders and the guide copy in step.

interface GuideRoute {
  generateStaticParams: () => { framework: string }[];
  generateMetadata: (p: { params: Promise<{ framework: string }> }) => Promise<Metadata>;
  default: (p: { params: Promise<{ framework: string }> }) => { type: unknown; props: { params: Promise<{ framework: string }> } };
}

const routes = Object.fromEntries(
  Object.entries(import.meta.glob<GuideRoute>("./*/page.tsx", { eager: true }))
    .map(([path, mod]) => [path.split("/")[1], mod] as const)
    .filter(([slug]) => slug !== "french" && !slug.startsWith("[")),
);

const kindOf = (id: (typeof GUIDE_FRAMEWORKS)[number]["id"], slug: string) =>
  guidesFor(id).competencies.slug === slug ? "competencies" : guidesFor(id).assessment.slug === slug ? "assessment" : undefined;

describe("competencies and assessment guide routes", () => {
  it("has a route folder for every slug a province's guides use", () => {
    for (const f of GUIDE_FRAMEWORKS) {
      const g = guidesFor(f.id);
      expect(routes[g.competencies.slug], `${f.id} competencies`).toBeDefined();
      expect(routes[g.assessment.slug], `${f.id} assessment`).toBeDefined();
    }
  });

  it.each(Object.keys(routes))("/guides/[framework]/%s/ is built only for the provinces that use that slug", (slug) => {
    const route = routes[slug];
    const expected = GUIDE_FRAMEWORKS.filter((f) => kindOf(f.id, slug)).map((f) => ({ framework: f.slug }));
    expect(expected.length, "no province uses this folder").toBeGreaterThan(0);
    expect(route.generateStaticParams()).toEqual(expected);
  });

  it.each(Object.keys(routes))("/guides/[framework]/%s/ renders the right guide with a canonical at its own URL", async (slug) => {
    const route = routes[slug];
    for (const { framework } of route.generateStaticParams()) {
      const f = GUIDE_FRAMEWORKS.find((x) => x.slug === framework)!;
      const params = Promise.resolve({ framework });
      const page = route.default({ params });
      expect(page.type).toBe(kindOf(f.id, slug) === "competencies" ? CompetenciesView : AssessmentView);
      expect(await page.props.params).toEqual({ framework });
      expect((await route.generateMetadata({ params })).alternates?.canonical).toBe(`/guides/${framework}/${slug}/`);
    }
  });
});
