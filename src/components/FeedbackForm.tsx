"use client";

import { useState } from "react";
import { FEEDBACK_TOPICS, MAX_COMMENT, RATING_FACES, type FeedbackAudience, type FeedbackTopic } from "@/lib/appFeedback";

/**
 * "How's Gradelings?" for a grown-up: five faces, an optional line and, for someone signed in, an "OK to email me
 * back" box. `compact` is the rating card (faces first, the line appears once a face is picked); otherwise the topic
 * list shows too. Nothing about a child is sent.
 */
export function FeedbackForm({ audience, signedIn, compact, onSent, onCancel }: { audience: FeedbackAudience; signedIn: boolean; compact?: boolean; onSent: () => void; onCancel?: () => void }) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [topic, setTopic] = useState<FeedbackTopic | "">("");
  const [canReply, setCanReply] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function send() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/app-feedback/", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ audience, rating, comment, topic: topic || null, canReply }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "We couldn’t send that. Please try again.");
      setSent(true);
      onSent();
    } catch (e) {
      setError(e instanceof TypeError ? "You’re offline. Connect to the internet and try again." : (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (sent) return <p role="status" className="font-bold">Thank you! We read every message.</p>;

  const showMore = !compact || rating !== null;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void send();
      }}
    >
      <fieldset>
        <legend className="font-bold">How is Gradelings working for you?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {RATING_FACES.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={rating === f.value}
              aria-label={f.label}
              title={f.label}
              onClick={() => setRating(rating === f.value ? null : f.value)}
              className={`min-h-12 min-w-12 rounded-xl border-2 text-2xl ${rating === f.value ? "border-[#253047] bg-[#e8ecf3]" : "border-line bg-white"}`}
            >
              <span aria-hidden="true">{f.emoji}</span>
            </button>
          ))}
        </div>
      </fieldset>
      {showMore && (
        <>
          {!compact && (
            <label className="mt-3 block text-sm font-semibold">
              What is it about?
              <select value={topic} onChange={(e) => setTopic(e.target.value as FeedbackTopic | "")} className="mt-1 block min-h-11 w-full rounded-xl border border-line bg-white px-3 font-read">
                <option value="">Pick one (optional)</option>
                {FEEDBACK_TOPICS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="mt-3 block text-sm font-semibold">
            Anything you’d like us to know? (optional)
            <textarea value={comment} maxLength={MAX_COMMENT} rows={3} onChange={(e) => setComment(e.target.value)} className="mt-1 block w-full rounded-xl border border-line bg-white p-3 font-read" />
          </label>
          <p className="mt-1 text-xs text-ink-soft">Please don’t include a child’s name or details. We only use this to improve Gradelings.</p>
          {signedIn && (
            <label className="mt-2 flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={canReply} onChange={(e) => setCanReply(e.target.checked)} className="h-5 w-5" />
              OK to email me back about this
            </label>
          )}
        </>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm font-bold text-nudge-dark">
          {error}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="submit" disabled={busy || (rating === null && !comment.trim())} className="min-h-11 rounded-xl bg-[#253047] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
          {busy ? "Sending…" : "Send"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="min-h-11 rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold">
            {compact ? "Not now" : "Close"}
          </button>
        )}
      </div>
    </form>
  );
}
