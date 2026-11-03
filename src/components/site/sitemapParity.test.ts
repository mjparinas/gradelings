import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { absolute } from "@/lib/site";
import { SITEMAP_SECTIONS, sectionSitemap, type SitemapSection } from "./sitemaps";

// A new public page with a fixed address must be listed in a sitemap, or be named here as one that search engines
// should not index (app screens, account links, the admin panel and pages made for one person).
const NOT_INDEXED = ["play", "parents", "teachers", "account", "admin", "api", "shared", "milestone", "sitemaps", "sitemap.xml"];

const APP = join(process.cwd(), "src/app");

/** Every fixed-address page under src/app (a folder with a page.tsx and no [parameter] in its path), as "/path/". */
function fixedPages(dir = APP): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory() || name.startsWith("[") || name.startsWith("_")) continue;
    if (dir === APP && NOT_INDEXED.includes(name)) continue;
    if (readdirSync(full).includes("page.tsx")) out.push(`/${relative(APP, full).split("\\").join("/")}/`);
    out.push(...fixedPages(full));
  }
  return out;
}

describe("sitemap parity", () => {
  const listed = new Set((Object.keys(SITEMAP_SECTIONS) as SitemapSection[]).flatMap((s) => sectionSitemap(s).map((e) => e.url)));

  it("lists every fixed-address public page", () => {
    const pages = fixedPages();
    expect(pages.length).toBeGreaterThan(10);
    expect(pages.filter((p) => !listed.has(absolute(p)))).toEqual([]);
  });

  it("lists the home page", () => {
    expect(listed.has(absolute("/"))).toBe(true);
  });
});
