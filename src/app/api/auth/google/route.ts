import { appOrigin, clientIp, error, rateLimited } from "@/server/auth";
import { GOOGLE_STATE_SECONDS, encodeGoogleState, googleAuthUrl, googleAvailable, newGoogleState, stateCookie } from "@/server/google";
import { GOOGLE_RETURNS, googleReturnUrl, type GoogleFrom } from "@/lib/googleSignIn";
import { normalizeReferralCode } from "@/lib/plan";

/** Starts "Continue with Google": remembers this sign-in in a short-lived cookie and sends the browser to Google. */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const from = params.get("from") as GoogleFrom;
  if (!Object.hasOwn(GOOGLE_RETURNS, from)) return error(400, "Unknown page");
  const back = (code: string) => Response.redirect(new URL(googleReturnUrl(from, { error: code }), appOrigin(req)), 303);
  if (await rateLimited(`google:${clientIp(req)}`, 20)) return back("slow");
  if (!(await googleAvailable())) return back("off");
  const trial = Number(params.get("trial"));
  const state = newGoogleState(from, {
    trialEndsAt: Number.isFinite(trial) && trial > 0 ? trial : undefined,
    referral: normalizeReferralCode(params.get("ref")) ?? undefined,
  });
  return new Response(null, {
    status: 303,
    headers: { location: googleAuthUrl(req, state), "set-cookie": stateCookie(encodeGoogleState(state), GOOGLE_STATE_SECONDS), "cache-control": "no-store" },
  });
}
