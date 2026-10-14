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
