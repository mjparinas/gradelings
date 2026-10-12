// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getFramework } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";
import { GRADE_LABEL, gradeSlug } from "@/content/subjects";
import { AssessmentView, CompetenciesView, assessmentMetadata, competenciesMetadata } from "./GuideExtras";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const params = (framework: string) => Promise.resolve({ framework });
const cases = GUIDE_FRAMEWORKS.map((f) => [f.slug, f.id] as const);

describe("competencies guide", () => {
  it.each(cases)("%s: a card per competency with its parts and ideas for home", async (slug, id) => {
    const f = getFramework(id);
    const g = guidesFor(id).competencies;
    render(await CompetenciesView({ params: params(slug) }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(g.title);
    for (const c of g.items) {
      const card = screen.getByRole("region", { name: c.name });
      expect(card).toHaveTextContent(c.blurb);
      for (const p of c.parts) expect(card).toHaveTextContent(`${p.name}. ${p.blurb}`);
      for (const t of c.atHome) expect(within(card).getByText(t)).toBeInTheDocument();
    }
    const crumbs = within(screen.getByRole("navigation", { name: "Breadcrumb" }));
    expect(crumbs.getByRole("link", { name: `${f.shortName} parent guides` })).toHaveAttribute("href", `/guides/${f.slug}/`);
    expect(screen.getByRole("link", { name: `understand the ${f.shortName} report card levels` })).toHaveAttribute("href", `/report-cards/${f.slug}/`);
    expect(screen.getByRole("main")).toHaveTextContent(g.closing);
    expect(within(screen.getByRole("region", { name: /Ready to try/ })).getByRole("link", { name: "Try it free" })).toHaveAttribute("href", "/play/");
  });

  it("titles the page with the province's own name for its competencies", async () => {
    const meta = await competenciesMetadata(params("ontario"));
    expect(meta.title).toBe(`Ontario ${guidesFor("ca-on").competencies.label} explained for parents`);
    expect(meta.alternates?.canonical).toBe(`/guides/ontario/${guidesFor("ca-on").competencies.slug}/`);
    expect(meta.openGraph?.title).toBe(guidesFor("ca-on").competencies.title);
  });
});

describe("provincial assessment guide", () => {
  it.each(cases)("%s: facts, ways to get ready and the questions parents ask", async (slug, id) => {
    const f = getFramework(id);
    const a = guidesFor(id).assessment;
    render(await AssessmentView({ params: params(slug) }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`The ${a.short} explained for ${f.shortName} parents`);
    const facts = screen.getByRole("region", { name: `The ${a.short} at a glance` });
    expect([...facts.querySelectorAll("dt")].map((dt) => dt.textContent)).toEqual(a.facts.map((x) => x.title));
    expect(facts).toHaveTextContent(`Your school and ${a.source} have the current information.`);
    const prepare = screen.getByRole("region", { name: "How to help your child feel ready" });
    for (const t of a.prepare) expect(within(prepare).getByText(t)).toBeInTheDocument();
    // Each grade that writes it links to that grade's units in this province; with no fixed grades, the whole curriculum.
    if (a.grades.length) {
      expect(within(prepare).queryAllByRole("link").map((l) => l.textContent)).toEqual(a.grades.map((g) => GRADE_LABEL[g]));
      for (const g of a.grades) expect(within(prepare).getByRole("link", { name: GRADE_LABEL[g] })).toHaveAttribute("href", `/curriculum/${f.slug}/${gradeSlug(g)}/`);
    } else {
      expect(within(prepare).getByRole("link", { name: `every grade in the ${f.curriculumName}` })).toHaveAttribute("href", `/curriculum/${f.slug}/`);
    }
    expect(prepare.textContent).not.toMatch(/:\s*\./);
    for (const q of a.faqs) expect(screen.getByRole("button", { name: q.q })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: guidesFor(id).competencies.label })).toHaveAttribute("href", `/guides/${f.slug}/${guidesFor(id).competencies.slug}/`);
  });

  it("names the grades that write it in the title", async () => {
    const meta = await assessmentMetadata(params("bc"));
    expect(meta.title).toBe(`The FSA explained: ${guidesFor("ca-bc").assessment.name} for Grade 4 and Grade 7 parents`);
    expect(meta.alternates?.canonical).toBe("/guides/bc/fsa/");
    expect(meta.description).toContain("BC parents");
  });

  it("names the territory instead of a grade where no grades are fixed", async () => {
    expect(guidesFor("ca-nu").assessment.grades).toEqual([]);
    const meta = await assessmentMetadata(params("nunavut"));
    expect(meta.title).toBe(`The ${guidesFor("ca-nu").assessment.short} explained: ${guidesFor("ca-nu").assessment.name} for Nunavut parents`);
    expect(meta.title).not.toMatch(/Grade\s+parents/);
  });

  it("404s an unknown province on both pages", async () => {
    expect(await competenciesMetadata(params("quebec"))).toEqual({});
    expect(await assessmentMetadata(params("quebec"))).toEqual({});
    await expect(CompetenciesView({ params: params("quebec") })).rejects.toMatchObject({ digest: expect.stringContaining("404") });
    await expect(AssessmentView({ params: params("quebec") })).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
