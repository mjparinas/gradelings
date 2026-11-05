import { isPaywallKind } from "@/lib/appSignals";
import { error, getSession, json, rateLimited, readJson, sameOrigin } from "@/server/auth";
import { recordPaywallSeen } from "@/server/appSignals";

/**
 * A signed-in grown-up's device says a locked part (a unit the free plan keeps closed, or a members-only part of the
 * reports) was shown to it. Kept as a count of days per kind for the family, for the admin panel; nothing about a
 * child, a unit or an answer is sent. Class student sessions are ignored.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = (await readJson(req)) as { kind?: unknown } | null;
  if (!isPaywallKind(body?.kind)) return error(400, "Bad request");
  if (await rateLimited(`paywall:${session.familyId}`, 30, 60 * 60_000)) return json({ ok: true });
  await recordPaywallSeen(session.familyId, body.kind);
  return json({ ok: true });
}
