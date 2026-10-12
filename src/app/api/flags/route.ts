import { getSession, json } from "@/server/auth";
import { flagsFor, variantsFor } from "@/server/flags";

const DEVICE = /^[A-Za-z0-9_-]{8,64}$/;

/**
 * Feature flags and A/B test variants for this device: by family when a parent is signed in, otherwise by
 * the device's own random id (`?d=`), so partial rollouts also reach signed-out devices. Class student
 * sessions count as signed out, so nothing about a student is recorded.
 */
export async function GET(req: Request) {
  const session = await getSession(req);
  const d = new URL(req.url).searchParams.get("d") ?? "";
  const device = DEVICE.test(d) ? d : null;
  const familyId = session?.familyId ?? null;
  const [flags, variants] = await Promise.all([flagsFor(familyId, device), variantsFor(familyId, device)]);
  return json({ flags, variants });
}
