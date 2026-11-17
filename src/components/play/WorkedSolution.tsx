"use client";

import { useState } from "react";
import type { WorkedSolution as Solution } from "@/lib/workedSolution";

/**
 * A question worked out one step at a time on a little board (flag `worked-solutions`). Each tap draws the next step;
 * the lines a step adds slide in. Nothing is logged or scored: it is help after a revealed answer.
 */
export function WorkedSolution({ solution, onClose }: { solution: Solution; onClose: () => void }) {
  const [at, setAt] = useState(0);
  const step = solution.steps[at];
  const last = at >= solution.steps.length - 1;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-label={solution.title} onClick={onClose}>
      <div className="my-auto flex w-full max-w-xl animate-pop-in flex-col gap-4 rounded-3xl bg-paper p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold">
          <span aria-hidden="true">✏️</span> {solution.title}
        </h2>
        <div
          className="overflow-x-auto rounded-2xl border-2 border-ink/10 bg-white p-4 font-mono text-xl leading-relaxed text-ink sm:text-2xl"
          role="img"
          aria-label={`The board: ${step.board.join(", ").replace(/\s+/g, " ")}`}
          data-testid="board"
        >
          {step.board.map((line, i) => (
            <div key={`${at}-${i}`} className={`whitespace-pre ${i >= step.fresh ? "animate-rise-in font-bold text-[#2f6fd6]" : ""}`}>
              {line}
            </div>
          ))}
        </div>
        <p aria-live="polite" className="font-read text-xl leading-snug text-ink">
          {step.say}
        </p>
        <p className="text-center text-sm font-bold text-ink-soft" aria-hidden="true">
          Step {at + 1} of {solution.steps.length}
        </p>
        <div className="flex gap-3">
          {at > 0 && (
            <button type="button" className="btn min-h-14 flex-1 text-xl" onClick={() => setAt(at - 1)}>
              ← Back
            </button>
          )}
          {last ? (
            <button type="button" autoFocus className="btn btn-good min-h-14 flex-[2] text-xl" onClick={onClose}>
              Got it
            </button>
          ) : (
            <button type="button" autoFocus className="btn btn-primary min-h-14 flex-[2] text-xl" onClick={() => setAt(at + 1)}>
              Next step →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
