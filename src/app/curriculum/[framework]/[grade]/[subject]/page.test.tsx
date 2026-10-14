// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, curriculumPath, gradesWithContent } from "@/components/site/curriculum";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { gradeSlug } from "@/content/subjects";
import SubjectPage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string, grade: string, subject: string) => ({ params: Promise.resolve({ framework, grade, subject }) }) as never;

describe("curriculum subject page", () => {
  it("has a page for every subject of every grade of every framework", () => {
    const params = generateStaticParams();
    for (const f of FRAMEWORKS) {
      const expected = gradesWithContent(f).flatMap((g) => coursesFor(f, g).map((c) => `${gradeSlug(g)}/${c.subject}`));
      expect(params.filter((p) => p.framework === f.slug).map((p) => `${p.grade}/${p.subject}`)).toEqual(expected);
    }
  });

  it.each(FRAMEWORKS.map((f) => [f.slug, f.id] as const))("%s Grade 5 math: numbered units with this province's standards and overview label", async (slug, id) => {
    const f = getFramework(id);
    const course = coursesFor(f, "5").find((c) => c.subject === "math")!;
    render(await SubjectPage(props(slug, "grade-5", "math")));
    expect(screen.getByRole("main")).toHaveTextContent(`${course.units.length} units matched to the ${f.curriculumName}.`);
    expect(screen.getByRole("heading", { level: 2, name: f.overviewLabel })).toBeInTheDocument();

    const items = within(screen.getByRole("region", { name: "Units" })).getAllByRole("listitem");
    expect(items).toHaveLength(course.units.length);
    items.forEach((li, i) => {
      const u = course.units[i];
      expect(li).toHaveTextContent(`Unit ${i + 1}`);
      expect(within(li).getByRole("link", { name: u.title })).toHaveAttribute("href", curriculumPath.unit(f, "5", "math", u.id));
      // Each unit cites this framework's standard, never another framework's.
      expect(li).toHaveTextContent(`${f.standardLabel}: ${u.standards[id]}`);
    });
    expect(within(screen.getByRole("region", { name: /Ready to try/ })).getByRole("link", { name: "Try it free" })).toHaveAttribute("href", expect.stringMatching(/^\/play\/#\/start\?framework=[a-z-]+/));
  });

  it("tells parents what kids call the subject when it differs", async () => {
    render(await SubjectPage(props("bc", "kindergarten", "social")));
    expect(screen.getByRole("main")).toHaveTextContent("Kids see this subject as “My World”.");
  });

  it("lists units in the structured data for search engines", async () => {
    const f = getFramework("ca-on");
    const course = coursesFor(f, "2").find((c) => c.subject === "science")!;
    const { container } = render(await SubjectPage(props("ontario", "grade-2", "science")));
    const data = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!) as { "@type": string; itemListElement: { name: string; position: number; url: string }[] }[];
    const list = data.find((d) => d["@type"] === "ItemList")!;
    expect(list.itemListElement.map((x) => x.name)).toEqual(course.units.map((u) => u.title));
    expect(list.itemListElement[0].position).toBe(1);
    expect(list.itemListElement[0].url).toMatch(new RegExp(`${curriculumPath.unit(f, "2", "science", course.units[0].id)}$`));
  });

  it("builds metadata with the framework's own labels, and 404s an unknown subject", async () => {
    const f = getFramework("ca-ns");
    const meta = await generateMetadata(props("nova-scotia", "grade-3", "language"));
    expect(meta.title).toBe("Grade 3 English Language Arts: Nova Scotia curriculum practice");
    expect(meta.alternates?.canonical).toBe("/curriculum/nova-scotia/grade-3/language/");
    expect(meta.description).toContain(`${f.overviewLabel}, ${f.standardLabel.toLowerCase()}s and free sample questions.`);
    expect(await generateMetadata(props("nova-scotia", "grade-3", "music"))).toEqual({});
    await expect(SubjectPage(props("nova-scotia", "grade-3", "music"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
