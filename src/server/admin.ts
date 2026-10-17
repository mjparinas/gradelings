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

/**
 * Two-step sign-in for admins. "required" (the default): an admin must have an authenticator app set up and
 * must have passed its code at sign-in. "optional" (ADMIN_2FA=optional) lets an admin who hasn't set it up in,
 * for a first rollout or a test server; an admin who has set it up always needs the code.
 */
export function twoFactorMode(): "required" | "optional" {
  return process.env.ADMIN_2FA?.trim().toLowerCase() === "optional" ? "optional" : "required";
}

/** The account if it is on the admin list with a confirmed email and a sign-in made after the confirmation; ignores two-step. */
async function adminCandidate(req: Request): Promise<SessionInfo | null> {
  const allowed = adminEmails();
  if (!allowed.size) return null;
  const session = await getSession(req);
  if (!session || !session.verified || !allowed.has(session.email.toLowerCase())) return null;
  // Only a sign-in made after the email was confirmed. Otherwise someone who signed up with an admin's
  // address before its owner did would become admin the moment the owner clicked the confirmation link.
  if (session.verifiedAt == null || session.createdAt < session.verifiedAt) return null;
  return session;
}

/**
 * The admin who may use the panel, or null. Besides the checks above, the sign-in must have passed the second
 * step (an account that has two-step on can't get in with a password alone, even on a session made some other
 * way, such as after a password reset), and in "required" mode the account must have it on.
 */
export async function getAdmin(req: Request): Promise<SessionInfo | null> {
  const session = await adminCandidate(req);
  if (!session) return null;
  if (session.twoFactor) return session.mfaAt != null ? session : null;
  return twoFactorMode() === "optional" ? session : null;
}

/**
 * An admin account that may reach the two-step setup screens: on the admin list and signed in properly, but not
 * necessarily past the second step yet (an admin who hasn't set it up has no code to give).
 */
export async function getAdminSetup(req: Request): Promise<{ admin: SessionInfo; ready: boolean } | null> {
  const session = await adminCandidate(req);
  if (!session) return null;
  const ready = session.twoFactor ? session.mfaAt != null : twoFactorMode() === "optional";
  return { admin: session, ready };
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
