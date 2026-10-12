"use client";

import { dayKey } from "@/lib/model";
import { useFlag } from "@/lib/remoteFlags";
import { askToSaveProgress } from "@/lib/saveNudge";
import { useActiveProfile, useDerived, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";

/**
 * A quiet card for grown-ups under the end-of-lesson buttons: progress is on this device only until a
 * parent makes a free account. The link goes through the parent PIN gate, so a child can't sign anyone up.
 */
export function SaveProgress() {
  const family = useStore((s) => s.family);
  const profile = useActiveProfile();
  const d = useDerived();
  const now = useNow();
  const on = useFlag("save-progress-card");
  if (!on || !profile) return null;
  if (!askToSaveProgress(family, d.totals.sessions, d.days[dayKey(now)]?.sessions ?? 0, now)) return null;
  return (
    <section className="w-full rounded-2xl border-2 border-dashed border-line bg-white/70 p-4 text-left" aria-label="For grown-ups">
      <p className="font-read text-base">
        <b>🔒 For grown-ups:</b> {profile.name}&apos;s progress is saved on this device only. Make a free account to back it up, use it on other devices and get a note before the free trial ends.
      </p>
      <a href="/parents/#/account" className="mt-2 inline-flex min-h-12 items-center font-bold text-[#2f6fd6] underline">
        Save progress
      </a>
    </section>
  );
}
