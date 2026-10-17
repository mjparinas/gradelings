"use client";

import { useEffect, useMemo, useState } from "react";
import { getUnitRef, loadGrade, parseUnitKey } from "@/content";
import type { FrameworkId, Question } from "@/content/types";
import { BuildQuestion } from "../questions/BuildQuestion";
import { ChoiceQuestion } from "../questions/ChoiceQuestion";
import { CoinsQuestion } from "../questions/CoinsQuestion";
import { InputQuestion } from "../questions/InputQuestion";
import { OrderQuestion } from "../questions/OrderQuestion";
import { SortQuestion } from "../questions/SortQuestion";
import type { QuestionProps, Status } from "../questions/types";
import { QuestionVisual } from "../visuals";
import { TeacherDialog } from "./Dialog";

// "Try it as a student": the unit's questions, played the way a student sees them, with a hint and a second
// try. Nothing is saved or sent, so a teacher can look at what they are about to assign. It reads the unit from
// the content bundle, so it is only opened on a click, never part of the page's first load.

const HOW_MANY = 8;

function Body(props: QuestionProps<Question>) {
  const { q } = props;
  switch (q.kind) {
    case "choice":
      return <ChoiceQuestion {...props} q={q} />;
    case "build":
      return <BuildQuestion {...props} q={q} />;
    case "coins":
      return <CoinsQuestion {...props} q={q} />;
    case "order":
      return <OrderQuestion {...props} q={q} />;
    case "sort":
      return <SortQuestion {...props} q={q} />;
    case "input":
      return <InputQuestion {...props} q={q} />;
  }
}

export function TryUnit({ unitKey, framework, onClose }: { unitKey: string; framework: FrameworkId; onClose: () => void }) {
  const parsed = parseUnitKey(unitKey);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");
  const [round, setRound] = useState(0);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<Status>("answering");
  const [misses, setMisses] = useState(0);
  const [hinted, setHinted] = useState(false);
  const [firstTry, setFirstTry] = useState(0);

  useEffect(() => {
    let live = true;
    if (!parsed) return;
    loadGrade(parsed.grade, framework).then(
      () => live && setState(getUnitRef(unitKey, framework) ? "ready" : "missing"),
      () => live && setState("missing"),
    );
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitKey, framework]);

  const ref = state === "ready" ? getUnitRef(unitKey, framework) : undefined;
  // `round` makes "Try again" draw a fresh set.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => (ref ? ref.unit.generate({ difficulty: 2 }).slice(0, HOW_MANY) : []), [ref, round]);
  const q = questions[index];
  const done = state === "ready" && index >= questions.length;
  const title = ref ? `${ref.unit.emoji} ${ref.unit.title}` : "Try a unit";

  function onAttempt(correct: boolean) {
    if (status === "correct" || status === "revealed") return;
    if (correct) {
      if (misses === 0 && !hinted) setFirstTry((n) => n + 1);
      setStatus("correct");
      return;
    }
    const n = misses + 1;
    setMisses(n);
    setStatus(n >= 2 ? "revealed" : "retry");
  }

  function next() {
    setIndex((i) => i + 1);
    setStatus("answering");
    setMisses(0);
    setHinted(false);
  }

  function again() {
    setRound((r) => r + 1);
    setIndex(0);
    setStatus("answering");
    setMisses(0);
    setHinted(false);
    setFirstTry(0);
  }

  return (
    <TeacherDialog title={`Try as a student: ${title}`} onClose={onClose} wide>
      <p className="mb-4 font-read text-ink-soft">This is what a student sees. Nothing you answer here is saved or counted.</p>
      {state === "loading" && <p role="status" className="py-6 font-read text-lg">Loading the questions…</p>}
      {state === "missing" && <p role="alert" className="py-6 font-read text-lg">That unit could not be loaded. Close this and try again.</p>}
      {state === "ready" && done && (
        <div className="py-2">
          <p role="status" className="text-xl font-bold">
            That was the sample: {firstTry} of {questions.length} right on the first try.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="btn btn-good min-h-11 px-5" onClick={again}>
              Try a new set
            </button>
            <button type="button" className="btn btn-soft min-h-11 px-5" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
      {state === "ready" && q && (
        <div key={`${round}:${index}`}>
          <p className="mb-2 text-sm font-semibold text-ink-soft">
            Question {index + 1} of {questions.length}
          </p>
          <p lang={q.lang} className="mb-4 font-read text-2xl font-bold leading-snug">
            {q.prompt}
          </p>
          {q.visual && (
            <div className="mb-4 flex justify-center" lang={q.visualLang}>
              <QuestionVisual visual={q.visual} />
            </div>
          )}
          {status === "answering" && (
            <div className="mb-4">
              {hinted ? (
                <p className="rounded-2xl border-[3px] border-help bg-help-soft px-4 py-3 font-read text-lg">
                  <span aria-hidden="true">💡 </span>
                  {q.hint}
                </p>
              ) : (
                <button type="button" className="btn btn-soft min-h-11 px-4" onClick={() => setHinted(true)}>
                  <span aria-hidden="true">💡</span> Show the hint
                </button>
              )}
            </div>
          )}
          <Body q={q} status={status} onAttempt={onAttempt} onSlip={() => setStatus("retry")} />
          <div role="status" aria-live="polite" className="mt-4">
            {status === "retry" && <p className="font-read text-lg font-bold">Not quite. A student gets one more try.</p>}
            {status === "correct" && <p className="font-read text-lg font-bold text-good-dark">Right! {q.hint}</p>}
            {status === "revealed" && <p className="font-read text-lg font-bold">Here is how: {q.hint}</p>}
          </div>
          {(status === "correct" || status === "revealed") && (
            <button type="button" className="btn btn-good mt-3 min-h-11 px-5" onClick={next}>
              {index + 1 >= questions.length ? "Finish" : "Next question"}
            </button>
          )}
        </div>
      )}
    </TeacherDialog>
  );
}
