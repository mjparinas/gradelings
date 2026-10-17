import type { Currency } from "@/content/money";
import type { Choice, Visual } from "@/content/types";

// Live questions in class (teacher asks, students tap an answer). Shared by the server, the teacher
// area and the kids' app. Live questions are online only; practice keeps working offline beside them.

/** One live question as the teacher sees it. Students get it without `answer` until it is shown. */
export interface LiveQuestionData {
  prompt: string;
  speak?: string;
  lang?: "fr";
  choicesLang?: "fr";
  visualLang?: "fr";
  visual?: Visual;
  currency?: Currency;
  hint: string;
  choices: Choice[];
  answer: string;
  /** The teacher lets students hear the question read aloud. Questions asked before this existed leave it out, which means yes. */
  readAloud?: boolean;
}

/** What a child's device gets from `/api/live/`. */
export interface LiveForChild {
  id: string;
  className: string;
  question: Omit<LiveQuestionData, "answer" | "hint">;
  /** The child's own answer, once sent. */
  mine: string | null;
  /** Set once the teacher shows the answer (then the question takes no more answers). */
  answer?: string;
  hint?: string;
}

/** What the teacher area gets for its class's open question. */
export interface LiveForTeacher {
  id: string;
  unitKey: string;
  question: LiveQuestionData;
  revealed: boolean;
  createdAt: number;
  answers: { profileId: string; choice: string; correct: boolean }[];
  /** What "Next question" will ask, for the teacher to look at first. Null when the unit has nothing else. */
  next?: LiveQuestionData | null;
}

/** How often a child's device asks for a live question: quickly while one is open, slowly otherwise. */
export const LIVE_POLL_OPEN_MS = 3_000;
export const LIVE_POLL_IDLE_MS = 12_000;
/** How often the teacher's screen refreshes the answers while a question is open. */
export const LIVE_POLL_TEACHER_MS = 2_500;

/** Answers per choice, in the question's choice order. */
export function liveCounts(question: Pick<LiveQuestionData, "choices">, answers: { choice: string }[]): { id: string; count: number }[] {
  return question.choices.map((c) => ({ id: c.id, count: answers.filter((a) => a.choice === c.id).length }));
}

/** One question's result for a recap: how many answered, how many were right, and who missed it. */
export function liveRecapItem(live: Pick<LiveForTeacher, "answers">, names: Map<string, string>): { answered: number; right: number; missed: string[] } {
  return {
    answered: live.answers.length,
    right: live.answers.filter((a) => a.correct).length,
    missed: live.answers.filter((a) => !a.correct).map((a) => names.get(a.profileId) ?? "Student"),
  };
}

/** The recap as plain text a teacher can copy, oldest question first. Says it is practice, not a mark. */
export function liveRecapText(items: LiveForTeacher[], names: Map<string, string>, unitName: (key: string) => string, className: string, appName: string): string {
  const lines = [`${className}: live questions (${appName})`];
  items.forEach((q, i) => {
    const r = liveRecapItem(q, names);
    lines.push("", `${i + 1}. ${unitName(q.unitKey)}: ${q.question.prompt}`, `   ${r.right} of ${r.answered} answered right.${r.missed.length ? ` To check in with: ${r.missed.join(", ")}.` : ""}`);
  });
  lines.push("", "This reflects practice, not a report-card mark.");
  return lines.join("\n");
}

export type DeskState = "waiting" | "right" | "wrong";

/** Each student's desk for the open question: white until they answer, then green or red. */
export function liveDesks(students: { profileId: string; name: string }[], answers: { profileId: string; correct: boolean }[]): { profileId: string; name: string; state: DeskState }[] {
  const byProfile = new Map(answers.map((a) => [a.profileId, a.correct]));
  return students.map((s) => ({ ...s, state: !byProfile.has(s.profileId) ? "waiting" : byProfile.get(s.profileId) ? "right" : "wrong" }));
}

/** Whole-number percentages of the class (everyone counts, answered or not). Zero for an empty class. */
export function livePercents(desks: { state: DeskState }[]): { right: number; wrong: number; waiting: number } {
  const total = desks.length;
  const pct = (state: DeskState) => (total ? Math.round((desks.filter((d) => d.state === state).length / total) * 100) : 0);
  return { right: pct("right"), wrong: pct("wrong"), waiting: pct("waiting") };
}
