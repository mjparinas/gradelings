// "How's Gradelings?": a grown-up's own rating and a line of feedback, from the parent area or the teacher
// area. Never from the kids' app, and nothing about a child goes with it. The checks run on the server too.

export type FeedbackAudience = "parent" | "teacher";

export const FEEDBACK_TOPICS = [
  { id: "idea", label: "An idea" },
  { id: "problem", label: "Something isn’t working" },
  { id: "content", label: "A lesson or question" },
  { id: "praise", label: "Something I like" },
  { id: "other", label: "Something else" },
] as const;
export type FeedbackTopic = (typeof FEEDBACK_TOPICS)[number]["id"];

export const RATING_FACES = [
  { value: 1, emoji: "😞", label: "Not good" },
  { value: 2, emoji: "😕", label: "Not great" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😍", label: "Love it" },
] as const;

export const MAX_COMMENT = 600;
/** A rating of this or lower goes on the admin to-do list, with or without a comment. */
export const LOW_RATING = 2;
/** After an answer or "Not now", the card stays away from this device for this long. */
export const FEEDBACK_SNOOZE_MS = 60 * 86_400_000;

export interface FeedbackInput {
  audience: FeedbackAudience;
  rating: number | null;
  comment: string;
  topic: FeedbackTopic | null;
  canReply: boolean;
}

/** Cleans a submission, or says what's wrong. A rating or a comment is needed; either alone is fine. */
export function checkFeedback(body: unknown): { ok: true; value: FeedbackInput } | { ok: false; error: string } {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  if (b.audience !== "parent" && b.audience !== "teacher") return { ok: false, error: "Bad feedback." };
  const rating = b.rating === undefined || b.rating === null ? null : Number(b.rating);
  if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) return { ok: false, error: "Bad feedback." };
  const comment = typeof b.comment === "string" ? b.comment.replace(/\r\n?/g, "\n").trim().slice(0, MAX_COMMENT) : "";
  const topic = FEEDBACK_TOPICS.find((t) => t.id === b.topic)?.id ?? null;
  if (rating === null && !comment) return { ok: false, error: "Please pick a face or write a line first." };
  return { ok: true, value: { audience: b.audience, rating, comment, topic, canReply: b.canReply === true } };
}

const KEY = "gradelings.feedbackSnooze";

export function feedbackSnoozed(now: number): boolean {
  try {
    const until = Number(localStorage.getItem(KEY));
    return Number.isFinite(until) && until > now;
  } catch {
    return false;
  }
}

export function snoozeFeedback(now: number) {
  try {
    localStorage.setItem(KEY, String(now + FEEDBACK_SNOOZE_MS));
  } catch {
    // Private mode: the card may come back sooner, which is harmless.
  }
}
