import { getSession, json } from "@/server/auth";
import { adminEmails } from "@/server/admin";
import { flagsFor, variantsFor } from "@/server/flags";
import { forgetGuest } from "@/server/guests";

const DEVICE = /^[A-Za-z0-9_-]{8,64}$/;

/**
 * Feature flags and A/B test variants for this device: by family when a parent is signed in, otherwise by
 * the device's own random id (`?d=`), so partial rollouts also reach signed-out devices. Class student
 * sessions count as signed out, so nothing about a student is recorded.
 *
 * `testCoins` is true only on a device signed in to an admin account (a confirmed email in ADMIN_EMAILS):
 * the owner's own children then have unlimited coins, to try the shop and My Room. Nobody else ever gets it.
 */
export async function GET(req: Request) {
  const session = await getSession(req);
  const d = new URL(req.url).searchParams.get("d") ?? "";
  const device = DEVICE.test(d) ? d : null;
  const familyId = session?.familyId ?? null;
  // A device that has signed in to an account is no longer a guest player (see /api/guests/seen/).
  if (device && session) await forgetGuest(device);
  const [flags, variants] = await Promise.all([flagsFor(familyId, device), variantsFor(familyId, device)]);
  const testCoins = Boolean(session?.verified && adminEmails().has(session.email.toLowerCase()));
  return json({ flags, variants, ...(testCoins ? { testCoins } : {}) });
}
