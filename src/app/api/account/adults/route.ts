import { appOrigin, clearCookie, error, getSession, json, rateLimited, readJson, sameOrigin } from "@/server/auth";
import { sendEmail } from "@/server/email";
import { familyInviteEmail } from "@/server/emailTemplates";
import { cancelAdultInvite, createAdultInvite, listAdults, removeAdult } from "@/server/familyAdults";

// The second adult(s) on a family. Only the owner invites or removes; any adult can leave.

export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  if (!session.owner) return json({ owner: false, adults: [], invites: [] });
  return json({ owner: true, ...(await listAdults(session.familyId)) });
}

/** Invites an adult (body: email). The answer is the same whether or not the address already has an account. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  if (!session.owner) return error(403, "Only the person who made the family account can invite another adult.");
  if (!session.verified) return error(403, "Please confirm your email first. Another adult sees your children's first names and practice.");
  if (await rateLimited(`adult-invite:${session.parentId}`, 10, 60 * 60_000)) return error(429, "Too many invitations. Try again later.");
  const body = (await readJson(req)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return error(400, "Please enter a valid email.");
  if (email === session.email.toLowerCase()) return error(400, "That's your own email address.");
  const made = await createAdultInvite(session.familyId, session.parentId, email);
  if ("error" in made) return error(409, made.error);
  await sendEmail(familyInviteEmail(email, appOrigin(req), made.token, session.email));
  return json({ ok: true, ...(await listAdults(session.familyId)) });
}

/** Cancels an invitation (?email=) or removes an adult (?id=). The owner may do either; an adult may remove only themselves. */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const url = new URL(req.url);
  const rawId = url.searchParams.get("id");
  const id = rawId === "me" ? session.parentId : rawId;
  const email = url.searchParams.get("email")?.trim().toLowerCase();
  if (email) {
    if (!session.owner) return error(403, "Only the person who made the family account can do that.");
    await cancelAdultInvite(session.familyId, email);
    return json({ ok: true, ...(await listAdults(session.familyId)) });
  }
  if (!id) return error(400, "Say who to remove.");
  if (!session.owner && id !== session.parentId) return error(403, "You can only remove yourself.");
  if (id === session.parentId && session.owner) return error(400, "The family's owner can't leave. Delete the account instead.");
  const gone = await removeAdult(session.familyId, id);
  if (!gone) return error(404, "That adult isn't in this family.");
  if (id === session.parentId) return json({ ok: true }, { cookie: clearCookie() });
  return json({ ok: true, ...(await listAdults(session.familyId)) });
}

export const dynamic = "force-dynamic";
