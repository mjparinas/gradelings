import { json } from "@/server/auth";

/**
 * The admin dashboard scans events by time, and Turso bills every row read, so each server instance keeps an
 * answer for a couple of minutes. Saving the costs or importing payments clears it, so those show at once.
 * `STATS_CACHE_MS=0` turns it off (the admin tests read fresh numbers after every change).
 */
const DEFAULT_MS = 2 * 60_000;
const cache = new Map<string, { at: number; body: unknown }>();

export function clearStatsCache() {
  cache.clear();
}

export async function cachedStats(key: string, build: () => Promise<unknown>): Promise<Response> {
  const ttl = process.env.STATS_CACHE_MS === undefined ? DEFAULT_MS : Number(process.env.STATS_CACHE_MS);
  const hit = cache.get(key);
  if (ttl > 0 && hit && Date.now() - hit.at < ttl) return json(hit.body);
  const body = await build();
  if (ttl > 0) cache.set(key, { at: Date.now(), body });
  return json(body);
}
