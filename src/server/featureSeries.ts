import "server-only";
import { ageBandFor } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { toCountryCode } from "@/lib/country";
import { FEATURE_EMAILS, type Ages, type FeatureEmail } from "@/lib/featureSeries";
import { parseSeriesConfig, SERIES_WINDOW_DAYS, SERIES_JOIN_GRACE_DAYS, SERIES_MIN_GAP_HOURS, SERIES_QUIET_HOURS, type SeriesConfig } from "@/lib/featureSeriesRules";
import { unsubscribeToken } from "./auth";
import { teacherOnly } from "./audience";
import { query } from "./db";
import { emailConfigured, sendEmail } from "./email";
import { featureTipEmail } from "./featureEmail";
import { getFamilyRow, toFamilyInfo } from "./family";
import { isFlagOn } from "./flags";
import { getSetting, setSetting } from "./payments";

// The feature series (docs/decisions/2026-11-26-daily-feature-emails.md): one email a day to a parent who has
// confirmed their email, each about one thing the app does. It is an Automation: off until the owner types TURN ON,
// capped per run, and it follows the rules of every panel email (confirmed address, news and tips on, not bouncing).
// What a family has had is read from the email log (`sent_by = feature:<id>`), so nothing new is stored and a
// second run can never send the same email twice.

const DAY = 86_400_000;
const HOUR = 3_600_000;
const KEY = "automation:feature-series";
export const sentByFeature = (id: string) => `feature:${id}`;
const idOfSentBy = (s: string) => s.slice("feature:".length);

export async function getSeriesConfig(): Promise<SeriesConfig> {
  return parseSeriesConfig(await getSetting(KEY));
}
export async function saveSeriesConfig(c: SeriesConfig): Promise<void> {
  await setSetting(KEY, JSON.stringify(c));
}

/** What the family is on today, so each email can say what the reader has. */
export type PlanState = "member" | "trial" | "free";

export interface Candidate {
  familyId: string;
  parentId: string;
  email: string;
  createdAt: number;
}

/** What decides which email is next for one family. */
export interface Facts {
  bands: ReadonlySet<Ages>;
  country: "CA" | "US";
  flag: (key: string) => boolean;
}

export const forFamily = (e: FeatureEmail, f: Facts): boolean => {
  if (e.ages && !e.ages.some((a) => f.bands.has(a))) return false;
  if (e.countries && !e.countries.includes(f.country)) return false;
  if (e.flag && !f.flag(e.flag)) return false;
  return true;
};

/** The first email in the list the family hasn't had and that is meant for it, or null when the series is done. */
export function nextFeature(had: ReadonlySet<string>, f: Facts, list: readonly FeatureEmail[] = FEATURE_EMAILS): FeatureEmail | null {
  return list.find((e) => !had.has(e.id) && forFamily(e, f)) ?? null;
}

/** Families the series could email today: confirmed, news and tips on, not bouncing, signed up in the window. */
export async function candidates(config: SeriesConfig, now: number): Promise<Candidate[]> {
  if (config.onAt == null) return [];
  const from = Math.max(config.onAt - SERIES_JOIN_GRACE_DAYS * DAY, now - SERIES_WINDOW_DAYS * DAY);
  const rows = await query<{ family_id: string; parent_id: string; email: string; created_at: number }>(
    `SELECT f.id AS family_id, p.id AS parent_id, p.email, f.created_at
     FROM families f JOIN parents p ON p.id = (SELECT p2.id FROM parents p2 WHERE p2.family_id = f.id ORDER BY p2.created_at LIMIT 1)
     WHERE f.created_at > ? AND f.created_at <= ?
       AND NOT EXISTS (SELECT 1 FROM parents s WHERE s.family_id = f.id AND s.role = 'student')
       AND p.email_verified_at IS NOT NULL AND p.admin_mail = 1 AND p.email_bounced_at IS NULL
       AND NOT ${teacherOnly("p")}
     ORDER BY f.created_at`,
    [from, now - SERIES_MIN_GAP_HOURS * HOUR],
  );
  return rows.map((r) => ({ familyId: String(r.family_id), parentId: String(r.parent_id), email: String(r.email), createdAt: Number(r.created_at) }));
}

/** Families that already had any email from us lately (or a tip today), who wait for another day. */
async function busyFamilies(now: number): Promise<Set<string>> {
  const rows = await query<{ family_id: string; kind: string; sent_at: number }>("SELECT family_id, kind, sent_at FROM email_log WHERE sent_at > ? AND status != 'failed'", [
    now - Math.max(SERIES_QUIET_HOURS, SERIES_MIN_GAP_HOURS) * HOUR,
  ]);
  const busy = new Set<string>();
  for (const r of rows) {
    const age = now - Number(r.sent_at);
    // A tip stands in the way for a day; the sign-up confirmation never does (it goes out first, on day zero).
    if (r.kind === "feature-tip" ? age < SERIES_MIN_GAP_HOURS * HOUR : r.kind !== "verify" && age < SERIES_QUIET_HOURS * HOUR) busy.add(String(r.family_id));
  }
  return busy;
}

