/** The longest wrong answer kept on an answer event. */
export const SLIP_LABEL_MAX = 24;

/** A wrong answer as stored on an answer event (`w`): whitespace collapsed, long text cut. */
export function slipLabel(answer: string): string {
  const text = answer.replace(/\s+/g, " ").trim();
  return text.length > SLIP_LABEL_MAX ? `${text.slice(0, SLIP_LABEL_MAX - 1).trimEnd()}…` : text;
}

/** One wrong answer several students gave to the same question. `skill` is set when it came from practising one skill inside the unit. */
export interface CommonSlip {
  q: string;
  /** What they picked or typed. */
  w: string;
  /** How many students gave it on a first try. */
  students: number;
  skill?: string;
}

type SlipEvent = { type: string; unit?: string; t: number; q?: string; w?: string; skill?: string; correct?: boolean | number };

/**
 * One student's wrong first answers on the assigned units: one entry per distinct unit, skill, question and wrong
 * answer, so a student repeating the same slip counts once.
 */
export function studentSlips(events: readonly SlipEvent[], since: Record<string, number>): { unit: string; skill?: string; q: string; w: string }[] {
  const seen = new Set<string>();
  const out: { unit: string; skill?: string; q: string; w: string }[] = [];
  for (const e of events) {
    if (e.type !== "answer" || !e.unit || e.correct !== false || typeof e.q !== "string" || !e.q || typeof e.w !== "string" || !e.w || !(e.unit in since) || e.t < since[e.unit]) continue;
    const q = e.q.slice(0, 80);
    const w = slipLabel(e.w);
    const id = `${e.unit}\u0000${e.skill ?? ""}\u0000${q}\u0000${w}`;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({ unit: e.unit, ...(e.skill ? { skill: e.skill } : {}), q, w });
  }
  return out;
}

/**
 * Per unit, the wrong answers at least `minStudents` students gave to the same question, most common first,
 * `limit` at most. Counts are students, never answers.
 */
export function commonSlips(perStudent: readonly ReturnType<typeof studentSlips>[], limit = 3, minStudents = 2): Record<string, CommonSlip[]> {
  const tally = new Map<string, CommonSlip>();
  const unitOf = new Map<string, string>();
  for (const student of perStudent) {
    for (const s of student) {
      const id = `${s.unit}\u0000${s.skill ?? ""}\u0000${s.q}\u0000${s.w}`;
      const row = tally.get(id) ?? { q: s.q, w: s.w, students: 0, ...(s.skill ? { skill: s.skill } : {}) };
      row.students++;
      tally.set(id, row);
      unitOf.set(id, s.unit);
    }
  }
  const byUnit = new Map<string, CommonSlip[]>();
  for (const [id, row] of tally) {
    if (row.students < minStudents) continue;
    const unit = unitOf.get(id)!;
    byUnit.set(unit, [...(byUnit.get(unit) ?? []), row]);
  }
  const out: Record<string, CommonSlip[]> = {};
  for (const [unit, rows] of byUnit) out[unit] = rows.sort((a, b) => b.students - a.students || a.q.localeCompare(b.q) || a.w.localeCompare(b.w)).slice(0, limit);
  return out;
}
