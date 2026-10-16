"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { coursesForGrade, getUnitRef, loadGrade } from "@/content";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { GRADE_ORDER, getSubjectMeta, gradeSlug } from "@/content/subjects";
import type { FrameworkId, GradeId } from "@/content/types";
import { DateField } from "@/components/DateField";
import { SelectMenu } from "@/components/SelectMenu";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { addedMessage, agoText, call, checkNameList, dueChips, type ClassBadge, classInsights, HOMEWORK_GOALS, homeworkOverview, isHomeworkDone, isUsClass, US_CLASS_CONSENT, type ClassInvite, type MissedQuestion, type ClassSummary, type RosterEntry, type StudentRow, type TeacherEntry } from "@/lib/classroom";
import { frameworkGroups, frameworkMenu } from "@/lib/frameworkGroups";
import { classSignInHref } from "@/lib/playLink";
import { classCsv } from "@/lib/classCsv";
import { countryOf } from "@/lib/country";
import { gradeLabel } from "@/lib/gradeLabel";
import { levelInfo } from "@/lib/proficiency";
import { go, useRoute } from "@/lib/router";
import { sayFor } from "@/lib/say";
import { MAIN_ID, SkipLink } from "@/components/SkipLink";
import { AccountPage } from "./AccountPage";
import { TeacherDialog } from "./Dialog";
import { LiveClass } from "./LiveClass";
import { QrCode } from "./QrCode";

// The teacher area: create a class, share its code, assign units and see each linked student's
// practice results. Each class follows one province, territory or state (FRAMEWORKS). It talks to the server only (no kids' store), so it stays light.
// Like the parent area it uses hash routes: #/ lists the classes and #/class/{id}/{tab} opens one class on a tab.

/** "Province" while only Canada is offered, "Province or state" once a US state is. */
const REGION_LABEL = frameworkGroups(FRAMEWORKS).length > 1 ? "Province or state" : "Province";

/** The class page's tabs, like the parent area's sections. Progress is the everyday view, so it comes first. */
const CLASS_TABS = [
  { path: "progress", label: "Progress", icon: "📈" },
  { path: "homework", label: "Homework", icon: "📝" },
  { path: "live", label: "Live", icon: "🙋" },
  { path: "students", label: "Students", icon: "🧒" },
  { path: "settings", label: "Settings", icon: "⚙️" },
] as const;
type ClassTab = (typeof CLASS_TABS)[number]["path"];

/** A hash link to one tab of a class. Progress is the class's own address. */
const classHref = (id: string, tab: ClassTab = "progress") => `#/class/${encodeURIComponent(id)}${tab === "progress" ? "" : `/${tab}`}`;

/** "Grade 3", or "Grades 3 and 4" for a split class (US: "3rd grade", "3rd and 4th grade"). */
function classGradeText(c: { grade: string; grade2?: string | null; framework: string }): string {
  const first = gradeLabel(c.grade as GradeId, c.framework);
  if (!c.grade2) return first;
  const second = gradeLabel(c.grade2 as GradeId, c.framework);
  const plain = (g: string) => g.replace(/^Grade /, "").replace(/ grade$/, "");
  return /^Grade /.test(first) ? `Grades ${plain(first)} and ${plain(second)}` : `${plain(first)} and ${second}`;
}

/** The class a year later: each grade one up, or null once a grade has no next one. */
function nextGradeOf(c: { grade: GradeId; grade2?: GradeId | null; framework: string }) {
  const up = (g: GradeId) => GRADE_ORDER[GRADE_ORDER.indexOf(g) + 1] as GradeId | undefined;
  const grade = up(c.grade);
  const grade2 = c.grade2 ? up(c.grade2) : null;
  return grade && (!c.grade2 || grade2) ? { grade, grade2: grade2 ?? null, framework: c.framework } : null;
}

/** The grade next to `grade` a class could share (a split class), as menu options after "None". */
function secondGradeOptions(grade: GradeId, framework: string) {
  const i = GRADE_ORDER.indexOf(grade);
  return [{ value: "", label: "None" }, ...[GRADE_ORDER[i - 1], GRADE_ORDER[i + 1]].filter(Boolean).map((g) => ({ value: g, label: gradeLabel(g, framework) }))];
}

/** The browser tab's title, so history and screen readers say where the teacher is: "Room 3 · Homework · For teachers · Gradelings". */
const setPageTitle = (...parts: string[]) => {
  document.title = [...parts, "For teachers", APP_NAME].join(" · ");
};

/** How often an open Progress tab asks for fresh results. */
const PROGRESS_REFRESH_MS = 90_000;

const pct = (v: number) => `${Math.round(v * 100)}%`;
const btn = "min-h-11 rounded-xl px-4 font-bold";

