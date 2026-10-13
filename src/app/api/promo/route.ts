import { livePromo } from "@/server/promo";

/**
 * The sale running now, for the banner on the public pages (`{ promo: LivePromo | null }`). The same for
 * everyone, so browsers and the CDN may keep it for a minute. A database problem shows no banner rather than
 * an error.
 */
export async function GET() {
  let promo = null;
  try {
    promo = await livePromo();
  } catch (e) {
    console.error("[promo] couldn't read the sale", (e as Error).message);
  }
  return new Response(JSON.stringify({ promo }), {
    headers: { "content-type": "application/json", "cache-control": "public, max-age=60, s-maxage=60" },
  });
}
