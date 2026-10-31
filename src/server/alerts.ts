import "server-only";
import { adminEmails } from "./admin";
import { queueItems, QUEUE_KINDS, type QueueKind } from "./adminQueue";
import { query } from "./db";
import { sendEmail } from "./email";
import { alertEmail } from "./emailTemplates";
import { getSetting, setSetting } from "./payments";
import { recordStaffFailure, STAFF_ALERT_KEY, staffFailuresSince, type StaffStep } from "./staffSignIns";
import { systemReport } from "./systemHealth";
import { staffEmails } from "./admin";
import { STAFF_FLOOD } from "@/lib/systemHealth";

// Email to the owner: instant alerts (a payment failed, a dispute, the daily job failed, a System check went
// down) and a morning digest from the daily job. They go only to confirmed accounts listed in ADMIN_EMAILS.
// Each kind of alert is sent at most once every few hours, so a flapping service doesn't flood the inbox.

const DAY = 86_400_000;
const HOUR = 3_600_000;
/** The same alert is sent at most this often. */
export const ALERT_GAP = 6 * HOUR;

export interface AlertSettings {
  /** Alerts the moment something goes wrong. */
  instant: boolean;
  /** The morning digest from the daily job. */
  digest: boolean;
}

export async function alertSettings(): Promise<AlertSettings> {
  try {
    const s = JSON.parse((await getSetting("alerts")) ?? "{}") as Partial<AlertSettings>;
    return { instant: s.instant !== false, digest: s.digest !== false };
  } catch {
    return { instant: true, digest: true };
  }
}

export async function saveAlertSettings(s: AlertSettings): Promise<void> {
  await setSetting("alerts", JSON.stringify(s));
}

/** The admin accounts alerts go to: listed in ADMIN_EMAILS and confirmed. */
export async function adminRecipients(): Promise<string[]> {
  const allowed = adminEmails();
  if (!allowed.size) return [];
  const rows = await query<{ email: string }>("SELECT email FROM parents WHERE email_verified_at IS NOT NULL AND role != 'student'");
  return rows.map((r) => String(r.email)).filter((e) => allowed.has(e.toLowerCase()));
}

const originOf = (fallback?: string) => (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "") || fallback || "http://localhost:3000";

/**
 * Sends an alert to every admin, unless alerts are off or the same alert (`key`) went out in the last few hours.
 * Never throws: an alert failing must not break the webhook or job that raised it.
 */
export async function sendAlert(key: string, a: { subject: string; lines: string[]; path?: string }, now = Date.now(), origin?: string): Promise<boolean> {
  try {
    if (!(await alertSettings()).instant) return false;
    const last = Number((await getSetting(`alert-sent:${key}`)) ?? 0);
    if (last && now - last < ALERT_GAP) return false;
    const to = await adminRecipients();
    if (!to.length) return false;
    await setSetting(`alert-sent:${key}`, String(now));
    for (const t of to) await sendEmail(alertEmail(t, originOf(origin), { subject: `Alert: ${a.subject}`, heading: a.subject, lines: a.lines, path: a.path }));
    return true;
  } catch (e) {
    console.error("[alert] could not send", (e as Error).message);
    return false;
  }
}

/**
 * Notes a failed sign-in to an admin or support account (other addresses are ignored) and alerts the admins when
 * several fail within a few minutes. Never throws: the sign-in answer must not depend on it.
 */
export async function reportStaffFailure(email: string, step: StaffStep, now = Date.now(), origin?: string): Promise<void> {
  try {
    if (!staffEmails().has(email.toLowerCase())) return;
    await recordStaffFailure(email, step, now);
    const recent = await staffFailuresSince(now - STAFF_FLOOD.windowMs);
    if (recent.total < STAFF_FLOOD.count) return;
    await sendAlert(
      STAFF_ALERT_KEY,
      {
        subject: "Repeated failed admin sign-ins",
        lines: [`${recent.total} sign-ins to admin or support accounts failed in the last ${STAFF_FLOOD.windowMs / 60_000} minutes.`, "If that wasn't you, check the Admin Security card on the System tab."],
        path: "/admin/?tab=System",
      },
      now,
      origin,
    );
  } catch (e) {
    console.error("[alert] could not note a failed staff sign-in", (e as Error).message);
  }
}

/** A link to one family's page in the admin panel. */
export const familyPath = (familyId: string) => `/admin/?family=${encodeURIComponent(familyId)}`;

