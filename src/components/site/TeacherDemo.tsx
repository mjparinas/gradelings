"use client";

import type { ReactNode } from "react";
import { Critter } from "../Critter";
import { useCarousel } from "./useCarousel";

// The For teachers hero preview, like the home page's question gallery: four drawn screens of one
// class's week (assign a unit, what the student sees, the results, what to look at next). Nothing
// on it is real or clickable. Every slide sits in the same grid cell, so the card never changes
// size as it turns.

export interface DemoLevel {
  icon: string;
  kidLabel: string;
}

interface Student {
  name: string;
  critter: string;
  /** Index into the framework's four steps, or null before any practice. */
  level: number | null;
  accuracy: number | null;
  attempts: number;
  note?: string;
}

/** The demo class. Names are first names only, as a teacher would see them. */
export const STUDENTS: Student[] = [
  { name: "Priya", critter: "hoot", level: 3, accuracy: 96, attempts: 31 },
  { name: "Ava", critter: "ruby", level: 2, accuracy: 88, attempts: 24 },
  { name: "Mateo", critter: "bolt", level: 0, accuracy: 48, attempts: 9, note: "Finding Multiplication facts tricky" },
  { name: "Lena", critter: "juniper", level: 0, accuracy: 55, attempts: 6, note: "Finding Multiplication facts tricky" },
  { name: "Noah", critter: "ollie", level: null, accuracy: null, attempts: 0, note: "Hasn’t started yet" },
];

const UNIT = "Multiplication facts";
const QUESTION_COUNTS = [5, 10, 15, 20, 30];

const panel = "flex flex-col gap-3 rounded-2xl bg-paper p-3";

function Assign() {
  return (
    <div className={panel}>
      <p className="font-bold">Assign a unit · Room 12</p>
      <div className="flex items-center gap-3 rounded-xl border-2 border-[#4f8ef7] bg-white p-2.5">
        <span className="text-3xl" aria-hidden="true">✖️</span>
        <span className="font-read text-lg font-bold">{UNIT}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-ink-soft">Questions to answer</p>
        <ul className="mt-1 flex gap-2 font-read" aria-label="Question counts">
          {QUESTION_COUNTS.map((n) => (
            <li key={n} className={`min-w-10 rounded-xl border-2 px-2 py-1 text-center ${n === 10 ? "border-[#4f8ef7] bg-[#e8f1ff] font-bold" : "border-line bg-white"}`}>
              {n}
            </li>
          ))}
        </ul>
      </div>
      <p className="font-read text-sm text-ink-soft">Date to aim for: Friday · optional</p>
    </div>
  );
}

function StudentView() {
  return (
    <div className={panel}>
      <p className="flex items-center justify-between gap-2 font-bold">
        <span>🍎 From your teacher</span>
        <span className="text-sm font-semibold text-ink-soft">Room 12</span>
      </p>
      <div className="flex items-center gap-3 rounded-2xl border-2 border-[#4f8ef7] bg-white p-2.5">
        <span className="text-3xl" aria-hidden="true">✖️</span>
        <span className="flex-1">
          <span className="block font-read text-lg font-bold">{UNIT}</span>
          <span className="block text-sm font-semibold text-ink-soft">4 of 10 questions · Try to finish by Fri</span>
          <span className="mt-1 block h-2 rounded-full bg-line" aria-hidden="true">
            <span className="block h-2 w-2/5 rounded-full bg-[#4f8ef7]" />
          </span>
        </span>
        <span aria-hidden="true">▶</span>
      </div>
      <p className="font-read text-sm text-ink-soft">It opens on the student&apos;s own device, even offline, and counts every answer.</p>
    </div>
  );
}

