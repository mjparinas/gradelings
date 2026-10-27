"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getUnitRef, parseUnitKey } from "@/content";
import { DEFAULT_FRAMEWORK, getFramework } from "@/content/frameworks";
import { getSubjectMeta } from "@/content/subjects";
import { gradeLabel } from "@/lib/gradeLabel";
import type { GradeId, SubjectId } from "@/content/types";
import { compareToGrade, latestPlacements, PLACEMENT_SUBJECTS, placementSentence, STAGE_SIZE, type PlacementEvent } from "@/lib/placement";
import { useLocale, useSay } from "@/lib/say";
import { eventsFor, useStore } from "@/lib/store";
import { useGradeContent } from "@/lib/useGradeContent";
import { useFlag } from "@/lib/remoteFlags";
import { setSubjectGrade, subjectGradeFor } from "@/lib/subjectGrades";
import { SelectMenu } from "../SelectMenu";
import type { Profile } from "@/lib/model";
import { ChildTabs, NoChildren, PageTitle, Panel, useChild } from "./common";

function unitTitle(key: string, framework?: string): string {
  const ref = getUnitRef(key);
  if (ref) return `${ref.unit.emoji} ${ref.unit.title}`;
  const parsed = parseUnitKey(key);
  return parsed ? `${gradeLabel(parsed.grade, framework)} · ${parsed.unitId}` : key;
}

/**
 * Which grade's lessons the child practises this subject at (`subjectGrades.ts`): after a placement test, one tap
 * to practise the placed grade in this subject only, a way back to their own grade, and a picker for any grade.
 */
function SubjectLevel({ child, subject, placed }: { child: Profile; subject: SubjectId; placed?: GradeId }) {
  const settings = useStore((s) => s.settings[child.id]);
  const updateSettings = useStore((s) => s.updateSettings);
  const say = useSay();
  const meta = getSubjectMeta(subject);
  const name = meta.title.big.toLowerCase();
  const current = subjectGradeFor(child, settings, subject);
  const own = gradeLabel(child.grade, child.framework);
  const label = (g: GradeId) => gradeLabel(g, child.framework);
  const set = (grade: GradeId) => updateSettings(child.id, setSubjectGrade(child, settings, subject, grade));
  const offerPlaced = placed && placed !== current;
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#4f8ef7]/40 bg-[#eef4ff] p-4">
      <p className="font-read">
        {current === child.grade ? say(`${child.name} practises ${own} ${name}, like the rest of their lessons.`) : say(`${child.name} practises ${label(current)} ${name}. Their other subjects stay at ${own}.`)}
        {offerPlaced && ` ${say(`To practise ${label(placed)} ${name} instead, switch just this subject. Progress is kept either way.`)}`}
      </p>
      <div className="flex flex-wrap items-end gap-3">
        {offerPlaced && (
          <button type="button" onClick={() => set(placed)} className="min-h-11 rounded-xl bg-[#253047] px-3 py-2 text-sm font-bold text-white">
            {say(`Practise ${label(placed)} ${name}`)}
          </button>
        )}
        {current !== child.grade && placed !== child.grade && (
          <button type="button" onClick={() => set(child.grade)} className="btn btn-soft min-h-11 px-3 text-sm">
            {say(`Back to ${own} ${name}`)}
          </button>
        )}
        <SelectMenu
          label={say(`${meta.title.big} lessons from`)}
          value={current}
          onChange={(g) => set(g as GradeId)}
          options={getFramework(child.framework).grades.map((g) => ({ value: g, label: g === child.grade ? `${label(g)} (their grade)` : label(g) }))}
          block={false}
        />
      </div>
    </div>
  );
}

