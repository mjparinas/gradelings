"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { practiceUnitRefs } from "@/content";
import { getSubjectMeta } from "@/content/subjects";
import { APP_NAME } from "@/lib/brand";
import { gradeLabel } from "@/lib/gradeLabel";
import { dayKey } from "@/lib/model";
import { canUse } from "@/lib/plan";
import { buildPracticeSheet } from "@/lib/practiceSheet";
import { useLocale, useSay } from "@/lib/say";
import { useChildSettings, useDerived, useStore, useSubjectGrades } from "@/lib/store";
import { isStoreApp } from "@/lib/twa";
import { SampleQuestion, answerText } from "../site/SampleQuestion";
import { ChildTabs, NoChildren, Panel, useChild } from "./common";

const noSubscribe = () => () => {};

const list = (items: string[]) => (items.length < 3 ? items.join(" and ") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

/** Reports > Practice sheet: a printable sheet made from one child's trickiest units, with an answer key (src/lib/practiceSheet.ts). */
export function PracticeSheetPage({ childId }: { childId?: string }) {
  const child = useChild(childId);
  const family = useStore((s) => s.family);
  const d = useDerived(child?.id ?? null);
  const settings = useChildSettings(child?.id);
  const subjectGrades = useSubjectGrades(child?.id ?? null);
  // Fixed for this view, so the sheet doesn't change while it's open or printing.
  const [now] = useState(() => Date.now());
  const [round, setRound] = useState(0);
  const say = useSay();
  const locale = useLocale();
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  const open = canUse(family, "practiceSheets", now);
  const subjects = settings?.enabledSubjects;
  const sheet = useMemo(() => {
    if (!child || !open) return null;
    return buildPracticeSheet({
      refs: practiceUnitRefs(child.grade, child.framework, subjectGrades),
      derived: d,
      grade: child.grade,
      subjects,
      seed: `${child.id}:${dayKey(now)}:${round}`,
    });
  }, [child, open, d, subjects, subjectGrades, now, round]);
  if (!child) return <NoChildren />;

  const tabs = (
    <div className="print:hidden">
      <ChildTabs base="sheet" current={child} />
    </div>
  );

  if (!open) {
    return (
      <div className="flex flex-col gap-5">
        {tabs}
        <Panel title="Practice sheets">
          <p className="font-read">
            {say(`A printable sheet made for ${child.name} from the units they find trickiest in practice, with an answer key on its own page. A new set of questions whenever you like.`)}
          </p>
          {inStoreApp ? (
            <p className="mt-3 font-read text-ink-soft">Practice sheets are part of the family plan.</p>
          ) : (
            <p className="mt-3 font-read">
              Practice sheets come with the family plan.{" "}
              <a href={family.account ? "#/subscription" : "#/account?next=subscription"} className="font-semibold text-[#2f6fd6] underline">
                See the family plan
              </a>
            </p>
          )}
        </Panel>
      </div>
    );
  }

  if (!sheet || sheet.items.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        {tabs}
        <Panel title="Practice sheets">
          <p className="font-read">
            {say(`Once ${child.name} has practised a few lessons, a printable sheet made from the units they find trickiest will be here, with an answer key.`)}
          </p>
        </Panel>
      </div>
    );
  }

  const label = gradeLabel(child.grade, child.framework);
  const titles = sheet.units.map((u) => u.unit.title);
  return (
    <div className="flex flex-col gap-5">
      {tabs}
      <Panel className="print:border-0 print:p-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">{child.name}&apos;s practice sheet</h2>
            <p className="font-read text-ink-soft">
              {label} · {new Date(now).toLocaleDateString(locale, { dateStyle: "long" })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 print:hidden">
            <button type="button" onClick={() => window.print()} className="rounded-xl border border-line bg-white px-3 py-2 font-semibold">
              🖨️ Print or save as PDF
            </button>
            <button type="button" onClick={() => setRound((r) => r + 1)} className="rounded-xl border border-line bg-white px-3 py-2 font-semibold">
              🔄 New questions
            </button>
          </div>
        </div>
        <p className="mt-2 font-read text-ink-soft">
          {say(`Made from the units ${child.name} is finding trickiest in ${APP_NAME}: ${list(titles)}. The questions are a little easier than in the app, like a Review.`)}
        </p>
        <p className="mt-1 font-read text-sm text-ink-soft print:hidden">It is practice, not a report-card mark. The answer key prints on its own page, so you can keep it aside.</p>

        <ol className="mt-5 grid items-start gap-4 md:grid-cols-2 print:block print:space-y-4">
          {sheet.items.map((it, i) => (
            <SampleQuestion key={`${round}-${i}`} q={it.question} n={i + 1} seedText={it.seed} hideAnswer className="print:break-inside-avoid" />
          ))}
        </ol>

        <section aria-labelledby="sheet-key" className="mt-8 border-t border-line pt-5 print:break-before-page print:border-0">
          <h3 id="sheet-key" className="text-xl font-bold">
            Answer key
          </h3>
          <ol className="mt-3 flex flex-col gap-2 font-read">
            {sheet.items.map((it, i) => (
              <li key={i}>
                <b>{i + 1}.</b> {answerText(it.question)}{" "}
                <span className="text-sm text-ink-soft">
                  ({getSubjectMeta(it.subject).emoji} {it.unitTitle}) Hint: {it.question.hint}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </Panel>
    </div>
  );
}
