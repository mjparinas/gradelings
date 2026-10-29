// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, curriculumPath, gradesWithContent } from "@/components/site/curriculum";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { gradeSlug } from "@/content/subjects";
import GradePage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string, grade: string) => ({ params: Promise.resolve({ framework, grade }) }) as never;

describe("curriculum grade page", () => {
  it("has a page for every grade of every framework", () => {
    const params = generateStaticParams();
    for (const f of FRAMEWORKS) {
      expect(params.filter((p) => p.framework === f.slug).map((p) => p.grade)).toEqual(gradesWithContent(f).map(gradeSlug));
    }
  });

  it("lists every unit of every subject, with links to the unit pages", async () => {
    const f = getFramework("ca-ab");
    render(await GradePage(props("alberta", "grade-4")));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Grade 4 Alberta curriculum");
    expect(screen.getByRole("main")).toHaveTextContent(`matched to the ${f.curriculumName}`);
    for (const c of coursesFor(f, "4")) {
      const card = document.querySelector(`h2 a[href="${curriculumPath.subject(f, "4", c.subject)}"]`)!.closest("section")!;
      const hrefs = within(card).getAllByRole("listitem").map((li) => within(li).getByRole("link").getAttribute("href"));
      expect(hrefs).toEqual(c.units.map((u) => curriculumPath.unit(f, "4", c.subject, u.id)));
    }
  });

  it("notes the kids' name for a subject when it differs from the report card's", async () => {
    const { unmount } = render(await GradePage(props("bc", "grade-1")));
    expect(screen.getByText("(“Letters & Words” in the app)")).toBeInTheDocument();
    unmount();
    render(await GradePage(props("bc", "grade-7")));
    // Big kids see "Language Arts"; math is "Math" for everyone, so it has no note.
    expect(screen.getByText("(“Language Arts” in the app)")).toBeInTheDocument();
    expect(document.querySelector('h2 a[href="/curriculum/bc/grade-7/math/"]')!.parentElement).not.toHaveTextContent("in the app");
  });

  it("links the neighbouring grades and ends with the call to action", async () => {
    const f = getFramework("ca-mb");
    render(await GradePage(props("manitoba", "kindergarten")));
    const nav = screen.getByRole("navigation", { name: "Other grades" });
    expect(within(nav).getAllByRole("link").map((a) => [a.textContent, a.getAttribute("href")])).toEqual([
      ["← Pre-K", curriculumPath.grade(f, "pk")],
      ["Grade 1 →", curriculumPath.grade(f, "1")],
    ]);
    expect(within(screen.getByRole("region", { name: /Ready to try/ })).getByRole("link", { name: "Try it free" })).toHaveAttribute("href", expect.stringMatching(/^\/play\/#\/start\?framework=[a-z-]+/));
    const crumbs = within(screen.getByRole("navigation", { name: "Breadcrumb" })).getAllByRole("link");
    expect(crumbs.map((a) => a.getAttribute("href"))).toEqual(["/", "/curriculum/", "/curriculum/manitoba/"]);
  });

  it("builds metadata and 404s a grade outside Kindergarten to Grade 9", async () => {
    const meta = await generateMetadata(props("ontario", "grade-8"));
    expect(meta.title).toBe("Grade 8 Ontario curriculum practice");
    expect(meta.alternates?.canonical).toBe("/curriculum/ontario/grade-8/");
    expect(meta.description).toContain("matched to the Ontario Curriculum");
    expect(await generateMetadata(props("ontario", "grade-10"))).toEqual({});
    await expect(GradePage(props("ontario", "grade-10"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
