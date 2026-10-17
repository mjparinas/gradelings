import { appOrigin, clientIp, getSession, rateLimited, secretsMatch } from "@/server/auth";
import { rosterReturnUrl, type RosterError } from "@/lib/rostering";
import { decodeRosterState, readRoster, rosterAccessFor, rosterStateCookie, rosterStateCookieValue, saveImport } from "@/server/rostering";

/** Where the provider sends the browser back to: checks it is the sign-in we started, reads the classes and opens the review page. */
export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const raw = (req.headers.get("cookie") ?? "").split(";").map((p) => p.trim()).find((p) => p.startsWith(`${rosterStateCookie}=`));
  const state = decodeRosterState(raw?.slice(rosterStateCookie.length + 1));
  const done = (location: string) => {
    const headers = new Headers({ location: new URL(location, appOrigin(req)).toString(), "cache-control": "no-store" });
    // The one-use cookie always goes, whatever happened.
    headers.append("set-cookie", rosterStateCookieValue("", 0));
    return new Response(null, { status: 303, headers });
  };
  const fail = (error: RosterError) => done(rosterReturnUrl({ error }));

  if (await rateLimited(`roster-cb:${clientIp(req)}`, 20)) return fail("slow");
  if (params.get("error")) return fail(params.get("error") === "access_denied" ? "cancelled" : "failed");
  const code = params.get("code") ?? "";
  if (!state || !code || code.length > 2000 || !secretsMatch(params.get("state") ?? "", state.state)) return fail("failed");
  // The same teacher who started it, still signed in.
  const session = await getSession(req);
  if (!session || session.parentId !== state.parentId || !session.verified) return fail("failed");
  const access = await rosterAccessFor(session.familyId);
  if (access === "plan") return fail("plan");
  if (access === "off") return fail("off");

  const sections = await readRoster(req, code, state);
  if (!sections) return fail("failed");
  if (!sections.length) return fail("empty");
  return done(rosterReturnUrl({ importId: await saveImport(session.parentId, state.provider, sections) }));
}
