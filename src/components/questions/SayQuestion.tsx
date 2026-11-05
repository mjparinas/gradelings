"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { SayQuestion as Q } from "@/content/types";
import { useFlag } from "@/lib/remoteFlags";
import { listen, type Listening } from "@/lib/recorder";
import { countedTo, heardNothing, saidWord } from "@/lib/speechMatch";
import { sounds } from "@/lib/sound";
import { speak } from "@/lib/speech";
import { useChildSettings, useStore } from "@/lib/store";
import { checkWhisper, subscribeWhisper, transcribe, warmWhisper, whisperSnapshot } from "@/lib/whisper";
import { ChoiceQuestion } from "./ChoiceQuestion";
import { isLocked, type QuestionProps } from "./types";

type Phase = "idle" | "listening" | "thinking";

/** Is answering out loud switched on for this child, and ready on this device? */
export function useVoiceReady(): boolean {
  const flag = useFlag("voice-practice");
  const on = Boolean(useChildSettings()?.voice);
  // A class student account never listens, whatever its settings say: schools are promised no microphone.
  const student = useStore((s) => Boolean(s.family.account?.student));
  const whisper = useSyncExternalStore(subscribeWhisper, whisperSnapshot, whisperSnapshot);
  useEffect(() => {
    if (flag && on && !student) void checkWhisper();
  }, [flag, on, student]);
  return flag && on && !student && whisper.state === "ready";
}

/**
 * Say it out loud, or tap. A child who can't or doesn't want to speak taps; one the microphone can't hear is never
 * marked wrong, only asked to try again (and offered the taps after two tries).
 */
export function SayQuestion(props: QuestionProps<Q>) {
  const ready = useVoiceReady();
  const choiceQ = { ...props.q, kind: "choice" as const };
  if (!ready) return <ChoiceQuestion {...props} q={choiceQ} />;
  return <SayWithVoice {...props} choiceQ={choiceQ} />;
}

function SayWithVoice({ q, status, onAttempt, onSpeak, onSlip, choiceQ }: QuestionProps<Q> & { choiceQ: Parameters<typeof ChoiceQuestion>[0]["q"] }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [misses, setMisses] = useState(0);
  const [note, setNote] = useState("");
  const [tapping, setTapping] = useState(false);
  const [level, setLevel] = useState(0);
  const [byVoice, setByVoice] = useState(false);
  const listening = useRef<Listening | null>(null);
  const alive = useRef(true);
  const locked = isLocked(status);

  useEffect(() => {
    alive.current = true;
    // Start loading the model while the child looks at the picture, so the first answer isn't slow.
    warmWhisper().catch(() => {});
    return () => {
      alive.current = false;
      listening.current?.cancel();
    };
  }, []);

  const word = "word" in q.say ? q.say : null;
  const answerLabel = q.choices.find((c) => c.id === q.answer)?.label ?? "";
  const others = q.choices.filter((c) => c.id !== q.answer).map((c) => c.label);

  const heard = (text: string) => (word ? saidWord(text, word.word, others, word.accept) : countedTo(text, (q.say as { count: number }).count));

  const start = async () => {
    if (phase !== "idle" || locked) return;
    setNote("");
    setPhase("listening");
    try {
      const l = listen({ maxMs: word ? 5000 : 12_000, onLevel: (v) => alive.current && setLevel(v) });
      listening.current = l;
      const samples = await l.result;
      if (!alive.current) return;
      if (!samples) return notHeard("I didn't hear anything. Tap the microphone and try again!");
      setPhase("thinking");
      const text = await transcribe(samples, word ? 12 : 48);
      if (!alive.current) return;
      if (!heardNothing(text) && heard(text)) {
        setPhase("idle");
        setByVoice(true);
        onAttempt(true, document.activeElement);
        return;
      }
      notHeard(heardNothing(text) ? "I couldn't hear that. Try again!" : "Almost! Let's try again.");
    } catch {
      if (!alive.current) return;
      setPhase("idle");
      setTapping(true);
      setNote("The microphone isn't working right now. You can tap your answer instead.");
    }
  };

  const notHeard = (message: string) => {
    sounds.tryAgain();
    setPhase("idle");
    const n = misses + 1;
    setMisses(n);
    setNote(message);
    // Two tries is enough: offer the taps without anyone being marked wrong.
    if (n >= 2) setTapping(true);
  };

  if (byVoice && status === "correct") {
    const c = q.choices.find((x) => x.id === q.answer);
    return (
      <div data-testid="say-correct" className="mx-auto flex w-full max-w-xl animate-correct-pop flex-col items-center gap-2 rounded-3xl bg-white p-6 shadow-sm">
        <span className="text-7xl" aria-hidden="true">
          {c?.emoji ?? "🎤"}
        </span>
        <p className="font-read text-4xl font-bold">{answerLabel} ✓</p>
      </div>
    );
  }

  if (tapping || locked) {
    return (
      <div className="flex flex-col items-center gap-4">
        {!locked && note && (
          <p className="font-read text-lg text-ink-soft" role="status">
            {note}
          </p>
        )}
        <ChoiceQuestion q={choiceQ} status={status} onAttempt={onAttempt} onSlip={onSlip} onSpeak={onSpeak} />
        {!locked && (
          <button type="button" data-quiet className="btn btn-soft min-h-14 px-5 text-xl" onClick={() => (setTapping(false), setNote(""))}>
            <span aria-hidden="true">🎤</span> Say it instead
          </button>
        )}
      </div>
    );
  }

  const busy = phase !== "idle";
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4">
      <button
        type="button"
        data-quiet
        data-testid="say-button"
        aria-label={phase === "listening" ? "Listening. Tap to stop." : phase === "thinking" ? "Thinking" : "Say your answer out loud"}
        aria-pressed={phase === "listening"}
        disabled={phase === "thinking"}
        onClick={() => (phase === "listening" ? listening.current?.stop() : void start())}
        className="btn btn-primary relative h-36 w-36 rounded-full text-6xl"
        // The ring follows the child's voice, so they can see the microphone is hearing them.
        style={{ boxShadow: phase === "listening" ? `0 0 0 ${8 + Math.round(level * 28)}px color-mix(in srgb, var(--c) 35%, transparent)` : undefined }}
      >
        <span aria-hidden="true">{phase === "thinking" ? "⏳" : "🎤"}</span>
      </button>
      <p className="font-read text-2xl font-semibold" aria-live="polite" role="status">
        {phase === "listening" ? "I'm listening…" : phase === "thinking" ? "Thinking…" : note || (word ? "Tap and say it!" : "Tap and count out loud!")}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {word && (
          <button type="button" data-quiet className="btn btn-soft min-h-14 px-5 text-xl" disabled={busy} onClick={() => speak(answerLabel)}>
            <span aria-hidden="true">🔊</span> Hear it
          </button>
        )}
        <button type="button" data-quiet className="btn btn-soft min-h-14 px-5 text-xl" disabled={busy} onClick={() => setTapping(true)}>
          Tap instead
        </button>
      </div>
    </div>
  );
}
