import { error, getSession, json, readJson, sameOrigin } from "@/server/auth";
import { query } from "@/server/db";
import { isFlagOn } from "@/server/flags";
import { getFamilyRow } from "@/server/family";
import { removeSubscription, saveSubscription, validSubscription, vapidPublicKey } from "@/server/push";
import { countryOf, toCountryCode } from "@/lib/country";

// Notifications on a device. A signed-in parent switches them on for their own device ("parent") or for a child who
// uses this device ("child"); children never see a permission prompt. Class student accounts can't (no parent area).

export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const key = vapidPublicKey();
  return json({ enabled: Boolean(key) && (await isFlagOn("push-notifications", session.familyId)), publicKey: key });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  if (!vapidPublicKey() || !(await isFlagOn("push-notifications", session.familyId))) return error(404, "Notifications aren't available");
  const body = ((await readJson(req)) ?? {}) as { subscription?: unknown; kind?: unknown; profileId?: unknown };
  if (!validSubscription(body.subscription) || (body.kind !== "parent" && body.kind !== "child")) return error(400, "Bad request");
  if (!session.verified) return error(403, "Please confirm your email first.");
  let profileId: string | undefined;
  if (body.kind === "child") {
    if (typeof body.profileId !== "string") return error(400, "Bad request");
    const own = await query<{ id: string }>("SELECT id FROM profiles WHERE id = ? AND family_id = ?", [body.profileId, session.familyId]);
    if (!own[0]) return error(404, "No such child");
    profileId = body.profileId;
    // A US family's children are only synced once a parent has given consent, and the same goes for notifications.
    const family = await getFamilyRow(session.familyId);
    if (family && countryOf(toCountryCode(family.country)).parentalConsent && !family.consent_at) return error(403, "A grown-up needs to give consent first.");
  }
  await saveSubscription({ familyId: session.familyId, parentId: session.parentId, kind: body.kind, profileId, subscription: body.subscription });
  return json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const body = ((await readJson(req)) ?? {}) as { endpoint?: unknown };
  if (typeof body.endpoint !== "string") return error(400, "Bad request");
  await removeSubscription(session.familyId, body.endpoint);
  return json({ ok: true });
}
