import { appOrigin, clientIp, getSession, rateLimited } from "@/server/auth";
import { ROSTER_STATE_SECONDS, encodeRosterState, newRosterState, providerConfigured, rosterAccessFor, rosterAuthUrl, rosterStateCookieValue } from "@/server/rostering";
import { isRosterProvider, rosterReturnUrl, type RosterError } from "@/lib/rostering";

/** Starts "Import from …": remembers this sign-in in a short-lived cookie and sends the browser to the provider. */
export async function GET(req: Request) {
  const back = (error: RosterError) => Response.redirect(new URL(rosterReturnUrl({ error }), appOrigin(req)), 303);
  const provider = new URL(req.url).searchParams.get("provider");
  if (!isRosterProvider(provider)) return back("failed");
  const session = await getSession(req);
  // Only a signed-in teacher with a confirmed email: the page they land on after the provider reads their classes.
  if (!session || !session.verified) return back("failed");
  if (await rateLimited(`roster:${clientIp(req)}`, 20)) return back("slow");
  const access = await rosterAccessFor(session.familyId);
  if (access === "plan") return back("plan");
  if (access === "off" || !providerConfigured(provider)) return back("off");
  const state = newRosterState(provider, session.parentId);
  return new Response(null, {
    status: 303,
    headers: { location: rosterAuthUrl(req, state), "set-cookie": rosterStateCookieValue(encodeRosterState(state), ROSTER_STATE_SECONDS), "cache-control": "no-store" },
  });
}
