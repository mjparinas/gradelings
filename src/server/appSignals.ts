import "server-only";
import { APP_HEADER, type AppKind, type PaywallKind } from "@/lib/appSignals";
import { query, run } from "./db";

// Which app a family syncs from, and that a locked part was shown to it. Family-level only: no child, unit or answer is
// kept. Both are deleted with the family (`deleteFamilyData`).

const DAY = 86_400_000;
const COLUMN: Record<AppKind, string> = { web: "app_web_at", android: "app_android_at", ios: "app_ios_at" };

/** The kind of app a request came from; anything unexpected is the web. */
export function appOf(req: Request): AppKind {
  const v = req.headers.get(APP_HEADER);
  return v === "android" || v === "ios" ? v : "web";
}

/** Notes that this family synced from this kind of app, at most twice a day. */
export async function recordApp(familyId: string, app: AppKind, now = Date.now()): Promise<void> {
  const col = COLUMN[app];
  await run(`UPDATE families SET ${col} = ? WHERE id = ? AND COALESCE(${col}, 0) < ?`, [now, familyId, now - DAY / 2]);
}

/** Notes that a locked part was shown: the first time, the last time and on how many days. */
export async function recordPaywallSeen(familyId: string, kind: PaywallKind, now = Date.now()): Promise<void> {
  const day = Math.floor(now / DAY);
  await run(
    `INSERT INTO paywall_seen (family_id, kind, first_at, last_at, days) VALUES (?, ?, ?, ?, 1)
     ON CONFLICT (family_id, kind) DO UPDATE SET days = days + CASE WHEN CAST(last_at / ${DAY} AS INTEGER) < ? THEN 1 ELSE 0 END, last_at = excluded.last_at`,
    [familyId, kind, now, now, day],
  );
}

export const paywallRows = (since: number) =>
  query<{ family_id: string; kind: string; first_at: number; days: number }>("SELECT family_id, kind, first_at, days FROM paywall_seen WHERE first_at >= ?", [since]);
