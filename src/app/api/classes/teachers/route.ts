import { appOrigin, error, getSession, json, rateLimited, readJson, sameOrigin } from "@/server/auth";
import { INVITE_TTL, MAX_CO_TEACHERS, MAX_PENDING_INVITES, ownedClass, teachingClass } from "@/server/classroom";
import { query, run } from "@/server/db";
import { sendEmail } from "@/server/email";
import { classInviteEmail } from "@/server/emailTemplates";

// Co-teachers. The owner invites another teacher by email; the invitee accepts under /api/classes/invites/.
// The owner alone invites, removes co-teachers and can close the class. A co-teacher can leave at any time.

const EMAIL = /^[^\s@<>"]{1,64}@[^\s@<>"]{1,255}$/;

/** Invites a teacher by email (owner only). The reply is the same whether or not an account exists. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  if (!session.verified) return error(403, "Please confirm your email first.");
  const body = (await readJson(req)) as { classId?: unknown; email?: unknown } | null;
  const cls = typeof body?.classId === "string" ? await ownedClass(body.classId, session.parentId) : undefined;
  if (!cls) return error(404, "Class not found");
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !EMAIL.test(email)) return error(400, "Type the email address your colleague uses for their account.");
  if (await rateLimited(`coteach:${session.parentId}`, 20, 60 * 60_000)) return error(429, "Too many invitations. Try again later.");

  const now = Date.now();
  const team = Number((await query<{ n: number }>("SELECT COUNT(*) AS n FROM class_teachers WHERE class_id = ?", [cls.id]))[0].n);
  const open = Number((await query<{ n: number }>("SELECT COUNT(*) AS n FROM class_invites WHERE class_id = ? AND created_at > ?", [cls.id, now - INVITE_TTL]))[0].n);
  if (team + open >= MAX_CO_TEACHERS) return error(409, `A class can have up to ${MAX_CO_TEACHERS} co-teachers.`);
  if (open >= MAX_PENDING_INVITES) return error(409, "Too many open invitations.");
  if (email === session.email.toLowerCase()) return error(400, "You already teach this class.");

  // Nothing is revealed about who has an account: the invitation is stored by address, and an email goes
  // out only when a confirmed account has that address. A colleague without an account simply signs up with it.
  await run("INSERT OR REPLACE INTO class_invites (class_id, email, invited_by, created_at) VALUES (?, ?, ?, ?)", [cls.id, email, session.parentId, now]);
  const account = (await query<{ id: string }>("SELECT id FROM parents WHERE email = ? AND role = 'parent' AND email_verified_at IS NOT NULL", [email]))[0];
  if (account) await sendEmail(classInviteEmail(email, appOrigin(req), cls.name, session.email));
  return json({ ok: true });
}

/**
 * Removes a co-teacher (owner: ?classId=&teacherId=), revokes an invitation (owner: ?classId=&invite=email)
 * or leaves the class (co-teacher: ?classId=&leave=1).
 */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const params = new URL(req.url).searchParams;
  const classId = params.get("classId") ?? "";
  if (params.get("leave")) {
    const found = await teachingClass(classId, session.parentId);
    if (!found || found.role !== "co-teacher") return error(404, "Class not found");
    await run("DELETE FROM class_teachers WHERE class_id = ? AND parent_id = ?", [classId, session.parentId]);
    return json({ left: true });
  }
  const cls = await ownedClass(classId, session.parentId);
  if (!cls) return error(404, "Class not found");
  const invite = params.get("invite");
  if (invite) {
    await run("DELETE FROM class_invites WHERE class_id = ? AND email = ?", [cls.id, invite.trim().toLowerCase()]);
    return json({ ok: true });
  }
  const removed = await run("DELETE FROM class_teachers WHERE class_id = ? AND parent_id = ?", [cls.id, params.get("teacherId") ?? ""]);
  return removed ? json({ removed: true }) : error(404, "Co-teacher not found");
}
