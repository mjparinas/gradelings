import "server-only";
import { getCourse, loadGrade, parseUnitKey } from "@/content";
import { hashSeed, withSeed } from "@/content/random";
import type { ChoiceQuestion } from "@/content/types";
import { type LiveQuestionData } from "@/lib/live";
import { newId } from "./auth";
import { batch, query, run } from "./db";
import { classGrades, type ClassRow } from "./classroom";

// Live questions: a teacher asks the class one multiple-choice question at a time, in real time.
// They need a connection (devices poll for the open question), so they sit beside offline practice
// and never replace it: answers are stored here only, never as practice events, and are deleted after
// a day. A question closes when the teacher shows the answer, asks the next one or ends, or on its own
// after LIVE_OPEN_FOR.

/** An open question nobody ended stops showing after this long. */
export const LIVE_OPEN_FOR = 2 * 3_600_000;
/** Live questions and their answers are deleted after this long. */
export const LIVE_KEEP = 86_400_000;
/** How many seeded sets to look through for a question a class can answer with a tap. */
const TRIES = 6;

export interface LiveRow {
  id: string;
  class_id: string;
  unit_key: string;
  n: number;
  data: string;
  created_at: number;
  revealed_at: number | null;
  ended_at: number | null;
}

/**
 * The nth live question for a unit: a multiple-choice question from the unit's own generator, seeded by
 * class and number so it is the same on every server. Units whose questions are all typed, sorted or
 * built return null: those need the full practice screen.
 */
export async function pickLiveQuestion(cls: Pick<ClassRow, "id" | "grade" | "framework"> & { grade2?: ClassRow["grade2"] }, unitKey: string, n: number): Promise<LiveQuestionData | null> {
  const parsed = parseUnitKey(unitKey);
  if (!parsed || !classGrades(cls).includes(parsed.grade)) return null;
  await loadGrade(parsed.grade, cls.framework);
  const unit = getCourse(parsed.grade, parsed.subject, cls.framework)?.units.find((u) => u.id === parsed.unitId);
  if (!unit) return null;
  for (let t = 0; t < TRIES; t++) {
    const set = withSeed(hashSeed(`live:${cls.id}:${unitKey}:${n}:${t}`), () => unit.generate({ difficulty: 2 }));
    const choice = set.filter((q): q is ChoiceQuestion => q.kind === "choice" && q.choices.some((c) => c.id === q.answer));
    if (!choice.length) continue;
    const q = choice[n % choice.length];
    return {
      prompt: q.prompt,
      speak: q.speak,
      lang: q.lang,
      choicesLang: q.choicesLang,
      visualLang: q.visualLang,
      visual: q.visual,
      currency: q.currency,
      hint: q.hint,
      choices: q.choices,
      answer: q.answer,
    };
  }
  return null;
}

/** The class's open question, if any. */
export async function openLive(classId: string, now = Date.now()): Promise<LiveRow | undefined> {
  return (
    await query<LiveRow>("SELECT * FROM live_questions WHERE class_id = ? AND ended_at IS NULL AND created_at > ? ORDER BY created_at DESC LIMIT 1", [classId, now - LIVE_OPEN_FOR])
  )[0];
}

/** Every question the class was asked in the last day, oldest first (before it is deleted). */
export async function recentLive(classId: string, now = Date.now()): Promise<LiveRow[]> {
  return query<LiveRow>("SELECT * FROM live_questions WHERE class_id = ? AND created_at > ? ORDER BY created_at", [classId, now - LIVE_KEEP]);
}

/** Ends whatever is open and asks a new question. Returns null when the unit has no tap-to-answer questions. */
export async function startLive(cls: ClassRow, unitKey: string, teacherId: string, now = Date.now()): Promise<LiveRow | null> {
  const last = (await query<{ n: number }>("SELECT n FROM live_questions WHERE class_id = ? AND unit_key = ? ORDER BY created_at DESC LIMIT 1", [cls.id, unitKey]))[0];
  const n = last ? Number(last.n) + 1 : 0;
  const data = await pickLiveQuestion(cls, unitKey, n);
  if (!data) return null;
  await pruneLive(now);
  const id = newId();
  await batch([
    { sql: "UPDATE live_questions SET ended_at = ? WHERE class_id = ? AND ended_at IS NULL", args: [now, cls.id] },
    { sql: "INSERT INTO live_questions (id, class_id, unit_key, n, data, started_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)", args: [id, cls.id, unitKey, n, JSON.stringify(data), teacherId, now] },
  ]);
  return { id, class_id: cls.id, unit_key: unitKey, n, data: JSON.stringify(data), created_at: now, revealed_at: null, ended_at: null };
}

