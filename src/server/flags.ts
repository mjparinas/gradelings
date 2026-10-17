import "server-only";
import { FLAGS, flagDef, flagOn, pickVariant, pValue, type Experiment, type ExperimentStatus, type FlagState, type Variant } from "@/lib/flags";
import { query, run } from "./db";

// Stored state for feature flags and A/B tests. The flag list and the rules for who gets what are in
// src/lib/flags.ts; this file reads and writes the database.

// Polling endpoints (live questions and the class timer) check flags on every request, so the stored
// state and each family's overrides are kept in memory for a short while. Changes made on this server
// show at once; on another server instance they show within FLAG_CACHE_MS.
const FLAG_CACHE_MS = 30_000;
const FLAG_CACHE_FAMILIES = 500;
let statesCache: { at: number; states: Map<string, FlagState> } | null = null;
const overridesCache = new Map<string, { at: number; overrides: Map<string, boolean> }>();

/** Forgets the remembered flag state (after a change, and in tests). */
export function clearFlagCache(): void {
  statesCache = null;
  overridesCache.clear();
}

async function cachedStates(now = Date.now()): Promise<Map<string, FlagState>> {
  if (statesCache && now - statesCache.at < FLAG_CACHE_MS) return statesCache.states;
  const states = await flagStates();
  statesCache = { at: now, states };
  return states;
}

async function cachedOverrides(familyId: string, now = Date.now()): Promise<Map<string, boolean>> {
  const hit = overridesCache.get(familyId);
  if (hit && now - hit.at < FLAG_CACHE_MS) return hit.overrides;
  const overrides = await familyOverrides(familyId);
  if (overridesCache.size >= FLAG_CACHE_FAMILIES) overridesCache.clear();
  overridesCache.set(familyId, { at: now, overrides });
  return overrides;
}

export async function flagStates(): Promise<Map<string, FlagState>> {
  const rows = await query<{ key: string; enabled: number; rollout: number }>("SELECT key, enabled, rollout FROM feature_flags");
  return new Map(rows.map((r) => [String(r.key), { enabled: Boolean(Number(r.enabled)), rollout: Number(r.rollout) }]));
}

export async function setFlag(key: string, state: FlagState, now = Date.now()): Promise<void> {
  await run(
    `INSERT INTO feature_flags (key, enabled, rollout, updated_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET enabled = excluded.enabled, rollout = excluded.rollout, updated_at = excluded.updated_at`,
    [key, state.enabled ? 1 : 0, state.rollout, now],
  );
  clearFlagCache();
}

export async function familyOverrides(familyId: string): Promise<Map<string, boolean>> {
  const rows = await query<{ key: string; enabled: number }>("SELECT key, enabled FROM flag_overrides WHERE family_id = ?", [familyId]);
  return new Map(rows.map((r) => [String(r.key), Boolean(Number(r.enabled))]));
}

/** Forces a flag on or off for one family, or (enabled null) goes back to the site-wide setting. */
export async function setOverride(key: string, familyId: string, enabled: boolean | null, now = Date.now()): Promise<void> {
  if (enabled === null) {
    await run("DELETE FROM flag_overrides WHERE key = ? AND family_id = ?", [key, familyId]);
    overridesCache.delete(familyId);
    return;
  }
  await run(
    `INSERT INTO flag_overrides (key, family_id, enabled, created_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(key, family_id) DO UPDATE SET enabled = excluded.enabled`,
    [key, familyId, enabled ? 1 : 0, now],
  );
  overridesCache.delete(familyId);
}

export async function overrideCounts(): Promise<Map<string, number>> {
  const rows = await query<{ key: string; n: number }>("SELECT key, COUNT(*) AS n FROM flag_overrides GROUP BY key");
  return new Map(rows.map((r) => [String(r.key), Number(r.n)]));
}

/** Whether a server-side flag is on for this family (or for a signed-out visitor when familyId is null). */
export async function isFlagOn(key: string, familyId: string | null): Promise<boolean> {
  const def = flagDef(key);
  if (!def) return false;
  const [states, overrides] = await Promise.all([cachedStates(), familyId ? cachedOverrides(familyId) : Promise.resolve(new Map<string, boolean>())]);
  const state = states.get(key);
  const override = overrides.get(key);
  return flagOn(
    def,
    state,
    override,
    familyId,
  );
}

/** Every flag's value for one family, or for a signed-out device bucketed by its own id. */
export async function flagsFor(familyId: string | null, deviceId: string | null): Promise<Record<string, boolean>> {
  const [states, overrides] = await Promise.all([flagStates(), familyId ? familyOverrides(familyId) : Promise.resolve(new Map<string, boolean>())]);
  return Object.fromEntries(FLAGS.map((f) => [f.key, flagOn(f, states.get(f.key), overrides.get(f.key), familyId ?? deviceId)]));
}

// ---------- A/B tests ----------

interface ExperimentRow {
  key: string;
  description: string;
  status: string;
  variants: string;
  winner: string | null;
  created_at: number;
  started_at: number | null;
  stopped_at: number | null;
}

