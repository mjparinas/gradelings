// Every page shares one root layout, so React renders `<html lang="en-CA">` everywhere. A US state's
// pages are in US English, and their Open Graph locale already says so (`pageMeta`), so that tag
// decides the page's language: `scripts/csp-pages.mjs` writes it into each prerendered page, and
// `PageLang` keeps it right as the browser moves between pages. Plain .mjs so the build script can import it.

/** The site's own language, for pages that don't name one. */
export const DEFAULT_LANG = "en-CA";

/** An Open Graph locale ("en_US") as a language tag ("en-US"), or null when it isn't one. */
export function langFromOgLocale(locale) {
  return locale && /^[a-z]{2}_[A-Z]{2}$/.test(locale) ? locale.replace("_", "-") : null;
}

/** Sets the `lang` on a prerendered page's <html> from its og:locale tag. Safe to run twice. */
export function setPageLang(html) {
  const head = /<head\b[^>]*>[\s\S]*?<\/head>/i.exec(html)?.[0] ?? "";
  const og = /<meta\s+property="og:locale"\s+content="([^"]*)"/i.exec(head)?.[1];
  const lang = langFromOgLocale(og) ?? DEFAULT_LANG;
  return html.replace(/(<html\b[^>]*?\slang=")[^"]*(")/i, `$1${lang}$2`);
}