/** Alerts when a System check goes down, and says so again once it's working. Run by `/api/cron/watch/`. */
export async function watchSystem(now = Date.now(), origin?: string): Promise<{ down: string[]; alerted: boolean }> {
  const report = await systemReport({ refresh: true, now });
  const down = report.checks.filter((c) => c.state === "down");
  const before = new Set<string>(JSON.parse((await getSetting("alert:down")) ?? "[]") as string[]);
  const now_ = new Set(down.map((c) => c.id));
  const fresh = down.filter((c) => !before.has(c.id));
  const recovered = [...before].filter((id) => !now_.has(id));
  await setSetting("alert:down", JSON.stringify([...now_]));
  let alerted = false;
  if (fresh.length) {
    alerted = await sendAlert(
      `down:${fresh.map((c) => c.id).sort().join(",")}`,
      { subject: `${fresh.map((c) => c.title).join(", ")} ${fresh.length === 1 ? "is" : "are"} down`, lines: fresh.map((c) => `${c.title}: ${c.summary}`), path: "/admin/?tab=System" },
      now,
      origin,
    );
  }
  if (recovered.length) {
    const titles = recovered.map((id) => report.checks.find((c) => c.id === id)?.title ?? id);
    alerted =
      (await sendAlert(`up:${recovered.sort().join(",")}`, { subject: `${titles.join(", ")} working again`, lines: titles.map((t) => `${t} is working again.`), path: "/admin/?tab=System" }, now, origin)) ||
      alerted;
  }
  return { down: [...now_], alerted };
}

/** What the morning digest says. Pure counts and account emails: never children's names or results. */
export async function digestLines(now = Date.now()): Promise<{ subject: string; lines: string[] }> {
  const since = now - DAY;
  const [items, report, counts] = await Promise.all([
    queueItems(now),
    systemReport({ refresh: true, now }).catch(() => null),
    query<{ signups: number; paid: number; revenue: number | null; cancelled: number }>(
      `SELECT
         (SELECT COUNT(*) FROM families f WHERE f.created_at > ? AND NOT EXISTS (SELECT 1 FROM parents s WHERE s.family_id = f.id AND s.role = 'student')) AS signups,
         (SELECT COUNT(DISTINCT family_id) FROM payments WHERE paid_at > ?) AS paid,
         (SELECT SUM(amount - refunded) FROM payments WHERE paid_at > ?) AS revenue,
         (SELECT COUNT(*) FROM families WHERE ((subscription_status = 'canceled' AND plan != 'premium') OR (plan = 'premium' AND cancel_at IS NOT NULL))
            AND COALESCE(cancelled_at, billing_event_at) > ?) AS cancelled`,
      [since, since, since, since],
    ),
  ]);
  const c = counts[0];
  const byKind = new Map<QueueKind, number>();
  for (const i of items) byKind.set(i.kind, (byKind.get(i.kind) ?? 0) + 1);
  const problems = report?.checks.filter((x) => x.state === "down" || x.state === "warn") ?? [];
  const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const lines = [
    `Last 24 hours: ${Number(c?.signups ?? 0)} sign-ups, ${Number(c?.paid ?? 0)} payments (${money(Number(c?.revenue ?? 0))}), ${Number(c?.cancelled ?? 0)} cancellations.`,
    items.length ? `To do: ${items.length} item${items.length === 1 ? "" : "s"}.` : "To do: nothing waiting.",
    ...[...byKind].map(([k, n]) => `• ${QUEUE_KINDS[k]}: ${n}`),
    problems.length ? `System: ${problems.map((p) => `${p.title} (${p.state === "down" ? "down" : "needs a look"})`).join(", ")}.` : report ? "System: everything is working." : "System: couldn't be checked.",
  ];
  const subject = `${items.length} to do${problems.length ? `, ${problems.length} system ${problems.length === 1 ? "problem" : "problems"}` : ""}`;
  return { subject, lines };
}

/** The morning digest, sent by the daily job unless the owner turned it off. */
export async function sendDigest(origin: string, now = Date.now()): Promise<number> {
  if (!(await alertSettings()).digest) return 0;
  const to = await adminRecipients();
  if (!to.length) return 0;
  const d = await digestLines(now);
  let sent = 0;
  for (const t of to) if ((await sendEmail(alertEmail(t, origin, { subject: `Today: ${d.subject}`, heading: "Your morning digest", lines: d.lines, path: "/admin/?tab=To%20Do" }))).ok) sent++;
  return sent;
}