function toExperiment(r: ExperimentRow): Experiment & { createdAt: number } {
  let variants: Variant[] = [];
  try {
    variants = JSON.parse(r.variants) as Variant[];
  } catch {
    /* an unreadable row shows everyone the control */
  }
  return {
    key: String(r.key),
    description: String(r.description ?? ""),
    status: r.status as ExperimentStatus,
    variants,
    winner: r.winner ?? null,
    createdAt: Number(r.created_at),
    startedAt: r.started_at == null ? null : Number(r.started_at),
    stoppedAt: r.stopped_at == null ? null : Number(r.stopped_at),
  };
}

export async function listExperiments(): Promise<(Experiment & { createdAt: number })[]> {
  return (await query<ExperimentRow>("SELECT * FROM experiments ORDER BY created_at DESC")).map(toExperiment);
}

export async function getExperiment(key: string): Promise<(Experiment & { createdAt: number }) | null> {
  const row = (await query<ExperimentRow>("SELECT * FROM experiments WHERE key = ?", [key]))[0];
  return row ? toExperiment(row) : null;
}

/** Saves a new experiment as a draft. Returns false when the key is taken. */
export async function createExperiment(e: { key: string; description: string; variants: Variant[] }, now = Date.now()): Promise<boolean> {
  return (await run("INSERT OR IGNORE INTO experiments (key, description, status, variants, created_at) VALUES (?, ?, 'draft', ?, ?)", [e.key, e.description, JSON.stringify(e.variants), now])) > 0;
}

/** Variants can change only in a draft: changing them mid-test would move families between groups. */
export async function updateDraft(key: string, e: { description: string; variants: Variant[] }): Promise<boolean> {
  return (await run("UPDATE experiments SET description = ?, variants = ? WHERE key = ? AND status = 'draft'", [e.description, JSON.stringify(e.variants), key])) > 0;
}

export async function startExperiment(key: string, now = Date.now()): Promise<boolean> {
  return (await run("UPDATE experiments SET status = 'running', started_at = ? WHERE key = ? AND status = 'draft'", [now, key])) > 0;
}

/** Ends a test. Everyone then sees the winner (or the control when no winner is given). */
export async function stopExperiment(key: string, winner: string | null, now = Date.now()): Promise<boolean> {
  return (await run("UPDATE experiments SET status = 'stopped', winner = ?, stopped_at = COALESCE(stopped_at, ?) WHERE key = ? AND status IN ('running', 'stopped')", [winner, now, key])) > 0;
}

/** Deletes an experiment and its recorded assignments. Code that still asks for it gets "control". */
export async function deleteExperiment(key: string): Promise<boolean> {
  await run("DELETE FROM experiment_assignments WHERE experiment = ?", [key]);
  return (await run("DELETE FROM experiments WHERE key = ?", [key])) > 0;
}

/**
 * The variant of every experiment for one family or device. A signed-in family in a running test is
 * recorded the first time, so the panel can count results; signed-out devices are bucketed but not counted.
 */
export async function variantsFor(familyId: string | null, deviceId: string | null, now = Date.now()): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const e of await listExperiments()) {
    const variant = pickVariant(e, familyId ?? deviceId);
    out[e.key] = variant;
    if (familyId && e.status === "running") {
      await run("INSERT OR IGNORE INTO experiment_assignments (experiment, family_id, variant, assigned_at) VALUES (?, ?, ?, ?)", [e.key, familyId, variant, now]);
    }
  }
  return out;
}

export interface VariantResult {
  variant: string;
  families: number;
  /** Families now on a paid plan. */
  paid: number;
  /** Families with any practice in the last 7 days. */
  active: number;
  /** p-value of the paid rate against the control; null for the control itself or when it says nothing. */
  paidP: number | null;
  activeP: number | null;
}

export async function experimentResults(key: string, now = Date.now()): Promise<VariantResult[]> {
  const exp = await getExperiment(key);
  if (!exp) return [];
  const rows = await query<{ variant: string; n: number; paid: number; active: number }>(
    `SELECT a.variant, COUNT(*) AS n,
       SUM(CASE WHEN f.plan = 'premium' THEN 1 ELSE 0 END) AS paid,
       SUM(CASE WHEN EXISTS (SELECT 1 FROM events e WHERE e.family_id = a.family_id AND e.t > ?) THEN 1 ELSE 0 END) AS active
     FROM experiment_assignments a JOIN families f ON f.id = a.family_id
     WHERE a.experiment = ? GROUP BY a.variant`,
    [now - 7 * 86_400_000, key],
  );
  const by = new Map(rows.map((r) => [String(r.variant), { n: Number(r.n), paid: Number(r.paid ?? 0), active: Number(r.active ?? 0) }]));
  const control = by.get(exp.variants[0]?.name ?? "") ?? { n: 0, paid: 0, active: 0 };
  return exp.variants.map((v, i) => {
    const r = by.get(v.name) ?? { n: 0, paid: 0, active: 0 };
    return {
      variant: v.name,
      families: r.n,
      paid: r.paid,
      active: r.active,
      paidP: i === 0 ? null : pValue(control.n, control.paid, r.n, r.paid),
      activeP: i === 0 ? null : pValue(control.n, control.active, r.n, r.active),
    };
  });
}
