// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, curriculumPath, gradesWithContent } from "@/components/site/curriculum";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, HOME_TIPS } from "@/content/guides";
import { gradeSlug } from "@/content/subjects";
import SubjectGuide, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string, grade: string, subject: string) => ({ params: Promise.resolve({ framework, grade, subject }) }) as never;

describe("subject help-at-home guide", () => {
  it("has a page for every subject each framework teaches in each grade", () => {
    const params = generateStaticParams();
    for (const f of GUIDE_FRAMEWORKS) {
      const expected = gradesWithContent(f).flatMap((g) => coursesFor(f, g).map((c) => `${gradeSlug(g)}/${c.subject}`));
      expect(params.filter((p) => p.framework === f.slug).map((p) => `${p.grade}/${p.subject}`)).toEqual(expected);
    }
  });

  it("explains every unit, its own Big Ideas and the province's levels", async () => {
    const f = getFramework("ca-on");
    const course = coursesFor(f, "5").find((c) => c.subject === "math")!;
    render(await SubjectGuide(props("ontario", "grade-5", "math")));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Grade 5 Math: how to help at home");
    expect(screen.getByRole("main")).toHaveTextContent(`What your child learns in Grade 5 math in the ${f.curriculumName}`);

    const ideas = within(screen.getByRole("region", { name: "The Big Ideas this year" })).getAllByRole("listitem");
    expect(ideas.map((li) => li.textContent)).toEqual(course.bigIdeas["ca-on"]);

    const units = within(screen.getByRole("region", { name: "What each unit covers" }));
    for (const u of course.units) {
      expect(units.getByRole("link", { name: u.title })).toHaveAttribute("href", curriculumPath.unit(f, "5", "math", u.id));
    }

    const levels = screen.getByRole("region", { name: "What the report card levels look like at home" });
    expect([...levels.querySelectorAll("dt")].map((dt) => dt.textContent)).toEqual(f.scoringFor("5").levels.map((l) => l.label));

    // Tips for the child's age band (big kids from Grade 5).
    const tips = within(screen.getByRole("region", { name: "Easy ways to practise math at home" })).getAllByRole("listitem");
    expect(tips.map((li) => li.textContent)).toEqual(HOME_TIPS.math.big);
  });

  it("links the printable sheet and the app", async () => {
    const f = getFramework("ca-sk");
    render(await SubjectGuide(props("saskatchewan", "grade-1", "language")));
    expect(screen.getByRole("link", { name: "Get the sheet" })).toHaveAttribute("href", guidePath.worksheet(f, "1", "language"));
    expect(screen.getByRole("link", { name: /^Practise in / })).toHaveAttribute("href", expect.stringMatching(/^\/play\/#\/start\?framework=[a-z-]+/));
    // Grade 1 is in the little-kid band, so the tips are for little kids.
    const tips = within(screen.getByRole("region", { name: /Easy ways to practise/ })).getAllByRole("listitem");
    expect(tips.map((li) => li.textContent)).toEqual(HOME_TIPS.language.little);
    const crumbs = within(screen.getByRole("navigation", { name: "Breadcrumb" })).getAllByRole("link");
    expect(crumbs.map((a) => a.getAttribute("href"))).toEqual(["/", "/guides/saskatchewan/", "/guides/saskatchewan/grade-1/"]);
  });

  it("builds metadata with the subject name parents search for", async () => {
    const meta = await generateMetadata(props("alberta", "grade-3", "social"));
    expect(meta.title).toBe("Grade 3 Social Studies help at home (Alberta curriculum)");
    expect(meta.alternates?.canonical).toBe("/guides/alberta/grade-3/social/");
  });

  it("404s a subject the province doesn't teach in that grade", async () => {
    // BC starts Core French in Grade 5.
    expect(await generateMetadata(props("bc", "grade-2", "core-french"))).toEqual({});
    await expect(SubjectGuide(props("bc", "grade-2", "core-french"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
    await expect(SubjectGuide(props("bc", "grade-2", "art"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