function SubjectResult({ child, subject, result }: { child: Profile; subject: SubjectId; result?: PlacementEvent }) {
  const meta = getSubjectMeta(subject);
  const updateProfile = useStore((s) => s.updateProfile);
  const say = useSay();
  const locale = useLocale();
  const where = result ? compareToGrade(result.placedGrade, child.grade) : "at";
  const levels = useFlag("subject-levels");
  return (
    <Panel>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">
          <span aria-hidden="true">{meta.emoji}</span> {meta.title.big}
        </h2>
        {/* The test runs in the kids' app as the active child. */}
        <Link href={`/play/#/placement/${subject}`} onClick={() => useStore.getState().setActive(child.id)} className="rounded-xl bg-[#253047] px-3 py-2 text-sm font-bold text-white">
          {result ? "Retake" : "Start the test"} →
        </Link>
      </div>
      {!result ? (
        <>
          <p className="mt-3 font-read text-ink-soft">
            Not taken yet. {child.name} answers about 8 to 16 questions, starting at {gradeLabel(child.grade, child.framework)} and moving up or down. It takes about 5 minutes and is not scored out loud, so it stays low-pressure.
          </p>
          {levels && <SubjectLevel child={child} subject={subject} />}
        </>
      ) : (
        <>
          <p className="mt-3 text-lg font-bold">{placementSentence(result, child.name, child.grade, child.framework)}</p>
          <p className="font-read text-sm text-ink-soft">
            Taken {new Date(result.t).toLocaleDateString(locale, { dateStyle: "medium" })}
            {result.confidence === "low" && " · A close call: answers were mixed, so treat this as a starting point."}
          </p>
          <ul className="mt-4 flex flex-col gap-2" aria-label="Results by grade">
            {result.stages.map((s) => (
              <li key={s.grade} className="flex items-center gap-3 text-sm">
                <span className="w-28 shrink-0 font-semibold">{gradeLabel(s.grade as GradeId, child.framework)}</span>
                <span className="h-3 flex-1 overflow-hidden rounded-full bg-black/10" aria-hidden="true">
                  <span className="block h-full rounded-full bg-[#2a78d6]" style={{ width: `${(s.correct / s.total) * 100}%` }} />
                </span>
                <span className="w-24 shrink-0 text-right tabular-nums">
                  {s.correct} of {s.total || STAGE_SIZE} right
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-paper p-4">
              <h3 className="font-bold">Good places to start ({gradeLabel(result.placedGrade, child.framework)})</h3>
              <ul className="mt-1 list-disc pl-5 font-read">
                {result.startUnits.map((k) => (
                  <li key={k}>{unitTitle(k, child.framework)}</li>
                ))}
              </ul>
            </div>
            {result.reviewUnits.length > 0 && (
              <div className="rounded-xl bg-paper p-4">
                <h3 className="font-bold">Worth a quick revisit</h3>
                <ul className="mt-1 list-disc pl-5 font-read">
                  {result.reviewUnits.map((k) => (
                    <li key={k}>{unitTitle(k, child.framework)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {levels ? (
            <SubjectLevel child={child} subject={subject} placed={result.placedGrade} />
          ) : (
            where !== "at" && (
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-[#4f8ef7]/40 bg-[#eef4ff] p-4">
                <p className="min-w-0 flex-1 font-read">
                  {say(`Lessons follow ${child.name}'s grade (${gradeLabel(child.grade, child.framework)}). To practise ${gradeLabel(result.placedGrade, child.framework)} lessons instead, switch the grade. Their progress is kept.`)}
                </p>
                <button type="button" onClick={() => updateProfile(child.id, { grade: result.placedGrade })} className="rounded-xl bg-[#253047] px-3 py-2 text-sm font-bold text-white">
                  {say(`Practise ${gradeLabel(result.placedGrade, child.framework)}`)}
                </button>
              </div>
            )
          )}
        </>
      )}
    </Panel>
  );
}

export function PlacementPage({ childId }: { childId?: string }) {
  const child = useChild(childId);
  const events = useStore((s) => s.events);
  const placements = useMemo(() => (child ? latestPlacements(eventsFor(events, child)) : {}), [events, child]);
  // Results can mention grades other than the child's own, so make sure their lessons are in to show unit names.
  const grades = useMemo(
    () =>
      Object.values(placements).flatMap((p) =>
        [p.placedGrade, ...p.stages.map((s) => s.grade as GradeId)].map((grade) => ({ grade, framework: child?.framework ?? DEFAULT_FRAMEWORK })),
      ),
    [placements, child],
  );
  useGradeContent(grades);
  if (!child) return <NoChildren />;
  return (
    <>
      <PageTitle title="Placement test" sub="A short check of where your child sits against grade-level expectations, so you can pick the right units." />
      <ChildTabs base="placement" current={child} />
      <div className="flex flex-col gap-5">
        {PLACEMENT_SUBJECTS.map((s) => (
          <SubjectResult key={s} child={child} subject={s} result={placements[s]} />
        ))}
        <Panel>
          <p className="font-read text-sm text-ink-soft">
            This is a short snapshot built from the same {getFramework(child.framework).curriculumName} questions used in practice. It is not a report-card mark, and it does not change {child.name}&apos;s stars, XP or levels. Only a teacher decides proficiency. One tricky afternoon can lower a result, so feel free to retake it.
          </p>
        </Panel>
      </div>
    </>
  );
}
