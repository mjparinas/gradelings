"use client";

import { useEffect } from "react";
import { speak, stopSpeaking } from "@/lib/speech";

/** What a buddy's line sounds like: emoji and *stage directions* marks are for the eyes only. */
export function buddySpeech(text: string): string {
  return text
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** The 🔊 button beside a buddy's speech bubble text, like the one on questions. */
export function SayButton({ text }: { text: string }) {
  return (
    <button type="button" className="btn btn-soft h-12 w-12 shrink-0 text-xl" aria-label="Read it to me" onClick={() => speak(buddySpeech(text))}>
      🔊
    </button>
  );
}

/** Reads a buddy's line once when it appears (and again if it changes), when read-aloud is on. */
export function useBuddySays(text: string, on: boolean) {
  useEffect(() => {
    if (!on || !text) return;
    speak(buddySpeech(text));
    return stopSpeaking;
  }, [text, on]);
}
