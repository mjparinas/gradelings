import { parseUnitKey } from "@/content";
import type { Question } from "@/content/types";
import type { AppEvent } from "./model";
import { workedSolution, type WorkedSolution } from "./workedSolution";

// The questions a child missed lately, for the parent area (flag `recent-problems`). Read from answer events only, so
// nothing is stored beyond what practice already logs: the question's short text (`q`), its right answer (`a`) and the
// child's first wrong answer (`g`). Practice, not a report-card mark.

export const PROBLEM_DAYS = 14;

export interface RecentProblem {
  unit: string;
  /** The question's short text. */
  q: string;
  /** The right answer, when the event kept it. */
  answer?: string;
  /** Wrong answers the child gave, most recent first, without repeats. */
  given: string[];
  /** How many times it was missed on the first try in the window. */
  count: number;
  lastT: number;
  /** The child answered it right on the first try after the last miss. */
  gotItSince: boolean;
}

/** Questions one child missed in the last `PROBLEM_DAYS` days: still-tricky ones first, then newest. */
export function recentProblems(events: readonly AppEvent[], profileId: string, now: number, resetAt = 0): RecentProblem[] {
  const since = Math.max(now - PROBLEM_DAYS * 86_400_000, resetAt);
  const seen = new Set<string>();
  const mine = events
    .filter((e): e is Extract<AppEvent, { type: "answer" }> => e.type === "answer" && e.profileId === profileId && e.t > since && typeof e.q === "string" && !!e.q && !seen.has(e.id) && !!seen.add(e.id))
    .sort((a, b) => a.t - b.t);
  const byKey = new Map<string, RecentProblem>();
  for (const e of mine) {
    const key = `${e.unit}\u0000${e.q}`;
    if (e.correct) {
      const cur = byKey.get(key);
      if (cur) cur.gotItSince = true;
      continue;
    }
    // A miss on the first try, with a wrong answer or a revealed answer: a hint opened early is not a miss.
    if (!e.revealed && !e.g) continue;
    const cur = byKey.get(key) ?? { unit: e.unit, q: e.q!, given: [], count: 0, lastT: 0, gotItSince: false };
    cur.count++;
    cur.lastT = e.t;
    cur.gotItSince = false;
    if (e.a) cur.answer = e.a;
    if (e.g) cur.given = [e.g, ...cur.given.filter((g) => g !== e.g)];
    byKey.set(key, cur);
  }
  return [...byKey.values()].filter((p) => parseUnitKey(p.unit)).sort((a, b) => Number(a.gotItSince) - Number(b.gotItSince) || b.lastT - a.lastT);
}

/** A worked solution for a missed question, when it is plain arithmetic and its right answer is known (flag `worked-solutions`). */
export function problemSolution(p: Pick<RecentProblem, "q" | "answer">): WorkedSolution | null {
  if (!p.answer || p.q.endsWith("…")) return null;
  const q: Question = { kind: "input", prompt: p.q, answer: p.answer, hint: "" };
  return workedSolution(q);
}
