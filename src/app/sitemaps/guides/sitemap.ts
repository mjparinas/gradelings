import type { MetadataRoute } from "next";
import { sectionSitemap } from "@/components/site/sitemaps";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return sectionSitemap("guides");
}
