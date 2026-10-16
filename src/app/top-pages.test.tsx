// @vitest-environment jsdom
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import { US_CLASS_CONSENT } from "@/lib/classroom";
import { byCountry, regionSummary } from "@/components/site/provinces";
import { TEACHER_FRAMEWORKS, teacherPath } from "@/components/site/teachers";
import CurriculumIndex from "./curriculum/page";
import CurriculumFramework from "./curriculum/[framework]/page";
import TeachersHub from "./for-teachers/page";
import GuidesHub from "./guides/[framework]/page";
import PricingPage from "./pricing/page";
import ReportCardsIndex from "./report-cards/page";

// The busiest public pages answer parents' questions on the page and in FAQ structured data.

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");

function faqQuestions(container: HTMLElement): string[] {
  type Block = { "@type"?: string; mainEntity?: { name: string }[] };
  const blocks = [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => [JSON.parse(s.textContent!)].flat() as Block[]);
  return blocks.filter((b) => b["@type"] === "FAQPage").flatMap((b) => b.mainEntity!.map((q) => q.name));
}

const params = (framework: string) => ({ params: Promise.resolve({ framework }) }) as never;

describe("top landing pages", () => {
  it("curriculum page for Ontario: how report cards change by grade, and common questions", async () => {
    const { container } = render(await CurriculumFramework(params("ontario")));
    const reporting = screen.getByRole("region", { name: "How Ontario report cards describe progress" });
    expect(within(reporting).getAllByRole("listitem").map((li) => li.textContent)).toContain("Grade 1 to Grade 6: Level 1, Level 2, Level 3 and Level 4.");
    expect(faqQuestions(container)).toContain("How many units are there?");
    expect(screen.getByRole("heading", { name: "Common questions" })).toBeInTheDocument();
  });

  it("curriculum index: counts the units and answers questions", () => {
    const { container } = render(<CurriculumIndex />);
    expect(screen.getByText(new RegExp(`follows ${FRAMEWORKS.length} curricula`))).toBeInTheDocument();
    expect(faqQuestions(container)).toContain("How are units matched to the curriculum?");
  });

  it("report-card index: every region's scale, grade by grade", () => {
    const { container } = render(<ReportCardsIndex />);
    for (const f of FRAMEWORKS) expect(screen.getByRole("region", { name: f.name })).toBeInTheDocument();
    expect(faqQuestions(container)).toContain("Is Gradelings practice the same as a report-card mark?");
  });

  it("guides hub: questions answered from the province's own guides", async () => {
    const { container } = render(await GuidesHub(params("ontario")));
    expect(faqQuestions(container).some((q) => q.startsWith("When do students write"))).toBe(true);
    expect(faqQuestions(container)).toContain("When does French start in Ontario?");
  });

  it("pricing: pricing questions", () => {
    const { container } = render(<PricingPage />);
    expect(screen.getByRole("heading", { name: "Pricing questions" })).toBeInTheDocument();
    expect(faqQuestions(container)).toContain("How much does it cost per child?");
  });

  it("teacher hub: both ways students join, co-teachers and the US consent line", () => {
    const { container } = render(<TeachersHub />);
    expect(screen.getByRole("heading", { name: "Add students" })).toBeInTheDocument();
    const qs = faqQuestions(container);
    expect(qs).toContain("Can I share a class with another teacher?");
    expect(qs).toContain("Do US schools need parent consent?");
    expect(container.textContent).toContain(US_CLASS_CONSENT);
    expect(qs).toContain("Can I ask the whole class a question at once?");
  });

  it("teacher hub: a short region summary and curriculum links grouped by country", () => {
    const { container } = render(<TeachersHub />);
    const intro = container.querySelector("h1 + p")?.textContent ?? "";
    expect(intro).toContain(regionSummary(TEACHER_FRAMEWORKS));
    // The intro no longer names every province and state one by one.
    expect(TEACHER_FRAMEWORKS.filter((f) => intro.includes(f.region)).length).toBeLessThan(5);
    const section = screen.getByRole("heading", { name: "Find your curriculum" }).closest("section")!;
    for (const g of byCountry(TEACHER_FRAMEWORKS)) {
      const list = within(section).getByRole("heading", { name: g.heading }).nextElementSibling as HTMLElement;
      expect(within(list).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(g.frameworks.map((f) => teacherPath.framework(f)));
    }
    expect(screen.queryByText(/^See .* units$/)).toBeNull();
  });
});
