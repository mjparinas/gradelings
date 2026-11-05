import "server-only";
import { query, run } from "./db";
import { LIVE_OPEN_FOR } from "./live";
import { classBump, notifyClass, sleepOrWake } from "./liveNotify";

// What a child's device waits on. The device sends the signature of what it already shows; the server holds
// the request until the signature changes (or a few seconds pass) and answers at once, so a question the
// teacher asks reaches the class in about a second without the devices asking every few seconds. It is one
// ordinary HTTPS response, so it crosses school proxies and filters the way any page load does.
//
// The signature covers the open question (which, whether the answer is shown, its settings) and the timer's
// last change, for every class the child is in. Nothing in it is about a child. To keep the database calm, a
// class is looked up at most about once a second per server instance, however many devices wait on it, and a
// change made on the same instance wakes them directly.

/** How long a device's request is held when nothing changes. Short enough for proxies that cut idle responses. */
export const LIVE_WAIT_MS = 8_000;
/** A teacher's open Live tab counts as "here" for this long after its last heartbeat. */
export const TEACHER_HERE_FOR = 45_000;
const CLASSES_TTL = 30_000;
const STATE_TTL = 900;

export interface ClassState {
  sig: string;
  /** A question or timer is showing, or a teacher has the Live tab open: devices should look often. */
  hot: boolean;
}

const classesCache = new Map<string, { at: number; ids: string[] }>();
const stateCache = new Map<string, { at: number; bump: number; p: Promise<ClassState> }>();

/** Forgets what was looked up (tests). */
export function resetLiveWatch(): void {
  classesCache.clear();
  stateCache.clear();
}

function hash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

async function classIdsFor(familyId: string, profileId: string, now: number): Promise<string[]> {
  const key = `${familyId}:${profileId}`;
  const hit = classesCache.get(key);
  if (hit && now - hit.at < CLASSES_TTL) return hit.ids;
  const rows = await query<{ class_id: string }>(
    "SELECT m.class_id FROM class_members m JOIN classes c ON c.id = m.class_id AND c.closed_at IS NULL WHERE m.family_id = ? AND m.profile_id = ? ORDER BY m.class_id",
    [familyId, profileId],
  );
  const ids = rows.map((r) => r.class_id);
  if (classesCache.size > 5_000) classesCache.clear();
  classesCache.set(key, { at: now, ids });
  return ids;
}

async function readClass(classId: string, now: number): Promise<ClassState> {
  const [live, timer, here] = await Promise.all([
    query<{ id: string; revealed_at: number | null; data: string }>(
      "SELECT id, revealed_at, data FROM live_questions WHERE class_id = ? AND ended_at IS NULL AND created_at > ? ORDER BY created_at DESC LIMIT 1",
      [classId, now - LIVE_OPEN_FOR],
    ),
    query<{ updated_at: number }>("SELECT updated_at FROM class_timers WHERE class_id = ?", [classId]),
    query<{ seen_at: number }>("SELECT seen_at FROM class_presence WHERE class_id = ?", [classId]),
  ]);
  const q = live[0];
  const parts = [q ? `${q.id}.${q.revealed_at ?? 0}.${hash(q.data)}` : "-", timer[0] ? String(timer[0].updated_at) : "-"];
  const present = here[0] != null && now - Number(here[0].seen_at) < TEACHER_HERE_FOR;
  return { sig: parts.join("/"), hot: present || Boolean(q) || Boolean(timer[0]) };
}

function classState(classId: string, now: number): Promise<ClassState> {
  const hit = stateCache.get(classId);
  if (hit && now - hit.at < STATE_TTL && hit.bump === classBump(classId)) return hit.p;
  const p = readClass(classId, now);
  stateCache.set(classId, { at: now, bump: classBump(classId), p });
  p.catch(() => stateCache.delete(classId));
  return p;
}

/** The signature of everything a child's classes could send them right now. Empty when the child is in no class. */
export async function childWatch(familyId: string, profileId: string, now = Date.now()): Promise<ClassState & { classIds: string[] }> {
  const classIds = await classIdsFor(familyId, profileId, now);
  const states = await Promise.all(classIds.map((id) => classState(id, now)));
  return { sig: states.map((s) => s.sig).join("|"), hot: states.some((s) => s.hot), classIds };
}

/** Holds until the child's signature differs from `since` or `waitMs` has passed, then returns the current one. */
export async function waitForChange(familyId: string, profileId: string, since: string, waitMs = LIVE_WAIT_MS): Promise<ClassState> {
  const deadline = Date.now() + waitMs;
  let w = await childWatch(familyId, profileId);
  // A child in no class has nothing to wait for: answer at once (the device then settles on slow polling).
  while (w.sig === since && w.classIds.length && Date.now() < deadline) {
    await sleepOrWake(w.classIds, Math.min(deadline - Date.now(), w.hot ? 1_000 : 2_000));
    w = await childWatch(familyId, profileId);
  }
  return { sig: w.sig, hot: w.hot };
}

/** A teacher's Live tab is open on this class (sent every few seconds while it is visible). */
export async function markTeacherHere(classId: string, now = Date.now()): Promise<void> {
  await run("INSERT INTO class_presence (class_id, seen_at) VALUES (?, ?) ON CONFLICT(class_id) DO UPDATE SET seen_at = excluded.seen_at", [classId, now]);
  notifyClass(classId);
}
