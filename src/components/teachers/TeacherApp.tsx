"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { coursesForGrade, getUnitRef, loadGrade } from "@/content";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { GRADE_ORDER, getSubjectMeta } from "@/content/subjects";
import type { FrameworkId, GradeId } from "@/content/types";
import { DateField } from "@/components/DateField";
import { SelectMenu } from "@/components/SelectMenu";
import { APP_NAME } from "@/lib/brand";
import { call, classInsights, isUsClass, US_CLASS_CONSENT, type ClassInvite, type ClassSummary, type RosterEntry, type StudentRow, type TeacherEntry } from "@/lib/classroom";
import { frameworkGroups, frameworkMenu } from "@/lib/frameworkGroups";
import { gradeLabel } from "@/lib/gradeLabel";
import { levelInfo } from "@/lib/proficiency";
import { MAIN_ID, SkipLink } from "@/components/SkipLink";

// The teacher area: create a class, share its code, assign BC units and see each linked student's
// practice results. Each class follows one province, territory or state (FRAMEWORKS). It talks to the server only (no kids' store), so it stays light.

/** "Province" while only Canada is offered, "Province or state" once a US state is. */
const REGION_LABEL = frameworkGroups(FRAMEWORKS).length > 1 ? "Province or state" : "Province";

const pct = (v: number) => `${Math.round(v * 100)}%`;
const btn = "min-h-11 rounded-xl px-4 font-bold";

