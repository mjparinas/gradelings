"use client";

import Link from "@/components/PublicLink";
import { useState } from "react";
import { TRIAL_DAYS } from "@/lib/plan";
import { AppLink } from "./AppLink";
import { READY_BAND_TEXT, readyBand, type ReadyQuestion } from "./readiness";

// The check itself. Answers live in this component only: nothing is stored or sent. A miss shows the hint and a second
// try, a second miss shows the answer, and only first tries count, like in the app.

const chip = "inline-flex min-h-11 items-center gap-2 rounded-xl border-2 px-3 py-1.5 font-read text-lg";

export function ReadinessCheck({ questions, gradeLabel, previousLabel, play }: { questions: ReadyQuestion[]; gradeLabel: string; previousLabel: string; play: string }) {
  const [index, setIndex] = useState(0);
  const [missed, setMissed] = useState<string[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [firstTry, setFirstTry] = useState<boolean[]>([]);
  const total = questions.length;
  const finished = index >= total;

  if (finished) {
    const right = firstTry.filter(Boolean).length;
    const band = readyBand(right, total);
    const text = READY_BAND_TEXT[band];
    const weak = [...new Map(questions.filter((_, i) => !firstTry[i]).map((q) => [q.skill, q])).values()];
    return (
      <div className="card flex flex-col gap-3 border-2 border-good-dark p-5" data-testid="ready-result" aria-live="polite">
        <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
          {right} of {total} right on the first try
        </p>
        <h2 className="text-3xl font-bold">{text.title}</h2>
        <p className="font-read text-lg">{text.next}</p>
        {weak.length > 0 && (
          <div>
            <h3 className="text-xl font-bold">Skills to look at</h3>
            <ul className="mt-1 flex list-disc flex-col gap-1 pl-5 font-read text-lg">
              {weak.map((q) => (
                <li key={q.skill}>
                  <Link href={q.skillPath} className="font-bold underline">
                    {q.skill}
                  </Link>{" "}
                  (free {previousLabel} worksheet)
                </li>
              ))}
            </ul>
          </div>
        )}
        <AppLink href={play} className="btn btn-good min-h-12 self-start px-5 text-lg">
          Practise {previousLabel} skills →
        </AppLink>
        <p className="font-read text-sm text-ink-soft" data-testid="try-free-note">
          Free for {TRIAL_DAYS} days with everything open. No card needed.
        </p>
        <button
          type="button"
          className="self-start font-read text-sm underline"
          onClick={() => {
            setIndex(0);
            setMissed([]);
            setPicked(null);
            setText("");
            setFirstTry([]);
          }}
        >
          Try the check again
        </button>
        <p className="font-read text-sm text-ink-soft">A quick look at practice, not a report-card mark. Your child&apos;s teacher decides how they are doing.</p>
      </div>
    );
  }

  const q = questions[index];
  const right = picked === q.answer;
  const done = right || missed.length >= 2;

  const norm = (v: string) => v.trim().replace(/\s+/g, "").toLowerCase();
  const check = () => {
    if (done || !text.trim()) return;
    if (q.typed!.accept.some((a) => norm(a) === norm(text))) setPicked(q.answer);
    else setMissed((m) => [...m, text]);
    setText("");
  };
  const pick = (id: string) => {
    if (done || missed.includes(id)) return;
    if (id === q.answer) setPicked(id);
    else setMissed((m) => [...m, id]);
  };
  const next = () => {
    setFirstTry((f) => [...f, right && missed.length === 0]);
    setIndex((i) => i + 1);
    setMissed([]);
    setPicked(null);
    setText("");
  };

  return (
    <div className="card flex flex-col gap-3 p-5" data-testid="ready-question">
      <p className="font-read text-sm text-ink-soft">
        {gradeLabel} readiness check: question {index + 1} of {total}
      </p>
      <p className="text-2xl font-bold">{q.prompt}</p>
      {q.picture && (
        <p className="rounded-xl bg-help-soft p-3 text-center font-read text-3xl" data-testid="ready-picture">
          {q.picture}
        </p>
      )}
      {q.typed && (
        <form
          className="flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            check();
          }}
        >
          <label className="sr-only" htmlFor="ready-answer">
            Your answer
          </label>
          <input
            id="ready-answer"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={done}
            inputMode="text"
            autoComplete="off"
            maxLength={12}
            className="min-h-12 w-36 rounded-xl border-2 border-line bg-white px-3 font-read text-xl"
          />
          {q.typed.suffix && <span className="font-read text-lg">{q.typed.suffix}</span>}
          <button type="submit" disabled={done || !text.trim()} className="btn btn-good min-h-12 px-5 text-lg">
            Check
          </button>
        </form>
      )}
      <ul className="flex flex-wrap gap-2" aria-label="Choices">
        {q.choices.map((c) => {
          const state = c.id === q.answer && done ? "right" : missed.includes(c.id) ? "wrong" : undefined;
          return (
            <li key={c.id}>
              <button
                type="button"
                data-state={state}
                aria-pressed={picked === c.id || missed.includes(c.id)}
                disabled={done || missed.includes(c.id)}
                onClick={() => pick(c.id)}
                className={`${chip} ${state === "right" ? "border-good-dark bg-good-soft" : state === "wrong" ? "border-nudge bg-nudge-soft opacity-70" : "border-line bg-white hover:border-ink"}`}
              >
                {c.label}
                {state === "right" && <span aria-hidden="true"> ✓</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div aria-live="polite" className="flex flex-col gap-2">
        {!done && missed.length === 1 && (
          <p className="font-read text-lg">
            <b>Not quite, try another!</b> Hint: {q.hint}
          </p>
        )}
        {done && (
          <>
            <p className="font-read text-lg">{right ? <b>That&apos;s right! 🎉</b> : <><b>The answer is {q.typed ? q.answer : q.choices.find((c) => c.id === q.answer)?.label}{q.typed?.suffix ? ` ${q.typed.suffix}` : ""}.</b> {q.hint}</>}</p>
            <button type="button" className="btn btn-good min-h-12 self-start px-5 text-lg" onClick={next}>
              {index + 1 === total ? "See how it went →" : "Next question →"}
            </button>
          </>
        )}
        {!done && missed.length === 0 && <p className="font-read text-sm text-ink-soft">{q.typed ? "Type your answer." : "Tap an answer."} There is no timer.</p>}
      </div>
    </div>
  );
}
