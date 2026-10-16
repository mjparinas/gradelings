"use client";

import Link from "next/link";
import { useState } from "react";
import { AVAILABLE_GRADES } from "@/content";
import { DEFAULT_FRAMEWORK, FRAMEWORKS, getFramework } from "@/content/frameworks";
import { GRADE_SHORT } from "@/content/subjects";
import { gradeLabel } from "@/lib/gradeLabel";
import type { FrameworkId, GradeId } from "@/content/types";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { MAX_CHILDREN } from "@/lib/plan";
import { sounds } from "@/lib/sound";
import { useDerived, useProfiles, useStore } from "@/lib/store";
import type { Profile } from "@/lib/model";
import { SayButton } from "./BuddySays";
import { AVATARS, Critter, CritterSvg, SpeechBubble } from "../Critter";
import { signInStudent } from "@/lib/account";
import { Page } from "../ui";
import { ProvinceMenu } from "./ProvinceMenu";
import { useFlag } from "@/lib/remoteFlags";
import { readPlayStart, START_ROUTE, type PlayStart } from "@/lib/playLink";
import { useRoute } from "@/lib/router";
import { getKV } from "@/lib/localdb";

/** The province or state and grade a "Try it free" link from a public page asked for (`playHref`), if any. */
export function usePlayStart(): PlayStart | null {
  const { path, query } = useRoute();
  if (`/${path[0] ?? ""}` !== START_ROUTE) return null;
  return readPlayStart(query, (id) => FRAMEWORKS.some((f) => f.id === id));
}

export const AVATAR_COLOURS = ["#ff9636", "#4f8ef7", "#25b47e", "#e9559a", "#8b5cf6", "#06b6d4", "#f5b301", "#ef4444"];

export function Logo({ size = "text-5xl sm:text-6xl" }: { size?: string }) {
  return (
    <h1 className={`${size} font-bold tracking-tight`} aria-label={APP_NAME}>
      {APP_NAME.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" className="inline-block animate-drop-in" style={{ color: WORDMARK_COLOURS[i % WORDMARK_COLOURS.length], animationDelay: `${i * 60}ms` }}>
          {ch}
        </span>
      ))}
    </h1>
  );
}

function GrownUpsLink() {
  return (
    <Link href="/parents/" className="btn h-12 px-4 text-base text-ink-soft">
      🔒 Grown-ups
    </Link>
  );
}

/** First visit: meet the cast, then set up the first child. */
const HELLO = "Hi! I'm Ollie the Otter. My friends and I can't wait to learn and play with you!";

export function FirstRun() {
  const [step, setStep] = useState(0);
  const preset = usePlayStart();
  if (step === 0) {
    return (
      <Page className="items-center justify-center gap-6 text-center short:gap-3">
        <Logo size="text-5xl sm:text-6xl short:text-4xl" />
        <div className="flex items-end justify-center gap-1 sm:gap-3 short:hidden">
          {["hoot", "ruby", "ollie", "bolt", "juniper"].map((id, i) => (
            <div key={id} className="animate-drop-in" style={{ animationDelay: `${300 + i * 120}ms` }}>
              <Critter id={id} mood={id === "ollie" ? "wave" : "happy"} size={id === "ollie" ? 150 : 92} />
            </div>
          ))}
        </div>
        <SpeechBubble className="flex max-w-md animate-pop-in items-center gap-3 text-left">
          <p className="flex-1 font-read text-2xl font-bold leading-snug short:text-lg">{HELLO}</p>
          <SayButton text={HELLO} />
        </SpeechBubble>
        <button type="button" className="btn btn-good min-h-20 w-full max-w-sm animate-pulse-soft text-3xl short:min-h-14 short:text-2xl" onClick={() => setStep(1)}>
          Let&apos;s go! →
        </button>
        <GrownUpsLink />
        <button type="button" className="text-base font-semibold text-ink-soft underline" onClick={() => setStep(-1)}>
          My teacher gave me a code
        </button>
      </Page>
    );
  }
  if (step === -1) return <ClassSignIn onBack={() => setStep(0)} />;
  return <NewChild onDone={() => {}} first preset={preset} />;
}

/**
 * A student signs in with the one code on their login card. Cards printed before one-code sign-in
 * also carry a class code, so that field appears when the child says their card has one.
 */