function AuthForm({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setNotice("");
    try {
      if (mode === "forgot") {
        // Always answers the same way, so it never says whether an email has an account.
        setNotice((await call<{ message: string }>("/api/auth/forgot/", "POST", { email })).message);
      } else {
        await call(mode === "in" ? "/api/auth/login/" : "/api/auth/signup/", "POST", { email, password });
        onDone();
      }
    } catch (x) {
      setErr((x as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const switchTo = (next: typeof mode) => {
    setMode(next);
    setErr("");
    setNotice("");
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-8 flex max-w-sm flex-col gap-3 rounded-2xl border border-line bg-white p-5">
      <h1 className="text-2xl font-bold">{mode === "in" ? "Teacher sign in" : mode === "up" ? "Create a teacher account" : "Reset your password"}</h1>
      {mode !== "forgot" && (
        <p className="font-read text-ink-soft">
          {APP_NAME} for teachers is where you set up a class, assign practice by unit and see how each student is doing. Students sign in with a code you give them, with no email needed, and you only see first names and practice results.
        </p>
      )}
      <label className="flex flex-col text-sm font-semibold">
        Email
        <input className="mt-1 min-h-11 rounded-xl border border-line px-3" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      {mode !== "forgot" && (
        <label className="flex flex-col text-sm font-semibold">
          Password
          <input className="mt-1 min-h-11 rounded-xl border border-line px-3" type="password" autoComplete={mode === "in" ? "current-password" : "new-password"} minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
      )}
      {err && (
        <p role="alert" className="text-nudge-dark">
          {err}
        </p>
      )}
      {notice && (
        <p role="status" className="font-read text-ink-soft">
          {notice}
        </p>
      )}
      <button disabled={busy} className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`}>
        {mode === "in" ? "Sign in" : mode === "up" ? "Create account" : "Email me a reset link"}
      </button>
      {mode === "in" && (
        <button type="button" className="text-sm font-semibold underline" onClick={() => switchTo("forgot")}>
          Forgot your password?
        </button>
      )}
      <button type="button" className="text-sm font-semibold underline" onClick={() => switchTo(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "New here? Create an account" : mode === "up" ? "Have an account? Sign in" : "Back to sign in"}
      </button>
    </form>
  );
}

/** Classes show children's first names and results, so the account's email has to be confirmed first. */
function ConfirmEmail({ email }: { email?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [err, setErr] = useState("");
  const resend = async () => {
    setState("sending");
    setErr("");
    try {
      await call("/api/auth/resend-verification/", "POST");
      setState("sent");
    } catch (x) {
      setErr((x as Error).message);
      setState("idle");
    }
  };
  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-4" aria-label="Confirm your email">
      <h2 className="text-xl font-bold">Confirm your email to create a class</h2>
      <p className="mt-1 font-read text-ink-soft">
        Classes show students’ first names and practice results, so we ask teachers to confirm their email first. Open the link we sent{email ? ` to ${email}` : ""} (check spam too), then reload this page.
      </p>
      <button type="button" disabled={state !== "idle"} className={`${btn} mt-3 border border-line disabled:opacity-50`} onClick={() => void resend()}>
        {state === "sent" ? "Sent. Check your inbox" : "Send the link again"}
      </button>
      {err && (
        <p role="alert" className="mt-2 text-nudge-dark">
          {err}
        </p>
      )}
    </section>
  );
}

const HIDDEN_KEY = "gradelings.teacher.hiddenClasses";
const CHECKLIST_KEY = "gradelings.teacher.hideChecklist";
const GOAL_KEY = "gradelings.teacher.lastQuestions";

/** Per-device choices (classes hidden from the list, the checklist put away). Storage can be blocked, so it never throws. */
function readStore(key: string): string {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
function writeStore(key: string, value: string) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    // Not saved: the choice lasts until the page is reloaded.
  }
}

type ClassSort = "created" | "attention" | "recent";
const SORTS = [
  { value: "created", label: "Order created" },
  { value: "attention", label: "Needs attention" },
  { value: "recent", label: "Last practice" },
];

function ClassBadges({ badge, students, now }: { badge?: ClassBadge; students: number; now: number }) {
  if (!badge || students === 0) return null;
  const pill = "rounded-full px-2 py-0.5 text-sm font-semibold";
  return (
    <span className="mt-2 flex flex-wrap gap-2">
      {badge.checkIn > 0 && <span className={`${pill} bg-[#ffe9c7] text-[#5b3a00]`}>{badge.checkIn} to check in with</span>}
      {badge.pastDue > 0 && <span className={`${pill} bg-[#ffd9d9] text-[#7a1212]`}>{badge.pastDue} past due</span>}
      <span className={`${pill} bg-[#eef0f4] text-ink-soft`}>{badge.lastPractice === null ? "No practice yet" : `Last practice ${agoText(badge.lastPractice, now)}`}</span>
    </span>
  );
}

function ClassList({ onOpen, account }: { onOpen: (id: string) => void; account: { email?: string; verified?: boolean } }) {
  const [classes, setClasses] = useState<ClassSummary[] | null>(null);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<GradeId>("3");
  const [grade2, setGrade2] = useState("");
  const [framework, setFramework] = useState<FrameworkId>("ca-bc");
  const [invites, setInvites] = useState<ClassInvite[]>([]);
  const [err, setErr] = useState("");
  const [badges, setBadges] = useState<Record<string, ClassBadge>>({});
  const [now, setNow] = useState(() => Date.now());
  const [sort, setSort] = useState<ClassSort>("created");
  const [hidden, setHidden] = useState<string[]>(() => readStore(HIDDEN_KEY).split(",").filter(Boolean));
  const [showHidden, setShowHidden] = useState(false);
  const [notice, setNotice] = useState("");

  const hide = (id: string, on: boolean) => {
    const next = on ? [...new Set([...hidden, id])] : hidden.filter((h) => h !== id);
    setHidden(next);
    writeStore(HIDDEN_KEY, next.join(","));
    setNotice(on ? "Class hidden from this list on this device." : "Class shown again.");
  };
  const load = useCallback(() => {
    call<{ classes: ClassSummary[] }>("/api/classes/")
      .then((r) => {
        setClasses(r.classes);
        // The badges read every student's history, so they come after the list has shown. A failure just leaves them off.
        if (r.classes.some((c) => c.students > 0)) {
          call<{ badges?: Record<string, ClassBadge> }>("/api/classes/?badges=1")
            .then((b) => {
              setBadges(b.badges ?? {});
              setNow(Date.now());
            })
            .catch(() => undefined);
        }
      })
      .catch((e: Error) => setErr(e.message));
    call<{ invites?: ClassInvite[] }>("/api/classes/invites/")
      .then((r) => setInvites(r.invites ?? []))
      .catch(() => setInvites([]));
  }, []);
  const answer = async (invite: ClassInvite, accept: boolean) => {
    setErr("");
    try {
      if (accept) await call("/api/classes/invites/", "POST", { classId: invite.classId });
      else await call(`/api/classes/invites/?classId=${encodeURIComponent(invite.classId)}`, "DELETE");
      load();
    } catch (x) {
      setErr((x as Error).message);
    }
  };
  useEffect(load, [load]);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      const { class: c } = await call<{ class: ClassSummary }>("/api/classes/", "POST", { name, grade, ...(grade2 ? { grade2 } : {}), framework });
      setGrade2("");
      setName("");
      onOpen(c.id);
    } catch (x) {
      setErr((x as Error).message);
    }
  };

  const attention = (c: ClassSummary) => (badges[c.id] ? badges[c.id].pastDue * 2 + badges[c.id].checkIn : -1);
  const sorted = [...(classes ?? [])].sort((a, b) => {
    if (sort === "attention") return attention(b) - attention(a);
    if (sort === "recent") return (badges[b.id]?.lastPractice ?? -1) - (badges[a.id]?.lastPractice ?? -1);
    return 0;
  });
  const hiddenNow = sorted.filter((c) => hidden.includes(c.id));
  const visible = sorted.filter((c) => showHidden || !hidden.includes(c.id));

  return (
    <>
      <h1 className="text-3xl font-bold">Your classes</h1>
      {account.verified === false && <ConfirmEmail email={account.email} />}
      {classes?.length === 0 && <p className="mt-2 font-read text-ink-soft">No classes yet. Create one below, then give families the class code.</p>}
      {invites.length > 0 && (
        <section className="mt-4 rounded-2xl border border-line bg-white p-4" aria-label="Invitations to co-teach">
          <h2 className="text-xl font-bold">Invitations to co-teach</h2>
          <ul className="mt-2 divide-y divide-line">
            {invites.map((i) => (
              <li key={i.classId} className="flex flex-wrap items-center gap-3 py-2">
                <span className="min-w-48 flex-1 font-read">
                  <b>{i.name}</b> ({gradeLabel(i.grade as GradeId, i.framework)}) from {i.from}
                </span>
                <button type="button" className={`${btn} bg-[#25b47e] text-[#0f172a]`} onClick={() => void answer(i, true)}>
                  Accept
                </button>
                <button type="button" className={`${btn} border border-line`} onClick={() => void answer(i, false)}>
                  Decline
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
      {(classes?.length ?? 0) > 1 && (
        <div className="mt-4">
          <SelectMenu label="Sort classes by" block={false} value={sort} onChange={(next) => setSort(next as ClassSort)} options={SORTS} />
        </div>
      )}
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {visible.map((c) => (
          <li key={c.id} className="flex flex-col rounded-2xl border border-line bg-white">
            <button type="button" onClick={() => onOpen(c.id)} className="w-full flex-1 rounded-2xl p-4 text-left">
              <span className="block text-xl font-bold">{c.name}</span>
              <span className="block font-read text-ink-soft">
                {classGradeText(c)} · {getFramework(c.framework as FrameworkId).region} · {c.students} {c.students === 1 ? "student" : "students"}{c.role === "co-teacher" ? " · you co-teach" : ""} · code <b className="font-mono tracking-widest">{c.joinCode}</b>
              </span>
              <ClassBadges badge={badges[c.id]} students={c.students} now={now} />
            </button>
            <div className="px-4 pb-2">
              <button type="button" aria-label={hidden.includes(c.id) ? `Show ${c.name} again` : `Hide ${c.name} from this list`} className="inline-flex min-h-11 items-center text-sm font-semibold text-ink-soft underline" onClick={() => hide(c.id, !hidden.includes(c.id))}>
                {hidden.includes(c.id) ? "Show again" : "Hide"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {hiddenNow.length > 0 && (
        <p className="mt-2 font-read text-sm text-ink-soft">
          <button type="button" aria-expanded={showHidden} className="inline-flex min-h-11 items-center font-semibold underline" onClick={() => setShowHidden((v) => !v)}>
            {showHidden ? "Hide finished classes again" : `Show ${hiddenNow.length} hidden ${hiddenNow.length === 1 ? "class" : "classes"}`}
          </button>{" "}
          Hiding only tidies this list on this device. The class and its students aren’t changed.
        </p>
      )}
      <p role="status" className="sr-only">
        {notice}
      </p>
      <form onSubmit={create} className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-line bg-white p-4">
        <label className="flex flex-col text-sm font-semibold">
          Class name
          <input className="mt-1 min-h-11 rounded-xl border border-line px-3" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} required />
        </label>
        <SelectMenu label="Grade" block={false} value={grade} onChange={(next) => { setGrade(next as GradeId); setGrade2(""); }} options={GRADE_ORDER.map((g) => ({ value: g, label: gradeLabel(g, framework) }))} />
        <SelectMenu label="Second grade (split class)" block={false} value={grade2} onChange={setGrade2} options={secondGradeOptions(grade, framework)} />
        <SelectMenu label={REGION_LABEL} block={false} value={framework} onChange={(next) => setFramework(next as FrameworkId)} {...frameworkMenu((f) => f.region)} />
        <button disabled={account.verified === false} className={`${btn} bg-[#25b47e] text-[#0f172a] disabled:opacity-50`}>Create class</button>
        {isUsClass(getFramework(framework)) && <p className="w-full font-read text-sm text-ink-soft">{US_CLASS_CONSENT}</p>}
      </form>
      {err && (
        <p role="alert" className="mt-3 text-nudge-dark">
          {err}
        </p>
      )}
    </>
  );
}

/** Updated 2 minutes ago · Refresh. Re-renders now and then so the wording stays true. */
function UpdatedAgo({ at, busy, onRefresh }: { at: number; busy: boolean; onRefresh: () => void }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="mt-1 text-sm text-ink-soft">
      Updated {agoText(at, Math.max(now, at))} ·{" "}
      <button type="button" disabled={busy} className="inline-flex min-h-11 items-center font-semibold underline disabled:opacity-50" onClick={onRefresh}>
        {busy ? "Refreshing…" : "Refresh"}
      </button>
    </p>
  );
}

/** Three steps for a new class, shown on Progress until they are done (or put away on this device). */
function FirstRun({ students, assignments, tabLink }: { students: StudentRow[]; assignments: string[]; tabLink: (t: ClassTab, text: string) => ReactNode }) {
  // Read when the class page has already loaded in the browser, so it never differs from the server's page.
  const [hideIt, setHideIt] = useState(() => readStore(CHECKLIST_KEY) === "1");
  const steps = [
    { done: students.length > 0, text: "Add your students", link: tabLink("students", "Open Students") },
    { done: assignments.length > 0, text: "Assign a unit to practise", link: tabLink("homework", "Open Homework") },
    { done: students.some((s) => s.lastActive !== null), text: "Give students their login cards or the class code, so they can start", link: tabLink("students", "Print cards on Students") },
  ];
  if (hideIt || steps.every((s) => s.done)) return null;
  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5" aria-label="Getting started">
      <h2 className="text-xl font-bold">Getting started</h2>
      <ol className="mt-2 space-y-1 font-read">
        {steps.map((s) => (
          <li key={s.text} className="flex flex-wrap items-center gap-x-3">
            <span aria-hidden="true">{s.done ? "✅" : "⬜"}</span>
            <span className="sr-only">{s.done ? "Done: " : "To do: "}</span>
            <span className={s.done ? "text-ink-soft line-through" : ""}>{s.text}</span>
            {!s.done && <span className="[&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center">{s.link}</span>}
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold underline"
        onClick={() => {
          writeStore(CHECKLIST_KEY, "1");
          setHideIt(true);
        }}
      >
        Hide this checklist
      </button>
    </section>
  );
}

/** Sends a change to the server and reloads the class. `success` is what is said on screen afterwards (default "Saved."), or built from the server's answer. */
export type ChangeFn = (url: string, method: string, body?: unknown, success?: string | ((response: unknown) => string), undo?: (response: unknown) => UndoOffer) => Promise<boolean>;

/** What "Undo" does after a change that can be taken back: the words shown, and the call that brings it back. */
export interface UndoOffer {
  text: string;
  run: () => Promise<unknown>;
}

export interface ClassDetail {
  class: { id: string; name: string; grade: GradeId; grade2?: GradeId | null; framework: FrameworkId; joinCode: string };
  assignments: string[];
  due: Record<string, number>;
  /** Homework question counts by unit key. Older servers omit it. */
  goal?: Record<string, number>;
  /** When each unit was assigned (ms). Older servers omit it. */
  assignedAt?: Record<string, number>;
  /** The students a unit is for, by unit key. Units for the whole class are not listed. Older servers omit it. */
  audience?: Record<string, string[]>;
  /** Questions several students missed on the first try, by unit key (only for answers given since this was added). Older servers omit it. */
  missed?: Record<string, MissedQuestion[]>;
  students: StudentRow[];
  roster: RosterEntry[];
  role?: "owner" | "co-teacher";
  teachers?: TeacherEntry[];
  invites?: { email: string; createdAt: number }[];
}

/** A date input's value ("2026-10-14") as the end of that day, local time. */
const endOfDay = (v: string) => new Date(`${v}T23:59:00`).getTime();
const toInput = (t: number) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Who an assignment is for: the whole class, or chosen students. Nothing chosen means everyone, so "chosen" asks for at least one. */
function AudiencePicker({ students, who, picked, onWho, onPicked, name }: { students: StudentRow[]; who: "all" | "some"; picked: string[]; onWho: (w: "all" | "some") => void; onPicked: (ids: string[]) => void; name: string }) {
  return (
    <fieldset className="flex flex-col gap-1 text-sm font-semibold">
      <legend className="mb-1">{name}</legend>
      <div className="flex flex-wrap gap-4">
        <label className="flex min-h-11 items-center gap-2">
          <input type="radio" name={`${name}-who`} checked={who === "all"} onChange={() => onWho("all")} /> Whole class
        </label>
        <label className="flex min-h-11 items-center gap-2">
          <input type="radio" name={`${name}-who`} checked={who === "some"} onChange={() => onWho("some")} /> Chosen students
        </label>
      </div>
      {who === "some" && (
        <ul className="grid gap-x-4 sm:grid-cols-2">
          {students.map((s) => (
            <li key={s.profileId}>
              <label className="flex min-h-11 items-center gap-2 font-normal">
                <input type="checkbox" checked={picked.includes(s.profileId)} onChange={(e) => onPicked(e.target.checked ? [...picked, s.profileId] : picked.filter((id) => id !== s.profileId))} /> {s.name}
              </label>
            </li>
          ))}
          {students.length === 0 && <li className="font-normal text-ink-soft">No students yet.</li>}
        </ul>
      )}
    </fieldset>
  );
}

/** "12 of 24 done", who is behind and whether it is past due, under one assigned unit. */
function HomeworkProgress({ status }: { status?: { assigned: number; done: number; behind: string[]; overdue: boolean } }) {
  if (!status || status.assigned === 0) return null;
  const names = status.behind.slice(0, 5).join(", ") + (status.behind.length > 5 ? ` and ${status.behind.length - 5} more` : "");
  return (
    <p className="basis-full text-sm text-ink-soft">
      <b className={status.overdue ? "text-nudge-dark" : undefined}>
        {status.done} of {status.assigned} done{status.overdue ? " · past due" : ""}
      </b>
      {status.behind.length > 0 && <> · Still to finish: {names}</>}
    </p>
  );
}

/** Who one assigned unit is for. Shows a short summary; Change opens the picker. */
function RowAudience({ unitLabel, students, current, onSave }: { unitLabel: string; students: StudentRow[]; current: string[]; onSave: (ids: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [who, setWho] = useState<"all" | "some">(current.length ? "some" : "all");
  const [picked, setPicked] = useState(current);
  const summary = current.length === 0 ? "Whole class" : `${current.length} ${current.length === 1 ? "student" : "students"}`;
  return (
    <div className="basis-full">
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Who gets ${unitLabel}: ${summary}`}
        className="min-h-11 rounded-xl border border-line px-3 text-sm font-semibold"
        onClick={() => {
          setWho(current.length ? "some" : "all");
          setPicked(current);
          setOpen(!open);
        }}
      >
        For: {summary}
      </button>
      {open && (
        <div className="mt-2 rounded-xl border border-line p-3">
          <AudiencePicker students={students} who={who} picked={picked} onWho={setWho} onPicked={setPicked} name={`Students for ${unitLabel}`} />
          <button
            type="button"
            disabled={who === "some" && picked.length === 0}
            className={`${btn} mt-2 bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`}
            onClick={() => {
              onSave(who === "all" ? [] : picked);
              setOpen(false);
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

/** Fix a student's name or, in a split class, their grade. Their codes and practice stay. */
function EditStudent({ cls, student, onClose, onSave }: { cls: ClassDetail["class"]; student?: StudentRow; onClose: () => void; onSave: (body: { name: string; grade: GradeId }) => Promise<void> }) {
  const [name, setName] = useState(student?.name ?? "");
  const [grade, setGrade] = useState<GradeId>((student?.grade as GradeId | undefined) ?? cls.grade);
  const [busy, setBusy] = useState(false);
  return (
    <TeacherDialog title={`Edit ${student?.name ?? "student"}`} onClose={onClose}>
      <form
        className="flex flex-col gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          await onSave({ name: name.trim(), grade });
          setBusy(false);
        }}
      >
        <label className="flex flex-col text-sm font-semibold">
          First name or nickname
          <input className="mt-1 min-h-11 rounded-xl border border-line px-3" value={name} maxLength={20} onChange={(e) => setName(e.target.value)} required />
        </label>
        {cls.grade2 && <SelectMenu label="Grade" value={grade} onChange={(next) => setGrade(next as GradeId)} options={[cls.grade, cls.grade2].map((g) => ({ value: g, label: gradeLabel(g, cls.framework) }))} />}
        <p className="font-read text-sm text-ink-soft">Their login code and practice stay as they are.</p>
        <button disabled={busy || !name.trim()} className="min-h-12 rounded-xl bg-[#4f8ef7] font-bold text-[#0f172a] disabled:opacity-50">
          Save
        </button>
        <button type="button" className="min-h-12 rounded-xl border-2 border-line font-bold" onClick={onClose}>
          Cancel
        </button>
      </form>
    </TeacherDialog>
  );
}

/** Add students by first name, share each one's login code, and print the cards. */
function Roster({ data, onChange, onBulk, onPrint }: { data: ClassDetail; onChange: ChangeFn; onBulk: (calls: { url: string; method: string; body?: unknown }[], success?: string) => Promise<boolean>; onPrint: (ids?: string[]) => void }) {
  const [names, setNames] = useState("");
  const [busy, setBusy] = useState(false);
  const [removing, setRemoving] = useState<RosterEntry | null>(null);
  const [chosen, setChosen] = useState<string[]>([]);
  const [removingMany, setRemovingMany] = useState(false);
  const [editing, setEditing] = useState<RosterEntry | null>(null);
  const { class: cls, roster, students } = data;
  // A split class asks which grade the new students are in.
  const [newGrade, setNewGrade] = useState<GradeId>(cls.grade);
  const isOwner = (data.role ?? "owner") === "owner";
  const byProfile = new Map(students.map((s) => [s.profileId, s]));
  const typed = checkNameList(names, students.map((s) => s.name));
  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5 print:hidden">
      <h2 className="text-xl font-bold">Student logins</h2>
      <p className="mt-1 font-read text-ink-soft">
        Add students by first name or nickname. Each gets a code to sign in with at {APP_NAME} (no email or password). The class stores only that name, the class grade and practice results, and deletes it all when you remove the student or close the class.
      </p>
      {isUsClass(getFramework(cls.framework)) && <p className="mt-2 font-read text-ink-soft">{US_CLASS_CONSENT}</p>}
      {roster.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex min-h-11 items-center gap-2 text-sm font-semibold">
            <input type="checkbox" className="h-5 w-5" checked={chosen.length === roster.length} onChange={(e) => setChosen(e.target.checked ? roster.map((r) => r.id) : [])} />
            Select all
          </label>
          {chosen.length > 0 && (
            <>
              <span className="text-sm text-ink-soft" role="status">{chosen.length} selected</span>
              <button type="button" className="min-h-11 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => onPrint(chosen)}>
                Print cards for selected
              </button>
              <button
                type="button"
                className="min-h-11 rounded-xl border border-line px-3 text-sm font-semibold"
                onClick={async () => {
                  if (await onBulk(chosen.map((id) => ({ url: `/api/classes/students/?classId=${cls.id}&studentId=${id}`, method: "PATCH" })), `New codes made for ${chosen.length} ${chosen.length === 1 ? "student" : "students"}.`)) setChosen([]);
                }}
              >
                New codes for selected
              </button>
              {isOwner && (
                <button type="button" className="min-h-11 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => setRemovingMany(true)}>
                  Remove selected
                </button>
              )}
            </>
          )}
        </div>
      )}
      {roster.length > 0 && (
        <ul className="mt-3 divide-y divide-line">
          {roster.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-3 py-2">
              <input type="checkbox" className="h-5 w-5" aria-label={`Select ${byProfile.get(r.profileId)?.name ?? "student"}`} checked={chosen.includes(r.id)} onChange={(e) => setChosen(e.target.checked ? [...chosen, r.id] : chosen.filter((id) => id !== r.id))} />
              <span className="min-w-32 flex-1 font-read font-bold">
                {byProfile.get(r.profileId)?.name ?? "Student"}
                {cls.grade2 && byProfile.get(r.profileId) && <span className="block text-sm font-normal text-ink-soft">{gradeLabel(byProfile.get(r.profileId)!.grade as GradeId, cls.framework)}</span>}
              </span>
              <span className="font-mono text-xl font-bold tracking-widest" aria-label={`Login code ${r.loginCode.split("").join(" ")}`}>
                {r.loginCode}
              </span>
              <button type="button" className="min-h-11 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => {
                const who = byProfile.get(r.profileId)?.name ?? "The student";
                const url = `/api/classes/students/?classId=${cls.id}&studentId=${r.id}`;
                void onChange(url, "PATCH", undefined, undefined, (res) => ({
                  text: `${who} has a new code: ${(res as { loginCode: string }).loginCode}`,
                  run: () => onChange(url, "PATCH", { undo: true }, (back) => `${who}’s old code works again: ${(back as { loginCode: string }).loginCode}`),
                }));
              }}>
                New code
              </button>
              <button type="button" aria-label={`Edit ${byProfile.get(r.profileId)?.name ?? "student"}`} className="min-h-11 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => setEditing(r)}>
                Edit
              </button>
              {isOwner && (
                <button type="button" className="min-h-11 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => setRemoving(r)}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <form
        className="mt-3 flex flex-col gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          // Keep the typed names when adding them failed, so nothing has to be retyped.
          if (await onChange("/api/classes/students/", "POST", { classId: cls.id, names: typed.names, ...(cls.grade2 ? { grade: newGrade } : {}) }, (res) => {
            const r = res as { students?: unknown[]; skipped?: number; limit?: number };
            return addedMessage(r.students?.length ?? typed.names.length, r.skipped ?? 0, r.limit ?? 40);
          })) setNames("");
          setBusy(false);
        }}
      >
        <label className="flex flex-col text-sm font-semibold">
          First names, one per line
          <textarea className="mt-1 min-h-24 rounded-xl border border-line px-3 py-2 font-read" value={names} onChange={(e) => setNames(e.target.value)} placeholder={"Maya\nSam\nAlex P."} maxLength={1200} aria-describedby={typed.warnings.length ? "name-warnings" : undefined} />
        </label>
        {typed.warnings.length > 0 && (
          <ul id="name-warnings" className="font-read text-sm text-nudge-dark">
            {typed.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-3">
          {cls.grade2 && (
            <SelectMenu label="Their grade" block={false} value={newGrade} onChange={(next) => setNewGrade(next as GradeId)} options={[cls.grade, cls.grade2].map((g) => ({ value: g, label: gradeLabel(g, cls.framework) }))} />
          )}
          <button disabled={busy || !names.trim()} className={`${btn} bg-[#25b47e] text-[#0f172a] disabled:opacity-50`}>
            Add students
          </button>
          {roster.length > 0 && (
            <button type="button" className={`${btn} border border-line`} onClick={() => onPrint()}>
              Print login cards
            </button>
          )}
        </div>
      </form>
      <p className="mt-2 text-sm text-ink-soft">
        Students sign in at {APP_NAME} with the class code <b className="font-mono">{cls.joinCode}</b> and their own code. Keep the cards somewhere private.
      </p>
      {removingMany && (
        <TeacherDialog title={`Remove ${chosen.length} ${chosen.length === 1 ? "student" : "students"}?`} onClose={() => setRemovingMany(false)}>
          <p className="mb-5 font-read text-ink-soft">Their accounts and practice history are deleted and can’t be brought back.</p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="min-h-12 rounded-xl bg-[#ff9f43] font-bold text-[#0f172a]"
              onClick={async () => {
                setRemovingMany(false);
                if (await onBulk(chosen.map((id) => ({ url: `/api/classes/students/?classId=${cls.id}&studentId=${id}`, method: "DELETE" })), `${chosen.length} ${chosen.length === 1 ? "student was" : "students were"} removed.`)) setChosen([]);
              }}
            >
              Yes, remove
            </button>
            <button type="button" className="min-h-12 rounded-xl border-2 border-line font-bold" onClick={() => setRemovingMany(false)}>
              Cancel
            </button>
          </div>
        </TeacherDialog>
      )}
      {editing && (
        <EditStudent
          key={editing.id}
          cls={cls}
          student={byProfile.get(editing.profileId)}
          onClose={() => setEditing(null)}
          onSave={async (body) => {
            if (await onChange(`/api/classes/students/?classId=${cls.id}&studentId=${editing.id}`, "PATCH", body, `${body.name} saved.`)) setEditing(null);
          }}
        />
      )}
      {removing && (
        <TeacherDialog title={`Remove ${byProfile.get(removing.profileId)?.name ?? "this student"}?`} onClose={() => setRemoving(null)}>
          <p className="mb-5 font-read text-ink-soft">Their practice history is deleted and can’t be brought back.</p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="min-h-12 rounded-xl bg-[#ff9f43] font-bold text-[#0f172a]"
              onClick={() => {
                const student = removing;
                setRemoving(null);
                void onChange(`/api/classes/students/?classId=${cls.id}&studentId=${student.id}`, "DELETE", undefined, `${byProfile.get(student.profileId)?.name ?? "The student"} was removed.`);
              }}
            >
              Yes, remove
            </button>
            <button type="button" className="min-h-12 rounded-xl border-2 border-line font-bold" onClick={() => setRemoving(null)}>
              Cancel
            </button>
          </div>
        </TeacherDialog>
      )}
    </section>
  );
}

/** The people who teach this class. The owner invites and removes co-teachers; a co-teacher can leave. */
function Team({ data, onChange, onLeave }: { data: ClassDetail; onChange: ChangeFn; onLeave: (url: string) => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const isOwner = (data.role ?? "owner") === "owner";
  const teachers = data.teachers ?? [];
  const invites = data.invites ?? [];
  const id = data.class.id;
  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5 print:hidden">
      <h2 className="text-xl font-bold">Teachers</h2>
      <p className="mt-1 font-read text-ink-soft">
        {isOwner
          ? "Invite a colleague with a teacher account to share this class. Co-teachers see the same students and results, can assign units, add students and print cards. Only you can close the class, change the class code, remove students or manage co-teachers."
          : "You co-teach this class. You can see the students and results, assign units, add students and print cards. The owner closes the class and manages who else teaches it."}
      </p>
      <ul className="mt-3 divide-y divide-line">
        {teachers.map((t) => (
          <li key={t.id} className="flex flex-wrap items-center gap-3 py-2">
            <span className="min-w-48 flex-1 font-read">
              {t.email} <span className="text-sm text-ink-soft">({t.role === "owner" ? "owner" : "co-teacher"})</span>
            </span>
            {isOwner && t.role === "co-teacher" && (
              <button type="button" aria-label={`Remove ${t.email}`} className="min-h-11 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => void onChange(`/api/classes/teachers/?classId=${id}&teacherId=${encodeURIComponent(t.id)}`, "DELETE", undefined, "Co-teacher removed.")}>
                Remove
              </button>
            )}
          </li>
        ))}
        {invites.map((i) => (
          <li key={i.email} className="flex flex-wrap items-center gap-3 py-2">
            <span className="min-w-48 flex-1 font-read">
              {i.email} <span className="text-sm text-ink-soft">(invited, waiting to accept)</span>
            </span>
            <button type="button" aria-label={`Cancel invitation for ${i.email}`} className="min-h-11 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => void onChange(`/api/classes/teachers/?classId=${id}&invite=${encodeURIComponent(i.email)}`, "DELETE", undefined, "Invitation cancelled.")}>
              Cancel
            </button>
          </li>
        ))}
      </ul>
      {isOwner ? (
        <form
          className="mt-3 flex flex-wrap items-end gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!(await onChange("/api/classes/teachers/", "POST", { classId: id, email }, "Invitation sent."))) return;
            setEmail("");
            setSent(true);
          }}
        >
          <label className="flex flex-col text-sm font-semibold">
            Colleague’s account email
            <input type="email" className="mt-1 min-h-11 rounded-xl border border-line px-3" value={email} maxLength={254} onChange={(e) => { setEmail(e.target.value); setSent(false); }} required />
          </label>
          <button className={`${btn} bg-[#4f8ef7] text-[#0f172a]`}>Invite co-teacher</button>
          {sent && <p role="status" className="basis-full text-sm text-ink-soft">Invitation sent. If that email belongs to a confirmed account, they’ll see it on their teacher page for 14 days.</p>}
        </form>
      ) : (
        <button type="button" className={`${btn} mt-3 border border-line`} onClick={() => onLeave(`/api/classes/teachers/?classId=${id}&leave=1`)}>
          Leave this class
        </button>
      )}
    </section>
  );
}

/** Which units to revisit and which students to check in with. Practice only, never a mark. */
function Insights({ data, label }: { data: ClassDetail; label: (key: string) => string }) {
  const [now] = useState(() => Date.now());
  const { assignments, students } = data;
  const say = sayFor(getFramework(data.class.framework));
  const insights = classInsights(students, assignments, label, now);
  if (!students.length || !assignments.length) return null;
  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5 print:hidden">
      <h2 className="text-xl font-bold">What to look at next</h2>
      {insights.focusUnits.length === 0 && insights.checkIn.length === 0 ? (
        <p className="mt-2 font-read text-ink-soft">{say("Nothing stands out. Everyone who has practised is doing fine on the assigned units.")}</p>
      ) : (
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="font-bold">Worth a quick reteach</h3>
            {insights.focusUnits.length === 0 ? (
              <p className="font-read text-ink-soft">No unit is giving a lot of the class trouble.</p>
            ) : (
              <ul className="mt-1 font-read">
                {insights.focusUnits.map((u) => (
                  <li key={u.key}>
                    <b>{label(u.key)}</b>: {u.needHand.length} of {u.started} who tried it {u.needHand.length === 1 ? "is" : "are"} finding it tricky ({pct(u.accuracy ?? 0)} right first try overall)
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="font-bold">Check in with</h3>
            {insights.checkIn.length === 0 ? (
              <p className="font-read text-ink-soft">{say("Everyone is practising and doing fine.")}</p>
            ) : (
              <ul className="mt-1 font-read">
                {insights.checkIn.map((s) => (
                  <li key={s.profileId}>
                    <b>{s.name}</b>: {say(s.reasons.join("; "))}
                  </li>
                ))}
              </ul>
            )}
            {insights.checkIn.length > 0 && (
              <a className="mt-2 inline-flex min-h-11 items-center font-semibold underline" href={`${classHref(data.class.id, "homework")}?students=${insights.checkIn.map((s) => encodeURIComponent(s.profileId)).join(",")}`}>
                Assign extra practice to these students
              </a>
            )}
          </div>
        </div>
      )}
      {Object.keys(data.missed ?? {}).length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Most-missed questions</h3>
          <ul className="mt-1 font-read">
            {Object.entries(data.missed ?? {}).map(([key, list]) => (
              <li key={key} className="mt-1">
                <b>{label(key)}</b>
                <ul className="list-disc pl-6">
                  {list.map((m) => (
                    <li key={m.q}>
                      {m.q}: {m.missed} of {m.tried} missed it on the first try
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-1 text-sm text-ink-soft">Shown when at least 2 students missed the same question. Questions are only listed for answers given from now on.</p>
        </div>
      )}
      <p className="mt-3 text-sm text-ink-soft">A student is flagged as finding a unit tricky after at least 4 questions with under 60% right on the first try. {say("This reflects practice, not a report-card mark.")}</p>
    </section>
  );
}

/** Words a teacher can paste into a newsletter, a message or an email. */
function SendHome({ cls }: { cls: ClassDetail["class"] }) {
  const [copied, setCopied] = useState(false);
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const framework = getFramework(cls.framework);
  const text =
    `Hello families,\n\n` +
    `Our class is using ${APP_NAME} for extra ${framework.curriculumName} practice. It is optional. ` +
    `To link your child, open ${origin}/play/, tap Grown-ups, go to Children, choose "Join a class" and enter the class code ${cls.joinCode}. ` +
    `Linking is your choice and you can unlink at any time. I will only see your child's first name, grade and practice results on the units I assign.\n\n` +
    `Thank you!`;
  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5 print:hidden">
      <h2 className="text-xl font-bold">Send home</h2>
      <p className="mt-1 font-read text-ink-soft">A ready-made note for families who will link their own child with the class code. Students you add with login codes above don’t need it.</p>
      <textarea readOnly className="mt-3 min-h-40 w-full rounded-xl border border-line px-3 py-2 font-read" value={text} aria-label="Note to families" onFocus={(e) => e.currentTarget.select()} />
      <div className="mt-2 flex flex-wrap gap-3">
        <button
          type="button"
          className={`${btn} border border-line`}
          onClick={() => {
            void navigator.clipboard?.writeText(text).then(() => setCopied(true));
          }}
        >
          {copied ? "Copied" : "Copy note"}
        </button>
        <a className={`${btn} inline-flex items-center border border-line`} href={`mailto:?subject=${encodeURIComponent(`${cls.name} on ${APP_NAME}`)}&body=${encodeURIComponent(text)}`}>
          Email it
        </a>
      </div>
    </section>
  );
}

/** What prints: a login card for each student, or a one-page class summary. Hidden on screen. */
function PrintSheet({ data, label, mode, only }: { data: ClassDetail; label: (key: string) => string; mode: "cards" | "summary"; only?: string[] }) {
  const { class: cls, roster, students, assignments } = data;
  const byProfile = new Map(students.map((s) => [s.profileId, s]));
  const levelLabel = (level: number) => (level < 0 ? "Not started" : levelInfo(cls.framework, cls.grade, level)?.label ?? "");
  const [now] = useState(() => Date.now());
  const insights = classInsights(students, assignments, label, now);
  if (mode === "cards") {
    return (
      <div className="hidden print:grid print:grid-cols-2 print:gap-3">
        {roster.filter((r) => !only || only.includes(r.id)).map((r) => (
          <div key={r.id} className="flex break-inside-avoid items-start justify-between gap-3 rounded-xl border-2 border-dashed border-black p-4">
            <div>
              <p className="text-lg font-bold">{byProfile.get(r.profileId)?.name}</p>
              <p>
                Go to <b>{typeof window === "undefined" ? "" : window.location.host}/play</b> and tap “My teacher gave me a code”, or scan the square.
              </p>
              <p className="mt-2">
                Class code: <b className="font-mono text-xl tracking-widest">{cls.joinCode}</b>
              </p>
              <p>
                My code: <b className="font-mono text-xl tracking-widest">{r.loginCode}</b>
              </p>
            </div>
            {typeof window !== "undefined" && <QrCode text={classSignInHref({ classCode: cls.joinCode, studentCode: r.loginCode }, window.location.origin)} label={`Sign-in code for ${byProfile.get(r.profileId)?.name ?? "this student"}`} className="size-28 shrink-0" />}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="hidden print:block">
      <h1 className="text-2xl font-bold">
        {cls.name} · {classGradeText(cls)} · {getFramework(cls.framework).curriculumName}
      </h1>
      <p className="text-sm">
        Practice summary printed {new Date(now).toLocaleDateString(countryOf(getFramework(cls.framework)).locale, { dateStyle: "long" })}. This reflects practice in {APP_NAME}, not a report-card mark.
      </p>
      <table className="mt-3 w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="border border-black p-1">Student</th>
            {assignments.map((k) => (
              <th key={k} className="border border-black p-1">{label(k)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.profileId}>
              <th scope="row" className="border border-black p-1">{s.name}</th>
              {s.units.map((u) => (
                <td key={u.key} className="border border-black p-1">
                  {u.assigned === false ? "Not assigned" : levelLabel(u.level)}
                  {u.attempts > 0 ? ` (${pct(u.accuracy)}, ${u.attempts} q)` : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {insights.focusUnits.length > 0 && (
        <p className="mt-3 text-sm">
          <b>Worth a quick reteach:</b> {insights.focusUnits.map((u) => label(u.key)).join(", ")}.
        </p>
      )}
      {insights.checkIn.length > 0 && (
        <p className="mt-1 text-sm">
          <b>Check in with:</b> {insights.checkIn.map((s) => s.name).join(", ")}.
        </p>
      )}
    </div>
  );
}

type ProgressSort = "name" | "need" | "active";

/** How much a student needs a look: not started first, then the lowest accuracy on what they have tried. */
function needScore(s: StudentRow): number {
  const tried = s.units.filter((u) => u.assigned !== false && u.attempts > 0);
  if (!tried.length) return -1;
  return tried.reduce((n, u) => n + u.accuracy, 0) / tried.length;
}

/** The progress table: sort, a subject filter, one student on their own, and a name column that stays put when it scrolls sideways. */
function ProgressTable({ data, label, levelLabel, now }: { data: ClassDetail; label: (key: string) => string; levelLabel: (level: number) => string; now: number }) {
  const { class: cls, assignments, students } = data;
  const [sort, setSort] = useState<ProgressSort>("name");
  const [subject, setSubject] = useState("");
  const [only, setOnly] = useState<string | null>(null);
  const subjects = [...new Set(assignments.map((k) => k.split("/")[1]))];
  const shown = subject ? assignments.filter((k) => k.split("/")[1] === subject) : assignments;
  const keep = new Set(shown);
  const rows = students
    .filter((s) => only === null || s.profileId === only)
    .map((s) => ({ ...s, units: s.units.filter((u) => keep.has(u.key)) }))
    .sort((a, b) => (sort === "need" ? needScore(a) - needScore(b) : sort === "active" ? (a.lastActive ?? 0) - (b.lastActive ?? 0) : 0) || a.name.localeCompare(b.name));
  const onlyName = students.find((s) => s.profileId === only)?.name;
  const choose = "min-h-11 rounded-xl border border-line bg-white px-3 font-read";
  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-sm font-semibold">
          Sort by
          <select className={`${choose} mt-1`} value={sort} onChange={(e) => setSort(e.target.value as ProgressSort)}>
            <option value="name">Name</option>
            <option value="need">Needs a look first</option>
            <option value="active">Least recently active</option>
          </select>
        </label>
        {subjects.length > 1 && (
          <label className="flex flex-col text-sm font-semibold">
            Subject
            <select className={`${choose} mt-1`} value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">All subjects</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>{getSubjectMeta(sub as never).title.big}</option>
              ))}
            </select>
          </label>
        )}
        {only !== null && (
          <button type="button" className={`${btn} border border-line`} onClick={() => setOnly(null)}>
            Show everyone
          </button>
        )}
      </div>
      {onlyName && <p className="mt-2 font-read text-ink-soft">Showing {onlyName} only.</p>}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left font-read">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="sticky left-0 bg-white py-2 pr-3">Student</th>
              {shown.map((k) => (
                <th key={k} scope="col" className="py-2 pr-3">{label(k)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.profileId} className="border-b border-line align-top last:border-0">
                <th scope="row" className="sticky left-0 bg-white py-2 pr-3 font-bold">
                  {only === null ? (
                    <button type="button" aria-label={`Show only ${s.name}`} className="inline-flex min-h-11 items-center text-left font-bold underline decoration-dotted" onClick={() => setOnly(s.profileId)}>
                      {s.name}
                    </button>
                  ) : (
                    s.name
                  )}
                  {cls.grade2 && <span className="font-normal text-ink-soft"> ({gradeLabel(s.grade as GradeId, cls.framework)})</span>}
                  <span className="block text-sm font-normal text-ink-soft">{s.lastActive ? `Active ${new Date(s.lastActive).toLocaleDateString(countryOf(getFramework(cls.framework)).locale, { month: "short", day: "numeric" })}` : "Not active yet"}</span>
                </th>
        {s.units.map((u) => u.assigned === false ? (
          <td key={u.key} className="py-2 pr-3 text-sm text-ink-soft">Not assigned</td>
        ) : (
          <td key={u.key} className="py-2 pr-3">
            <b>{levelLabel(u.level)}</b>
            {data.goal?.[u.key] && u.done !== undefined ? (
              <span className="block text-sm">{u.done >= data.goal[u.key] ? "Homework done ✓" : `Homework: ${u.done} of ${data.goal[u.key]}`}</span>
            ) : null}
            {data.due[u.key] && data.due[u.key] < now && !isHomeworkDone(u, data.goal?.[u.key]) && <span className="block text-sm font-bold text-nudge-dark">Past due</span>}
            {u.attempts > 0 && (
              <span className="block text-sm text-ink-soft">
                {pct(u.accuracy)} · {u.attempts} {u.attempts === 1 ? "question" : "questions"}
              </span>
            )}
          </td>
        ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** A short "Saved." that fades after a few seconds. The region stays on the page so screen readers announce each new message; it never takes a tap. */
/** After a change that can be taken back: what happened and an Undo button. Focus moves to Undo so a keyboard user can reach it; it goes away by itself after a minute. */
function UndoBar({ offer, onDone }: { offer: UndoOffer | null; onDone: () => void }) {
  const undo = useRef<HTMLButtonElement>(null);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });
  useEffect(() => {
    if (!offer) return;
    undo.current?.focus();
    const t = setTimeout(() => done.current(), 60_000);
    return () => clearTimeout(t);
  }, [offer]);
  return (
    <div role="status" aria-live="polite" className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 print:hidden">
      {offer && (
        <div className="flex max-w-md flex-wrap items-center gap-2 rounded-2xl bg-[#253047] px-4 py-2 font-read text-white shadow-lg">
          <span>{offer.text}</span>
          <button
            ref={undo}
            type="button"
            className="min-h-11 rounded-xl bg-white px-4 font-bold text-[#253047]"
            onClick={() => {
              done.current();
              void offer.run();
            }}
          >
            Undo
          </button>
          <button type="button" aria-label="Dismiss" className="min-h-11 min-w-11 rounded-full font-bold" onClick={() => done.current()}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function Notice({ text, onDone }: { text: string; onDone: () => void }) {
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(() => done.current(), 6000);
    return () => clearTimeout(t);
  }, [text]);
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 print:hidden">
      {text && <p className="max-w-md rounded-2xl bg-[#253047] px-4 py-2 font-read text-white shadow-lg">{text}</p>}
    </div>
  );
}

function ClassPage({ id, tab, preselect, onBack }: { id: string; tab: ClassTab; preselect?: string[]; onBack: () => void }) {
  const [data, setData] = useState<ClassDetail | null>(null);
  const [ready, setReady] = useState(false);
  const [pick, setPick] = useState("");
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmClose, setConfirmClose] = useState(false);
  const [confirmYear, setConfirmYear] = useState(false);
  const [nameDraft, setNameDraft] = useState<string | null>(null);
  const [due, setDue] = useState("");
  // The number of questions last used is offered again, because a teacher usually assigns the same amount each time.
  const [questions, setQuestions] = useState(() => (HOMEWORK_GOALS as readonly number[]).includes(Number(readStore(GOAL_KEY))) ? readStore(GOAL_KEY) : "");
  const [undo, setUndo] = useState<UndoOffer | null>(null);
  const [many, setMany] = useState(false);
  const [manyPicked, setManyPicked] = useState<string[]>([]);
  const [who, setWho] = useState<"all" | "some">("all");
  const [picked, setPicked] = useState<string[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const [loadedAt, setLoadedAt] = useState(() => Date.now());
  const [refreshing, setRefreshing] = useState(false);
  // "Assign extra practice to these students" on Progress arrives here with the students already chosen.
  const preselected = preselect?.join(",") ?? "";
  const [seen, setSeen] = useState("");
  if (preselected && preselected !== seen) {
    setSeen(preselected);
    setWho("some");
    setPicked(preselected.split(","));
  }
  const [printMode, setPrintMode] = useState<"cards" | "summary" | null>(null);
  const [printOnly, setPrintOnly] = useState<string[] | undefined>();
  const heading = useRef<HTMLHeadingElement>(null);
  const openedTab = useRef(tab);
  const className = data?.class.name;
  const tabLabel = CLASS_TABS.find((t) => t.path === tab)?.label ?? "";

  useEffect(() => {
    setPageTitle(className ?? "Class", tabLabel);
  }, [className, tabLabel]);
  // Moving to another tab puts focus on the page heading, so a keyboard or screen-reader user starts at the top of it.
  useEffect(() => {
    if (openedTab.current === tab) return;
    openedTab.current = tab;
    heading.current?.focus();
  }, [tab, data]);

  // Print once the sheet is on the page, then go back to the normal view.
  useEffect(() => {
    if (!printMode) return;
    const t = setTimeout(() => {
      window.print();
      setPrintMode(null);
    }, 50);
    return () => clearTimeout(t);
  }, [printMode]);

  const load = useCallback(
    () =>
      call<ClassDetail>(`/api/classes/?id=${encodeURIComponent(id)}`)
        .then((d) => Promise.all([d.class.grade, ...(d.class.grade2 ? [d.class.grade2] : [])].map((g) => loadGrade(g, d.class.framework))).then(() => d))
        .then((d) => {
          setData(d);
          setReady(true);
          setNow(Date.now());
          setLoadedAt(Date.now());
        })
        .catch((e: Error) => setErr(e.message)),
    [id],
  );
  useEffect(() => {
    void load();
  }, [load]);
  // Progress keeps itself fresh while it is on screen (about every 90 seconds, only while the page is visible and online).
  useEffect(() => {
    if (tab !== "progress") return;
    const tick = () => {
      if (document.visibilityState === "visible" && navigator.onLine !== false) void load();
    };
    const t = setInterval(tick, PROGRESS_REFRESH_MS);
    return () => clearInterval(t);
  }, [tab, load]);
  const refresh = async () => {
    setRefreshing(true);
    setErr("");
    await load();
    setRefreshing(false);
  };

  if (!data || !ready) return <p className="font-read">{err || "Loading…"}</p>;
  const { class: cls, assignments, students } = data;
  const isOwner = (data.role ?? "owner") === "owner";
  const label = (key: string) => getUnitRef(key)?.unit.title ?? key;
  const levelLabel = (level: number) => (level < 0 ? "Not started" : levelInfo(cls.framework, cls.grade, level)?.label ?? "");
  // "Proficient" in BC; each curriculum's own word for its third level elsewhere.
  const meeting = levelInfo(cls.framework, cls.grade, 2)?.label ?? "Proficient";
  /** The class table as a CSV file, for a gradebook or spreadsheet. */
  const downloadCsv = () => {
    const csv = classCsv({ students, assignments, unitName: label, levelName: (l) => levelLabel(l), goal: data.goal ?? {}, due: data.due, appName: APP_NAME });
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cls.name.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase() || "class"}-practice-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const overview = homeworkOverview(students, assignments, data.due, data.goal ?? {}, now);
  const overdue = overview.filter((o) => o.overdue).length;
  const goalOptions = [{ value: "", label: `Until ${meeting}` }, ...HOMEWORK_GOALS.map((n) => ({ value: String(n), label: `${n} questions` }))];
  /** The class's units by subject, for a picker. Units in `taken` are shown but can't be picked. */
  const unitGroups = (taken: string[]) =>
    [cls.grade, ...(cls.grade2 ? [cls.grade2] : [])].flatMap((g) => coursesForGrade(g, cls.framework)).map((course) => ({
      // A split class's units are grouped by grade too.
      label: getSubjectMeta(course.subject).title.big + (cls.grade2 ? ` · ${gradeLabel(course.grade, cls.framework)}` : ""),
      options: course.units.map((u) => {
        const key = `${course.grade}/${course.subject}/${u.id}`;
        return { value: key, label: `${u.emoji} ${u.title}`, disabled: taken.includes(key) };
      }),
    }));

  const chosenKeys = many ? manyPicked : pick ? [pick] : [];
  /** The public page for a unit (sample questions and how we explain it), to look at before assigning it. */
  const previewHref = (key: string) => {
    const [g, subject, unit] = key.split("/");
    return `/curriculum/${getFramework(cls.framework).slug}/${gradeSlug(g as GradeId)}/${subject}/${unit}/`;
  };

  /** Sends a change and reloads the class. Resolves false (with the error shown) when the change failed. */
  const change: ChangeFn = async (url, method, body, success, undoWith) => {
    setErr("");
    setNotice("");
    setUndo(null);
    let response: unknown;
    try {
      response = await call(url, method, body);
    } catch (e) {
      setErr((e as Error).message);
      return false;
    }
    await load().catch(() => undefined);
    if (undoWith) setUndo(undoWith(response));
    else setNotice(typeof success === "function" ? success(response) : (success ?? "Saved."));
    return true;
  };
  /** Several changes in a row, then one reload. Stops at the first that fails and shows why. */
  const bulk = async (calls: { url: string; method: string; body?: unknown }[], success?: string): Promise<boolean> => {
    setErr("");
    setNotice("");
    setUndo(null);
    let ok = true;
    for (const c of calls) {
      try {
        await (c.body === undefined ? call(c.url, c.method) : call(c.url, c.method, c.body));
      } catch (e) {
        setErr((e as Error).message);
        ok = false;
        break;
      }
    }
    await load().catch(() => undefined);
    if (ok) setNotice(success ?? "Saved.");
    return ok;
  };
  /** Closing or leaving: nothing left to reload, so only go back once the server agreed. */
  const leave = async (url: string) => {
    setErr("");
    try {
      await call(url, "DELETE");
      onBack();
    } catch (e) {
      setErr((e as Error).message);
    }
  };

  const tabLink = (t: ClassTab, text: string) => (
    <a href={classHref(id, t)} className="font-semibold underline">
      {text}
    </a>
  );

  return (
    <>
      {printMode && <PrintSheet data={data} label={label} mode={printMode} only={printOnly} />}
      <div className="print:hidden">
      <h1 ref={heading} tabIndex={-1} className="text-3xl font-bold outline-none">{cls.name}</h1>
      <p className="font-read text-ink-soft">
        {classGradeText(cls)} · {getFramework(cls.framework).curriculumName}
      </p>

      {tab === "progress" && (
        <>
          <FirstRun students={students} assignments={assignments} tabLink={tabLink} />
          <section className="mt-4 rounded-2xl border border-line bg-white p-5">
            <h2 className="text-xl font-bold">Students ({students.length})</h2>
            <UpdatedAgo at={loadedAt} busy={refreshing} onRefresh={() => void refresh()} />
            {students.length === 0 ? (
              <p className="mt-2 font-read text-ink-soft">No one has joined yet. {tabLink("students", "Add students or share the class code")}</p>
            ) : assignments.length === 0 ? (
              <p className="mt-2 font-read text-ink-soft">Assign homework to see how each student is doing. {tabLink("homework", "Go to Homework")}</p>
            ) : (
              <ProgressTable data={data} label={label} levelLabel={levelLabel} now={now} />
            )}
            <p className="mt-3 text-sm text-ink-soft">This reflects practice in {APP_NAME}, not a report-card mark. You decide proficiency.</p>
            {students.length > 0 && assignments.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                <button type="button" className={`${btn} border border-line`} onClick={() => setPrintMode("summary")}>
                  Print class summary
                </button>
                <button type="button" className={`${btn} border border-line`} onClick={downloadCsv}>
                  Download as spreadsheet (CSV)
                </button>
              </div>
            )}
          </section>
          <Insights data={data} label={label} />
        </>
      )}

      {tab === "homework" && (
        <section className="mt-4 rounded-2xl border border-line bg-white p-5">
          <h2 className="text-xl font-bold">Homework</h2>
          <p className="mt-1 font-read text-ink-soft">
            Assign units for practice at home or in class, with a due date and a number of questions if you like. Students see them on their home screen and can do them offline: their answers reach you once their device is back online. Without a number of questions, a unit is done when it reaches {meeting}.
          </p>
          {overdue > 0 && (
            <p role="status" className="mt-2 font-read font-bold text-nudge-dark">
              {overdue} {overdue === 1 ? "unit is" : "units are"} past due with students still to finish.
            </p>
          )}
          <ul className="mt-3 divide-y divide-line">
            {assignments.map((k) => (
              <li key={k} className="flex flex-wrap items-center gap-2 py-2 font-read">
                <span className="min-w-40 flex-1">
                  {getUnitRef(k)?.unit.emoji} {label(k)}
                </span>
                <DateField
                  label={`Due date for ${label(k)}`}
                  hideLabel
                  size="sm"
                  value={data.due[k] ? toInput(data.due[k]) : ""}
                  onChange={(next) => void change("/api/classes/assignments/", "PATCH", { classId: id, unitKey: k, dueAt: next ? endOfDay(next) : null }, next ? `Due date for ${label(k)} saved.` : `Due date for ${label(k)} cleared.`)}
                />
                <SelectMenu
                  label={`Questions for ${label(k)}`}
                  hideLabel
                  block={false}
                  value={data.goal?.[k] ? String(data.goal[k]) : ""}
                  onChange={(next) => void change("/api/classes/assignments/", "PATCH", { classId: id, unitKey: k, goal: next ? Number(next) : null }, `Questions for ${label(k)} saved.`)}
                  options={goalOptions}
                />
                <a href={previewHref(k)} target="_blank" rel="noopener" aria-label={`Preview ${label(k)} (opens in a new tab)`} className="inline-flex min-h-11 items-center text-sm font-semibold underline">
                  Preview
                </a>
                <button type="button" aria-label={`Remove ${label(k)}`} className="min-h-11 min-w-11 rounded-full font-bold" onClick={() => {
                  // What it was, so Undo can put it back the same way (including the date it was first assigned, so answers already given still count).
                  const was = { classId: id, unitKey: k, dueAt: data.due[k] || undefined, goal: data.goal?.[k] || undefined, ...(data.audience?.[k]?.length ? { students: data.audience[k] } : {}), since: data.assignedAt?.[k] };
                  void change(`/api/classes/assignments/?classId=${id}&unitKey=${encodeURIComponent(k)}`, "DELETE", undefined, undefined, () => ({
                    text: `${label(k)} was removed from homework.`,
                    run: () => change("/api/classes/assignments/", "POST", was, `${label(k)} is back in homework.`),
                  }));
                }}>
                  ✕
                </button>
                <HomeworkProgress status={overview.find((o) => o.key === k)} />
                <RowAudience
                  key={`${k}:${(data.audience?.[k] ?? []).join(",")}`}
                  unitLabel={label(k)}
                  students={students}
                  current={data.audience?.[k] ?? []}
                  onSave={(ids) => void change("/api/classes/assignments/", "PATCH", { classId: id, unitKey: k, students: ids }, `Who gets ${label(k)} saved.`)}
                />
              </li>
            ))}
            {assignments.length === 0 && <li className="py-2 font-read text-ink-soft">Nothing assigned yet.</li>}
          </ul>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            {!many && (
              <>
                <SelectMenu
                  label="Add a unit"
                  value={pick}
                  onChange={setPick}
                  options={[{ value: "", label: "Choose a unit…" }]}
                  groups={unitGroups(assignments)}
                />
                {pick && (
                  <a href={previewHref(pick)} target="_blank" rel="noopener" aria-label={`Preview ${label(pick)} (opens in a new tab)`} className="inline-flex min-h-11 items-center font-semibold underline">
                    Preview
                  </a>
                )}
              </>
            )}
            <button
              type="button"
              aria-expanded={many}
              className="inline-flex min-h-11 items-center text-sm font-semibold underline"
              onClick={() => {
                setMany(!many);
                setPick("");
                setManyPicked([]);
              }}
            >
              {many ? "Pick one unit instead" : "Pick several units at once"}
            </button>
            {many && (
              <div className="basis-full space-y-2">
                {unitGroups(assignments).map((g) => (
                  <details key={g.label} className="rounded-xl border border-line px-3">
                    <summary className="flex min-h-11 cursor-pointer items-center font-semibold">
                      {g.label} ({g.options.filter((o) => manyPicked.includes(o.value)).length} picked)
                    </summary>
                    <ul className="pb-2">
                      {g.options.map((o) => (
                        <li key={o.value}>
                          <label className="flex min-h-11 items-center gap-2 font-read">
                            <input type="checkbox" disabled={o.disabled} checked={o.disabled || manyPicked.includes(o.value)} onChange={(e) => setManyPicked(e.target.checked ? [...manyPicked, o.value] : manyPicked.filter((k) => k !== o.value))} />
                            {o.label}
                            {o.disabled && <span className="text-sm text-ink-soft"> (already assigned)</span>}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            )}
            <DateField label="Due (optional)" value={due} onChange={setDue} />
            <div role="group" aria-label="Due date shortcuts" className="flex flex-wrap gap-2">
              {dueChips(new Date(now)).map((c) => (
                <button key={c.value} type="button" aria-pressed={due === c.value} className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${due === c.value ? "border-[#253047] bg-[#253047] text-white" : "border-line"}`} onClick={() => setDue(due === c.value ? "" : c.value)}>
                  {c.label}
                </button>
              ))}
            </div>
            <SelectMenu label="Questions (optional)" block={false} value={questions} onChange={setQuestions} options={goalOptions} />
            <div className="basis-full">
              <AudiencePicker students={students} who={who} picked={picked} onWho={setWho} onPicked={setPicked} name="Who gets it" />
            </div>
            <button
              type="button"
              disabled={chosenKeys.length === 0 || (who === "some" && picked.length === 0)}
              className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`}
              onClick={async () => {
                const bodyFor = (k: string) => ({ classId: id, unitKey: k, dueAt: due ? endOfDay(due) : undefined, goal: questions ? Number(questions) : undefined, ...(who === "some" ? { students: picked } : {}) });
                const ok =
                  chosenKeys.length === 1
                    ? await change("/api/classes/assignments/", "POST", bodyFor(chosenKeys[0]), `${label(chosenKeys[0])} assigned.`)
                    : await bulk(chosenKeys.map((k) => ({ url: "/api/classes/assignments/", method: "POST", body: bodyFor(k) })), `${chosenKeys.length} units assigned.`);
                if (!ok) return;
                // The number of questions stays picked (and is remembered on this device) for the next assignment.
                writeStore(GOAL_KEY, questions);
                setPick("");
                setManyPicked([]);
                setDue("");
                setWho("all");
                setPicked([]);
              }}
            >
              {many ? `Assign ${chosenKeys.length} ${chosenKeys.length === 1 ? "unit" : "units"}` : "Assign"}
            </button>
          </div>
        </section>
      )}

      {tab === "live" && <LiveClass data={data} label={label} unitGroups={unitGroups([])} />}

      {tab === "students" && (
        <>
          <section className="mt-4 rounded-2xl border border-line bg-white p-5">
            <h2 className="text-xl font-bold">Class code</h2>
            <p className="mt-1 font-mono text-4xl font-bold tracking-widest" aria-label={`Class code ${cls.joinCode.split("").join(" ")}`}>
              {cls.joinCode}
            </p>
            <p className="mt-1 font-read text-ink-soft">
              Share this with families. A parent enters it under Children in the parent area, so they choose what to share. You will only see first names, grade and practice results for the units you assign.
            </p>
            {isOwner && (
              <>
                <button type="button" className="mt-3 min-h-11 rounded-xl border border-line px-4 py-2 font-semibold" onClick={() => change(`/api/classes/?id=${encodeURIComponent(id)}`, "PATCH", undefined, (res) => `New class code: ${(res as { joinCode: string }).joinCode}`)}>
                  Get a new code
                </button>
                <p className="mt-1 text-sm text-ink-soft">If the code was shared too widely. Families already linked stay linked; the old code stops working.</p>
              </>
            )}
          </section>
          <Roster
            data={data}
            onChange={change}
            onBulk={bulk}
            onPrint={(ids) => {
              setPrintOnly(ids);
              setPrintMode("cards");
            }}
          />
          <SendHome cls={cls} />
        </>
      )}

      {tab === "settings" && (
        <>
          {isOwner && (
            <section className="mt-4 rounded-2xl border border-line bg-white p-5">
              <h2 className="text-xl font-bold">Class name</h2>
              <form
                className="mt-2 flex flex-wrap items-end gap-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (await change(`/api/classes/?id=${encodeURIComponent(id)}`, "PATCH", { name: nameDraft }, "Class name saved.")) setNameDraft(null);
                }}
              >
                <label className="flex flex-col text-sm font-semibold">
                  Name
                  <input className="mt-1 min-h-11 rounded-xl border border-line px-3" value={nameDraft ?? cls.name} maxLength={60} onChange={(e) => setNameDraft(e.target.value)} required />
                </label>
                <button disabled={nameDraft === null || nameDraft.trim() === cls.name} className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`}>
                  Save name
                </button>
              </form>
            </section>
          )}
          <Team data={data} onChange={change} onLeave={leave} />
          {isOwner && (
            <section className="mt-4 rounded-2xl border border-line bg-white p-5">
              <h2 className="text-xl font-bold">Start next school year</h2>
              {nextGradeOf(cls) ? (
                <>
                  <p className="mt-1 font-read text-ink-soft">
                    Moves this class up to {classGradeText(nextGradeOf(cls)!)}. The students you added keep their codes and their practice and move up a grade too. The homework assigned this year is cleared. Children their parents linked are unlinked, because a linked child keeps the grade their family chose; parents can link them again with the class code.
                  </p>
                  {confirmYear ? (
                    <button
                      type="button"
                      className={`${btn} mt-3 border border-[#e57a12] text-nudge-dark`}
                      onClick={async () => {
                        if (await change(`/api/classes/?id=${encodeURIComponent(id)}`, "PATCH", { action: "next-year" }, "The class moved up a grade.")) setConfirmYear(false);
                      }}
                    >
                      Yes, move {cls.name} up
                    </button>
                  ) : (
                    <button type="button" className={`${btn} mt-3 border border-line`} onClick={() => setConfirmYear(true)}>
                      Move up to {classGradeText(nextGradeOf(cls)!)}
                    </button>
                  )}
                </>
              ) : (
                <p className="mt-1 font-read text-ink-soft">This class is already in the last grade, so there is no next grade to move up to.</p>
              )}
            </section>
          )}
          {isOwner && (
            <section className="mt-4 rounded-2xl border border-line bg-white p-5">
              <h2 className="text-xl font-bold">Close this class</h2>
              <p className="mt-1 font-read text-ink-soft">Closing removes every link to students and all co-teachers straight away, and deletes the student accounts you added. Families keep their own data.</p>
              {confirmClose ? (
                <button type="button" className={`${btn} mt-3 border border-[#e57a12] text-nudge-dark`} onClick={() => void leave(`/api/classes/?id=${id}`)}>
                  Yes, close {cls.name}
                </button>
              ) : (
                <button type="button" className={`${btn} mt-3 border border-line`} onClick={() => setConfirmClose(true)}>
                  Close class
                </button>
              )}
            </section>
          )}
        </>
      )}

      {err && (
        <p role="alert" className="mt-3 text-nudge-dark">
          {err}
        </p>
      )}
      </div>
      <Notice text={notice} onDone={() => setNotice("")} />
      <UndoBar offer={undo} onDone={() => setUndo(null)} />
    </>
  );
}

/** Scrolls the tab strip sideways just far enough to show the open tab. */
function keepTabInView(el: HTMLElement | null) {
  const strip = el?.closest("nav");
  if (!el || !strip) return;
  const left = el.getBoundingClientRect().left - strip.getBoundingClientRect().left;
  const right = left + el.offsetWidth;
  if (left < 0) strip.scrollLeft += left;
  else if (right > strip.clientWidth) strip.scrollLeft += right - strip.clientWidth;
}

export function TeacherApp() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [account, setAccount] = useState<{ email?: string; verified?: boolean }>({});
  const { path, query } = useRoute();
  // #/class/{id}/{tab} opens a class on one tab; anything else is the class list.
  const classId = path[0] === "class" && path[1] ? path[1] : null;
  const onAccount = path[0] === "account";
  const tab = CLASS_TABS.find((t) => t.path === path[2])?.path ?? "progress";

  useEffect(() => {
    if (!classId) setPageTitle(signedIn === false ? "Sign in" : onAccount ? "Your account" : "Your classes");
  }, [classId, signedIn, onAccount]);

  useEffect(() => {
    // A class student's login is not a teacher's: only a real account counts.
    call<{ family?: { account?: { student?: boolean; email?: string; verified?: boolean } } }>("/api/auth/me/")
      .then((r) => {
        setAccount({ email: r.family?.account?.email, verified: r.family?.account?.verified });
        setSignedIn(!r.family?.account?.student);
      })
      .catch(() => setSignedIn(false));
  }, []);

  return (
    <div className="min-h-dvh bg-[#f6f5f1]">
      <SkipLink />
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur print:hidden" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-2 px-4 py-2">
          <span className="flex items-center gap-2">
            <Link href="/" className="inline-flex min-h-11 items-center text-2xl font-bold tracking-tight" aria-label={APP_NAME}>
              {APP_NAME.split("").map((ch, i) => (
                <span key={i} aria-hidden="true" style={{ color: WORDMARK_COLOURS[i % WORDMARK_COLOURS.length] }}>
                  {ch}
                </span>
              ))}
            </Link>
            <span className="text-lg font-semibold text-ink-soft">for teachers</span>
          </span>
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex min-h-11 items-center font-semibold underline">Home</Link>
            {signedIn && (
              <a href="#/account" aria-current={onAccount ? "page" : undefined} className="inline-flex min-h-11 items-center font-semibold underline">
                Account
              </a>
            )}
            {signedIn && (
              <button
                type="button"
                className="min-h-11 font-semibold underline"
                onClick={() => call("/api/auth/logout/", "POST").finally(() => { setSignedIn(false); go("/"); })}
              >
                Sign out
              </button>
            )}
          </div>
        </div>
        {signedIn && classId && (
          <nav className="mx-auto max-w-4xl overflow-x-auto px-2" aria-label="Class sections">
            <ul className="flex gap-1 pb-2">
              <li>
                <a href="#/" className="flex items-center gap-1.5 min-h-11 rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap text-ink-soft hover:bg-black/5">
                  ← All classes
                </a>
              </li>
              {CLASS_TABS.map((t) => (
                <li key={t.path}>
                  <a
                    href={classHref(classId, t.path)}
                    aria-current={tab === t.path ? "page" : undefined}
                    // On a phone the tabs scroll sideways: keep the open one in view. This moves the strip itself, because
                    // scrollIntoView makes the next Tab press start from this link and skip the skip link.
                    ref={tab === t.path ? keepTabInView : undefined}
                    className={`flex items-center gap-1.5 min-h-11 rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap ${tab === t.path ? "bg-[#253047] text-white" : "text-ink-soft hover:bg-black/5"}`}
                  >
                    <span aria-hidden="true">{t.icon}</span> {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      <main id={MAIN_ID} tabIndex={-1} className="mx-auto max-w-4xl px-4 py-6">
        {signedIn === null ? (
          <p className="font-read">Loading…</p>
        ) : !signedIn ? (
          <AuthForm onDone={() => {
            // Re-read the account: whether its email is confirmed decides if a class can be created.
            call<{ family?: { account?: { email?: string; verified?: boolean } } }>("/api/auth/me/")
              .then((r) => setAccount({ email: r.family?.account?.email, verified: r.family?.account?.verified }))
              .catch(() => undefined)
              .finally(() => setSignedIn(true));
          }} />
        ) : onAccount ? (
          <AccountPage email={account.email} onSignedOut={() => setSignedIn(false)} />
        ) : classId ? (
          <ClassPage key={classId} id={classId} tab={tab} preselect={query.get("students")?.split(",").filter(Boolean)} onBack={() => go("/")} />
        ) : (
          <ClassList account={account} onOpen={(id) => go(`/class/${encodeURIComponent(id)}`)} />
        )}
      </main>
    </div>
  );
}