function Results({ levels }: { levels: DemoLevel[] }) {
  return (
    <div className={panel}>
      <p className="font-bold">{UNIT} · results</p>
      <table className="w-full text-left font-read text-xs sm:text-sm">
        <thead>
          <tr className="text-ink-soft">
            <th className="font-semibold">Student</th>
            <th className="font-semibold">Level</th>
            <th className="text-right font-semibold">First try</th>
            <th className="text-right font-semibold">Tries</th>
          </tr>
        </thead>
        <tbody>
          {STUDENTS.map((s) => {
            const level = s.level === null ? undefined : levels[s.level];
            return (
              <tr key={s.name} className="border-t border-line">
                <td className="py-1">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Critter id={s.critter} mood="happy" size={24} />
                    {s.name}
                  </span>
                </td>
                <td>{level ? `${level.icon} ${level.kidLabel}` : "Not started"}</td>
                <td className="text-right">{s.accuracy === null ? "–" : `${s.accuracy}%`}</td>
                <td className="text-right">{s.attempts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Next() {
  const tricky = STUDENTS.filter((s) => s.accuracy !== null && s.accuracy < 60);
  const started = STUDENTS.filter((s) => s.attempts > 0);
  return (
    <div className={panel}>
      <p className="font-bold">What to look at next</p>
      <div className="font-read text-sm">
        <p className="font-bold">Worth a quick reteach</p>
        <p>
          <b>{UNIT}</b>: {tricky.length} of {started.length} who tried it are finding it tricky
        </p>
      </div>
      <div className="font-read text-sm">
        <p className="font-bold">Check in with</p>
        <ul>
          {STUDENTS.filter((s) => s.note).map((s) => (
            <li key={s.name}>
              <b>{s.name}</b>: {s.note}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-ink-soft">This reflects practice, not a report-card mark.</p>
    </div>
  );
}

export function TeacherDemo({ levels }: { levels: DemoLevel[] }) {
  const slides: { label: string; caption: string; body: ReactNode }[] = [
    { label: "Assign", caption: "Pick a unit from your curriculum, and how many questions to answer.", body: <Assign /> },
    { label: "Student view", caption: "It appears on each student's home screen, with no email or password needed.", body: <StudentView /> },
    { label: "Results", caption: "See each student's level, accuracy and attempts as they practise.", body: <Results levels={levels} /> },
    { label: "Next steps", caption: "Know which unit to reteach and who to check in with.", body: <Next /> },
  ];
  const { current, playing, go, regionProps } = useCarousel(slides.length);

  const arrow = "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-ink-soft hover:text-ink";
  const chevron = "flex size-8 items-center justify-center rounded-full border-2 border-line bg-white text-lg leading-none font-bold";

  return (
    <figure className="mx-auto w-full min-w-0 max-w-lg">
      <div role="region" aria-roledescription="carousel" aria-label="A class in action" className="card relative px-11 py-4" {...regionProps}>
        <button type="button" className={`${arrow} left-0`} aria-label="Previous screen" onClick={() => go(-1)}>
          <span className={chevron} aria-hidden="true">‹</span>
        </button>
        <div className="grid" aria-live={playing ? "off" : "polite"}>
          {slides.map((s, i) => {
            const on = i === current;
            return (
              <div
                key={s.label}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
                aria-hidden={!on}
                inert={!on}
                data-current={on || undefined}
                className={`col-start-1 row-start-1 flex flex-col gap-3 motion-safe:transition-opacity motion-safe:duration-500 ${on ? "opacity-100" : "invisible opacity-0"}`}
              >
                <p className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-[#4f8ef7] text-sm font-bold text-[#0f172a]" aria-hidden="true">{i + 1}</span>
                  <span className="text-lg font-bold">{s.label}</span>
                </p>
                {s.body}
                <p className="font-read text-ink-soft">{s.caption}</p>
              </div>
            );
          })}
        </div>
        <button type="button" className={`${arrow} right-0`} aria-label="Next screen" onClick={() => go(1)}>
          <span className={chevron} aria-hidden="true">›</span>
        </button>
        <ol className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
          {slides.map((s, i) => (
            <li key={s.label} className={`size-2 rounded-full ${i === current ? "bg-ink-soft" : "bg-line"}`} />
          ))}
        </ol>
      </div>
      <figcaption className="mt-2 text-center text-sm text-ink-soft">A sample class. Practice results, never a report-card mark.</figcaption>
    </figure>
  );
}
