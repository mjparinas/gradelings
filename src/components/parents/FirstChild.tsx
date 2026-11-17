"use client";

import { useState } from "react";
import { AVAILABLE_GRADES } from "@/content";
import { getFramework } from "@/content/frameworks";
import type { FrameworkId, GradeId } from "@/content/types";
import { frameworkMenu } from "@/lib/frameworkGroups";
import { gradeLabel } from "@/lib/gradeLabel";
import { useStore } from "@/lib/store";
import { AVATAR_COLOURS } from "../play/Start";
import { SelectMenu } from "../SelectMenu";
import { MAIN_ID } from "@/components/SkipLink";

/** Where the first child's first question is: the child's own Adventure, with no topic to pick. */
export const FIRST_QUESTION_HREF = "/play/#/session?mode=adventure&scope=mix";

/**
 * The step right after a parent confirms their email (owner, November 17, 2026): a name and a grade, then straight
 * into the child's first question. It stands in for the parent PIN screen on a device with no PIN yet (a new PIN
 * would be one more thing to invent before the child has even tried a lesson); the PIN is asked for the next time
 * the parent area opens. Everything else about the child (birth year, avatar, subjects) can wait for Children.
 */
export function FirstChild({ onSkip }: { onSkip: () => void }) {
  const addProfile = useStore((s) => s.addProfile);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<GradeId>("2");
  const [framework, setFramework] = useState<FrameworkId>("ca-bc");
  const [saving, setSaving] = useState(false);
  const chosen = getFramework(framework);

  const start = () => {
    if (!name.trim() || saving) return;
    setSaving(true);
    // addProfile makes this child the active one; give the device database a moment to finish before the page changes.
    addProfile({ name: name.trim(), grade, framework, avatar: "ollie", colour: AVATAR_COLOURS[0] });
    // /play/ is a different app from this page, so it needs a full page load, not a client route change.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.setTimeout(() => window.location.assign(FIRST_QUESTION_HREF), 300);
  };

  return (
    <main id={MAIN_ID} tabIndex={-1} className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-5 px-4 py-6">
      <h1 className="text-3xl font-bold">Who&rsquo;s learning today?</h1>
      <p className="font-read text-lg text-ink-soft">Just a first name and a grade, so questions match what they&rsquo;re learning. It takes under a minute, and your trial has everything open.</p>
      <form
        className="flex flex-col gap-4 text-left"
        onSubmit={(e) => {
          e.preventDefault();
          start();
        }}
      >
        <label className="flex flex-col gap-1">
          <span className="font-semibold">First name or nickname</span>
          <input value={name} maxLength={20} autoFocus autoComplete="off" onChange={(e) => setName(e.target.value)} className="rounded-xl border-2 border-line px-3 py-2 text-lg" />
        </label>
        <SelectMenu
          label="Grade"
          size="lg"
          value={grade}
          onChange={(next) => setGrade(next as GradeId)}
          options={AVAILABLE_GRADES.filter((g) => chosen.grades.includes(g)).map((g) => ({ value: g, label: gradeLabel(g, framework) }))}
        />
        <SelectMenu
          label="Province or state"
          size="lg"
          value={framework}
          onChange={(next) => {
            setFramework(next as FrameworkId);
            if (!getFramework(next).grades.includes(grade)) setGrade("k");
          }}
          {...frameworkMenu((f) => f.name)}
        />
        <button type="submit" disabled={!name.trim() || saving} className="btn btn-good min-h-14 text-xl">
          {saving ? "Getting ready…" : "Start the first question"}
        </button>
      </form>
      <button type="button" className="self-center text-sm font-semibold text-ink-soft underline" onClick={onSkip}>
        I&rsquo;ll do this later
      </button>
    </main>
  );
}
