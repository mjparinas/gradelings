"use client";

import { useState, useSyncExternalStore } from "react";
import { gradeLabel } from "@/lib/gradeLabel";
import type { Profile } from "@/lib/model";
import { useFlag } from "@/lib/remoteFlags";
import { useSay } from "@/lib/say";
import { cardDismissed, dismissCard, gradeUpFor, reportCardSeason, schoolYearOf, summerCardId, summerPeekFor } from "@/lib/schoolYear";
import { useProfiles, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { Panel } from "./common";

// Cards on the Overview that follow the school year (src/lib/schoolYear.ts): move each child up a grade when
// school starts, the summer sneak peek, and the report-card conversation sheet when report cards usually
// come home. Each says what to do in one tap and goes away once it's done or "Got it" is pressed.

const noSubscribe = () => () => {};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const btn = "min-h-11 rounded-xl px-4 py-2 text-sm font-bold";

function GradeUp({ p, now }: { p: Profile; now: number }) {
  const say = useSay();
  const updateProfile = useStore((s) => s.updateProfile);
  const next = gradeUpFor(p, now);
  if (!next) return null;
  const nextName = gradeLabel(next, p.framework);
  const current = gradeLabel(p.grade, p.framework);
  return (
    <Panel className="mb-5 border-[#ffb020]/50 bg-[#fff8e6]">
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">
          🎒
        </span>
        <div className="flex-1">
          <p className="font-bold">
            Is {p.name} starting {nextName}?
          </p>
          <p className="font-read text-sm">{say(`A new school year has started. Moving up gives ${p.name} this year's lessons; everything practised so far is kept.`)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => updateProfile(p.id, { grade: next })} className={`${btn} bg-[#253047] text-white`}>
              Move up to {nextName}
            </button>
            <button type="button" onClick={() => updateProfile(p.id, { gradeYear: schoolYearOf(now) })} className={`${btn} border border-line bg-white`}>
              {cap(current)} is right
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Summer({ profiles, now }: { profiles: Profile[]; now: number }) {
  const say = useSay();
  const id = summerCardId(now);
  const dismissed = useSyncExternalStore(noSubscribe, () => cardDismissed(id), () => true);
  const [hidden, setHidden] = useState(false);
  const peeks = profiles.flatMap((p) => {
    const next = summerPeekFor(p, now);
    return next ? [{ p, next }] : [];
  });
  if (dismissed || hidden || !peeks.length) return null;
  return (
    <Panel className="mb-5 border-[#25b47e]/40 bg-[#eefaf4]">
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">
          ☀️
        </span>
        <div className="flex-1">
          <p className="font-bold">Summer sneak peek</p>
          <p className="font-read text-sm">
            {peeks.map(({ p, next }) => `${p.name} can try ${gradeLabel(next, p.framework)} lessons`).join(", ")}
            {say(" from the Lessons screen, next to this year's review. A few minutes a week keeps this year fresh, and whatever they practise counts once they move up.")}
          </p>
          <button
            type="button"
            onClick={() => {
              dismissCard(id);
              setHidden(true);
            }}
            className={`${btn} mt-3 border border-line bg-white`}
          >
            Got it
          </button>
        </div>
      </div>
    </Panel>
  );
}

function ReportCards({ profiles, now }: { profiles: Profile[]; now: number }) {
  const say = useSay();
  const season = reportCardSeason(now);
  const dismissed = useSyncExternalStore(noSubscribe, () => (season ? cardDismissed(season) : true), () => true);
  const [hidden, setHidden] = useState(false);
  if (!season || dismissed || hidden || !profiles.length) return null;
  return (
    <Panel className="mb-5 border-[#4f8ef7]/40 bg-[#eef4ff]">
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">
          📝
        </span>
        <div className="flex-1">
          <p className="font-bold">Report cards often come home around now</p>
          <p className="font-read text-sm">
            {say("Print a conversation sheet before you talk with the teacher: where practice stands in each subject, what to ask, and a two-week plan. It reflects practice, not a report-card mark.")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profiles.map((p) => (
              <a key={p.id} href={`#/report-cards/${p.id}`} className={`${btn} inline-flex items-center bg-[#253047] text-white`}>
                {profiles.length > 1 ? `${p.name}'s sheet` : "Open the sheet"}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                dismissCard(season);
                setHidden(true);
              }}
              className={`${btn} border border-line bg-white`}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function SchoolYearCards() {
  const on = useFlag("school-year");
  const student = useStore((s) => Boolean(s.family.account?.student));
  const profiles = useProfiles();
  const now = useNow();
  if (!on || student || !now || !profiles.length) return null;
  return (
    <>
      {profiles.map((p) => (
        <GradeUp key={p.id} p={p} now={now} />
      ))}
      <Summer now={now} profiles={profiles} />
      <ReportCards now={now} profiles={profiles} />
    </>
  );
}
