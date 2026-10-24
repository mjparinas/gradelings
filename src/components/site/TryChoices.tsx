"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

// A sample question a visitor can answer on the unit's public page, the way the app asks it: a miss shows the hint
// and another try, a second miss shows the answer, and either way the next step is the app with this unit open.
// It takes only the question's choices (drawn on the server) and ids, never the store or the content bundle,
// so the page stays light.

const chip = "inline-flex min-h-11 items-center gap-2 rounded-xl border-2 px-3 py-1.5 font-read text-lg";

export function TryChoices({
  choices,
  answer,
  answerLabel,
  hint,
  play,
  playLabel,
}: {
  choices: { id: string; content: ReactNode }[];
  answer: string;
  /** The right answer as text, for the line after a second miss. */
  answerLabel: string;
  hint: string;
  /** The app link with this unit open (`playHref`). */
  play: string;
  /** "Practise this unit" or "Practice this unit". */
  playLabel: string;
}) {
  const [missed, setMissed] = useState<string[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const right = picked === answer;
  const done = right || missed.length >= 2;

  const pick = (id: string) => {
    if (done || missed.includes(id)) return;
    if (id === answer) setPicked(id);
    else setMissed((m) => [...m, id]);
  };

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-wrap gap-2" aria-label="Choices">
        {choices.map((c) => {
          const state = c.id === answer && done ? "right" : missed.includes(c.id) ? "wrong" : undefined;
          return (
            <li key={c.id}>
              <button
                type="button"
                data-state={state}
                aria-pressed={picked === c.id || missed.includes(c.id)}
                disabled={done && state !== "right"}
                onClick={() => pick(c.id)}
                className={`${chip} ${
                  state === "right"
                    ? "border-good-dark bg-good-soft"
                    : state === "wrong"
                      ? "border-line bg-paper text-ink-soft line-through"
                      : "border-line bg-white hover:border-[#4f8ef7]"
                }`}
              >
                {c.content}
              </button>
            </li>
          );
        })}
      </ul>
      <div aria-live="polite" className="flex flex-col gap-2">
        {!done && missed.length === 1 && (
          <p className="font-read text-lg">
            <b>Not quite, try another!</b> Hint: {hint}
          </p>
        )}
        {done && (
          <>
            <p className="font-read text-lg">
              {right ? (
                <b>That&apos;s right! 🎉</b>
              ) : (
                <>
                  <b>The answer is {answerLabel}.</b> {hint}
                </>
              )}
            </p>
            <Link prefetch={false} href={play} className="btn btn-good min-h-12 self-start px-5 text-lg">
              {playLabel}: new questions every time →
            </Link>
          </>
        )}
        {!done && missed.length === 0 && <p className="font-read text-sm text-ink-soft">Tap an answer to try it.</p>}
      </div>
    </div>
  );
}
