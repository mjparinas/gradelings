import { describe, expect, it } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import { absolute } from "@/lib/site";
import { SITEMAP_SECTIONS, sectionSitemap, sectionSitemapPath, sitemapIndex, type SitemapSection } from "./sitemaps";

const sections = Object.keys(SITEMAP_SECTIONS) as SitemapSection[];

describe("sitemaps", () => {
  it("indexes one sitemap per kind of page, each dated by its latest change", () => {
    const index = sitemapIndex();
    expect(index).toContain("<sitemapindex");
    for (const s of sections) expect(index).toContain(`<loc>${absolute(sectionSitemapPath(s))}</loc>`);
    expect(index.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g)?.length).toBe(sections.length);
  });

  it("lists every page once, across all sections", () => {
    const urls = sections.flatMap((s) => sectionSitemap(s).map((e) => e.url));
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(absolute("/"));
    for (const f of FRAMEWORKS) expect(urls).toContain(absolute(`/report-cards/${f.slug}/`));
  });

  it("dates every curriculum, guide and teacher page from the content locks, and gives no priority", () => {
    for (const s of ["curriculum", "teachers"] as const) for (const e of sectionSitemap(s)) expect(e.lastModified, e.url).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // Comparison pages carry only a month in their copy, so they get no day.
    const guides = sectionSitemap("guides").filter((e) => !e.url.includes("/compare/"));
    for (const e of guides) expect(e.lastModified, e.url).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    for (const s of sections) for (const e of sectionSitemap(s)) expect(e).not.toHaveProperty("priority");
  });

  it("dates the legal pages from the day they last changed", () => {
    const pages = sectionSitemap("pages");
    expect(pages.find((e) => e.url === absolute("/privacy/"))?.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(pages.find((e) => e.url === absolute("/"))).not.toHaveProperty("lastModified");
  });
});

describe("curriculum sitemap and shared units", () => {
  it("lists a shared unit for every Canadian province and only a few US states, and never drops an own unit", async () => {
    const { allCurriculumPaths, curriculumPath, gradesWithContent, coursesFor, SHARED_UNIT_MIN, SHARED_UNIT_US_COPIES } = await import("./curriculum");
    const { FRAMEWORKS } = await import("@/content/frameworks");
    const listed = new Set(allCurriculumPaths().map((p) => p.path));
    const carriers = new Map<string, { f: (typeof FRAMEWORKS)[number]; path: string }[]>();
    for (const f of FRAMEWORKS)
      for (const g of gradesWithContent(f))
        for (const c of coursesFor(f, g))
          for (const u of c.units) if (u.standards[f.id]) {
            const k = `${g}/${c.subject}/${u.id}`;
            carriers.set(k, [...(carriers.get(k) ?? []), { f, path: curriculumPath.unit(f, g, c.subject, u.id) }]);
          }
    let dropped = 0;
    for (const [k, list] of carriers) {
      const us = list.filter((x) => x.f.country === "US");
      for (const x of list) {
        const isListed = listed.has(x.path);
        if (x.f.country !== "US" || list.length < SHARED_UNIT_MIN) expect(isListed, x.path).toBe(true);
        if (!isListed) dropped++;
      }
      // At least one page of every unit is always listed, so no unit's content leaves the sitemap.
      expect(list.some((x) => listed.has(x.path)), k).toBe(true);
      if (list.length >= SHARED_UNIT_MIN) expect(us.filter((x) => listed.has(x.path)).length).toBeLessThanOrEqual(SHARED_UNIT_US_COPIES);
    }
    expect(dropped).toBeGreaterThan(0);
  }, 300000);
});
