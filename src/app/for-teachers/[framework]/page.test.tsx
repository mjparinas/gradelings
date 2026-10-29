// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, gradesWithContent, gradeLabel } from "@/components/site/curriculum";
import { TEACHER_FRAMEWORKS, teacherPath } from "@/components/site/teachers";
import { getFramework, type Framework } from "@/content/frameworks";
import TeacherFrameworkPage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

// The first year is Pre-K where the framework teaches it, under the framework's own name for it.
const span = (f: Framework) => {
  const first = f.grades[0] === "pk" ? (f.preKName ?? "Pre-K") : "Kindergarten";
  return f.country === "US" ? `${first} through 9th grade` : `${first} to Grade 9`;
};

const props = (framework: string) => ({ params: Promise.resolve({ framework }) }) as never;

describe("teacher framework page", () => {
  it("has a page for every framework classes can follow", () => {
    expect(generateStaticParams()).toEqual(TEACHER_FRAMEWORKS.map((f) => ({ framework: f.slug })));
  });

  it.each(TEACHER_FRAMEWORKS.map((f) => [f.slug, f.id] as const))("%s: a tile per grade with its unit count", async (slug, id) => {
    const f = getFramework(id);
    render(await TeacherFrameworkPage(props(slug)));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`${f.region} classroom practice, ${span(f)}`);
    for (const g of gradesWithContent(f)) {
      const units = coursesFor(f, g).reduce((n, c) => n + c.units.length, 0);
      const tile = document.querySelector<HTMLElement>(`main a[href="${teacherPath.grade(f, g)}"]`)!;
      expect(tile).toHaveTextContent(gradeLabel(f, g));
      expect(tile).toHaveTextContent(`${units} units`);
    }
    expect(screen.getByRole("main")).toHaveTextContent(f.country === "US" ? "Practice results describe how a student is practicing, not a report-card mark." : "Practice results describe how a student is practising, not a report-card mark.");
    expect(screen.getByRole("link", { name: "Create a free teacher account" })).toHaveAttribute("href", "/teachers/");
  });

  it("builds metadata, and 404s a province classes can't follow", async () => {
    const meta = await generateMetadata(props("saskatchewan"));
    expect(meta.title).toEqual({ absolute: "Saskatchewan classroom practice for teachers, Kindergarten to Grade 9" });
    expect(meta.alternates?.canonical).toBe("/for-teachers/saskatchewan/");
    expect(meta.description).toContain("Saskatchewan Curriculum");
    expect(await generateMetadata(props("quebec"))).toEqual({});
    await expect(TeacherFrameworkPage(props("quebec"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
