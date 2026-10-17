import type { Metadata } from "next";
import { describe, expect, it, vi } from "vitest";
import { metadata as root } from "./layout";
import * as home from "./page";
import * as about from "./about/page";
import * as accessibility from "./accessibility/page";
import * as compare from "./compare/page";
import * as compareOne from "./compare/[slug]/page";
import * as contact from "./contact/page";
import * as curriculum from "./curriculum/page";
import * as curriculumFw from "./curriculum/[framework]/page";
import * as curriculumGrade from "./curriculum/[framework]/[grade]/page";
import * as curriculumSubject from "./curriculum/[framework]/[grade]/[subject]/page";
import * as curriculumUnit from "./curriculum/[framework]/[grade]/[subject]/[unit]/page";
import * as teachers from "./for-teachers/page";
import * as teachersFw from "./for-teachers/[framework]/page";
import * as teachersGrade from "./for-teachers/[framework]/[grade]/page";
import * as guides from "./guides/page";
import * as guidesFw from "./guides/[framework]/page";
import * as guidesGrade from "./guides/[framework]/[grade]/page";
import * as guidesSubject from "./guides/[framework]/[grade]/[subject]/page";
import * as worksheet from "./guides/[framework]/[grade]/[subject]/worksheet/page";
import * as french from "./guides/[framework]/french/page";
import * as help from "./help/page";
import * as pricing from "./pricing/page";
import * as privacy from "./privacy/page";
import * as reportCards from "./report-cards/page";
import * as reportCardsFw from "./report-cards/[framework]/page";
import * as status from "./status/page";
import * as terms from "./terms/page";
import * as trust from "./trust/page";

vi.stubEnv("__NEXT_TRAILING_SLASH", "1");
// The root layout loads its fonts at build time; only its title template matters here.
vi.mock("next/font/google", () => ({ Fredoka: () => ({ variable: "" }), Andika: () => ({ variable: "" }) }));
vi.mock("next/font/local", () => ({ default: () => ({ variable: "" }) }));

type Page = { metadata?: Metadata; generateMetadata?: (p: never) => Promise<Metadata>; generateStaticParams?: () => Record<string, string>[] };

const PAGES: Record<string, Page> = {
  "/": home, "/about/": about, "/accessibility/": accessibility, "/compare/": compare, "/compare/[slug]/": compareOne, "/contact/": contact,
  "/curriculum/": curriculum, "/curriculum/[framework]/": curriculumFw, "/curriculum/[framework]/[grade]/": curriculumGrade,
  "/curriculum/[framework]/[grade]/[subject]/": curriculumSubject, "/curriculum/[framework]/[grade]/[subject]/[unit]/": curriculumUnit,
  "/for-teachers/": teachers, "/for-teachers/[framework]/": teachersFw, "/for-teachers/[framework]/[grade]/": teachersGrade,
  "/guides/": guides, "/guides/[framework]/": guidesFw, "/guides/[framework]/[grade]/": guidesGrade, "/guides/[framework]/[grade]/[subject]/": guidesSubject,
  "/guides/[framework]/[grade]/[subject]/worksheet/": worksheet, "/guides/[framework]/french/": french,
  "/help/": help, "/pricing/": pricing, "/privacy/": privacy, "/report-cards/": reportCards, "/report-cards/[framework]/": reportCardsFw,
  "/status/": status, "/terms/": terms, "/trust/": trust,
};

const template = (root.title as { template: string }).template;

/** The <title> a page ends up with: its own title through the root layout's template, unless it is absolute. */
function fullTitle(meta: Metadata): string {
  const t = meta.title;
  if (typeof t === "string") return template.replace("%s", t);
  if (t && typeof t === "object" && "absolute" in t) return t.absolute as string;
  return (root.title as { default: string }).default;
}

async function allTitles(): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  for (const [route, page] of Object.entries(PAGES)) {
    if (!page.generateStaticParams) {
      out.set(route, fullTitle(page.metadata ?? (await page.generateMetadata!({} as never))));
      continue;
    }
    for (const params of page.generateStaticParams()) {
      const path = route.replace(/\[(\w+)\]/g, (_, k: string) => params[k]);
      out.set(path, fullTitle(await page.generateMetadata!({ params: Promise.resolve(params) } as never)));
    }
  }
  return out;
}

describe("public page titles", () => {
  it("fit in 70 characters, so search results show them whole, and no two pages share one", async () => {
    const titles = await allTitles();
    expect(titles.size).toBeGreaterThan(5000);
    const long = [...titles].filter(([, t]) => t.length > 70).map(([p, t]) => `${t.length} ${p} ${t}`);
    expect(long).toEqual([]);
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const [p, t] of titles) {
      if (seen.has(t)) dupes.push(`${t}: ${seen.get(t)} and ${p}`);
      seen.set(t, p);
    }
    expect(dupes).toEqual([]);
  });
});
