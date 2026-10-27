import "server-only";
import { loadGrade } from "@/content";
import { DEFAULT_FRAMEWORK } from "@/content/frameworks";
import { derive } from "@/lib/derive";
import type { AppEvent, ChildSettings, Profile } from "@/lib/model";
import { buildReport, type Report } from "@/lib/reports";
import { practiceTargets, subjectGradesFor } from "@/lib/subjectGrades";
import { createHash } from "node:crypto";
import { query } from "./db";
import { isFlagOn } from "./flags";

// Builds the same numbers the Parent area shows, on the server, for shared links and emails.
// Lessons for the child's grade are loaded on demand, like everywhere else.

export interface ChildReport {
  profile: Profile;
  report: Report;
}

/**
 * The sync route only checks an event's id, child, type and time, so an old or broken device could
 * upload an answer without its unit. Reports skip those instead of failing for the whole family.
 */
function wellFormed(e: AppEvent): boolean {
  if (e.type === "answer") return typeof e.unit === "string" && e.unit.split("/").length === 3 && typeof e.correct === "boolean";
  return true;
}

export async function loadChildReport(familyId: string, profileId: string, days: number, now = Date.now()): Promise<ChildReport | null> {
  const data = await loadChildData(familyId, profileId, days, now);
  return data && { profile: data.profile, report: data.report };
}

/** The report plus the events it was built from (the class view counts homework from them). */
export async function loadChildData(familyId: string, profileId: string, days: number, now = Date.now()): Promise<(ChildReport & { events: AppEvent[] }) | null> {
  const rows = await query<{ data: string }>("SELECT data FROM profiles WHERE id = ? AND family_id = ?", [profileId, familyId]);
  if (!rows[0]) return null;
  const stored = JSON.parse(rows[0].data) as Profile;
  const profile: Profile = { ...stored, framework: stored.framework ?? DEFAULT_FRAMEWORK };
  if (profile.deleted) return null;
  const eventRows = await query<{ data: string }>("SELECT data FROM events WHERE profile_id = ? AND family_id = ? ORDER BY seq", [profileId, familyId]);
  const events = eventRows
    .map((r) => JSON.parse(r.data) as AppEvent)
    .filter((e) => e.t > (profile.resetAt ?? 0) && wellFormed(e));
  // Subjects a parent set to another grade (`subjectGrades.ts`) list that grade's units, as in the Parent area.
  const settingsRow = (await query<{ data: string }>("SELECT data FROM child_settings WHERE profile_id = ? AND family_id = ?", [profileId, familyId]))[0];
  const subjectGrades = settingsRow && (await isFlagOn("subject-levels", familyId)) ? subjectGradesFor(profile, JSON.parse(settingsRow.data) as ChildSettings) : {};
  await Promise.all(practiceTargets(profile, { subjectGrades }).map((t) => loadGrade(t.grade, t.framework)));
  const report = buildReport(events, derive(events, now), profile.grade, profile.framework, days, now, subjectGrades);
  return { profile, report, events };
}

export async function familyProfileIds(familyId: string): Promise<string[]> {
  const rows = await query<{ id: string; data: string }>("SELECT id, data FROM profiles WHERE family_id = ?", [familyId]);
  return rows.filter((r) => !(JSON.parse(r.data) as Profile).deleted).map((r) => r.id);
}

/** Finds the report behind a shared link, or null if it is unknown, expired or stopped. */
export async function loadSharedReport(token: string, now = Date.now()): Promise<(ChildReport & { days: number }) | null> {
  const hash = createHash("sha256").update(token).digest("hex");
  const share = (await query<{ family_id: string; profile_id: string; days: number; expires_at: number }>("SELECT family_id, profile_id, days, expires_at FROM report_shares WHERE token_hash = ?", [hash]))[0];
  if (!share || Number(share.expires_at) <= now) return null;
  const data = await loadChildReport(share.family_id, share.profile_id, Number(share.days), now);
  return data && { ...data, days: Number(share.days) };
}
