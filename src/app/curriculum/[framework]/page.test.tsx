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

  it.each(FRAMEWORKS.map((f) => [f.slug, f] as const))("%s: a card for every grade with each subject's unit count", async (slug, f) => {
    render(await FrameworkPage(props(slug)));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`${f.curriculumName}: ${span(f)}`);
    for (const g of gradesWithContent(f)) {
      const card = screen.getByRole("heading", { level: 2, name: gradeLabel(f, g) }).closest("section")!;
      expect(within(card).getByRole("link", { name: gradeLabel(f, g) })).toHaveAttribute("href", curriculumPath.grade(f, g));
      const links = within(card).getAllByRole("listitem").map((li) => within(li).getByRole("link"));
      const courses = coursesFor(f, g);
      expect(links.map((a) => a.getAttribute("href"))).toEqual(courses.map((c) => curriculumPath.subject(f, g, c.subject)));
      links.forEach((a, i) => expect(a).toHaveTextContent(`${courses[i].units.length} units`));
    }
    expect(screen.getByRole("link", { name: `Read our ${f.shortName} report card guide` })).toHaveAttribute("href", `/report-cards/${f.slug}/`);
    expect(screen.getByRole("link", { name: "parent guides and free practice sheets" })).toHaveAttribute("href", `/guides/${f.slug}/`);
    expect(within(screen.getByRole("region", { name: /Ready to try/ })).getByRole("link", { name: "Try it free" })).toHaveAttribute("href", expect.stringMatching(/^\/play\/#\/start\?framework=[a-z-]+/));
  });

  it("shows kids' subject names for young grades", async () => {
    render(await FrameworkPage(props("bc")));
    const k = screen.getByRole("heading", { level: 2, name: "Kindergarten" }).closest("section")!;
    // Little kids see "Letters & Words" and "My World".
    expect(within(k).getByRole("link", { name: /Letters & Words/ })).toBeInTheDocument();
    expect(within(k).getByRole("link", { name: /My World/ })).toBeInTheDocument();
  });

  it("describes the curriculum's subjects in the metadata", async () => {
    const meta = await generateMetadata(props("nova-scotia"));
    expect(meta.title).toBe("Nova Scotia Curriculum practice, Kindergarten to Grade 9");
    expect(meta.alternates?.canonical).toBe("/curriculum/nova-scotia/");
    expect(meta.description).toMatch(/\(Nova Scotia\): math, english language arts, science, social studies/i);
  });

  it("404s a province that isn't offered", async () => {
    expect(await generateMetadata(props("quebec"))).toEqual({});
    await expect(FrameworkPage(props("quebec"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
