// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, curriculumPath, gradesWithContent, gradeLabel } from "@/components/site/curriculum";
import { TEACHER_FRAMEWORKS, teacherPath } from "@/components/site/teachers";
import { getFramework } from "@/content/frameworks";
import { gradeSlug } from "@/content/subjects";
import TeacherGradePage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string, grade: string) => ({ params: Promise.resolve({ framework, grade }) }) as never;

describe("teacher grade page", () => {
  it("has a page for every grade of every framework classes can follow", () => {
    const params = generateStaticParams();
    for (const f of TEACHER_FRAMEWORKS) {
      expect(params.filter((p) => p.framework === f.slug).map((p) => p.grade)).toEqual(gradesWithContent(f).map(gradeSlug));
    }
    expect(new Set(params.map((p) => p.framework))).toEqual(new Set(TEACHER_FRAMEWORKS.map((f) => f.slug)));
  });

  it.each(TEACHER_FRAMEWORKS.map((f) => [f.slug, f.id] as const))("%s Grade 6: every unit to assign, linked to its public page", async (slug, id) => {
    const f = getFramework(id);
    render(await TeacherGradePage(props(slug, "grade-6")));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`${gradeLabel(f, "6")} ${f.shortName} units to assign`);
    expect(screen.getByRole("main")).toHaveTextContent(`matched to the ${f.curriculumName}`);
    const hrefs = [...document.querySelectorAll("main section.card li a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(coursesFor(f, "6").flatMap((c) => c.units.map((u) => curriculumPath.unit(f, "6", c.subject, u.id))));

    const crumbs = within(screen.getByRole("navigation", { name: "Breadcrumb" })).getAllByRole("link");
    expect(crumbs.map((a) => [a.textContent, a.getAttribute("href")])).toEqual([["Home", "/"], ["For teachers", "/for-teachers/"], [f.region, teacherPath.framework(f)]]);
    const nav = within(screen.getByRole("navigation", { name: "Other grades" })).getAllByRole("link");
    expect(nav.map((a) => a.getAttribute("href"))).toEqual([teacherPath.grade(f, "5"), teacherPath.grade(f, "7")]);
    // Teacher pages end with the teacher call to action, not the family one.
    const cta = screen.getByRole("region", { name: /with your class/ });
    expect(within(cta).getByRole("link", { name: "Create a free teacher account" })).toHaveAttribute("href", "/teachers/");
    expect(within(cta).getByRole("link", { name: "How classes work" })).toHaveAttribute("href", "/for-teachers/");
  });

  it("builds metadata naming the subjects, and 404s an unknown grade", async () => {
    const meta = await generateMetadata(props("bc", "grade-9"));
    expect(meta.title).toBe("Grade 9 BC units to assign to your class");
    expect(meta.alternates?.canonical).toBe("/for-teachers/bc/grade-9/");
    expect(meta.description).toMatch(/^Grade 9 BC Curriculum units for teachers: math, /);
    expect(await generateMetadata(props("bc", "grade-11"))).toEqual({});
    await expect(TeacherGradePage(props("bc", "grade-11"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
    await expect(TeacherGradePage(props("quebec", "grade-3"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
