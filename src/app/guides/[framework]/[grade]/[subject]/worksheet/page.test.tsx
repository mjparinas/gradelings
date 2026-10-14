// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, gradesWithContent } from "@/components/site/curriculum";
import { getFramework } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS } from "@/content/guides";
import { gradeSlug } from "@/content/subjects";
import WorksheetPage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string, grade: string, subject: string) => ({ params: Promise.resolve({ framework, grade, subject }) }) as never;

async function sheet(framework: string, grade: string, subject: string) {
  const view = render(await WorksheetPage(props(framework, grade, subject)));
  const questions = [...view.container.querySelectorAll<HTMLElement>("main > ol > li")];
  const key = within(screen.getByRole("region", { name: "Answer key" })).getAllByRole("listitem");
  return { ...view, questions, key };
}

describe("printable practice sheet", () => {
  it("has a sheet for every subject page", () => {
    const params = generateStaticParams();
    for (const f of GUIDE_FRAMEWORKS) {
      const expected = gradesWithContent(f).flatMap((g) => coursesFor(f, g).map((c) => `${gradeSlug(g)}/${c.subject}`));
      expect(params.filter((p) => p.framework === f.slug).map((p) => `${p.grade}/${p.subject}`)).toEqual(expected);
    }
  });

  it("has ten numbered questions with a matching ten-line answer key naming each unit", async () => {
    const f = getFramework("ca-bc");
    const course = coursesFor(f, "3").find((c) => c.subject === "math")!;
    const { questions, key } = await sheet("bc", "grade-3", "math");
    expect(questions).toHaveLength(10);
    expect(questions.map((q) => within(q).getByText(/^Question \d+$/).textContent)).toEqual(Array.from({ length: 10 }, (_, i) => `Question ${i + 1}`));
    expect(key).toHaveLength(10);
    // Questions go round the units, so the first ones come from different units in course order.
    const unitOf = (li: HTMLElement) => li.querySelector("span")!.textContent!.replace(/^\(|\)$/g, "");
    const firstRound = key.slice(0, Math.min(10, course.units.length)).map(unitOf);
    expect(firstRound).toEqual(course.units.slice(0, firstRound.length).map((u) => u.title));
    key.forEach((li, i) => expect(li.textContent).toMatch(new RegExp(`^${i + 1}\\. \\S`)));
  });

  it("is the same sheet on every build", async () => {
    const a = await sheet("ontario", "grade-6", "science");
    const first = a.key.map((li) => li.textContent);
    a.unmount();
    const b = await sheet("ontario", "grade-6", "science");
    expect(b.key.map((li) => li.textContent)).toEqual(first);
  });

  it("names the curriculum, prints on demand and links back to the units and the app", async () => {
    const f = getFramework("ca-nb");
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    await sheet("new-brunswick", "grade-2", "language");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Grade 2 English Language Arts practice sheet");
    expect(document.querySelector("main header")).toHaveTextContent(f.curriculumName);
    await userEvent.click(screen.getByRole("button", { name: /Print this sheet/ }));
    expect(print).toHaveBeenCalledOnce();
    expect(screen.getByRole("link", { name: "See all English language arts units" })).toHaveAttribute("href", "/curriculum/new-brunswick/grade-2/language/");
    expect(screen.getByRole("link", { name: "Try it free" })).toHaveAttribute("href", expect.stringMatching(/^\/play\/#\/start\?framework=[a-z-]+/));
  });

  it("can be shared, or saved to Pinterest with its tall image", async () => {
    await sheet("bc", "grade-2", "language");
    expect(screen.getByRole("button", { name: /Share this sheet/ })).toBeInTheDocument();
    const pin = new URL(screen.getByRole("link", { name: /Save to Pinterest/ }).getAttribute("href")!);
    expect(pin.searchParams.get("media")).toMatch(/\/guides\/bc\/grade-2\/language\/worksheet\/pin\.png$/);
    expect(pin.searchParams.get("url")).toMatch(/\/guides\/bc\/grade-2\/language\/worksheet\/$/);
  });

  it("keeps the names of languages capitalized mid-sentence", async () => {
    await sheet("bc", "grade-5", "immersion");
    expect(screen.getByRole("link", { name: "See all French Immersion units" })).toHaveAttribute("href", "/curriculum/bc/grade-5/immersion/");
    const meta = await generateMetadata(props("bc", "grade-5", "core-french"));
    expect(meta.description).toContain("Grade 5 Core French practice sheet");
  });

  it("builds metadata and 404s a subject that isn't taught", async () => {
    const meta = await generateMetadata(props("yukon", "grade-7", "math"));
    expect(meta.title).toBe("Free printable Grade 7 Math practice sheet (Yukon)");
    expect(meta.alternates?.canonical).toBe("/guides/yukon/grade-7/math/worksheet/");
    expect(meta.description).toContain("Yukon Curriculum");
    expect(await generateMetadata(props("ontario", "kindergarten", "core-french"))).toEqual({});
    await expect(WorksheetPage(props("ontario", "kindergarten", "core-french"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