export async function revealLive(classId: string, now = Date.now()): Promise<boolean> {
  return (await run("UPDATE live_questions SET revealed_at = ? WHERE class_id = ? AND ended_at IS NULL AND revealed_at IS NULL", [now, classId])) > 0;
}

export async function endLive(classId: string, now = Date.now()): Promise<void> {
  await run("UPDATE live_questions SET ended_at = ? WHERE class_id = ? AND ended_at IS NULL", [now, classId]);
}

export interface LiveTally {
  profileId: string;
  choice: string;
  correct: boolean;
}

export async function liveAnswers(questionId: string): Promise<LiveTally[]> {
  const rows = await query<{ profile_id: string; choice: string; correct: number }>("SELECT profile_id, choice, correct FROM live_answers WHERE question_id = ? ORDER BY at", [questionId]);
  return rows.map((r) => ({ profileId: r.profile_id, choice: r.choice, correct: Boolean(Number(r.correct)) }));
}

/**
 * Saves a child's answer. Only the first tap counts, only while the question is open and the answer
 * hasn't been shown, and only for a child of this family who is in the question's class.
 */
export async function answerLive(familyId: string, profileId: string, questionId: string, choice: string, now = Date.now()): Promise<"saved" | "closed" | "invalid"> {
  const rows = await query<LiveRow>(
    `SELECT q.* FROM live_questions q JOIN class_members m ON m.class_id = q.class_id
     JOIN classes c ON c.id = q.class_id AND c.closed_at IS NULL
     WHERE q.id = ? AND m.family_id = ? AND m.profile_id = ?`,
    [questionId, familyId, profileId],
  );
  const q = rows[0];
  if (!q) return "invalid";
  if (q.ended_at != null || q.revealed_at != null || Number(q.created_at) <= now - LIVE_OPEN_FOR) return "closed";
  const data = JSON.parse(q.data) as LiveQuestionData;
  if (!data.choices.some((c) => c.id === choice)) return "invalid";
  await run("INSERT OR IGNORE INTO live_answers (question_id, profile_id, family_id, choice, correct, at) VALUES (?, ?, ?, ?, ?, ?)", [questionId, profileId, familyId, choice, choice === data.answer ? 1 : 0, now]);
  return "saved";
}

/** The open question in any class this child is in, with their own answer. */
export async function liveForChild(familyId: string, profileId: string, now = Date.now()): Promise<{ row: LiveRow; className: string; mine: string | null } | null> {
  const rows = await query<LiveRow & { class_name: string }>(
    `SELECT q.*, c.name AS class_name FROM live_questions q
     JOIN class_members m ON m.class_id = q.class_id AND m.family_id = ? AND m.profile_id = ?
     JOIN classes c ON c.id = q.class_id AND c.closed_at IS NULL
     WHERE q.ended_at IS NULL AND q.created_at > ? ORDER BY q.created_at DESC LIMIT 1`,
    [familyId, profileId, now - LIVE_OPEN_FOR],
  );
  const row = rows[0];
  if (!row) return null;
  const mine = (await query<{ choice: string }>("SELECT choice FROM live_answers WHERE question_id = ? AND profile_id = ?", [row.id, profileId]))[0];
  return { row, className: row.class_name, mine: mine?.choice ?? null };
}

/** Deletes live questions and answers older than a day. */
export async function pruneLive(now = Date.now()): Promise<void> {
  const cutoff = now - LIVE_KEEP;
  await batch([
    { sql: "DELETE FROM live_answers WHERE question_id IN (SELECT id FROM live_questions WHERE created_at < ?)", args: [cutoff] },
    { sql: "DELETE FROM live_questions WHERE created_at < ?", args: [cutoff] },
  ]);
}

/** SQL that deletes a class's live questions and answers (closing or deleting the class). */
export function liveClassStatements(classIdSql: string, args: (string | number)[]): { sql: string; args: (string | number)[] }[] {
  return [
    { sql: `DELETE FROM live_answers WHERE question_id IN (SELECT id FROM live_questions WHERE class_id IN (${classIdSql}))`, args },
    { sql: `DELETE FROM live_questions WHERE class_id IN (${classIdSql})`, args },
    // The class timer goes the same way (a new school year, closing the class, deleting an account).
    { sql: `DELETE FROM class_timers WHERE class_id IN (${classIdSql})`, args },
  ];
}
