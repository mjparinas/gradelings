import type { Metadata } from "next";
import type { Framework } from "@/content/frameworks";
import { APP_NAME } from "@/lib/brand";
import { pageLocale } from "@/lib/pageMeta";
import { OG_SIZE, OG_TYPE } from "./ogCard";
import type { MilestoneCard } from "./ogText";

/** The share card's file name under a milestone page's path. */
export const MILESTONE_CARD = "card.png";

/**
 * A shared milestone's metadata, with its share card named outright. The page is rendered per request, so the
 * prerendered-page fixes in scripts/csp-pages.mjs never reach it, and the card is a `card.png` route (not an
 * `opengraph-image` file) so its URL needs no redirect before a link preview can load it.
 */
export function milestoneMeta(card: MilestoneCard, path: string, framework?: Pick<Framework, "country">): Metadata {
  const description = `${card.kicker}. ${card.line}.`;
  const image = { url: `${path}${MILESTONE_CARD}`, ...OG_SIZE, type: OG_TYPE, alt: `${APP_NAME}: a practice milestone` };
  return {
    title: card.title,
    description,
    robots: { index: false, follow: true },
    openGraph: { type: "website", siteName: APP_NAME, locale: pageLocale(framework).replace("-", "_"), title: card.title, description, url: path, images: [image] },
    twitter: { card: "summary_large_image", title: card.title, description, images: [image.url] },
  };
}
