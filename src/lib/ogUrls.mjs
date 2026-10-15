// Next names a page's share image `.../opengraph-image?<hash>`, with no trailing slash, and with
// `trailingSlash: true` that address answers with a redirect to `.../opengraph-image/?<hash>`. Facebook and
// Pinterest follow it, but some link-preview bots don't, and every bot pays an extra round trip. So
// `scripts/csp-pages.mjs` points each prerendered page straight at the slashed address. The page's inline
// React data carries the same tags, and is changed with them so hydration sees the head it rendered.
// Plain .mjs so the build script can import it.

/** Adds the trailing slash to a prerendered page's share-image addresses. Safe to run twice. */
export function slashImageUrls(html) {
  return html.replace(/\/(opengraph-image|twitter-image)(-\w+)?\?/g, "/$1$2/?");
}
