import { createHash } from "node:crypto";
import webpush from "web-push";
import { query, run } from "@/server/db";

// Web Push to a parent's device or to a child's device that a parent switched on. The browser's own push service
// delivers it (Google, Apple or Mozilla, whichever the browser uses); we keep only the push address and its keys.
// A message holds a short sentence and a link, never a child's results. VAPID keys come from the environment:
// without them nothing is sent and the Account panel doesn't offer notifications.

export type PushKind = "parent" | "child";

export interface PushSubscriptionInput {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

export interface PushMessage {
  title: string;
  body: string;
  /** A path in this site to open when the notification is tapped. */
  url: string;
  /** Replaces an earlier notification with the same tag. */
  tag: string;
  /** The number to show on the app icon. */
  badge?: number;
}

export function vapidPublicKey(): string | null {
  return process.env.VAPID_PUBLIC_KEY || null;
}

function configured(): boolean {
  return Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
}

export const hashEndpoint = (endpoint: string) => createHash("sha256").update(endpoint).digest("hex");

/** A subscription from a browser: an https address with two keys, and nothing else. */
export function validSubscription(s: unknown): s is PushSubscriptionInput {
  const x = s as PushSubscriptionInput | null;
  if (!x || typeof x.endpoint !== "string" || x.endpoint.length > 1000 || !x.keys) return false;
  if (typeof x.keys.p256dh !== "string" || typeof x.keys.auth !== "string" || x.keys.p256dh.length > 200 || x.keys.auth.length > 100) return false;
  try {
    return new URL(x.endpoint).protocol === "https:";
  } catch {
    return false;
  }
}

export async function saveSubscription(opts: { familyId: string; parentId: string; kind: PushKind; profileId?: string; subscription: PushSubscriptionInput; now?: number }): Promise<void> {
  const { subscription: s } = opts;
  await run(
    `INSERT INTO push_devices (endpoint_hash, family_id, parent_id, kind, profile_id, endpoint, p256dh, auth, created_at, last_day)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
     ON CONFLICT(endpoint_hash) DO UPDATE SET family_id = excluded.family_id, parent_id = excluded.parent_id, kind = excluded.kind, profile_id = excluded.profile_id, p256dh = excluded.p256dh, auth = excluded.auth`,
    [hashEndpoint(s.endpoint), opts.familyId, opts.parentId, opts.kind, opts.kind === "child" ? (opts.profileId ?? null) : null, s.endpoint, s.keys.p256dh, s.keys.auth, opts.now ?? Date.now()],
  );
}

export async function removeSubscription(familyId: string, endpoint: string): Promise<void> {
  await run("DELETE FROM push_devices WHERE endpoint_hash = ? AND family_id = ?", [hashEndpoint(endpoint), familyId]);
}

export interface StoredSubscription {
  endpoint_hash: string;
  family_id: string;
  parent_id: string;
  kind: PushKind;
  profile_id: string | null;
  endpoint: string;
  p256dh: string;
  auth: string;
  last_day: string | null;
}

export async function subscriptionsOf(familyId: string): Promise<StoredSubscription[]> {
  return query<StoredSubscription>("SELECT * FROM push_devices WHERE family_id = ?", [familyId]);
}

/** Every family that has a subscription, for the daily job (a scan of this small table is fine there). */
export async function familiesWithPush(): Promise<string[]> {
  return (await query<{ family_id: string }>("SELECT DISTINCT family_id FROM push_devices")).map((r) => r.family_id);
}

export type SendResult = "sent" | "gone" | "failed" | "skipped";

/** Sends one message to one device. A subscription the browser reports as gone (404 or 410) is deleted. */
export async function sendPush(sub: StoredSubscription, message: PushMessage, day: string): Promise<SendResult> {
  if (!configured() || sub.last_day === day) return "skipped";
  try {
    webpush.setVapidDetails(process.env.VAPID_SUBJECT || `mailto:${process.env.CONTACT_EMAIL || "hello@gradelings.com"}`, process.env.VAPID_PUBLIC_KEY!, process.env.VAPID_PRIVATE_KEY!);
    await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, JSON.stringify(message), { TTL: 12 * 3600 });
    await run("UPDATE push_devices SET last_day = ? WHERE endpoint_hash = ?", [day, sub.endpoint_hash]);
    return "sent";
  } catch (e) {
    const status = (e as { statusCode?: number }).statusCode;
    if (status === 404 || status === 410) {
      await run("DELETE FROM push_devices WHERE endpoint_hash = ?", [sub.endpoint_hash]);
      return "gone";
    }
    console.error("[push] send failed", status ?? (e as Error).message);
    return "failed";
  }
}
