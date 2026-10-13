import { appOrigin, error, getSession, json, sameOrigin } from "@/server/auth";
import { recordConsent, revokeConsent } from "@/server/consent";
import { getFamilyRow, toFamilyInfo } from "@/server/family";

/**
 * US parental consent from the Parent area (src/lib/coppa.ts): `{ agree: true }` after the parent ticked the
 * notice, or `{ withdraw: true }`, which deletes the children's information from the server. Only US families.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Please sign in first.");
  const row = await getFamilyRow(session.familyId);
  if (!row || row.country !== "US") return error(400, "Only families in the United States are asked for this permission.");
  const body = (await req.json().catch(() => null)) as { agree?: unknown; withdraw?: unknown } | null;
  if (body?.withdraw === true) await revokeConsent(session.familyId);
  else if (body?.agree === true) await recordConsent(session.familyId, "email-plus", session.email, appOrigin(req));
  else return error(400, "Please tick the box to agree.");
  const fresh = await getFamilyRow(session.familyId);
  return json({ family: toFamilyInfo(fresh!, session.email, session.verified) });
}
