"use client";

import { useEffect } from "react";
import { preloadPiperVoices } from "@/lib/piper";
import { useStore } from "@/lib/store";

/**
 * Downloads the offline read-aloud voices in the background once the app has opened, so they're
 * the default from the start rather than after the first read-aloud: English always, French once a
 * child on this device has a French subject switched on. Renders nothing.
 */
export function VoicePreload() {
  const french = useStore((s) => Object.values(s.settings ?? {}).some((c) => c.enabledSubjects?.some((id) => id === "immersion" || id === "core-french")));
  useEffect(() => {
    const run = () => void preloadPiperVoices(french ? ["en", "fr"] : ["en"]);
    // After the lessons have loaded, so the voice never slows the first question.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 10_000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(run, 3000);
    return () => clearTimeout(id);
  }, [french]);
  return null;
}
