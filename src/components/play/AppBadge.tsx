"use client";

import { useEffect } from "react";
import { applyBadge, badgeCount } from "@/lib/appBadge";
import { unitLevel } from "@/lib/proficiency";
import { loadUnfinished } from "@/lib/resume";
import { useIsOn } from "@/lib/remoteFlags";
import { useActiveProfile, useChildSettings, useDerived, useStore } from "@/lib/store";

/**
 * Keeps the number on the installed app's icon in step with the active child's unfinished homework and lesson
 * (`badgeCount`). Calm mode shows no number, and the badge goes when the child signs out or the flag is off.
 * Renders nothing.
 */
export function AppBadge() {
  const profile = useActiveProfile();
  const settings = useChildSettings();
  const d = useDerived();
  const classwork = useStore((s) => s.classwork);
  const events = useStore((s) => s.events);
  const on = useIsOn()("app-badge");
  const calm = Boolean(settings?.calmMotion);

  useEffect(() => {
    if (!on || calm || !profile) {
      void applyBadge(0);
      return;
    }
    const refresh = () =>
      void applyBadge(
        badgeCount({ classwork, profileId: profile.id, events, level: (k) => unitLevel(d.units[k]), unfinished: loadUnfinished(profile.id), now: Date.now() }),
      );
    refresh();
    // A lesson left partway is saved on the device, not in the store, so look again when the app is hidden or shown.
    document.addEventListener("visibilitychange", refresh);
    return () => document.removeEventListener("visibilitychange", refresh);
  }, [on, calm, profile, classwork, events, d.units]);

  return null;
}
