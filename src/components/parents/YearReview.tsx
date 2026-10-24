"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { getUnitRef, parseUnitKey } from "@/content";
import { getFramework } from "@/content/frameworks";
import { getSubjectMeta } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { gradeLabel } from "@/lib/gradeLabel";
import { countMilestonePath, countTitle } from "@/lib/milestoneShare";
import { useLocale, useSay } from "@/lib/say";
import { useFlag } from "@/lib/remoteFlags";
import { cardDismissed, dismissCard } from "@/lib/schoolYear";
import { eventsFor, useDerived, useProfiles, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { isYearReviewSeason, reviewYearOf, schoolYearName, schoolYearStart, yearReview } from "@/lib/yearReview";
import { ChildTabs, NoChildren, Panel, useChild } from "./common";
import { ShareMilestone } from "./ShareMilestone";

/** How many grown units the page lists before saying "and n more". */
const LIST = 12;

/** A unit whose grade isn't loaded (the child has moved up since): its id, made readable. */
const unitIdText = (key: string) => {
  const id = parseUnitKey(key)?.unitId ?? key;
  return id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " ");
};

/** A printable year in review for one child: the school year so far, from August 1 (src/lib/yearReview.ts). */
export function YearReviewPage({ childId }: { childId?: string }) {
  const child = useChild(childId);
  const events = useStore((s) => s.events);
  const d = useDerived(child?.id ?? null);
  // Fixed for this view, so the page doesn't shift while it's open or printing.
  const [now] = useState(() => Date.now());
  const say = useSay();
  const locale = useLocale();
  const review = useMemo(() => (child ? yearReview(eventsFor(events, child), now, d) : null), [child, events, now, d]);
  if (!child || !review) return <NoChildren />;
  const framework = getFramework(child.framework);
  const scheme = framework.scoringFor(child.grade);
  const date = (t: number) => new Date(t).toLocaleDateString(locale, { month: "long", day: "numeric" });
  const shareTitle = countTitle("year", review.grown.length);
  const tiles: [string, number][] = [
    ["Days practised", review.daysPractised],
    ["Minutes", review.minutes],
    ["Questions", review.answers],
    ["Units grown", review.grown.length],
    ["Stickers", review.stickers],
    ["Trophies", review.trophies],
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="print:hidden">
        <ChildTabs base="year" current={child} />
      </div>
      <Panel className="print:border-0 print:p-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">
              {child.name}&apos;s {schoolYearName(review.year)} school year
            </h2>
            <p className="font-read text-ink-soft">
              {gradeLabel(child.grade, child.framework)} · {framework.curriculumName} · {date(review.from)} to {date(review.to)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            {shareTitle && <ShareMilestone path={countMilestonePath("year", review.grown.length)} what={shareTitle} />}
            <button type="button" onClick={() => window.print()} className="min-h-11 rounded-xl border border-line bg-white px-3 py-2 font-semibold">
              🖨️ Print or save as PDF
            </button>
          </div>
        </div>

        {review.answers === 0 ? (
          <p className="mt-4 font-read text-lg">{say(`${child.name} hasn't practised yet this school year. Any day is a good day to start.`)}</p>
        ) : (
          <>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-3">
              {tiles.map(([label, n]) => (
                <div key={label} className="break-inside-avoid rounded-xl bg-paper p-3">
                  <dt className="text-xs font-semibold text-ink-soft">{say(label)}</dt>
                  <dd className="text-3xl font-bold">{n.toLocaleString(locale)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-read">
              {review.firstTry !== null && `${review.firstTry}% right on the first try. `}
              {review.bestStreak > 1 && say(`Longest run: ${review.bestStreak} days of practice in a row. `)}
              {say(`${review.unitsStarted} ${review.unitsStarted === 1 ? "unit" : "units"} practised this year.`)}
            </p>

            {review.grown.length > 0 && (
              <>
                <h3 className="mt-5 text-lg font-bold">Units that grew</h3>
                <p className="font-read text-sm text-ink-soft">
                  Reached {scheme.levels[2]?.label ?? "the second level"} or higher this school year.
                </p>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {review.grown.slice(0, LIST).map((g) => {
                    const ref = getUnitRef(g.key, framework.id);
                    return (
                      <li key={g.key} className="flex break-inside-avoid items-center justify-between gap-2 rounded-xl border border-line px-3 py-2 text-sm">
                        <span className="font-semibold">{ref ? `${ref.unit.emoji} ${ref.unit.title}` : unitIdText(g.key)}</span>
                        <span className="shrink-0 text-ink-soft">
                          {g.level >= 3 ? "⭐" : "🌳"} {scheme.levels[g.level]?.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {review.grown.length > LIST && <p className="mt-2 font-read text-sm text-ink-soft">and {review.grown.length - LIST} more.</p>}
              </>
            )}

            {review.subjects.length > 0 && (
              <>
                <h3 className="mt-5 text-lg font-bold">Where the questions went</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {review.subjects.map((s) => (
                    <li key={s.subject} className="rounded-xl bg-paper px-3 py-2 text-sm">
                      {getSubjectMeta(s.subject).emoji} {getSubjectMeta(s.subject).title.big}: <b>{s.answers.toLocaleString(locale)}</b>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
        <p className="mt-5 font-read text-sm text-ink-soft">
          This describes practice in {APP_NAME}, not a report-card mark. {child.name}&apos;s teacher decides proficiency.
        </p>
      </Panel>
    </div>
  );
}

const noSubscribe = () => () => {};

/**
 * In June and July, a card on the Overview pointing to each child's year in review. Only children who practised this
 * school year get a button; "Got it" hides it on this device until next June.
 */
export function YearReviewCard() {
  const on = useFlag("year-in-review");
  const student = useStore((s) => Boolean(s.family.account?.student));
  const profiles = useProfiles();
  const events = useStore((s) => s.events);
  const now = useNow();
  const say = useSay();
  const year = now ? reviewYearOf(now) : 0;
  const id = `review-${year}`;
  const dismissed = useSyncExternalStore(noSubscribe, () => cardDismissed(id), () => true);
  const [hidden, setHidden] = useState(false);
  const practised = useMemo(() => {
    if (!now) return [];
    const from = schoolYearStart(year);
    return profiles.filter((p) => eventsFor(events, p).some((e) => e.type === "answer" && e.t >= from));
  }, [profiles, events, now, year]);
  if (!on || student || !now || !isYearReviewSeason(now) || dismissed || hidden || !practised.length) return null;
  return (
    <Panel className="mb-5 border-[#7c4fe0]/40 bg-[#f4efff]">
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">
          🎓
        </span>
        <div className="flex-1">
          <p className="font-bold">The {schoolYearName(year)} school year in review</p>
          <p className="font-read text-sm">{say("Days practised, units grown, stickers and trophies, on one page to print or keep. It reflects practice, not a report-card mark.")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {practised.map((p) => (
              <a key={p.id} href={`#/year/${p.id}`} className="inline-flex min-h-11 items-center rounded-xl bg-[#253047] px-4 py-2 text-sm font-bold text-white">
                {practised.length > 1 ? `${p.name}'s year` : "See the year"}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                dismissCard(id);
                setHidden(true);
              }}
              className="min-h-11 rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </Panel>
  );
}
