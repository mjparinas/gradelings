"use client";

import { useEffect } from "react";
import { languagesOf } from "@/content/subjects";
import { preloadPiperVoices } from "@/lib/piper";
import type { SpeechLanguage } from "@/lib/speech";
import { useStore } from "@/lib/store";

/**
 * Downloads the offline read-aloud voices in the background once the app has opened, but only when
 * a child on this device has "Read questions out loud" on (Kindergarten and Grade 1 by default, or a
 * parent turned it on): English, plus French or Spanish when that child also has a French subject or Spanish. Renders nothing.
 */
export function VoicePreload() {
  // A string (such as "en,es"), so the store hook doesn't hand back a new array on every change.
  const wanted = useStore((s): string => {
    const reading = Object.values(s.settings ?? {}).filter((c) => c.autoRead);
    if (reading.length === 0) return "";
    const others = new Set(reading.flatMap((c) => languagesOf(c.enabledSubjects ?? [])));
    return ["en", ...[...others].sort()].join(",");
  });
  useEffect(() => {
    if (!wanted) return;
    const run = () => void preloadPiperVoices(wanted.split(",") as SpeechLanguage[]);
    // After the lessons have loaded, so the voice never slows the first question.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 10_000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(run, 3000);
    return () => clearTimeout(id);
  }, [wanted]);
  return null;
}
