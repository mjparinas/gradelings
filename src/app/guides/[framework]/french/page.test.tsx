// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, curriculumPath } from "@/components/site/curriculum";
import { getFramework } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";
import { GRADE_LABEL } from "@/content/subjects";
import FrenchGuidePage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string) => ({ params: Promise.resolve({ framework }) }) as never;
const withFrench = GUIDE_FRAMEWORKS.filter((f) => guidesFor(f.id).french);

describe("French guide page", () => {
  it("has a page for every framework with a French guide", () => {
    expect(generateStaticParams()).toEqual(withFrench.map((f) => ({ framework: f.slug })));
    expect(withFrench.length).toBeGreaterThan(0);
  });

  it.each(withFrench.map((f) => [f.slug, f.id] as const))("%s: compares the two programs and links its own French grades", async (slug, id) => {
    const f = getFramework(id);
    const g = guidesFor(id).french!;
    render(await FrenchGuidePage(props(slug)));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(g.title);

    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("columnheader").map((th) => th.textContent?.trim())).toEqual(["", "Core French", "French Immersion"]);
    expect(within(table).getAllByRole("rowheader").map((th) => th.textContent)).toEqual(g.compare.map((r) => r.title));

    const home = screen.getByRole("region", { name: "Ways to practise French at home" });
    for (const gr of g.browse) {
      expect(within(home).getByRole("link", { name: GRADE_LABEL[gr] })).toHaveAttribute("href", curriculumPath.grade(f, gr));
    }
    expect(screen.getByRole("link", { name: `${f.shortName} report cards explained` })).toHaveAttribute("href", `/report-cards/${f.slug}/`);
    expect(within(screen.getByRole("region", { name: /Ready to try/ })).getByRole("link", { name: "Try it free" })).toHaveAttribute("href", expect.stringMatching(/^\/play\/#\/start\?framework=[a-z-]+/));
  });

  it("only offers the French grades a province actually teaches", () => {
    // Every grade a guide sends parents to must have French units for that province.
    for (const f of withFrench) {
      for (const gr of guidesFor(f.id).french!.browse) {
        const hasFrench = coursesFor(f, gr).some((c) => c.subject === "immersion" || c.subject === "core-french");
        expect(hasFrench, `${f.id} ${gr}`).toBe(true);
      }
    }
  });

  it("builds metadata from the guide's own intro", async () => {
    const g = guidesFor("ca-on").french!;
    const meta = await generateMetadata(props("ontario"));
    expect(meta.title).toBe(g.title);
    expect(meta.alternates?.canonical).toBe("/guides/ontario/french/");
    expect(meta.description).toContain(g.intro.split(". ")[0]);
    expect(meta.description).toMatch(/even if you don't speak French\.$/);
  });

  it("404s a province that doesn't exist", async () => {
    expect(await generateMetadata(props("quebec"))).toEqual({});
    await expect(FrenchGuidePage(props("quebec"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