function AuthForm({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await call(mode === "in" ? "/api/auth/login/" : "/api/auth/signup/", "POST", { email, password });
      onDone();
    } catch (x) {
      setErr((x as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-8 flex max-w-sm flex-col gap-3 rounded-2xl border border-line bg-white p-5">
      <h1 className="text-2xl font-bold">{mode === "in" ? "Teacher sign in" : "Create a teacher account"}</h1>
      <label className="flex flex-col text-sm font-semibold">
        Email
        <input className="mt-1 min-h-11 rounded-xl border border-line px-3" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="flex flex-col text-sm font-semibold">
        Password
        <input className="mt-1 min-h-11 rounded-xl border border-line px-3" type="password" autoComplete={mode === "in" ? "current-password" : "new-password"} minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      {err && (
        <p role="alert" className="text-nudge-dark">
          {err}
        </p>
      )}
      <button disabled={busy} className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`}>
        {mode === "in" ? "Sign in" : "Create account"}
      </button>
      <button type="button" className="text-sm font-semibold underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "New here? Create an account" : "Have an account? Sign in"}
      </button>
    </form>
  );
}

function ClassList({ onOpen }: { onOpen: (id: string) => void }) {
  const [classes, setClasses] = useState<ClassSummary[] | null>(null);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<GradeId>("3");
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
      const { class: c } = await call<{ class: ClassSummary }>("/api/classes/", "POST", { name, grade, framework });
      setName("");
      onOpen(c.id);
    } catch (x) {
      setErr((x as Error).message);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Your classes</h1>
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
                {gradeLabel(c.grade as GradeId, c.framework)} · {getFramework(c.framework as FrameworkId).region} · {c.students} {c.students === 1 ? "student" : "students"}{c.role === "co-teacher" ? " · you co-teach" : ""} · code <b className="font-mono tracking-widest">{c.joinCode}</b>
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
        <SelectMenu label="Grade" block={false} value={grade} onChange={(next) => setGrade(next as GradeId)} options={GRADE_ORDER.map((g) => ({ value: g, label: gradeLabel(g, framework) }))} />
        <SelectMenu label={REGION_LABEL} block={false} value={framework} onChange={(next) => setFramework(next as FrameworkId)} {...frameworkMenu((f) => f.region)} />
        <button className={`${btn} bg-[#25b47e] text-[#0f172a]`}>Create class</button>
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

interface ClassDetail {
  class: { id: string; name: string; grade: GradeId; framework: FrameworkId; joinCode: string };
  assignments: string[];
  due: Record<string, number>;
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

/** Add students by first name, share each one's login code, and print the cards. */
function Roster({ data, onChange, onPrint }: { data: ClassDetail; onChange: (url: string, method: string, body?: unknown) => Promise<boolean>; onPrint: () => void }) {
  const [names, setNames] = useState("");
  const [busy, setBusy] = useState(false);
  const [removing, setRemoving] = useState<RosterEntry | null>(null);
  const { class: cls, roster, students } = data;
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
              <span className="min-w-32 flex-1 font-read font-bold">{byProfile.get(r.profileId)?.name ?? "Student"}</span>
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
          if (await onChange("/api/classes/students/", "POST", { classId: cls.id, names: names.split(/\n|,/).map((n) => n.trim()).filter(Boolean) })) setNames("");
          setBusy(false);
        }}
      >
        <label className="flex flex-col text-sm font-semibold">
          First names, one per line
          <textarea className="mt-1 min-h-24 rounded-xl border border-line px-3 py-2 font-read" value={names} onChange={(e) => setNames(e.target.value)} placeholder={"Maya\nSam\nAlex P."} maxLength={1200} />
        </label>
        <div className="flex flex-wrap gap-3">
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
  const insights = classInsights(students, assignments, label, now);
  if (!students.length || !assignments.length) return null;
  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5 print:hidden">
      <h2 className="text-xl font-bold">What to look at next</h2>
      {insights.focusUnits.length === 0 && insights.checkIn.length === 0 ? (
        <p className="mt-2 font-read text-ink-soft">Nothing stands out. Everyone who has practised is doing fine on the assigned units.</p>
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
              <p className="font-read text-ink-soft">Everyone is practising and doing fine.</p>
            ) : (
              <ul className="mt-1 font-read">
                {insights.checkIn.map((s) => (
                  <li key={s.profileId}>
                    <b>{s.name}</b>: {s.reasons.join("; ")}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      <p className="mt-3 text-sm text-ink-soft">A student is flagged as finding a unit tricky after at least 4 questions with under 60% right on the first try. This reflects practice, not a report-card mark.</p>
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
        {cls.name} · {gradeLabel(cls.grade, cls.framework)} · {getFramework(cls.framework).curriculumName}
      </h1>
      <p className="text-sm">
        Practice summary printed {new Date(now).toLocaleDateString("en-CA", { dateStyle: "long" })}. This reflects practice in {APP_NAME}, not a report-card mark.
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
                  {levelLabel(u.level)}
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

function ClassPage({ id, onBack }: { id: string; onBack: () => void }) {
  const [data, setData] = useState<ClassDetail | null>(null);
  const [ready, setReady] = useState(false);
  const [pick, setPick] = useState("");
  const [err, setErr] = useState("");
  const [confirmClose, setConfirmClose] = useState(false);
  const [due, setDue] = useState("");
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
        .then((d) => loadGrade(d.class.grade, d.class.framework).then(() => d))
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

  return (
    <>
      {printMode && <PrintSheet data={data} label={label} mode={printMode} />}
      <div className="print:hidden">
      <button type="button" className="mb-3 font-semibold underline" onClick={onBack}>
        ← All classes
      </button>
      <h1 className="text-3xl font-bold">{cls.name}</h1>
      <p className="font-read text-ink-soft">
        {gradeLabel(cls.grade, cls.framework)} · {getFramework(cls.framework).curriculumName}
      </p>

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
      <Team data={data} onChange={change} onLeave={leave} />

      <section className="mt-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="text-xl font-bold">Assigned units</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {assignments.map((k) => (
            <li key={k} className="flex items-center gap-2 rounded-full bg-black/5 py-1 pl-3 pr-1 font-read">
              {getUnitRef(k)?.unit.emoji} {label(k)}
              <DateField
                label={`Due date for ${label(k)}`}
                hideLabel
                size="sm"
                value={data.due[k] ? toInput(data.due[k]) : ""}
                onChange={(next) => void change("/api/classes/assignments/", "PATCH", { classId: id, unitKey: k, dueAt: next ? endOfDay(next) : null })}
              />
              <button type="button" aria-label={`Remove ${label(k)}`} className="min-h-9 min-w-9 rounded-full font-bold" onClick={() => change(`/api/classes/assignments/?classId=${id}&unitKey=${encodeURIComponent(k)}`, "DELETE")}>
                ✕
              </button>
            </li>
          ))}
          {assignments.length === 0 && <li className="font-read text-ink-soft">Nothing assigned yet.</li>}
        </ul>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <SelectMenu
            label="Add a unit"
            value={pick}
            onChange={setPick}
            options={[{ value: "", label: "Choose a unit…" }]}
            groups={coursesForGrade(cls.grade, cls.framework).map((course) => ({
              label: getSubjectMeta(course.subject).title.big,
              options: course.units.map((u) => {
                const key = `${course.grade}/${course.subject}/${u.id}`;
                return { value: key, label: `${u.emoji} ${u.title}`, disabled: assignments.includes(key) };
              }),
            }))}
          />
          <DateField label="Due (optional)" value={due} onChange={setDue} />
          <button
            type="button"
            disabled={!pick}
            className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`}
            onClick={async () => {
              await change("/api/classes/assignments/", "POST", { classId: id, unitKey: pick, dueAt: due ? endOfDay(due) : undefined });
              setPick("");
              setDue("");
            }}
          >
            Assign
          </button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-line bg-white p-5">
        <h2 className="text-xl font-bold">Students ({students.length})</h2>
        {students.length === 0 ? (
          <p className="mt-2 font-read text-ink-soft">No one has joined yet.</p>
        ) : assignments.length === 0 ? (
          <p className="mt-2 font-read text-ink-soft">Assign a unit to see how each student is doing.</p>
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
                      {s.name}
                      <span className="block text-sm font-normal text-ink-soft">{s.lastActive ? `Active ${new Date(s.lastActive).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}` : "Not active yet"}</span>
                    </th>
                    {s.units.map((u) => (
                      <td key={u.key} className="py-2 pr-3">
                        <b>{levelLabel(u.level)}</b>
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
          <button type="button" className={`${btn} mt-3 border border-line`} onClick={() => setPrintMode("summary")}>
            Print class summary
          </button>
        )}
      </section>

      <Insights data={data} label={label} />
      <SendHome cls={cls} />

      {err && (
        <p role="alert" className="mt-3 text-nudge-dark">
          {err}
        </p>
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
      </div>
    </>
  );
}

export function TeacherApp() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [classId, setClassId] = useState<string | null>(null);

  useEffect(() => {
    // A class student's login is not a teacher's: only a real account counts.
    call<{ family?: { account?: { student?: boolean } } }>("/api/auth/me/")
      .then((r) => setSignedIn(!r.family?.account?.student))
      .catch(() => setSignedIn(false));
  }, []);

  return (
    <div className="min-h-dvh bg-[#f6f5f1]">
      <SkipLink />
      <header className="border-b border-line bg-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-2 px-4 py-3">
          <span className="text-lg font-bold">
            {APP_NAME} <span className="font-semibold text-ink-soft">for teachers</span>
          </span>
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold underline">Home</Link>
            {signedIn && (
              <button
                type="button"
                className="font-semibold underline"
                onClick={() => call("/api/auth/logout/", "POST").finally(() => { setSignedIn(false); setClassId(null); })}
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>
      <main id={MAIN_ID} tabIndex={-1} className="mx-auto max-w-4xl px-4 py-6">
        {signedIn === null ? <p className="font-read">Loading…</p> : !signedIn ? <AuthForm onDone={() => setSignedIn(true)} /> : classId ? <ClassPage id={classId} onBack={() => setClassId(null)} /> : <ClassList onOpen={setClassId} />}
      </main>
    </div>
  );
}
