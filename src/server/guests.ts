import "server-only";
import { createHash } from "node:crypto";
import { query, run } from "./db";

// Guest players: children playing on a device with no parent account. Their practice never reaches the server, so the
// only trace is this count. When the kids' app is opened on such a device it says so once a day (`/api/guests/seen/`),
// and we keep a one-way hash of the device's random id with the last UTC day it played. Nothing about any child.
// Active means played in the last 30 UTC days, today included, as the dashboard's practice chart counts days.

const DAY = 86_400_000;
export const GUEST_ACTIVE_DAYS = 30;
/** A little longer than the window, so a device's last day is still there when it falls out of it. */
export const GUEST_KEEP_DAYS = 35;

const today = (now: number) => Math.floor(now / DAY);
/** A device id is 24 hex characters made on the device; this is not a cryptographic secret, so a plain hash does. */
export const guestHash = (deviceId: string) => createHash("sha256").update(`guest-device:${deviceId}`).digest("hex");

export async function recordGuest(deviceId: string, now = Date.now()): Promise<void> {
  await run(
    `INSERT INTO guest_devices (device_hash, last_day) VALUES (?, ?)
     ON CONFLICT(device_hash) DO UPDATE SET last_day = MAX(last_day, excluded.last_day)`,
    [guestHash(deviceId), today(now)],
  );
}

/** A device that now has an account is not a guest any more. */
export async function forgetGuest(deviceId: string): Promise<void> {
  await run("DELETE FROM guest_devices WHERE device_hash = ?", [guestHash(deviceId)]);
}

/** Devices that played today, in the last 7 days and in the last 30: the dashboard tile and its list both read this. */
export async function guestCounts(now = Date.now()): Promise<{ d1: number; d7: number; d30: number }> {
  const t = today(now);
  const [r] = await query<{ d1: number | null; d7: number | null; d30: number | null }>(
    `SELECT SUM(last_day >= ?) AS d1, SUM(last_day >= ?) AS d7, SUM(last_day >= ?) AS d30 FROM guest_devices WHERE last_day <= ?`,
    [t, t - 6, t - (GUEST_ACTIVE_DAYS - 1), t],
  );
  return { d1: Number(r?.d1 ?? 0), d7: Number(r?.d7 ?? 0), d30: Number(r?.d30 ?? 0) };
}

/** How many active devices last played on each day, newest first. */
export async function guestLastPlayed(now = Date.now()): Promise<{ day: number; devices: number }[]> {
  const t = today(now);
  return (
    await query<{ last_day: number; n: number }>("SELECT last_day, COUNT(*) AS n FROM guest_devices WHERE last_day >= ? AND last_day <= ? GROUP BY last_day ORDER BY last_day DESC", [t - (GUEST_ACTIVE_DAYS - 1), t])
  ).map((r) => ({ day: Number(r.last_day), devices: Number(r.n) }));
}

export async function pruneGuests(now = Date.now()): Promise<void> {
  await run("DELETE FROM guest_devices WHERE last_day < ?", [today(now) - GUEST_KEEP_DAYS]);
}
