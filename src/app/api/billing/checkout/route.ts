import { toCountryCode } from "@/lib/country";
import { appOrigin, error, getSession, json, sameOrigin } from "@/server/auth";
import { pendingDiscount, stripeCouponFor } from "@/server/codes";
import { currencyFor, firstChargeAt } from "@/lib/plan";
import { getFamilyRow } from "@/server/family";
import { createCheckout, stripeConfigured, stripePrices } from "@/server/stripe";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Please sign in first.");
  if (!session.verified) return error(403, "Please confirm your email first. We sent a link when you signed up; you can ask for another under Account.");
  if (!stripeConfigured()) return error(503, "Payments aren't set up yet.");
  const body = (await req.json().catch(() => ({}))) as { interval?: string };
  const interval = body.interval === "year" ? "year" : "month";
  const family = await getFamilyRow(session.familyId);
  if (family && ["active", "trialing", "past_due"].includes(family.subscription_status ?? "")) {
    return error(409, "You already have a subscription. Use Manage billing to change or cancel it.");
  }
  // A US family pays in US dollars, with US sales tax worked out by Stripe Tax.
  const currency = currencyFor(toCountryCode(family?.country));
  if (!stripePrices(currency)) return error(503, "Payments in US dollars aren't available yet. Please try again later.");
  const origin = appOrigin(req);
  try {
    const discount = await pendingDiscount(family?.discount_code);
    const coupon = discount ? await stripeCouponFor(discount) : null;
    // Subscribing during the trial keeps the days left: the first charge is when the trial ends.
    const startAt = family ? firstChargeAt(Number(family.trial_ends_at), Boolean(family.subscription_status)) : null;
    const url = await createCheckout({ interval, familyId: session.familyId, email: session.email, customer: family?.stripe_customer, origin, coupon, firstChargeAt: startAt, currency });
    return json({ url });
  } catch (e) {
    return error(502, (e as Error).message);
  }
}