async function hadFeatures(familyIds: string[], now: number): Promise<Map<string, Set<string>>> {
  const had = new Map<string, Set<string>>();
  if (!familyIds.length) return had;
  const wanted = new Set(familyIds);
  const rows = await query<{ family_id: string; sent_by: string }>("SELECT family_id, sent_by FROM email_log WHERE sent_by >= 'feature:' AND sent_by < 'feature;' AND status != 'failed' AND sent_at > ?", [
    now - (SERIES_WINDOW_DAYS + 30) * DAY,
  ]);
  for (const r of rows) {
    const id = String(r.family_id);
    if (!wanted.has(id)) continue;
    (had.get(id) ?? had.set(id, new Set()).get(id)!).add(idOfSentBy(String(r.sent_by)));
  }
  return had;
}

/** The age bands of a family's children, from their grades. Names never leave this function. */
async function childBands(familyId: string): Promise<Set<Ages>> {
  const rows = await query<{ data: string }>("SELECT data FROM profiles WHERE family_id = ?", [familyId]);
  const bands = new Set<Ages>();
  for (const r of rows) {
    try {
      const d = JSON.parse(r.data) as { grade?: unknown; deleted?: unknown };
      if (!d.deleted && typeof d.grade === "string") bands.add(ageBandFor(d.grade as GradeId));
    } catch {
      /* a broken profile row has no grade */
    }
  }
  return bands;
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface SeriesRun {
  sent: number;
  failed: number;
  /** Families that were due but had every email, or nothing meant for them. */
  finished: number;
}

/** Sends today's email to each family that is due, up to the daily limit. */
export async function runFeatureSeries(origin: string, now = Date.now()): Promise<SeriesRun> {
  const out: SeriesRun = { sent: 0, failed: 0, finished: 0 };
  const config = await getSeriesConfig();
  if (!config.on) return out;
  const all = await candidates(config, now);
  if (!all.length) return out;
  const [busy, had] = await Promise.all([busyFamilies(now), hadFeatures(all.map((c) => c.familyId), now)]);
  // Flags are read once per run for the whole base; a family override is read only when a flag is needed.
  const flagCache = new Map<string, boolean>();
  for (const c of all) {
    if (out.sent + out.failed >= config.dailyCap) break;
    if (busy.has(c.familyId)) continue;
    const row = await getFamilyRow(c.familyId);
    if (!row) continue;
    const country = toCountryCode(row.country);
    const flags = new Map<string, boolean>();
    for (const key of new Set(FEATURE_EMAILS.flatMap((e) => (e.flag ? [e.flag] : [])))) {
      const k = `${key}:${c.familyId}`;
      if (!flagCache.has(k)) flagCache.set(k, await isFlagOn(key, c.familyId));
      flags.set(key, flagCache.get(k)!);
    }
    const next = nextFeature(had.get(c.familyId) ?? new Set(), { bands: await childBands(c.familyId), country, flag: (k) => flags.get(k) === true }, FEATURE_EMAILS);
    if (!next) {
      out.finished++;
      continue;
    }
    if (emailConfigured() && out.sent + out.failed) await pause(550);
    const family = toFamilyInfo(row, c.email);
    const mail = featureTipEmail(c.email, origin, next, family, await unsubscribeToken(c.parentId), now);
    const res = await sendEmail({ ...mail, sentBy: sentByFeature(next.id), label: next.subject });
    if (res.ok) out.sent++;
    else out.failed++;
  }
  return out;
}

export interface SeriesStatus {
  config: SeriesConfig;
  /** Families that would get an email on the next run (after the daily limit), and how many are in the window. */
  nextRun: number;
  inWindow: number;
  sent7: number;
  lastSentAt: number | null;
  /** How many emails the series has, and how many have gone out in all. */
  length: number;
  sentTotal: number;
}

export async function seriesStatus(now = Date.now()): Promise<SeriesStatus> {
  const config = await getSeriesConfig();
  const all = await candidates(config, now);
  const busy = await busyFamilies(now);
  const sent = await query<{ n: number; total: number; last: number | null }>(
    "SELECT SUM(CASE WHEN sent_at > ? THEN 1 ELSE 0 END) AS n, COUNT(*) AS total, MAX(sent_at) AS last FROM email_log WHERE sent_by >= 'feature:' AND sent_by < 'feature;' AND status != 'failed'",
    [now - 7 * DAY],
  );
  const due = all.filter((c) => !busy.has(c.familyId)).length;
  return {
    config,
    nextRun: Math.min(due, config.dailyCap),
    inWindow: all.length,
    sent7: Number(sent[0]?.n ?? 0),
    lastSentAt: sent[0]?.last == null ? null : Number(sent[0].last),
    length: FEATURE_EMAILS.length,
    sentTotal: Number(sent[0]?.total ?? 0),
  };
}

