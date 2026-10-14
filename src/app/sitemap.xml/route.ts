import { sitemapIndex } from "@/components/site/sitemaps";

export const dynamic = "force-static";

/** The sitemap index: one sitemap per kind of page (see src/components/site/sitemaps.ts). */
export function GET() {
  return new Response(sitemapIndex(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
