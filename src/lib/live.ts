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
