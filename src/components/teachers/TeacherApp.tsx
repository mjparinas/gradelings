"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { coursesForGrade, getUnitRef, loadGrade } from "@/content";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { GRADE_ORDER, getSubjectMeta } from "@/content/subjects";
import type { FrameworkId, GradeId } from "@/content/types";
import { DateField } from "@/components/DateField";
import { SelectMenu } from "@/components/SelectMenu";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { call, classInsights, HOMEWORK_GOALS, homeworkOverview, isHomeworkDone, isUsClass, US_CLASS_CONSENT, type ClassInvite, type ClassSummary, type RosterEntry, type StudentRow, type TeacherEntry } from "@/lib/classroom";
import { frameworkGroups, frameworkMenu } from "@/lib/frameworkGroups";
import { classCsv } from "@/lib/classCsv";
import { countryOf } from "@/lib/country";
import { gradeLabel } from "@/lib/gradeLabel";
import { levelInfo } from "@/lib/proficiency";
import { go, useRoute } from "@/lib/router";
import { sayFor } from "@/lib/say";
import { MAIN_ID, SkipLink } from "@/components/SkipLink";
import { LiveClass } from "./LiveClass";

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

/** The grade next to `grade` a class could share (a split class), as menu options after "None". */
function secondGradeOptions(grade: GradeId, framework: string) {
  const i = GRADE_ORDER.indexOf(grade);
  return [{ value: "", label: "None" }, ...[GRADE_ORDER[i - 1], GRADE_ORDER[i + 1]].filter(Boolean).map((g) => ({ value: g, label: gradeLabel(g, framework) }))];
}

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

