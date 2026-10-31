"use client";

import { useState } from "react";
import { getUnitRef } from "@/content";
import { factSetsFor } from "@/lib/facts";
import { canUse } from "@/lib/plan";
import { useIsOn } from "@/lib/remoteFlags";
import { clearUnfinished, loadUnfinished, resumeHref, type Unfinished } from "@/lib/resume";
import { useActiveProfile, useChildSettings, useStore } from "@/lib/store";
import { ProgressBar } from "../ui";
import { useAllowed } from "./useAllowed";

/** The lesson this child left partway, when it can still be opened here; `dismiss` forgets it. */
export function useUnfinished(dailyDone: boolean): { lesson: Unfinished; dismiss: () => void } | null {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const family = useStore((s) => s.family);
  const allowed = useAllowed();
  const isOn = useIsOn();
  const [lesson, setLesson] = useState(() => loadUnfinished(profile.id));
  if (!lesson || !isOn("resume-lesson") || !stillOpen(lesson)) return null;
  return {
    lesson,
    dismiss: () => {
      clearUnfinished(profile.id);
      setLesson(null);
    },
  };

  function stillOpen(u: Unfinished): boolean {
    const subjects = settings?.enabledSubjects ?? ["math", "language", "science", "social"];
    switch (u.mode) {
      case "practice": {
        const ref = getUnitRef(u.scope, profile.framework);
        return Boolean(ref && subjects.includes(ref.course.subject) && allowed(ref));
      }
      case "daily":
        return !dailyDone && isOn("daily-challenge");
      case "review":
        return canUse(family, "review");
      case "facts":
        return canUse(family, "facts") && isOn("math-facts") && subjects.includes("math") && factSetsFor(profile.grade).some((s) => s.id === u.scope);
      default:
        return false;
    }
  }
}

/** "Finish your lesson?": picks a lesson left partway up at its next question. */
export function ResumeCard({ lesson, onDismiss, little }: { lesson: Unfinished; onDismiss: () => void; little: boolean }) {
  const done = lesson.results.length;
  return (
    <div className="card flex animate-rise-in items-center gap-2 border-good p-2 sm:p-3" data-testid="resume-lesson">
      <a href={resumeHref(lesson)} className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl p-2">
        <span className="text-4xl" aria-hidden="true">
          {lesson.icon}
        </span>
        <span className="flex flex-1 flex-col gap-1">
          <span className="text-sm font-semibold text-ink-soft">{lesson.title}</span>
          <span className={`font-bold ${little ? "text-2xl" : "text-xl"}`}>Finish your lesson?</span>
          <ProgressBar value={done} max={lesson.total} height={10} label={`${done} of ${lesson.total} questions done`} />
        </span>
        <span className="text-2xl" aria-hidden="true">
          ▶
        </span>
      </a>
      <button type="button" className="btn btn-soft h-12 w-12 shrink-0 text-xl" aria-label="Not now" onClick={onDismiss}>
        ✕
      </button>
    </div>
  );
}
