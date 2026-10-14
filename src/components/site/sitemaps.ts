import type { MetadataRoute } from "next";
import { FRAMEWORKS } from "@/content/frameworks";
import { guidesUpdated, latest } from "@/content/updated";
import { LEGAL_UPDATED } from "@/lib/brand";
import { absolute } from "@/lib/site";
import { allCurriculumPaths, type SitemapPath } from "./curriculum";
import { allGuidePaths } from "./guides";
import { allTeacherPaths } from "./teachers";

// The sitemap is an index (/sitemap.xml) of one sitemap per kind of page, so Search Console reports how many pages of
// each kind are indexed. Each entry carries the day its content last changed where we know it (see src/content/updated.ts);
// pages with no recorded date have none rather than a made-up one. Google ignores priority and change frequency, so
// neither is given.

/** "October 13, 2026" as 2026-10-13. */
function isoDay(text: string): string {
  const d = new Date(`${text} 12:00 UTC`);
  return d.toISOString().slice(0, 10);
}

function otherPages(): SitemapPath[] {
  const legal = isoDay(LEGAL_UPDATED);
  return [
    { path: "/" },
    { path: "/pricing/" },
    { path: "/help/" },
    { path: "/about/" },
    { path: "/contact/" },
    { path: "/status/" },
    { path: "/trust/" },
    { path: "/accessibility/" },
    { path: "/privacy/", updated: legal },
    { path: "/terms/", updated: legal },
    { path: "/guides/", updated: latest(...FRAMEWORKS.map((f) => guidesUpdated(f.id))) },
    { path: "/report-cards/", updated: latest(...FRAMEWORKS.map((f) => guidesUpdated(f.id))) },
    ...FRAMEWORKS.map((f) => ({ path: `/report-cards/${f.slug}/`, updated: guidesUpdated(f.id) })),
  ];
}

export const SITEMAP_SECTIONS = {
  pages: otherPages,
  curriculum: allCurriculumPaths,
  guides: allGuidePaths,
  teachers: allTeacherPaths,
} satisfies Record<string, () => SitemapPath[]>;

export type SitemapSection = keyof typeof SITEMAP_SECTIONS;

export const sectionSitemapPath = (section: SitemapSection) => `/sitemaps/${section}/sitemap.xml`;

export function sectionSitemap(section: SitemapSection): MetadataRoute.Sitemap {
  return SITEMAP_SECTIONS[section]().map((p) => ({ url: absolute(p.path), ...(p.updated ? { lastModified: p.updated } : {}) }));
}

const escapeXml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The sitemap index served at /sitemap.xml. */
export function sitemapIndex(): string {
  const items = (Object.keys(SITEMAP_SECTIONS) as SitemapSection[]).map((section) => {
    const updated = latest(...SITEMAP_SECTIONS[section]().map((p) => p.updated));
    return `<sitemap><loc>${escapeXml(absolute(sectionSitemapPath(section)))}</loc>${updated ? `<lastmod>${updated}</lastmod>` : ""}</sitemap>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join("\n")}\n</sitemapindex>\n`;
}