export function ClassSignIn({ onBack }: { onBack: () => void }) {
  const [code, setCode] = useState("");
  const [twoCodes, setTwoCodes] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const clean = (v: string, length: number) => v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, length);
  // One-code cards print the code as two groups of five, so the field shows it the same way.
  const shown = !twoCodes && code.length > 5 ? `${code.slice(0, 5)}-${code.slice(5)}` : code;
  const ready = twoCodes ? classCode.length === 6 && code.length >= 8 : code.length === 10;
  const field = "mt-1 min-h-16 w-full rounded-2xl border-2 border-line bg-white px-3 text-center font-mono font-bold uppercase";
  return (
    <Page className="items-center justify-center gap-5 text-center">
      <Critter id="ollie" mood="wave" size={110} />
      <h1 className="text-3xl font-bold">Sign in to your class</h1>
      <form
        className="flex w-full max-w-sm flex-col gap-4 text-left"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setErr("");
          try {
            await signInStudent(code, twoCodes ? classCode : "");
          } catch (x) {
            setErr((x as Error).message);
            setBusy(false);
          }
        }}
      >
        {twoCodes && (
          <label className="block text-lg font-bold">
            Class code
            <input className={`${field} text-3xl tracking-[0.3em]`} value={classCode} onChange={(e) => setClassCode(clean(e.target.value, 6))} autoComplete="off" autoCapitalize="characters" spellCheck={false} inputMode="text" maxLength={6} required />
          </label>
        )}
        <label className="block text-lg font-bold">
          My code
          <input
            className={`${field} ${twoCodes ? "text-3xl tracking-[0.3em]" : "text-2xl tracking-[0.15em] narrow:text-xl narrow:tracking-[0.1em]"}`}
            value={shown}
            onChange={(e) => setCode(clean(e.target.value, 10))}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            inputMode="text"
            maxLength={twoCodes ? 10 : 11}
            required
          />
        </label>
        {err && (
          <p role="alert" className="rounded-2xl bg-white p-3 text-center font-read text-lg text-nudge-dark">
            {err}
          </p>
        )}
        <button className="btn btn-good min-h-16 text-2xl" disabled={busy || !ready}>
          {busy ? "Signing in…" : "Let's go! →"}
        </button>
      </form>
      <button
        type="button"
        className="min-h-11 text-base font-semibold text-ink-soft underline"
        onClick={() => {
          setTwoCodes(!twoCodes);
          setErr("");
        }}
      >
        {twoCodes ? "My card has just one code" : "My card has a class code too"}
      </button>
      <button type="button" className="text-base font-semibold text-ink-soft underline" onClick={onBack}>
        ← Back
      </button>
    </Page>
  );
}

