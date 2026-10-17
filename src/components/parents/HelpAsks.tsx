"use client";

import { getUnitRef } from "@/content";
import { getSubjectMeta } from "@/content/subjects";
import { recentHelp } from "@/lib/helpAsks";
import type { Profile } from "@/lib/model";
import { useSay } from "@/lib/say";
import { useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";

/** Units a child asked a grown-up to help with in the last two weeks. Renders nothing when there are none. */
export function HelpAsks({ p }: { p: Profile }) {
  const events = useStore((s) => s.events);
  const now = useNow();
  const say = useSay();
  const asks = recentHelp(events, p.id, now, p.resetAt ?? 0);
  if (!asks.length) return null;
  return (
    <div className="mt-4 rounded-xl bg-[#fff6e5] p-3" role="group" aria-label={`${p.name} asked for help`}>
      <p className="font-semibold">🤝 {p.name} asked for help</p>
      <p className="text-sm text-ink-soft">{say("After missing a question twice, they tapped “Ask a grown-up to help”. Sitting with them for a few minutes on one of these can make a real difference.")}</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {asks.slice(0, 5).map((a) => {
          const ref = getUnitRef(a.unit, p.framework);
          const subject = ref ? getSubjectMeta(ref.course.subject) : undefined;
          return (
            <li key={a.unit} className="flex items-center justify-between gap-2 text-sm">
              <span className="font-semibold">
                {ref?.unit.emoji ?? subject?.emoji} {ref?.unit.title ?? "A unit"}
                {subject && <span className="font-normal text-ink-soft"> · {subject.title.big}</span>}
              </span>
              <span className="text-ink-soft">{a.count === 1 ? "once" : `${a.count} times`}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
