"use client";

import { useEffect } from "react";
import { languagesOf } from "@/content/subjects";
import { preloadSupertonicVoices } from "@/lib/supertonic";
import { useStore } from "@/lib/store";

type Wanted = "" | "en" | "en,fr";

/**
 * Downloads the offline read-aloud voices in the background once the app has opened, but only when
 * a child on this device has "Read questions out loud" on (Kindergarten and Grade 1 by default, or a
 * parent turned it on): English, plus French when that child also has a French subject. Renders nothing.
 */
export function VoicePreload() {
  const wanted = useStore((s): Wanted => {
    const reading = Object.values(s.settings ?? {}).filter((c) => c.autoRead);
    if (reading.length === 0) return "";
    return reading.some((c) => languagesOf(c.enabledSubjects ?? []).includes("fr")) ? "en,fr" : "en";
  });
  useEffect(() => {
    if (!wanted) return;
    const run = () => void preloadSupertonicVoices(wanted === "en" ? ["en"] : ["en", "fr"]);
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
