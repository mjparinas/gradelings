import type { Metadata } from "next";
import type { Framework } from "@/content/frameworks";
import { localeOf, type Locale } from "@/content/locale";
import { APP_NAME } from "./brand";

/** The language a public page is written in: US English on a US state's pages, Canadian English everywhere else. */
export function pageLocale(framework?: Pick<Framework, "country">): Locale {
  return framework ? localeOf(framework) : "en-CA";
}

/**
 * Metadata for a public page: title, description, canonical link and its own Open Graph tags, so a shared link shows
 * the page's title and description rather than only the site name. The share image comes from the nearest
 * `opengraph-image` file, which Next adds on its own.
 */
export function pageMeta(m: {
  title: string | { absolute: string };
  description: string;
  path: string;
  /** The province or state the page is about, for its language. */
  framework?: Pick<Framework, "country">;
  /** "article" for guides and comparisons. */
  type?: "website" | "article";
  /** A different title for shared links, when the page title is cut down for search results. */
  shareTitle?: string;
}): Metadata {
  const title = typeof m.title === "string" ? m.title : m.title.absolute;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.path },
    openGraph: {
      type: m.type ?? "website",
      siteName: APP_NAME,
      locale: pageLocale(m.framework).replace("-", "_"),
      title: m.shareTitle ?? title,
      description: m.description,
      url: m.path,
    },
  };
}
