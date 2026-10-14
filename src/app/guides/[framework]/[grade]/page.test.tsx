// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coursesFor, curriculumPath, gradesWithContent, gradeLabel } from "@/components/site/curriculum";
import { guidePageKind } from "@/components/site/GuideExtras";
import { guidePath } from "@/components/site/guides";
import { getFramework } from "@/content/frameworks";
import { GUIDE_FRAMEWORKS, guidesFor } from "@/content/guides";
import { gradeSlug } from "@/content/subjects";
import GradeGuide, { generateMetadata, generateStaticParams } from "./page";

// next.config.ts sets trailingSlash, which next/link reads from this variable.
vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

const props = (framework: string, grade: string) => ({ params: Promise.resolve({ framework, grade }) }) as never;

/** The answer text of the FAQ JSON-LD, which search engines read. */
function faqAnswers(container: HTMLElement): string[] {
  type Block = { "@type": string; mainEntity?: { name: string; acceptedAnswer: { text: string } }[] };
  const blocks = [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => JSON.parse(s.textContent!) as Block[]);
  const faq = blocks.find((b) => b["@type"] === "FAQPage")!;
  return faq.mainEntity!.map((q) => q.acceptedAnswer.text);
}

describe("grade guide page", () => {
  it("has a page for every grade of every framework with guides", () => {
    // The rest are the competencies and assessment pages (guide-routes.test.ts).
    const params = generateStaticParams().filter((p) => !guidePageKind(p.framework, p.grade));
    for (const f of GUIDE_FRAMEWORKS) {
      expect(params.filter((p) => p.framework === f.slug).map((p) => p.grade)).toEqual(gradesWithContent(f).map(gradeSlug));
    }
    // Every generated grade has the parent copy the page needs (it 404s without it).
    for (const p of params) {
      const f = GUIDE_FRAMEWORKS.find((x) => x.slug === p.framework)!;
      const g = gradesWithContent(f).find((x) => gradeSlug(x) === p.grade)!;
      expect(guidesFor(f.id).gradeNotes[g], `${p.framework}/${p.grade}`).toBeDefined();
    }
  });

  it.each(GUIDE_FRAMEWORKS.map((f) => [f.slug, f.id] as const))("%s Grade 4: names the curriculum, every subject and the neighbouring grades", async (slug, id) => {
    const f = getFramework(id);
    const { container } = render(await GradeGuide(props(slug, "grade-4")));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`What your child learns in ${gradeLabel(f, "4")} in ${f.shortName}`);
    expect(screen.getByRole("heading", { name: `${gradeLabel(f, "4")} subjects in the ${f.curriculumName}` })).toBeInTheDocument();
    for (const c of coursesFor(f, "4")) {
      expect(screen.getAllByRole("link", { name: "All units" }).map((a) => a.getAttribute("href"))).toContain(curriculumPath.subject(f, "4", c.subject));
      expect(screen.getAllByRole("link", { name: "Help at home" }).map((a) => a.getAttribute("href"))).toContain(guidePath.subject(f, "4", c.subject));
    }
    const nav = screen.getByRole("navigation", { name: "Other grades" });
    expect(within(nav).getByRole("link", { name: `← ${gradeLabel(f, "3")}` })).toHaveAttribute("href", guidePath.grade(f, "3"));
    expect(within(nav).getByRole("link", { name: `${gradeLabel(f, "5")} →` })).toHaveAttribute("href", guidePath.grade(f, "5"));

    // The report card answer uses this province's own level names, and never claims a report card uses our practice steps.
    const scheme = f.scoringFor("4");
    const levels = scheme.levels.map((l) => l.label).join(", ");
    expect(faqAnswers(container)[1]).toContain(
      scheme.practiceSteps ? `report-card scale in ${gradeLabel(f, "4")}, so` : `${f.shortName} report cards describe learning with ${levels}.`,
    );
    // Each level is explained, with what it means at home.
    const levelList = screen.getByRole("heading", { name: scheme.practiceSteps ? `The four practice steps in ${gradeLabel(f, "4")}` : `What each level means in ${gradeLabel(f, "4")}` }).parentElement!;
    for (const l of scheme.levels) expect(levelList).toHaveTextContent(l.description);

    // Subscribe, or try the app free.
    expect(screen.getByRole("link", { name: "Try it free" })).toHaveAttribute("href", expect.stringMatching(/^\/play\/#\/start\?framework=[a-z-]+/));
  });

  it("shows every subject's printable sheet in a gallery, with one Pinterest pin for the grade", async () => {
    const bc = getFramework("ca-bc");
    render(await GradeGuide(props("bc", "grade-4")));
    const gallery = screen.getByRole("region", { name: "Printable Grade 4 sheets" });
    expect(gallery).toHaveAttribute("id", "sheets");
    const sheets = within(gallery).getAllByRole("link", { name: /Open the sheet/ });
    expect(sheets.map((a) => a.getAttribute("href"))).toEqual(coursesFor(bc, "4").map((c) => guidePath.worksheet(bc, "4", c.subject)));
    expect(sheets[0]).toHaveTextContent("Grade 4 Math");
    const pin = new URL(within(gallery).getByRole("link", { name: /Save to Pinterest/ }).getAttribute("href")!);
    expect(new URL(pin.searchParams.get("url")!).pathname + new URL(pin.searchParams.get("url")!).hash).toBe("/guides/bc/grade-4/#sheets");
    expect(pin.searchParams.get("media")).toMatch(/\/guides\/bc\/grade-4\/pin\.png$/);
    expect(pin.searchParams.get("description")).toContain("Free printable Grade 4 worksheets");
  });

  it("mentions the provincial assessment only in the grades that write it", async () => {
    const bc = getFramework("ca-bc");
    const fsa = guidesFor("ca-bc").assessment;
    for (const g of gradesWithContent(bc)) {
      const { container, unmount } = render(await GradeGuide(props("bc", gradeSlug(g))));
      const writes = fsa.grades.includes(g);
      expect(!!screen.queryByRole("link", { name: `Read the ${fsa.short} guide` }), g).toBe(writes);
      expect(faqAnswers(container)[1].includes(fsa.name), g).toBe(writes);
      unmount();
    }
  });

  it("answers the questions parents search for with this grade's own facts", async () => {
    const bc = getFramework("ca-bc");
    const { container } = render(await GradeGuide(props("bc", "grade-4")));
    const answers = faqAnswers(container);
    expect(answers.some((a) => a.startsWith(bc.scoringFor("4").levels[2].description))).toBe(true);
    // What to know first comes from Grade 3's own units.
    const g3 = coursesFor(bc, "3")[0];
    expect(answers.some((a) => a.includes(g3.units[0].title))).toBe(true);
    // Help at home matches the age: 15 minutes and older kids' tips in Grade 4, 10 minutes in Kindergarten.
    expect(answers.at(-1)).toContain("About 15 minutes a day");
    const k = faqAnswers(render(await GradeGuide(props("bc", "kindergarten"))).container);
    expect(k.at(-1)).toContain("About 10 minutes a day");
    expect(k.some((a) => a.includes("before starting"))).toBe(false);
  });

  it("says a US state's report card has no named levels, in US spelling", async () => {
    const { container } = render(await GradeGuide(props("washington", "grade-4")));
    const answers = faqAnswers(container);
    expect(answers[1]).toContain("Washington has no statewide report-card scale in 4th grade");
    expect(container.textContent).not.toMatch(/Washington report cards describe/);
    expect(answers.at(-1)).not.toMatch(/practise/);
  });

  it("has no previous grade in Kindergarten and no next grade in Grade 9", async () => {
    const { unmount } = render(await GradeGuide(props("ontario", "kindergarten")));
    expect(screen.queryByRole("heading", { name: /^Ready for/ })).not.toBeInTheDocument();
    expect(within(screen.getByRole("navigation", { name: "Other grades" })).getAllByRole("link")).toHaveLength(1);
    unmount();

    render(await GradeGuide(props("ontario", "grade-9")));
    expect(screen.getByRole("heading", { name: "Ready for Grade 9?" })).toBeInTheDocument();
    const links = within(screen.getByRole("navigation", { name: "Other grades" })).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual(["← Grade 8"]);
  });

  it("lists the subjects in the metadata and points the canonical at the guide", async () => {
    const meta = await generateMetadata(props("manitoba", "grade-2"));
    expect(meta.title).toEqual({ absolute: "What your child learns in Grade 2 in Manitoba: a parent's guide" });
    expect(meta.alternates?.canonical).toBe("/guides/manitoba/grade-2/");
    expect(meta.description).toMatch(/^Grade 2 in Manitoba: what is taught in math, English language arts, science, social studies and French Immersion, what to look for/);
    expect(meta.description).toContain("Matched to the Manitoba Curriculum.");
  });

  it("404s a grade or province that doesn't exist", async () => {
    expect(await generateMetadata(props("bc", "grade-12"))).toEqual({});
    await expect(GradeGuide(props("bc", "grade-12"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
    await expect(GradeGuide(props("quebec", "grade-3"))).rejects.toMatchObject({ digest: expect.stringContaining("404") });
  });
});
