// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { gradesWithContent, gradeLabel } from "@/components/site/curriculum";
import { guidePath } from "@/components/site/guides";
import { FRAMEWORKS } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";
import GuidesHub, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string) => ({ params: Promise.resolve({ framework }) }) as never;

/** The page's own words: main without the shared closing call to action, which names every province. */
function ownText(main: HTMLElement) {
  const copy = main.cloneNode(true) as HTMLElement;
  copy.querySelector('[aria-labelledby="page-cta"]')?.remove();
  return copy.textContent ?? "";
}

describe("guides hub page", () => {
  it("has a page for every framework with guides", () => {
    expect(generateStaticParams()).toEqual(GUIDE_FRAMEWORKS.map((f) => ({ framework: f.slug })));
    expect(GUIDE_FRAMEWORKS.length).toBe(FRAMEWORKS.length);
  });

  it.each(GUIDE_FRAMEWORKS.map((f) => [f.slug, f] as const))("%s: links every grade, the report card, competencies and assessment guides", async (slug, f) => {
    render(await GuidesHub(props(slug)));
    const main = screen.getByRole("main");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`${f.shortName} parent guides and free practice sheets`);
    expect(main).toHaveTextContent(`Every guide follows the ${f.curriculumName}`);

    const guides = guidesFor(f.id);
    expect(within(main).getByRole("link", { name: `Understanding ${f.shortName} report cards` })).toHaveAttribute("href", `/report-cards/${f.slug}/`);
    expect(within(main).getByRole("link", { name: guides.competencies.label })).toHaveAttribute("href", guidePath.competencies(f));
    expect(within(main).getByRole("link", { name: `The ${guides.assessment.short} explained` })).toHaveAttribute("href", guidePath.assessment(f));
    expect(!!within(main).queryByRole("link", { name: "Core French and French Immersion" })).toBe(!!guides.french);

    for (const g of gradesWithContent(f)) {
      expect(within(main).getByRole("link", { name: gradeLabel(f, g) })).toHaveAttribute("href", guidePath.grade(f, g));
    }
    // Every grade card offers a printable sheet for each of its subjects, all under this framework's slug.
    const sheets = within(main).getAllByRole("link", { name: "Printable sheet" });
    expect(sheets.length).toBeGreaterThanOrEqual(gradesWithContent(f).length * 4);
    for (const a of sheets) expect(a.getAttribute("href")).toMatch(new RegExp(`^/guides/${f.slug}/[^/]+/[^/]+/worksheet/$`));

    // The closing call to action sends visitors to the app.
    const cta = within(main).getByRole("region", { name: /Ready to try/ });
    expect(within(cta).getByRole("link", { name: "Try it free" })).toHaveAttribute("href", "/play/");
  });

  it("describes the province's own report card levels, never another province's", async () => {
    const on = FRAMEWORKS.find((f) => f.id === "ca-on")!;
    render(await GuidesHub(props("ontario")));
    const text = ownText(screen.getByRole("main"));
    for (const l of on.scoringFor("3").levels) expect(text).toContain(l.label);
    for (const bc of ["British Columbia", "BC Curriculum", "Core Competencies", "Foundation Skills Assessment", "Proficient"]) expect(text).not.toContain(bc);
  });

  it("builds metadata with the framework's canonical URL and grade range", async () => {
    const ab = FRAMEWORKS.find((f) => f.id === "ca-ab")!;
    const meta = await generateMetadata(props("alberta"));
    expect(meta.alternates?.canonical).toBe("/guides/alberta/");
    expect(meta.title).toBe("Alberta parent guides and free printable practice sheets");
    expect(meta.description).toContain(ab.curriculumName);
    expect(meta.description).toContain("Kindergarten to Grade 9");
    expect(meta.description).toContain(guidesFor("ca-ab").assessment.short);
  });

  it("404s an unknown province and gives it no metadata", async () => {
    expect(await generateMetadata(props("quebec"))).toEqual({});
    await expect(GuidesHub(props("quebec"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
