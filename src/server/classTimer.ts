import "server-only";
import { cleanTimerLabel, TIMER_ADD_MS, TIMER_DONE_SHOW_MS, TIMER_MAX_MINUTES, TIMER_PAUSED_KEEP_MS, type ClassTimer } from "@/lib/classTimer";
import { query, run } from "./db";

// One timer per class. Running: `ends_at` is set. Paused: `paused_left` is set. Stopping deletes the row.
// Short-lived by design: a finished timer stops showing after a few minutes and an abandoned one is deleted
// the next time that class starts one. Nothing here is about a child.

interface TimerRow {
  class_id: string;
  label: string;
  total_ms: number;
  ends_at: number | null;
  paused_left: number | null;
  updated_at: number;
}

/** What a device should show for a row at `now`, or null once it has gone stale. */
export function viewTimer(row: TimerRow | undefined, now = Date.now()): ClassTimer | null {
  if (!row) return null;
  const total = Number(row.total_ms);
  if (row.paused_left != null) {
    return now - Number(row.updated_at) > TIMER_PAUSED_KEEP_MS ? null : { label: row.label, totalMs: total, left: Number(row.paused_left), running: false };
  }
  const left = Number(row.ends_at) - now;
  if (left <= -TIMER_DONE_SHOW_MS) return null;
  return { label: row.label, totalMs: total, left: Math.max(0, left), running: left > 0 };
}

const rowOf = async (classId: string): Promise<TimerRow | undefined> => (await query<TimerRow>("SELECT * FROM class_timers WHERE class_id = ?", [classId]))[0];

export async function classTimer(classId: string, now = Date.now()): Promise<ClassTimer | null> {
  return viewTimer(await rowOf(classId), now);
}

/** Starts (or restarts) the class's timer for `minutes`. */
export async function startTimer(classId: string, minutes: number, label: unknown, now = Date.now()): Promise<ClassTimer> {
  const ms = Math.min(minutes, TIMER_MAX_MINUTES) * 60_000;
  await run(
    `INSERT INTO class_timers (class_id, label, total_ms, ends_at, paused_left, updated_at) VALUES (?, ?, ?, ?, NULL, ?)
     ON CONFLICT(class_id) DO UPDATE SET label = excluded.label, total_ms = excluded.total_ms, ends_at = excluded.ends_at, paused_left = NULL, updated_at = excluded.updated_at`,
    [classId, cleanTimerLabel(label), ms, now + ms, now],
  );
  return (await classTimer(classId, now))!;
}

/** Pause, resume or add a minute. Returns the new timer, or null when there is none to change. */
export async function changeTimer(classId: string, action: "pause" | "resume" | "add", now = Date.now()): Promise<ClassTimer | null> {
  const row = await rowOf(classId);
  const cur = viewTimer(row, now);
  if (!row || !cur) return null;
  const maxMs = TIMER_MAX_MINUTES * 60_000;
  if (action === "pause") {
    if (!cur.running) return cur;
    await run("UPDATE class_timers SET ends_at = NULL, paused_left = ?, updated_at = ? WHERE class_id = ?", [cur.left, now, classId]);
  } else if (action === "resume") {
    if (cur.running || cur.left <= 0) return cur;
    await run("UPDATE class_timers SET ends_at = ?, paused_left = NULL, updated_at = ? WHERE class_id = ?", [now + cur.left, now, classId]);
  } else {
    // Adding time to a finished timer starts it again from just that minute.
    const left = Math.min(maxMs, cur.left + TIMER_ADD_MS);
    const total = Math.min(maxMs, Math.max(Number(row.total_ms), left));
    if (cur.running || cur.left <= 0) await run("UPDATE class_timers SET ends_at = ?, paused_left = NULL, total_ms = ?, updated_at = ? WHERE class_id = ?", [now + left, total, now, classId]);
    else await run("UPDATE class_timers SET paused_left = ?, total_ms = ?, updated_at = ? WHERE class_id = ?", [left, total, now, classId]);
  }
  return classTimer(classId, now);
}

export async function stopTimer(classId: string): Promise<void> {
  await run("DELETE FROM class_timers WHERE class_id = ?", [classId]);
}

/** The timer of a class this child is in (any class that has one running). */
export async function timerForChild(familyId: string, profileId: string, now = Date.now()): Promise<{ timer: ClassTimer; className: string } | null> {
  const rows = await query<TimerRow & { class_name: string }>(
    `SELECT t.*, c.name AS class_name FROM class_timers t
     JOIN class_members m ON m.class_id = t.class_id AND m.family_id = ? AND m.profile_id = ?
     JOIN classes c ON c.id = t.class_id AND c.closed_at IS NULL
     ORDER BY t.updated_at DESC`,
    [familyId, profileId],
  );
  for (const r of rows) {
    const timer = viewTimer(r, now);
    if (timer) return { timer, className: r.class_name };
  }
  return null;
}
