import { error, getSession, json, rateLimited, readJson, sameOrigin } from "@/server/auth";
import { INVITE_TTL, MAX_CO_TEACHERS } from "@/server/classroom";
import { query, run } from "@/server/db";

// Invitations to co-teach a class. They belong to an email address: only the signed-in, confirmed
// account with that address can see, accept or decline them.

interface InviteRow {
  class_id: string;
  name: string;
  grade: string;
  framework: string;
  invited_by: string;
  created_at: number;
}

async function invitesFor(email: string, now: number): Promise<InviteRow[]> {
  return query<InviteRow>(
    `SELECT i.class_id, c.name, c.grade, c.framework, i.invited_by, i.created_at FROM class_invites i
     JOIN classes c ON c.id = i.class_id AND c.closed_at IS NULL
     WHERE i.email = ? AND i.created_at > ? ORDER BY i.created_at`,
    [email.toLowerCase(), now - INVITE_TTL],
  );
}

export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  if (!session.verified) return json({ invites: [] });
  const rows = await invitesFor(session.email, Date.now());
  const out = [];
  for (const r of rows) {
    const owner = (await query<{ email: string }>("SELECT email FROM parents WHERE id = ?", [r.invited_by]))[0];
    out.push({ classId: r.class_id, name: r.name, grade: r.grade, framework: r.framework, from: owner?.email ?? "", createdAt: Number(r.created_at) });
  }
  return json({ invites: out });
}

/** Accepts an invitation (body: classId). */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  if (!session.verified) return error(403, "Please confirm your email first. Co-teachers see children's first names and results, so we only allow it for confirmed accounts.");
  if (await rateLimited(`invite:${session.parentId}`, 30, 60 * 60_000)) return error(429, "Too many attempts. Try again later.");
  const body = (await readJson(req)) as { classId?: unknown } | null;
  const classId = typeof body?.classId === "string" ? body.classId : "";
  const invite = (await invitesFor(session.email, Date.now())).find((r) => r.class_id === classId);
  if (!invite) return error(404, "That invitation is no longer open.");
  const owner = (await query<{ owner_parent_id: string }>("SELECT owner_parent_id FROM classes WHERE id = ?", [classId]))[0];
  const team = Number((await query<{ n: number }>("SELECT COUNT(*) AS n FROM class_teachers WHERE class_id = ?", [classId]))[0].n);
  if (team >= MAX_CO_TEACHERS) return error(409, "This class already has the most co-teachers it can have.");
  if (owner?.owner_parent_id !== session.parentId) {
    await run("INSERT OR IGNORE INTO class_teachers (class_id, parent_id, joined_at) VALUES (?, ?, ?)", [classId, session.parentId, Date.now()]);
  }
  await run("DELETE FROM class_invites WHERE class_id = ? AND email = ?", [classId, session.email.toLowerCase()]);
  // Joining counts as a sign-in for the class's inactivity period.
  await run("UPDATE classes SET last_activity_at = ?, inactive_warning_at = NULL WHERE id = ? AND closed_at IS NULL", [Date.now(), classId]);
  return json({ ok: true, classId });
}

/** Declines an invitation (?classId=). */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return error(403, "Bad origin");
  const session = await getSession(req);
  if (!session) return error(401, "Not signed in");
  const classId = new URL(req.url).searchParams.get("classId") ?? "";
  await run("DELETE FROM class_invites WHERE class_id = ? AND email = ?", [classId, session.email.toLowerCase()]);
  return json({ ok: true });
}
