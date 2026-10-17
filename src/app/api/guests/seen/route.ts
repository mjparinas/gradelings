import { clientIp, error, getSession, json, rateLimited, sameOrigin } from "@/server/auth";
import { forgetGuest, recordGuest } from "@/server/guests";

const DEVICE = /^[A-Za-z0-9_-]{8,64}$/;

/**
 * The kids' app on a device with no parent account says it was played today (once a day), so the admin
 * dashboard can count guest players. Only the device's random id is sent; the server keeps a one-way hash of it
 * and the day. A signed-in parent or class student session is not a guest: it is ignored (and a device that
 * signed in is forgotten).
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const body = (await req.json().catch(() => null)) as { d?: unknown } | null;
  const d = typeof body?.d === "string" && DEVICE.test(body.d) ? body.d : null;
  if (!d) return error(400, "Bad request");
  if (await rateLimited(`guest:${clientIp(req)}`, 60, 60 * 60_000)) return error(429, "Try again later.");
  if (await getSession(req, { student: true })) {
    await forgetGuest(d);
    return json({ ok: true });
  }
  await recordGuest(d);
  return json({ ok: true });
}
