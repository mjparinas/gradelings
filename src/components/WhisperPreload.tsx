"use client";

import { useEffect } from "react";
import { voiceOn } from "@/lib/model";
import { useFlag } from "@/lib/remoteFlags";
import { useStore } from "@/lib/store";
import { autoDownloadWhisper, WHISPER_AUTO_RETRY_MS } from "@/lib/whisper";

/**
 * Downloads the listening model for answering out loud in the background once the app has opened, when a child on
 * this device has it on (Pre-K to Grade 1 unless a parent turned it off). Never for a class student account. See
 * `autoDownloadWhisper` for when it holds back. Renders nothing.
 */
export function WhisperPreload() {
  const flag = useFlag("voice-practice");
  const wanted = useStore((s) => {
    if (s.family.account?.student) return false;
    return s.profiles.some((p) => !p.deleted && voiceOn(s.settings[p.id], p.grade));
  });
  useEffect(() => {
    if (!flag || !wanted) return;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let tries = 0;
    const run = () => {
      autoDownloadWhisper().catch(() => {
          // A failed download stays quiet and is tried again a little later, a few times.
          if (++tries < 3) retry = setTimeout(run, WHISPER_AUTO_RETRY_MS);
        });
    };
    // After the lessons have loaded, so the model never slows the first question.
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) idle = window.requestIdleCallback(run, { timeout: 15_000 });
    else timer = setTimeout(run, 5000);
    return () => {
      if (idle !== undefined) window.cancelIdleCallback(idle);
      clearTimeout(timer);
      clearTimeout(retry);
    };
  }, [flag, wanted]);
  return null;
}
