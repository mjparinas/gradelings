import "server-only";
import { MAINTENANCE_CACHE_MS } from "@/lib/maintenance";
import { query, run } from "./db";

// The maintenance switch, kept in admin_settings. src/proxy.ts reads it on every page request, so each
// server keeps the answer for MAINTENANCE_CACHE_MS; switching it on or off clears this server's copy at once
// and the others pick it up within that time. The copy lives on globalThis so the proxy and the route
// handlers share it when they run in one process.

const KEY = "maintenance";

export interface MaintenanceState {
  on: boolean;
  /** When it was switched on (ms), or null while it is off. */
  since: number | null;
}

const OFF: MaintenanceState = { on: false, since: null };

type Cache = { at: number; state: MaintenanceState } | null;
const holder = globalThis as unknown as { __maintenance?: Cache };

export async function getMaintenance(): Promise<MaintenanceState> {
  const row = (await query<{ value: string }>("SELECT value FROM admin_settings WHERE key = ?", [KEY]))[0];
  if (!row) return OFF;
  try {
    const v = JSON.parse(String(row.value)) as { on?: unknown; since?: unknown };
    return v.on === true ? { on: true, since: typeof v.since === "number" ? v.since : null } : OFF;
  } catch {
    return OFF;
  }
}

export async function setMaintenance(on: boolean, now = Date.now()): Promise<MaintenanceState> {
  const state: MaintenanceState = on ? { on: true, since: now } : OFF;
  await run(
    "INSERT INTO admin_settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
    [KEY, JSON.stringify(state), now],
  );
  holder.__maintenance = { at: now, state };
  return state;
}

/**
 * Whether maintenance mode is on, read at most once per MAINTENANCE_CACHE_MS. If the database can't be
 * read, the site stays open: a database problem must not take every page down.
 */
export async function maintenanceOn(now = Date.now()): Promise<boolean> {
  const hit = holder.__maintenance;
  if (hit && now - hit.at < MAINTENANCE_CACHE_MS) return hit.state.on;
  try {
    const state = await getMaintenance();
    holder.__maintenance = { at: now, state };
    return state.on;
  } catch (e) {
    console.error("[maintenance] couldn't read the switch", (e as Error).message);
    holder.__maintenance = { at: now, state: hit?.state ?? OFF };
    return hit?.state.on ?? false;
  }
}

/** For tests. */
export function clearMaintenanceCache() {
  holder.__maintenance = null;
}