function ClassList({ onOpen, account }: { onOpen: (id: string) => void; account: { email?: string; verified?: boolean } }) {
  const [classes, setClasses] = useState<ClassSummary[] | null>(null);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<GradeId>("3");
  const [grade2, setGrade2] = useState("");
  const [framework, setFramework] = useState<FrameworkId>("ca-bc");
  const [invites, setInvites] = useState<ClassInvite[]>([]);
  const [err, setErr] = useState("");

  const load = useCallback(() => {
    call<{ classes: ClassSummary[] }>("/api/classes/")
      .then((r) => setClasses(r.classes))
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
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {classes?.map((c) => (
          <li key={c.id}>
            <button type="button" onClick={() => onOpen(c.id)} className="w-full rounded-2xl border border-line bg-white p-4 text-left">
              <span className="block text-xl font-bold">{c.name}</span>
              <span className="block font-read text-ink-soft">
                {classGradeText(c)} · {getFramework(c.framework as FrameworkId).region} · {c.students} {c.students === 1 ? "student" : "students"}{c.role === "co-teacher" ? " · you co-teach" : ""} · code <b className="font-mono tracking-widest">{c.joinCode}</b>
              </span>
            </button>
          </li>
        ))}
      </ul>
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

export interface ClassDetail {
  class: { id: string; name: string; grade: GradeId; grade2?: GradeId | null; framework: FrameworkId; joinCode: string };
  assignments: string[];
  due: Record<string, number>;
  /** Homework question counts by unit key. Older servers omit it. */
  goal?: Record<string, number>;
  /** The students a unit is for, by unit key. Units for the whole class are not listed. Older servers omit it. */
  audience?: Record<string, string[]>;
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
        <label className="flex min-h-9 items-center gap-2">
          <input type="radio" name={`${name}-who`} checked={who === "all"} onChange={() => onWho("all")} /> Whole class
        </label>
        <label className="flex min-h-9 items-center gap-2">
          <input type="radio" name={`${name}-who`} checked={who === "some"} onChange={() => onWho("some")} /> Chosen students
        </label>
      </div>
      {who === "some" && (
        <ul className="grid gap-x-4 sm:grid-cols-2">
          {students.map((s) => (
            <li key={s.profileId}>
              <label className="flex min-h-9 items-center gap-2 font-normal">
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
        className="min-h-9 rounded-xl border border-line px-3 text-sm font-semibold"
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

/** Add students by first name, share each one's login code, and print the cards. */
function Roster({ data, onChange, onPrint }: { data: ClassDetail; onChange: (url: string, method: string, body?: unknown) => Promise<boolean>; onPrint: () => void }) {
  const [names, setNames] = useState("");
  const [busy, setBusy] = useState(false);
  const [removing, setRemoving] = useState<RosterEntry | null>(null);
  const { class: cls, roster, students } = data;
  // A split class asks which grade the new students are in.
  const [newGrade, setNewGrade] = useState<GradeId>(cls.grade);
  const isOwner = (data.role ?? "owner") === "owner";
  const byProfile = new Map(students.map((s) => [s.profileId, s]));
  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5 print:hidden">
      <h2 className="text-xl font-bold">Student logins</h2>
      <p className="mt-1 font-read text-ink-soft">
        Add students by first name or nickname. Each gets a code to sign in with at {APP_NAME} (no email or password). The class stores only that name, the class grade and practice results, and deletes it all when you remove the student or close the class.
      </p>
      {isUsClass(getFramework(cls.framework)) && <p className="mt-2 font-read text-ink-soft">{US_CLASS_CONSENT}</p>}
      {roster.length > 0 && (
        <ul className="mt-3 divide-y divide-line">
          {roster.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-3 py-2">
              <span className="min-w-32 flex-1 font-read font-bold">
                {byProfile.get(r.profileId)?.name ?? "Student"}
                {cls.grade2 && byProfile.get(r.profileId) && <span className="block text-sm font-normal text-ink-soft">{gradeLabel(byProfile.get(r.profileId)!.grade as GradeId, cls.framework)}</span>}
              </span>
              <span className="font-mono text-xl font-bold tracking-widest" aria-label={`Login code ${r.loginCode.split("").join(" ")}`}>
                {r.loginCode}
              </span>
              <button type="button" className="min-h-9 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => onChange(`/api/classes/students/?classId=${cls.id}&studentId=${r.id}`, "PATCH")}>
                New code
              </button>
              {isOwner && (
                <button type="button" className="min-h-9 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => setRemoving(r)}>
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
          if (await onChange("/api/classes/students/", "POST", { classId: cls.id, names: names.split(/\n|,/).map((n) => n.trim()).filter(Boolean), ...(cls.grade2 ? { grade: newGrade } : {}) })) setNames("");
          setBusy(false);
        }}
      >
        <label className="flex flex-col text-sm font-semibold">
          First names, one per line
          <textarea className="mt-1 min-h-24 rounded-xl border border-line px-3 py-2 font-read" value={names} onChange={(e) => setNames(e.target.value)} placeholder={"Maya\nSam\nAlex P."} maxLength={1200} />
        </label>
        <div className="flex flex-wrap gap-3">
          {cls.grade2 && (
            <SelectMenu label="Their grade" block={false} value={newGrade} onChange={(next) => setNewGrade(next as GradeId)} options={[cls.grade, cls.grade2].map((g) => ({ value: g, label: gradeLabel(g, cls.framework) }))} />
          )}
          <button disabled={busy || !names.trim()} className={`${btn} bg-[#25b47e] text-[#0f172a] disabled:opacity-50`}>
            Add students
          </button>
          {roster.length > 0 && (
            <button type="button" className={`${btn} border border-line`} onClick={onPrint}>
              Print login cards
            </button>
          )}
        </div>
      </form>
      <p className="mt-2 text-sm text-ink-soft">
        Students sign in at {APP_NAME} with the class code <b className="font-mono">{cls.joinCode}</b> and their own code. Keep the cards somewhere private.
      </p>
      {removing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" role="dialog" aria-modal="true" aria-label={`Remove ${byProfile.get(removing.profileId)?.name ?? "this student"}?`} onClick={() => setRemoving(null)}>
          <div className="w-full max-w-md rounded-3xl border-2 border-line bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-2 text-2xl font-bold">Remove {byProfile.get(removing.profileId)?.name ?? "this student"}?</h2>
            <p className="mb-5 font-read text-ink-soft">Their practice history is deleted and can’t be brought back.</p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="min-h-12 rounded-xl bg-[#ff9f43] font-bold text-[#0f172a]"
                onClick={() => {
                  const student = removing;
                  setRemoving(null);
                  void onChange(`/api/classes/students/?classId=${cls.id}&studentId=${student.id}`, "DELETE");
                }}
              >
                Yes, remove
              </button>
              <button type="button" className="min-h-12 rounded-xl border-2 border-line font-bold" onClick={() => setRemoving(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/** The people who teach this class. The owner invites and removes co-teachers; a co-teacher can leave. */
function Team({ data, onChange, onLeave }: { data: ClassDetail; onChange: (url: string, method: string, body?: unknown) => Promise<boolean>; onLeave: (url: string) => void }) {
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
              <button type="button" aria-label={`Remove ${t.email}`} className="min-h-9 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => void onChange(`/api/classes/teachers/?classId=${id}&teacherId=${encodeURIComponent(t.id)}`, "DELETE")}>
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
            <button type="button" aria-label={`Cancel invitation for ${i.email}`} className="min-h-9 rounded-xl border border-line px-3 text-sm font-semibold" onClick={() => void onChange(`/api/classes/teachers/?classId=${id}&invite=${encodeURIComponent(i.email)}`, "DELETE")}>
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
            if (!(await onChange("/api/classes/teachers/", "POST", { classId: id, email }))) return;
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
              <a className="mt-2 inline-block font-semibold underline" href={`${classHref(data.class.id, "homework")}?students=${insights.checkIn.map((s) => encodeURIComponent(s.profileId)).join(",")}`}>
                Assign extra practice to these students
              </a>
            )}
          </div>
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
function PrintSheet({ data, label, mode }: { data: ClassDetail; label: (key: string) => string; mode: "cards" | "summary" }) {
  const { class: cls, roster, students, assignments } = data;
  const byProfile = new Map(students.map((s) => [s.profileId, s]));
  const levelLabel = (level: number) => (level < 0 ? "Not started" : levelInfo(cls.framework, cls.grade, level)?.label ?? "");
  const [now] = useState(() => Date.now());
  const insights = classInsights(students, assignments, label, now);
  if (mode === "cards") {
    return (
      <div className="hidden print:grid print:grid-cols-2 print:gap-3">
        {roster.map((r) => (
          <div key={r.id} className="break-inside-avoid rounded-xl border-2 border-dashed border-black p-4">
            <p className="text-lg font-bold">{byProfile.get(r.profileId)?.name}</p>
            <p>
              Go to <b>{typeof window === "undefined" ? "" : window.location.host}/play</b> and tap “My teacher gave me a code”.
            </p>
            <p className="mt-2">
              Class code: <b className="font-mono text-xl tracking-widest">{cls.joinCode}</b>
            </p>
            <p>
              My code: <b className="font-mono text-xl tracking-widest">{r.loginCode}</b>
            </p>
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

function ClassPage({ id, tab, preselect, onBack }: { id: string; tab: ClassTab; preselect?: string[]; onBack: () => void }) {
  const [data, setData] = useState<ClassDetail | null>(null);
  const [ready, setReady] = useState(false);
  const [pick, setPick] = useState("");
  const [err, setErr] = useState("");
  const [confirmClose, setConfirmClose] = useState(false);
  const [due, setDue] = useState("");
  const [questions, setQuestions] = useState("");
  const [who, setWho] = useState<"all" | "some">("all");
  const [picked, setPicked] = useState<string[]>([]);
  const [now] = useState(() => Date.now());
  // "Assign extra practice to these students" on Progress arrives here with the students already chosen.
  const preselected = preselect?.join(",") ?? "";
  const [seen, setSeen] = useState("");
  if (preselected && preselected !== seen) {
    setSeen(preselected);
    setWho("some");
    setPicked(preselected.split(","));
  }
  const [printMode, setPrintMode] = useState<"cards" | "summary" | null>(null);

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
        })
        .catch((e: Error) => setErr(e.message)),
    [id],
  );
  useEffect(() => {
    void load();
  }, [load]);

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

  /** Sends a change and reloads the class. Resolves false (with the error shown) when the change failed. */
  const change = async (url: string, method: string, body?: unknown): Promise<boolean> => {
    setErr("");
    try {
      await call(url, method, body);
    } catch (e) {
      setErr((e as Error).message);
      return false;
    }
    await load().catch(() => undefined);
    return true;
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
      {printMode && <PrintSheet data={data} label={label} mode={printMode} />}
      <div className="print:hidden">
      <h1 className="text-3xl font-bold">{cls.name}</h1>
      <p className="font-read text-ink-soft">
        {classGradeText(cls)} · {getFramework(cls.framework).curriculumName}
      </p>

      {tab === "progress" && (
        <>
          <section className="mt-4 rounded-2xl border border-line bg-white p-5">
            <h2 className="text-xl font-bold">Students ({students.length})</h2>
            {students.length === 0 ? (
              <p className="mt-2 font-read text-ink-soft">No one has joined yet. {tabLink("students", "Add students or share the class code")}</p>
            ) : assignments.length === 0 ? (
              <p className="mt-2 font-read text-ink-soft">Assign homework to see how each student is doing. {tabLink("homework", "Go to Homework")}</p>
            ) : (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[32rem] text-left font-read">
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="py-2 pr-3">Student</th>
                      {assignments.map((k) => (
                        <th key={k} scope="col" className="py-2 pr-3">{label(k)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.profileId} className="border-b border-line align-top last:border-0">
                        <th scope="row" className="py-2 pr-3 font-bold">
                          {s.name}{cls.grade2 && <span className="font-normal text-ink-soft"> ({gradeLabel(s.grade as GradeId, cls.framework)})</span>}
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
                  onChange={(next) => void change("/api/classes/assignments/", "PATCH", { classId: id, unitKey: k, dueAt: next ? endOfDay(next) : null })}
                />
                <SelectMenu
                  label={`Questions for ${label(k)}`}
                  hideLabel
                  block={false}
                  value={data.goal?.[k] ? String(data.goal[k]) : ""}
                  onChange={(next) => void change("/api/classes/assignments/", "PATCH", { classId: id, unitKey: k, goal: next ? Number(next) : null })}
                  options={goalOptions}
                />
                <button type="button" aria-label={`Remove ${label(k)}`} className="min-h-9 min-w-9 rounded-full font-bold" onClick={() => change(`/api/classes/assignments/?classId=${id}&unitKey=${encodeURIComponent(k)}`, "DELETE")}>
                  ✕
                </button>
                <HomeworkProgress status={overview.find((o) => o.key === k)} />
                <RowAudience
                  key={`${k}:${(data.audience?.[k] ?? []).join(",")}`}
                  unitLabel={label(k)}
                  students={students}
                  current={data.audience?.[k] ?? []}
                  onSave={(ids) => void change("/api/classes/assignments/", "PATCH", { classId: id, unitKey: k, students: ids })}
                />
              </li>
            ))}
            {assignments.length === 0 && <li className="py-2 font-read text-ink-soft">Nothing assigned yet.</li>}
          </ul>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <SelectMenu
              label="Add a unit"
              value={pick}
              onChange={setPick}
              options={[{ value: "", label: "Choose a unit…" }]}
              groups={unitGroups(assignments)}
            />
            <DateField label="Due (optional)" value={due} onChange={setDue} />
            <SelectMenu label="Questions (optional)" block={false} value={questions} onChange={setQuestions} options={goalOptions} />
            <div className="basis-full">
              <AudiencePicker students={students} who={who} picked={picked} onWho={setWho} onPicked={setPicked} name="Who gets it" />
            </div>
            <button
              type="button"
              disabled={!pick || (who === "some" && picked.length === 0)}
              className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`}
              onClick={async () => {
                const ok = await change("/api/classes/assignments/", "POST", { classId: id, unitKey: pick, dueAt: due ? endOfDay(due) : undefined, goal: questions ? Number(questions) : undefined, ...(who === "some" ? { students: picked } : {}) });
                if (!ok) return;
                setPick("");
                setDue("");
                setQuestions("");
                setWho("all");
                setPicked([]);
              }}
            >
              Assign
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
                <button type="button" className="mt-3 rounded-xl border border-line px-4 py-2 font-semibold" onClick={() => change(`/api/classes/?id=${encodeURIComponent(id)}`, "PATCH")}>
                  Get a new code
                </button>
                <p className="mt-1 text-sm text-ink-soft">If the code was shared too widely. Families already linked stay linked; the old code stops working.</p>
              </>
            )}
          </section>
          <Roster data={data} onChange={change} onPrint={() => setPrintMode("cards")} />
          <SendHome cls={cls} />
        </>
      )}

      {tab === "settings" && (
        <>
          <Team data={data} onChange={change} onLeave={leave} />
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
    </>
  );
}

export function TeacherApp() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [account, setAccount] = useState<{ email?: string; verified?: boolean }>({});
  const { path, query } = useRoute();
  // #/class/{id}/{tab} opens a class on one tab; anything else is the class list.
  const classId = path[0] === "class" && path[1] ? path[1] : null;
  const tab = CLASS_TABS.find((t) => t.path === path[2])?.path ?? "progress";

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
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-2 px-4 py-3">
          <span className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold tracking-tight" aria-label={APP_NAME}>
              {APP_NAME.split("").map((ch, i) => (
                <span key={i} aria-hidden="true" style={{ color: WORDMARK_COLOURS[i % WORDMARK_COLOURS.length] }}>
                  {ch}
                </span>
              ))}
            </Link>
            <span className="text-lg font-semibold text-ink-soft">for teachers</span>
          </span>
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold underline">Home</Link>
            {signedIn && (
              <button
                type="button"
                className="font-semibold underline"
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
                <a href="#/" className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap text-ink-soft hover:bg-black/5">
                  ← All classes
                </a>
              </li>
              {CLASS_TABS.map((t) => (
                <li key={t.path}>
                  <a
                    href={classHref(classId, t.path)}
                    aria-current={tab === t.path ? "page" : undefined}
                    // On a phone the tabs scroll sideways: keep the open one in view.
                    ref={tab === t.path ? (el) => el?.scrollIntoView?.({ block: "nearest", inline: "nearest" }) : undefined}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap ${tab === t.path ? "bg-[#253047] text-white" : "text-ink-soft hover:bg-black/5"}`}
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
        ) : classId ? (
          <ClassPage key={classId} id={classId} tab={tab} preselect={query.get("students")?.split(",").filter(Boolean)} onBack={() => go("/")} />
        ) : (
          <ClassList account={account} onOpen={(id) => go(`/class/${encodeURIComponent(id)}`)} />
        )}
      </main>
    </div>
  );
}