/** Name, grade and avatar. Used on first run, from the picker, and in the parent area. */
export function NewChild({ onDone, onCancel, first = false, preset = null }: { onDone: (id: string) => void; onCancel?: () => void; first?: boolean; preset?: PlayStart | null }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<GradeId | null>(preset?.grade && AVAILABLE_GRADES.includes(preset.grade) ? preset.grade : null);
  const [avatar, setAvatar] = useState(AVATARS[0].id);
  const addProfile = useStore((s) => s.addProfile);
  const signedIn = useStore((s) => Boolean(s.family.account));
  const askEmail = useFlag("email-at-start") && first && !signedIn;
  const [asking, setAsking] = useState(false);
  const ready = name.trim().length > 0 && grade !== null;
  const [frameworkId, setFrameworkId] = useState<FrameworkId>(preset?.framework ?? DEFAULT_FRAMEWORK);
  const framework = getFramework(frameworkId);

  const add = () => {
    if (!grade) return "";
    const idx = AVATARS.findIndex((c) => c.id === avatar);
    const id = addProfile({ name, avatar, colour: AVATAR_COLOURS[idx % AVATAR_COLOURS.length], grade, framework: frameworkId });
    sounds.complete();
    onDone(id);
    return id;
  };

  if (asking) return <EmailReports name={name.trim()} onPlay={add} />;

  return (
    <Page className="items-center justify-center gap-6 text-center">
      <div className="flex items-center gap-3">
        <Critter id="ollie" mood="happy" size={100} />
        <SpeechBubble className="flex items-center gap-3">
          <p className="font-read text-2xl font-bold">{first ? "What's your name?" : "Who's joining us?"}</p>
          <SayButton text={first ? "What's your name?" : "Who's joining us?"} />
        </SpeechBubble>
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 16))}
        placeholder="Type a name"
        aria-label="Name"
        autoComplete="off"
        className="w-full max-w-md rounded-2xl border-4 border-line bg-white px-5 py-4 text-center font-read text-3xl font-bold focus:border-[#4f8ef7]"
      />

      <div className="w-full max-w-2xl">
        <p className="mb-3 text-2xl font-semibold">What grade?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {AVAILABLE_GRADES.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={grade === g}
              onClick={() => setGrade(g)}
              className={`btn h-16 min-w-16 px-4 text-2xl ${grade === g ? "btn-good scale-110" : ""}`}
              aria-label={gradeLabel(g, frameworkId)}
            >
              {GRADE_SHORT[g]}
            </button>
          ))}
        </div>
        <p className="mt-2 font-read text-sm text-ink-soft">
          {grade ? `${gradeLabel(grade, frameworkId)} · ${framework.curriculumName}` : "K means Kindergarten."}
        </p>
        {FRAMEWORKS.length > 1 && <ProvinceMenu value={frameworkId} onChange={setFrameworkId} />}
      </div>

      <div>
        <p className="mb-3 text-2xl font-semibold">Pick your animal</p>
        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6">
          {AVATARS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              aria-label={`${c.name} the ${c.species}`}
              aria-pressed={c.id === avatar}
              onClick={() => setAvatar(c.id)}
              className={`btn h-20 w-20 p-1 sm:h-24 sm:w-24 ${c.id === avatar ? "scale-110" : ""}`}
              style={c.id === avatar ? { background: AVATAR_COLOURS[i % AVATAR_COLOURS.length] } : undefined}
            >
              <CritterSvg id={c.id} mood={c.id === avatar ? "cheer" : "happy"} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col gap-3">
        <button
          type="button"
          disabled={!ready}
          className={`btn btn-good min-h-20 text-3xl ${ready ? "" : "opacity-50"}`}
          onClick={() => {
            if (!grade) return;
            if (askEmail) setAsking(true);
            else add();
          }}
        >
          Start!
        </button>
        {onCancel && (
          <button type="button" className="btn min-h-14 text-xl" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </Page>
  );
}

/**
 * First run on a device with no account: before the child starts, one screen for the grown-up offers the progress
 * emails, which need a free account. "Let's play" is the big button, so a child who is setting up alone just
 * carries on; the account link goes through the parent PIN gate, like the save-progress card.
 */
function EmailReports({ name, onPlay }: { name: string; onPlay: () => void }) {
  return (
    <Page className="items-center justify-center gap-6 text-center">
      <Critter id="ollie" mood="happy" size={100} />
      <section className="w-full max-w-md rounded-2xl border-2 border-dashed border-line bg-white/80 p-5 text-left" aria-labelledby="grown-ups">
        <h2 id="grown-ups" className="text-2xl font-bold">
          🔒 For grown-ups
        </h2>
        <p className="mt-2 font-read text-lg">
          Get {name ? `${name}'s` : "your child's"} progress by email: a weekly summary in report-card words, and a note before the free trial ends. It takes a free account, which also backs up progress.
        </p>
        <a
          href="/parents/#/account"
          className="btn mt-4 min-h-14 w-full text-lg"
          onClick={async (e) => {
            // Add the child first, and wait until the device has saved them, so nothing typed here is lost on the
            // way to the parent area (a read queues behind the writes before it).
            e.preventDefault();
            const target = e.currentTarget.href;
            onPlay();
            await getKV("profiles").catch(() => undefined);
            window.location.assign(target);
          }}
        >
          Email me the reports
        </a>
      </section>
      <button type="button" className="btn btn-good min-h-20 w-full max-w-md text-3xl short:min-h-14 short:text-2xl" onClick={onPlay}>
        Not now, let&apos;s play! →
      </button>
    </Page>
  );
}

function PlayerTile({ p, onPick }: { p: Profile; onPick: () => void }) {
  const d = useDerived(p.id);
  return (
    <button type="button" className="btn w-full flex-col gap-1 p-4" onClick={onPick}>
      <span className="flex h-24 w-24 items-center justify-center rounded-full p-1" style={{ background: p.colour }}>
        <CritterSvg id={p.avatar} />
      </span>
      <span className="text-2xl font-bold">{p.name}</span>
      <span className="text-base text-ink-soft">
        {gradeLabel(p.grade, p.framework)} · Lv {d.level}
      </span>
    </button>
  );
}

export function Picker() {
  const profiles = useProfiles();
  const setActive = useStore((s) => s.setActive);
  const [adding, setAdding] = useState(false);
  if (adding) return <NewChild onDone={() => setAdding(false)} onCancel={() => setAdding(false)} />;
  return (
    <Page className="items-center justify-center gap-8 text-center">
      <Logo />
      <div className="flex items-center gap-3">
        <Critter id="ollie" mood="wave" size={110} />
        <SpeechBubble className="flex items-center gap-3">
          <p className="font-read text-2xl font-bold">Who&apos;s learning today?</p>
          <SayButton text="Who's learning today?" />
        </SpeechBubble>
      </div>
      <div className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {profiles.map((p, i) => (
          <div key={p.id} className="animate-rise-in" style={{ animationDelay: `${i * 80}ms` }}>
            <PlayerTile p={p} onPick={() => setActive(p.id)} />
          </div>
        ))}
        {profiles.length < MAX_CHILDREN && (
          <div className="animate-rise-in" style={{ animationDelay: `${profiles.length * 80}ms` }}>
            <button type="button" className="btn h-full min-h-48 w-full flex-col gap-2 border-dashed p-4 text-ink-soft" onClick={() => setAdding(true)}>
              <span className="text-5xl">＋</span>
              <span className="text-xl font-bold">Add player</span>
            </button>
          </div>
        )}
      </div>
      <GrownUpsLink />
    </Page>
  );
}
