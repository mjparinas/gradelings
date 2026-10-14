import type { Metadata } from "next";
import type { Framework } from "@/content/frameworks";
import { localeOf, type Locale } from "@/content/locale";
import { APP_NAME } from "./brand";

/** The language a public page is written in: US English on a US state's pages, Canadian English everywhere else. */
export function pageLocale(framework?: Pick<Framework, "country">): Locale {
  return framework ? localeOf(framework) : "en-CA";
}

/** What the root layout adds after every page title that isn't absolute. */
export const TITLE_SUFFIX = ` · ${APP_NAME}`;
/** Search engines cut titles longer than this, so every public page title fits in it, suffix included. */
export const TITLE_MAX = 70;

type Title = string | { absolute: string };

/**
 * The most descriptive title that fits in TITLE_MAX: candidates go from fullest to shortest, and each is tried with the
 * site name after it, then on its own. If none fits, the last one is cut at a word.
 */
export function fitTitle(candidates: readonly string[]): Title {
  for (const c of candidates) {
    if (c.length + TITLE_SUFFIX.length <= TITLE_MAX) return c;
    if (c.length <= TITLE_MAX) return { absolute: c };
  }
  const last = candidates[candidates.length - 1];
  const cut = last.slice(0, TITLE_MAX - 1);
  return { absolute: `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,:;(–-]+$/, "")}…` };
}

/**
 * Metadata for a public page: title, description, canonical link and its own Open Graph tags, so a shared link shows
 * the page's title and description rather than only the site name. The share image comes from the nearest
 * `opengraph-image` file, which Next adds on its own.
 */
export function pageMeta(m: {
  /** One title, or candidates from fullest to shortest for fitTitle. */
  title: Title | readonly string[];
  description: string;
  path: string;
  /** The province or state the page is about, for its language. */
  framework?: Pick<Framework, "country">;
  /** "article" for guides and comparisons. */
  type?: "website" | "article";
  /** A different title for shared links, when the page title is cut down for search results. Defaults to the fullest candidate. */
  shareTitle?: string;
}): Metadata {
  const fitted = Array.isArray(m.title) ? fitTitle(m.title) : (m.title as Title);
  const full = Array.isArray(m.title) ? m.title[0] : typeof fitted === "string" ? fitted : fitted.absolute;
  return {
    title: fitted,
    description: m.description,
    alternates: { canonical: m.path },
    openGraph: {
      type: m.type ?? "website",
      siteName: APP_NAME,
      locale: pageLocale(m.framework).replace("-", "_"),
      title: m.shareTitle ?? full,
      description: m.description,
      url: m.path,
    },
  };
}
