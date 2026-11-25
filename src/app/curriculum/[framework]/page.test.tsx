// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, curriculumPath, gradesWithContent, gradeLabel } from "@/components/site/curriculum";
import { FRAMEWORKS, type Framework } from "@/content/frameworks";
import FrameworkPage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

// The first year is Pre-K where the framework teaches it, under the framework's own name for it.
const span = (f: Framework) => {
  const first = f.grades[0] === "pk" ? (f.preKName ?? "Pre-K") : "Kindergarten";
  return f.country === "US" ? `${first} through 9th grade` : `${first} to Grade 9`;
};

const props = (framework: string) => ({ params: Promise.resolve({ framework }) }) as never;

describe("curriculum framework page", () => {
  it("has a page for every framework", () => {
    expect(generateStaticParams()).toEqual(FRAMEWORKS.map((f) => ({ framework: f.slug })));
  });

  it.each(FRAMEWORKS.map((f) => [f.slug, f] as const))("%s: a grade chooser with each grade's unit count", async (slug, f) => {
    render(await FrameworkPage(props(slug)));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`${f.curriculumName}: ${span(f)}`);
    for (const g of gradesWithContent(f)) {
      const units = coursesFor(f, g).reduce((n, c) => n + c.units.length, 0);
      const link = screen.getByRole("link", { name: new RegExp(`^${gradeLabel(f, g)}`) });
      expect(link).toHaveAttribute("href", curriculumPath.grade(f, g));
      expect(link).toHaveTextContent(`${units} units`);
    }
    expect(screen.getByRole("link", { name: `Read our ${f.shortName} report card guide` })).toHaveAttribute("href", `/report-cards/${f.slug}/`);
    expect(screen.getByRole("link", { name: "parent guides and free practice sheets" })).toHaveAttribute("href", `/guides/${f.slug}/`);
    expect(within(screen.getByRole("region", { name: /Ready to try/ })).getByRole("link", { name: "Try it free" })).toHaveAttribute("href", expect.stringMatching(/^\/play\/#\/start\?framework=[a-z-]+/));
  });

  it("saves subjects for the grade page", async () => {
    const bc = FRAMEWORKS.find((f) => f.slug === "bc")!;
    render(await FrameworkPage(props("bc")));
    expect(screen.queryByRole("link", { name: /Letters & Words/ })).toBeNull();
    expect(screen.getByRole("link", { name: /^Kindergarten/ })).toHaveAttribute("href", curriculumPath.grade(bc, "k"));
  });

  it("describes the curriculum's subjects in the metadata", async () => {
    const meta = await generateMetadata(props("nova-scotia"));
    expect(meta.title).toBe("Nova Scotia Curriculum practice, Pre-primary to Grade 9");
    expect(meta.alternates?.canonical).toBe("/curriculum/nova-scotia/");
    expect(meta.description).toMatch(/\(Nova Scotia\): math, english language arts, science, social studies/i);
  });

  it("404s a province that isn't offered", async () => {
    expect(await generateMetadata(props("quebec"))).toEqual({});
    await expect(FrameworkPage(props("quebec"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
