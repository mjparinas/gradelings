import { appOrigin, clientIp, error, json, rateLimited, readJson, sameOrigin } from "@/server/auth";
import { isFlagOn } from "@/server/flags";
import { createGiftCheckout, stripeConfigured, stripePrices } from "@/server/stripe";

// Gifts need no account: anyone can buy a year of the family plan as a code. GET says which currencies
// are open; POST starts the Stripe Checkout and answers with its address.

async function open(): Promise<{ CAD: boolean; USD: boolean }> {
  const on = stripeConfigured() && (await isFlagOn("gift-plans", null));
  return { CAD: on && stripePrices("CAD") !== null, USD: on && stripePrices("USD") !== null };
}

export async function GET() {
  return json({ open: await open() });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  if (await rateLimited(`gift:${clientIp(req)}`, 10)) return error(429, "Too many tries. Please wait a few minutes.");
  const body = ((await readJson(req)) ?? {}) as { currency?: string };
  const currency = body.currency === "USD" ? "USD" : "CAD";
  if (!(await open())[currency]) return error(503, "Gifts aren't open yet. Please check back soon.");
  try {
    return json({ url: await createGiftCheckout({ currency, origin: appOrigin(req) }) });
  } catch (e) {
    return error(502, (e as Error).message);
  }
}
