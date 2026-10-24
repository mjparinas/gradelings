"use client";

import type { CSSProperties } from "react";
import { coursesForGrade } from "@/content";
import { getSubjectMeta } from "@/content/subjects";
import { onColour } from "@/lib/contrast";
import { gradeLabel } from "@/lib/gradeLabel";
import { useFlag } from "@/lib/remoteFlags";
import { href } from "@/lib/router";
import { useChildSay } from "@/lib/say";
import { nextGrade, summerPeekFor } from "@/lib/schoolYear";
import { useActiveProfile, useChildSettings } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { useBand } from "../band";
import { Critter } from "../Critter";
import { Page, subjectVars } from "../ui";
import { BackButton } from "./Practice";

// The summer sneak peek (src/lib/schoolYear.ts): from mid-June to the end of August, the Lessons screen offers
// next grade's lessons. They are ordinary units of that grade, so whatever a child practises counts once they
// move up, and this year's lessons stay where they were. Nothing is stored for it.

const SUN = "#ffb020";

/** On the Lessons screen in summer: a way into next grade's lessons. */
export function SneakPeekCard() {
  const on = useFlag("school-year");
  const profile = useActiveProfile()!;
  const band = useBand();
  const say = useChildSay();
  const now = useNow();
  const next = now ? summerPeekFor(profile, now) : null;
  if (!on || !next) return null;
  return (
    <a
      href={href("/peek")}
      className="btn w-full items-center justify-start gap-4 p-5 text-left"
      style={{ "--btn-bg": SUN, "--btn-edge": "#d68a00", "--btn-fg": onColour(SUN) } as CSSProperties}
    >
      <span className="text-5xl" aria-hidden="true">
        ☀️
      </span>
      <span className="flex-1">
        <span className="block text-2xl font-bold sm:text-3xl">{band === "little" ? `Peek at ${gradeLabel(next, profile.framework)}!` : "Summer sneak peek"}</span>
        {band !== "little" && <span className="block text-lg">{say(`Try some ${gradeLabel(next, profile.framework)} lessons before school starts.`)}</span>}
      </span>
    </a>
  );
}

/** The next grade's subjects. The app only opens this for the grade after the child's own. */
export function SneakPeek() {
  const profile = useActiveProfile()!;
  const settings = useChildSettings();
  const band = useBand();
  const next = nextGrade(profile.grade);
  if (!next) return null;
  const courses = coursesForGrade(next, profile.framework).filter((c) => (settings?.enabledSubjects ?? []).includes(c.subject));
  const name = gradeLabel(next, profile.framework);
  return (
    <Page className="gap-6">
      <header className="flex items-center gap-3">
        <BackButton to="/practice" />
        <h1 className="text-3xl font-bold sm:text-4xl">
          <span aria-hidden="true">☀️ </span>
          {band === "little" ? `Peek at ${name}` : `${name} sneak peek`}
        </h1>
      </header>
      <p className="font-read text-xl">You can try next year&apos;s lessons now. Everything you learn stays with you!</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((c) => {
          const meta = getSubjectMeta(c.subject);
          return (
            <a
              key={c.subject}
              href={href(`/practice/${c.subject}`, { grade: next })}
              className="btn w-full items-center justify-start gap-4 p-5 text-left"
              style={{ ...subjectVars(meta), "--btn-bg": meta.colour, "--btn-edge": meta.colourDark, "--btn-fg": onColour(meta.colour) } as CSSProperties}
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white p-1.5">
                <Critter id={meta.mascot} size={56} />
              </span>
              <span>
                <span className="block text-2xl font-bold">{meta.title[band]}</span>
                <span className="block text-lg">{c.units.length} lessons</span>
              </span>
            </a>
          );
        })}
      </div>
    </Page>
  );
}
