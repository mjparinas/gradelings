import "server-only";
import { error, getSession, sameOrigin, type SessionInfo } from "./auth";
import { query, run } from "./db";

// The site-wide admin panel (/admin/). An admin is an ordinary account whose confirmed email is listed in
// ADMIN_EMAILS (comma-separated). The list lives in the environment, not the database, so nothing a
// request can write ever makes someone an admin. Without ADMIN_EMAILS the panel and its API are off.

export function adminEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.includes("@")),
  );
}

/** The signed-in admin, or null. A student session, an unconfirmed email or an unlisted one is never an admin. */
export async function getAdmin(req: Request): Promise<SessionInfo | null> {
  const allowed = adminEmails();
  if (!allowed.size) return null;
  const session = await getSession(req);
  if (!session || !session.verified || !allowed.has(session.email.toLowerCase())) return null;
  return session;
}

/**
 * Guards an admin route. Answers 404 for anyone who isn't an admin, so the API doesn't advertise itself,
 * and refuses cross-site requests that change something.
 */
export async function requireAdmin(req: Request): Promise<{ admin: SessionInfo } | { response: Response }> {
  if (req.method !== "GET" && !sameOrigin(req)) return { response: error(403, "Bad origin") };
  const admin = await getAdmin(req);
  if (!admin) return { response: error(404, "Not found") };
  return { admin };
}

/** Records a change made in the admin panel. */
export async function audit(admin: string, action: string, target: string | null, detail?: unknown): Promise<void> {
  await run("INSERT INTO admin_audit (at, admin, action, target, detail) VALUES (?, ?, ?, ?, ?)", [
    Date.now(),
    admin,
    action,
    target,
    detail === undefined ? null : JSON.stringify(detail).slice(0, 2000),
  ]);
}

export interface AuditEntry {
  id: number;
  at: number;
  admin: string;
  action: string;
  target: string | null;
  detail: string | null;
}

export async function auditLog(limit = 200): Promise<AuditEntry[]> {
  const rows = await query<AuditEntry>("SELECT id, at, admin, action, target, detail FROM admin_audit ORDER BY id DESC LIMIT ?", [limit]);
  return rows.map((r) => ({ id: Number(r.id), at: Number(r.at), admin: String(r.admin), action: String(r.action), target: r.target ?? null, detail: r.detail ?? null }));
}
