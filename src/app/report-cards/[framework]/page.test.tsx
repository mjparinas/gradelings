// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { guidesFor } from "@/content/guides";
import ReportCardsPage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string) => ({ params: Promise.resolve({ framework }) }) as never;

describe("report card guide page", () => {
  it("has a page for every framework", () => {
    expect(generateStaticParams()).toEqual(FRAMEWORKS.map((f) => ({ framework: f.slug })));
  });

  it.each(FRAMEWORKS.map((f) => [f.slug, f.id] as const))("%s: each level's official and plain meaning, facts and FAQs", async (slug, id) => {
    const f = getFramework(id);
    const scheme = f.scoringFor("3");
    render(await ReportCardsPage(props(slug)));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(f.reportCard.title);

    const levels = screen.getByRole("region", { name: "The four levels" });
    const cards = [...levels.querySelectorAll<HTMLElement>(":scope > div > div")];
    expect(cards).toHaveLength(scheme.levels.length);
    for (const [i, l] of scheme.levels.entries()) {
      const card = cards[i];
      expect(card.querySelector("p")).toHaveTextContent(l.label);
      expect(card).toHaveTextContent(`Official meaning: ${l.description}`);
      expect(card).toHaveTextContent(`In plain words: ${l.atHome}`);
      expect(card).toHaveTextContent(l.marks ?? `Level ${i + 1} of 4`);
    }
    expect(levels).toHaveTextContent(`Source: ${scheme.source}.`);
    for (const fact of f.reportCard.facts) expect(within(screen.getByRole("region", { name: "What else is on the report card" })).getByText(fact.title)).toBeInTheDocument();
    for (const q of f.reportCard.faqs) expect(screen.getByRole("button", { name: q.q })).toBeInTheDocument();

    const aside = screen.getByRole("complementary");
    expect(within(aside).getByRole("link", { name: "Try it free" })).toHaveAttribute("href", expect.stringMatching(/^\/play\/#\/start\?framework=[a-z-]+/));
    expect(within(aside).getByRole("link", { name: `Browse the ${f.curriculumName}` })).toHaveAttribute("href", `/curriculum/${f.slug}/`);
    expect(within(aside).getByRole("link", { name: `${guidesFor(id).competencies.label} explained` })).toHaveAttribute("href", `/guides/${f.slug}/${guidesFor(id).competencies.slug}/`);
  });

  it("puts the level names in the title", async () => {
    const f = getFramework("ca-bc");
    const meta = await generateMetadata(props("bc"));
    expect(meta.title).toBe(`BC report cards explained: ${f.scoringFor("3").levels.map((l) => l.label).join(", ")}`);
    expect(meta.title).toContain("Proficient");
    expect(meta.alternates?.canonical).toBe("/report-cards/bc/");
  });

  it("404s a province that isn't offered", async () => {
    expect(await generateMetadata(props("quebec"))).toEqual({});
    await expect(ReportCardsPage(props("quebec"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });

  it("never skips a heading level", async () => {
    const { container } = render(await ReportCardsPage(props("bc")));
    const levels = [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
    for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1], `heading ${i + 1}`).toBeLessThanOrEqual(1);
  });
});
