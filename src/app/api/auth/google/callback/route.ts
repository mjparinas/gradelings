import { googleReturnUrl, type GoogleError, type GoogleFrom } from "@/lib/googleSignIn";
import { appOrigin, clientIp, createSession, deviceLabel, rateLimited, secretsMatch, sessionCookie } from "@/server/auth";
import { sendEmail } from "@/server/email";
import { googleLinkedEmail, newSignInEmail } from "@/server/emailTemplates";
import { accountForGoogle, decodeGoogleState, exchangeGoogleCode, googleAvailable, googleStateCookie, stateCookie } from "@/server/google";

/** Where Google sends the browser back to: checks the sign-in is the one we started, then signs the person in. */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const raw = (req.headers.get("cookie") ?? "").split(";").map((p) => p.trim()).find((p) => p.startsWith(`${googleStateCookie}=`));
  const state = decodeGoogleState(raw?.slice(googleStateCookie.length + 1));
  const from: GoogleFrom = state?.from ?? "parents";
  const done = (location: string, ...cookies: string[]) => {
    const headers = new Headers({ location: new URL(location, appOrigin(req)).toString(), "cache-control": "no-store" });
    // The one-use cookie always goes, whatever happened.
    headers.append("set-cookie", stateCookie("", 0));
    for (const c of cookies) headers.append("set-cookie", c);
    return new Response(null, { status: 303, headers });
  };
  const fail = (code: GoogleError) => done(googleReturnUrl(from, { error: code }));

  if (await rateLimited(`google-cb:${clientIp(req)}`, 20)) return fail("slow");
  if (params.get("error")) return fail(params.get("error") === "access_denied" ? "cancelled" : "failed");
  const code = params.get("code") ?? "";
  // Both halves must agree: the state in the address came back from Google, the one in the cookie is this browser's.
  if (!state || !code || code.length > 2000 || !secretsMatch(params.get("state") ?? "", state.state)) return fail("failed");
  if (!(await googleAvailable())) return fail("off");

  const profile = await exchangeGoogleCode(req, code, state);
  if (!profile) return fail("failed");
  const account = await accountForGoogle(profile, { trialEndsAt: state.trialEndsAt, referral: state.referral });
  if (!account.ok) return fail(account.reason);

  const { token, maxAge } = await createSession(account.parentId, account.familyId, req);
  // A heads-up for the parent; a failed email never blocks signing in.
  const origin = appOrigin(req);
  if (account.linked) await sendEmail(googleLinkedEmail(account.email, origin));
  else if (!account.created) await sendEmail(newSignInEmail(account.email, origin, deviceLabel(req.headers.get("user-agent") ?? "")));
  return done(googleReturnUrl(from, {}), sessionCookie(token, maxAge));
}
