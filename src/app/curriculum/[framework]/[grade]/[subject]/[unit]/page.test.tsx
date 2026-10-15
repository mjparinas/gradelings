// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, curriculumPath, gradesWithContent } from "@/components/site/curriculum";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { gradeSlug } from "@/content/subjects";
import UnitPage, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string, grade: string, subject: string, unit: string) => ({ params: Promise.resolve({ framework, grade, subject, unit }) }) as never;

describe("curriculum unit page", () => {
  it("has a page for every unit a framework cites", () => {
    const params = generateStaticParams();
    for (const f of FRAMEWORKS) {
      const expected = gradesWithContent(f).flatMap((g) => coursesFor(f, g).flatMap((c) => c.units.map((u) => `${gradeSlug(g)}/${c.subject}/${u.id}`)));
      expect(params.filter((p) => p.framework === f.slug).map((p) => `${p.grade}/${p.subject}/${p.unit}`)).toEqual(expected);
    }
  });

  it("shows the unit, its standard, its lesson and six sample questions", async () => {
    const f = getFramework("ca-bc");
    const course = coursesFor(f, "3").find((c) => c.subject === "math")!;
    const unit = course.units.find((u) => u.lesson)!;
    const i = course.units.indexOf(unit);
    render(await UnitPage(props("bc", "grade-3", "math", unit.id)));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(unit.title);
    expect(screen.getByText(`Grade 3 · Math · Unit ${i + 1} of ${course.units.length}`)).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "What your child practises" })).toHaveTextContent(`BC Curriculum learning standard: ${unit.standards["ca-bc"]}`);

    // The lesson children can open before practising.
    const steps = within(screen.getByRole("heading", { name: "How we explain it" }).parentElement!).getAllByRole("listitem");
    expect(steps.map((li) => li.textContent)).toEqual(unit.lesson!.steps);
    expect(screen.getByText(`Answer: ${unit.lesson!.example.answer}`)).toBeInTheDocument();

    const samples = within(screen.getByRole("region", { name: "Sample questions" })).getAllByText(/^Question \d$/);
    expect(samples.map((s) => s.textContent)).toEqual(["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6"]);
    // The side panel's own call to action, besides the header's.
    expect(within(screen.getByRole("complementary")).getByRole("link", { name: "Play free" })).toHaveAttribute("href", `/play/#/start?framework=ca-bc&grade=3&subject=math&unit=${unit.id}`);
    expect(within(screen.getByRole("complementary")).getByRole("button", { name: /Share these questions/ })).toBeInTheDocument();
  });

  it("links the previous and next unit and the grade's other subjects", async () => {
    const f = getFramework("ca-on");
    const course = coursesFor(f, "4").find((c) => c.subject === "science")!;
    const [first, second] = course.units;
    const { unmount } = render(await UnitPage(props("ontario", "grade-4", "science", first.id)));
    const nav = screen.getByRole("navigation", { name: "More units" });
    expect(within(nav).getAllByRole("link").map((a) => [a.textContent, a.getAttribute("href")])).toEqual([[`${second.title} →`, curriculumPath.unit(f, "4", "science", second.id)]]);
    const related = within(screen.getByRole("region", { name: "More Grade 4" })).getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(related).toEqual(coursesFor(f, "4").filter((c) => c.subject !== "science").map((c) => curriculumPath.subject(f, "4", c.subject)));
    unmount();

    render(await UnitPage(props("ontario", "grade-4", "science", second.id)));
    expect(within(screen.getByRole("navigation", { name: "More units" })).getByRole("link", { name: `← ${first.title}` })).toHaveAttribute("href", curriculumPath.unit(f, "4", "science", first.id));
  });

  it("shows the same sample questions on every build", async () => {
    const f = getFramework("ca-sk");
    const unit = coursesFor(f, "6").find((c) => c.subject === "math")!.units[0];
    const first = render(await UnitPage(props("saskatchewan", "grade-6", "math", unit.id)));
    const text = screen.getByRole("region", { name: "Sample questions" }).textContent;
    first.unmount();
    render(await UnitPage(props("saskatchewan", "grade-6", "math", unit.id)));
    expect(screen.getByRole("region", { name: "Sample questions" }).textContent).toBe(text);
  });

  it("aligns the structured data to this framework's standard", async () => {
    const f = getFramework("ca-ab");
    const unit = coursesFor(f, "2").find((c) => c.subject === "math")!.units[0];
    const { container } = render(await UnitPage(props("alberta", "grade-2", "math", unit.id)));
    const data = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent!)) as { "@type": string; educationalAlignment?: { educationalFramework: string; targetName: string }[] }[];
    const resource = data.find((d) => d["@type"] === "LearningResource")!;
    expect(resource.educationalAlignment).toEqual([expect.objectContaining({ educationalFramework: f.curriculumName, targetName: unit.standards["ca-ab"] })]);
  });

  it("builds metadata, and 404s a unit this framework doesn't have", async () => {
    const f = getFramework("ca-pe");
    const unit = coursesFor(f, "1").find((c) => c.subject === "math")!.units[0];
    const meta = await generateMetadata(props("prince-edward-island", "grade-1", "math", unit.id));
    expect(meta.title).toBe(`${unit.title}: Grade 1 Math practice (PEI)`);
    expect(meta.alternates?.canonical).toBe(curriculumPath.unit(f, "1", "math", unit.id));
    expect(meta.description).toContain(unit.parentNote);
    expect(await generateMetadata(props("prince-edward-island", "grade-1", "math", "no-such-unit"))).toEqual({});
    await expect(UnitPage(props("prince-edward-island", "grade-1", "math", "no-such-unit"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });

  it("shows a different set of sample questions for each province that shares a unit", async () => {
    const yukon = getFramework("ca-yt");
    const unit = coursesFor(yukon, "4").find((c) => c.subject === "math")!.units.find((u) => u.standards["ca-bc"])!;
    const bc = render(await UnitPage(props("bc", "grade-4", "math", unit.id)));
    const bcText = screen.getByRole("region", { name: "Sample questions" }).textContent;
    bc.unmount();
    render(await UnitPage(props("yukon", "grade-4", "math", unit.id)));
    expect(screen.getByRole("region", { name: "Sample questions" }).textContent).not.toBe(bcText);
  });

  it("says where the unit sits in this region's course, links its guides and source, and dates the structured data", async () => {
    const f = getFramework("us-wa");
    const course = coursesFor(f, "4").find((c) => c.subject === "math")!;
    const unit = course.units[1];
    const { container } = render(await UnitPage(props("washington", "grade-4", "math", unit.id)));
    const region = screen.getByRole("region", { name: `${unit.title} in Washington` });
    expect(region).toHaveTextContent(`unit 2 of ${course.units.length} in 4th grade Math, after ${course.units[0].title}`);
    expect(region).toHaveTextContent("practice, not a report-card mark");
    const links = within(region).getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(links).toEqual(["/guides/washington/grade-4/", "/guides/washington/grade-4/math/worksheet/", "/report-cards/washington/", f.sourceUrl]);
    const data = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent!)) as Record<string, unknown>[];
    const resource = data.find((d) => d["@type"] === "LearningResource")!;
    expect(resource).toEqual(expect.objectContaining({ inLanguage: "en-US", typicalAgeRange: "9-10", dateModified: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/) }));
  });

  it("gives the page its own Open Graph tags", async () => {
    const f = getFramework("us-ca");
    const unit = coursesFor(f, "3").find((c) => c.subject === "math")!.units[0];
    const meta = await generateMetadata(props("california", "grade-3", "math", unit.id));
    expect(meta.openGraph).toEqual(expect.objectContaining({ title: meta.title, description: meta.description, url: curriculumPath.unit(f, "3", "math", unit.id), locale: "en_US" }));
  });
});
