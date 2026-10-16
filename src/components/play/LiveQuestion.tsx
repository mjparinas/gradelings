"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LIVE_POLL_IDLE_MS, LIVE_POLL_OPEN_MS, type LiveForChild } from "@/lib/live";
import { useChildSay } from "@/lib/say";
import { useActiveProfile, useStore } from "@/lib/store";
import { Coin, QuestionVisual, Shape } from "../visuals";

// A question the child's teacher is asking the class right now. It needs a connection: the device
// asks the server for an open question (often while one is open, rarely otherwise) only while it is
// online, visible and the child is in a class. Offline it shows nothing new, and practice carries on
// as always. Live answers never count toward levels, XP or reports.

export interface LiveState {
  live: LiveForChild | null;
  /** A question was showing and the connection dropped. */
  offline: boolean;
  /** Something went wrong sending the answer. */
  note: string;
  answer: (choice: string) => void;
}

export function useLiveQuestion(): LiveState {
  const profile = useActiveProfile();
  const profileId = profile?.id ?? "";
  // Only children in a class (from the last sync, so this is known offline too) ever ask.
  const inClass = useStore((s) => s.classwork.some((c) => c.profileId === profileId));
  const [live, setLive] = useState<LiveForChild | null>(null);
  const [offline, setOffline] = useState(false);
  const [note, setNote] = useState("");
  const liveRef = useRef<LiveForChild | null>(null);
  /** Keeps the ref (read by the polling loop) and the screen in step. */
  const show = useCallback((next: LiveForChild | null) => {
    liveRef.current = next;
    setLive(next);
  }, []);

  // The home screen is keyed by child, so a different child starts with a fresh state.
  useEffect(() => {
    if (!inClass || !profileId) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if (!stopped) timer = setTimeout(poll, liveRef.current ? LIVE_POLL_OPEN_MS : LIVE_POLL_IDLE_MS);
    };
    const poll = async () => {
      if (document.visibilityState !== "visible") return schedule();
      if (navigator.onLine === false) {
        if (liveRef.current) setOffline(true);
        return schedule();
      }
      try {
        const res = await fetch(`/api/live/?profile=${encodeURIComponent(profileId)}`, { credentials: "same-origin", cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { live: LiveForChild | null };
        if (!stopped) {
          // An answer still on its way stays picked rather than flicking back.
          const cur = liveRef.current;
          const next = data.live;
          show(next && cur?.id === next.id && cur.mine && !next.mine ? { ...next, mine: cur.mine } : next);
          setOffline(false);
        }
      } catch {
        // Offline, maintenance or a server hiccup: keep what is on screen and say why it is stuck.
        if (!stopped && liveRef.current) setOffline(true);
      }
      schedule();
    };
    void poll();
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        clearTimeout(timer);
        void poll();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onVisible);
    return () => {
      stopped = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onVisible);
    };
  }, [inClass, profileId, show]);

  const answer = useCallback(
    (choice: string) => {
      const q = liveRef.current;
      if (!q || q.mine || q.answer) return;
      setNote("");
      show({ ...q, mine: choice });
      fetch("/api/live/", { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify({ questionId: q.id, profileId, choice }) })
        .then(async (res) => {
          if (res.ok) return;
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(res.status === 409 ? (data.error ?? "") : "");
        })
        .catch((e: Error) => {
          const now = liveRef.current;
          if (now && now.id === q.id) show({ ...now, mine: null });
          setNote(e.message || "That didn't send. Check the internet and tap again.");
        });
    },
    [profileId, show],
  );

  return { live: inClass ? live : null, offline, note, answer };
}

export function LiveQuestionCard({ state }: { state: LiveState }) {
  const say = useChildSay();
  const { live, offline, note, answer } = state;
  if (!live) return null;
  const q = live.question;
  const revealed = live.answer !== undefined;
  const right = q.choices.find((c) => c.id === live.answer);
  const status = revealed
    ? live.mine === live.answer
      ? "You got it! 🎉"
      : live.mine
        ? `Good try! The answer is ${right?.label ?? ""}.`
        : `The answer is ${right?.label ?? ""}.`
    : live.mine
      ? "Sent! Your teacher will show the answer."
      : "Tap your answer.";
  const tiles = q.choices.some((c) => c.emoji || c.shape || c.coin);
  return (
    <section className="card border-2 border-[#4f8ef7] p-4 sm:p-5" aria-label="Live question from your teacher">
      <h2 className="mb-2 flex items-center justify-between gap-2 text-xl font-bold sm:text-2xl">
        <span>📣 Live question</span>
        <span className="text-sm font-semibold text-ink-soft">{live.className}</span>
      </h2>
      <p lang={q.lang} className="font-read text-xl font-bold sm:text-2xl">
        {q.prompt}
      </p>
      {q.visual && (
        <div lang={q.visualLang ?? q.lang} className="mt-3">
          <QuestionVisual visual={q.visual} />
        </div>
      )}
      <div className={`mt-3 grid gap-3 ${q.choices.length === 2 ? "grid-cols-2" : tiles || q.choices.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"}`}>
        {q.choices.map((c) => {
          const isRight = revealed && c.id === live.answer;
          const isMine = live.mine === c.id;
          return (
            <button
              key={c.id}
              type="button"
              data-quiet
              data-testid="live-choice"
              aria-pressed={isMine}
              data-state={isRight ? "right" : revealed && isMine ? "wrong" : undefined}
              disabled={Boolean(live.mine) || revealed}
              onClick={() => answer(c.id)}
              className={`btn min-h-16 w-full flex-col px-3 py-2 text-xl ${isRight ? "btn-good" : isMine ? "btn-primary" : ""} ${(live.mine || revealed) && !isMine && !isRight ? "opacity-50" : ""}`}
            >
              {c.emoji && <span className="text-4xl leading-none">{c.emoji}</span>}
              {c.shape && <Shape shape={c.shape} size={56} />}
              {c.coin && <Coin cents={c.coin} currency={q.currency} />}
              <span lang={q.choicesLang ?? q.lang} className="font-read leading-tight">
                {c.label}
                {isRight && <span aria-hidden="true"> ✓</span>}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 font-read text-lg font-semibold" aria-live="polite">
        {say(status)}
      </p>
      {revealed && live.hint && live.mine !== live.answer && <p className="font-read text-ink-soft">{live.hint}</p>}
      {note && (
        <p role="alert" className="font-read text-nudge-dark">
          {note}
        </p>
      )}
      {offline && <p className="mt-1 font-read text-ink-soft">{say("📶 Live questions need the internet. Your practice still works offline.")}</p>}
    </section>
  );
}
