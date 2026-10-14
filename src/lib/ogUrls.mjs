// Next names a page's share image `.../opengraph-image?<hash>`, with no trailing slash, and with
// `trailingSlash: true` that address answers with a redirect to `.../opengraph-image/?<hash>`. Facebook and
// Pinterest follow it, but some link-preview bots don't, and every bot pays an extra round trip. So
// `scripts/csp-pages.mjs` points each prerendered page's image tags straight at the slashed address.
// Plain .mjs so the build script can import it.

const TAG = /<meta\s+(?:property|name)="(?:og:image|og:image:url|og:image:secure_url|twitter:image|twitter:image:src)"\s+content="[^"]*"/gi;

/** Adds the trailing slash to share-image addresses in a prerendered page's meta tags. Safe to run twice. */
export function slashImageUrls(html) {
  return html.replace(TAG, (tag) => tag.replace(/\/(opengraph-image|twitter-image)(-\w+)?\?/, "/$1$2/?"));
}
