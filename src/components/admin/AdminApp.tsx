"use client";

import Link from "next/link";
import { Component, useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { FRAMEWORKS, getFramework } from "@/content/frameworks";
import { GRADE_LABEL } from "@/content/subjects";
import type { GradeId } from "@/content/types";
import { DateField } from "@/components/DateField";
import { SelectMenu } from "@/components/SelectMenu";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";
import { call } from "@/lib/classroom";
import { Dashboard } from "./Dashboard";
import { Emails, FamilyEmail, formatAgo, Inbox, Queue, type EmailRow } from "./Engage";
import { Automations } from "./Automations";
import { FamilyBilling } from "./Billing";
import { Funnel } from "./Funnel";
import { Traffic } from "./Traffic";
import { LoadingCards, LoadingRows, TableRowsShape } from "./Skeleton";
import { Sales } from "./Sales";
import { System } from "./System";
import { TwoFactorCard, TwoFactorSetup, type TwoFactorInfo } from "./TwoFactor";
import { MaintenanceBanner, MaintenanceCard, type MaintenanceState } from "./Maintenance";
import { parseVariants, type ExperimentStatus, type FlagScope, type Variant } from "@/lib/flags";
import { verdict } from "@/lib/abVerdict";
import type { Segment } from "@/lib/adminEmails";
import { MAIN_ID, SkipLink } from "@/components/SkipLink";
import { QuestionVisual } from "@/components/visuals";
import type { ReportDetails } from "@/lib/questionReport";

// The site-wide admin panel. Only accounts listed in ADMIN_EMAILS (with a confirmed email) get past the
// server; everyone else sees a sign-in form or "not an admin". It talks to /api/admin/* only, so it stays
// light and never loads the kids' store or content.

const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const primary = `${btn} bg-[#4f8ef7] text-[#0f172a]`;
const quiet = `${btn} border border-line bg-white`;
const danger = `${btn} border border-[#e57a12] bg-white text-nudge-dark`;
const field = "mt-1 min-h-11 rounded-xl border border-line bg-white px-3";
const card = "rounded-2xl border border-line bg-white p-5";

const day = (t: number | null | undefined) => (t ? new Date(t).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" }) : "—");
const when = (t: number) => new Date(t).toLocaleString("en-CA", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
/** Access far in the future is lifetime (see LIFETIME_ACCESS in src/lib/plan.ts). */
const accessText = (t: number | null) => (!t ? "—" : t > Date.now() + 50 * 365 * 86_400_000 ? "Lifetime" : t < Date.now() ? `Ended ${day(t)}` : `Until ${day(t)}`);
const pct = (n: number, d: number) => (d ? `${Math.round((n / d) * 1000) / 10}%` : "—");
const endOfDay = (v: string) => new Date(`${v}T23:59:00`).getTime();

/** A child's province as saved: no province means the default one, an unknown id is shown as it is (not as the default). */
function regionName(framework: string): string {
  if (!framework) return getFramework().region;
  return FRAMEWORKS.find((f) => f.id === framework)?.region ?? framework;
}

function Notice({ err, ok }: { err?: string; ok?: string }) {
  if (err)
    return (
      <p role="alert" className="mt-2 text-nudge-dark">
        {err}
      </p>
    );
  if (ok)
    return (
      <p role="status" className="mt-2 text-[#16794f]">
        {ok}
      </p>
    );
  return null;
}

/** Runs an admin action and reports what happened. */
function useAction(after?: () => void) {
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  const act = useCallback(
    async (url: string, method: string, body: unknown, done: string) => {
      setBusy(true);
      setErr("");
      setOk("");
      try {
        await call(url, method, body);
        setOk(done);
        after?.();
        return true;
      } catch (x) {
        setErr((x as Error).message);
        return false;
      } finally {
        setBusy(false);
      }
    },
    [after],
  );
  return { act, err, ok, busy, setErr };
}

function SignIn({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  // Set once the server says this account uses two-step sign-in (after a right password).
  const [needCode, setNeedCode] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await call("/api/auth/login/", "POST", { email, password, ...(needCode ? { code } : {}) });
      onDone();
    } catch (x) {
      // The server asks for the code only after a right password; that first answer isn't shown as an error.
      const asksForCode = (x as { data?: { mfaRequired?: boolean } }).data?.mfaRequired;
      if (asksForCode) {
        if (needCode) setErr((x as Error).message);
        setNeedCode(true);
      } else setErr((x as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} className={`mx-auto mt-8 flex max-w-sm flex-col gap-3 ${card}`}>
      <h1 className="text-2xl font-bold">Admin Sign In</h1>
      <label className="flex flex-col text-sm font-semibold">
        Email
        <input className={field} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={needCode} required />
      </label>
      <label className="flex flex-col text-sm font-semibold">
        Password
        <input className={field} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} readOnly={needCode} required />
      </label>
      {needCode && (
        <label className="flex flex-col text-sm font-semibold">
          Authenticator code
          <input className={field} inputMode="text" autoComplete="one-time-code" autoFocus value={code} onChange={(e) => setCode(e.target.value)} required aria-describedby="code-help" />
          <span id="code-help" className="mt-1 font-normal text-ink-soft">
            The 6-digit code from your authenticator app, or one of your recovery codes.
          </span>
        </label>
      )}
      <Notice err={err} />
      <button disabled={busy} className={primary}>
        {needCode ? "Verify and Sign In" : "Sign In"}
      </button>
    </form>
  );
}

// ---------- Overview ----------

function Overview({ onOpenFamily }: { onOpenFamily: (id: string) => void }) {
  return (
    <section aria-labelledby="overview-h">
      <h2 id="overview-h" className="text-2xl font-bold">
        Overview
      </h2>
      <Dashboard onOpenFamily={onOpenFamily} />
    </section>
  );
}

// ---------- Users ----------

interface UserRow {
  familyId: string;
  email: string;
  createdAt: number;
  plan: string;
  trialEndsAt: number;
  accessUntil: number | null;
  subscriptionStatus: string | null;
  lastLogin: number | null;
  lastPractice: number | null;
}

interface FamilyDetail {
  family: {
    id: string;
    createdAt: number;
    plan: string;
    trialEndsAt: number;
    accessUntil: number | null;
    schoolUntil: number | null;
    discountCode: string | null;
    stripeCustomer: string | null;
    subscriptionStatus: string | null;
    subscriptionInterval: string | null;
    currentPeriodEnd: number | null;
  };
  parents: {
    id: string;
    email: string;
    createdAt: number;
    verified: boolean;
    weeklyReport: boolean;
    practiceReminders: boolean;
    newsAndTips: boolean;
    bouncedAt: number | null;
    lastLogin: number | null;
  }[];
  emails: EmailRow[];
  children: { grade: string; framework: string }[];
  activity: { events: number; lastActive: number | null };
  sessions: { active: number; lastSignIn: number | null };
  classes: number;
  redemptions: { code: string; kind: string | null; redeemedAt: number }[];
  overrides: Record<string, boolean>;
  experiments: Record<string, string>;
  sees: { premium: boolean; paid: boolean; trialDaysLeft: number; flags: string[] };
  notes: { id: number; author: string; body: string; createdAt: number }[];
}

type Role = "admin" | "support";

function planText(u: { plan: string; trialEndsAt: number; subscriptionStatus: string | null }) {
  if (u.plan === "premium") return `Paying${u.subscriptionStatus ? ` (${u.subscriptionStatus})` : ""}`;
  if (u.plan === "trial" && u.trialEndsAt > Date.now()) return `Trial until ${day(u.trialEndsAt)}`;
  return "Free";
}

function Users({ flags, role, email, initialOpen = null }: { flags: FlagRow[]; role: Role; email: string; initialOpen?: string | null }) {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<UserRow[] | null>(null);
  const [open, setOpen] = useState<string | null>(initialOpen);
  const [err, setErr] = useState("");
  const search = useCallback((query: string) => {
    call<{ users: UserRow[] }>(`/api/admin/users/?q=${encodeURIComponent(query)}`).then(
      (r) => {
        setErr("");
        setUsers(r.users);
      },
      (e: Error) => setErr(e.message),
    );
  }, []);
  useEffect(() => search(""), [search]);

  if (open) return <UserDetail id={open} flags={flags} role={role} email={email} onBack={() => { setOpen(null); search(q); }} />;
  return (
    <section aria-labelledby="users-h">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="users-h" className="text-2xl font-bold">Users</h2>
        {role === "admin" && (
          <p className="flex flex-wrap gap-x-4">
            <a className="min-h-11 font-semibold text-[#2a5bd7] underline" href="/api/admin/export/?type=users" download>
              Download accounts CSV
            </a>
            <a className="min-h-11 font-semibold text-[#2a5bd7] underline" href="/api/admin/export/?type=payments" download>
              Download payments CSV
            </a>
          </p>
        )}
      </div>
      <form
        className="mt-3 flex flex-wrap items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          search(q);
        }}
      >
        <label className="flex min-w-60 flex-1 flex-col text-sm font-semibold">
          Search by email or family id
          <input className={field} type="search" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <button className={primary}>Search</button>
      </form>
      <Notice err={err} />
      {(users || !err) && (
        <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[48rem] text-left" aria-busy={!users}>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-3">Email</th>
                <th scope="col" className="p-3">Joined</th>
                <th scope="col" className="p-3">Plan</th>
                <th scope="col" className="p-3">Code access</th>
                <th scope="col" className="p-3">Last sign-in</th>
                <th scope="col" className="p-3">Last practice</th>
              </tr>
            </thead>
            <tbody>
              {!users && <TableRowsShape cols={6} rows={6} />}
              {users?.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-3 text-ink-soft">No accounts match.</td>
                </tr>
              )}
              {users?.map((u) => (
                <tr key={`${u.familyId}:${u.email}`} className="border-b border-line last:border-0">
                  <th scope="row" className="p-3 font-normal">
                    <button type="button" className="min-h-11 text-left font-semibold underline" onClick={() => setOpen(u.familyId)}>
                      {u.email}
                    </button>
                  </th>
                  <td className="p-3">{day(u.createdAt)}</td>
                  <td className="p-3">{planText(u)}</td>
                  <td className="p-3">{accessText(u.accessUntil)}</td>
                  <td className="p-3">{u.lastLogin ? formatAgo(u.lastLogin) : "—"}</td>
                  <td className="p-3">{u.lastPractice ? formatAgo(u.lastPractice) : "Never"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function UserDetail({ id, flags, role, email, onBack }: { id: string; flags: FlagRow[]; role: Role; email: string; onBack: () => void }) {
  const [d, setD] = useState<FamilyDetail | null>(null);
  const [loadErr, setLoadErr] = useState("");
  const [trialDays, setTrialDays] = useState("14");
  const [accessDays, setAccessDays] = useState("365");
  const [confirm, setConfirm] = useState("");
  const [deleted, setDeleted] = useState(false);
  const load = useCallback(() => {
    call<FamilyDetail>(`/api/admin/users/?id=${encodeURIComponent(id)}`).then(setD, (e: Error) => setLoadErr(e.message));
  }, [id]);
  useEffect(load, [load]);
  const { act, err, ok, busy } = useAction(load);
  const run = (action: string, extra: Record<string, unknown>, done: string): Promise<boolean> => act("/api/admin/users/", "POST", { familyId: id, action, ...extra }, done);

  if (deleted)
    return (
      <section className={card}>
        <p role="status">The account and all its data were deleted.</p>
        <button type="button" className={`${quiet} mt-3`} onClick={onBack}>Back to Users</button>
      </section>
    );
  if (!d)
    return loadErr ? (
      <Notice err={loadErr} />
    ) : (
      <section className="flex flex-col gap-4">
        <button type="button" className="self-start font-semibold underline" onClick={onBack}>
          ← All Users
        </button>
        <LoadingCards count={4} className="" />
      </section>
    );
  const f = d.family;
  return (
    <section aria-labelledby="user-h" className="flex flex-col gap-4">
      <button type="button" className="self-start font-semibold underline" onClick={onBack}>
        ← All Users
      </button>
      <div className={card}>
        <h2 id="user-h" className="break-all text-2xl font-bold">{d.parents.map((p) => p.email).join(", ")}</h2>
        <dl className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
          <div><dt className="inline font-semibold">Joined: </dt><dd className="inline">{day(f.createdAt)}</dd></div>
          <div><dt className="inline font-semibold">Plan: </dt><dd className="inline">{planText(f)}</dd></div>
          <div><dt className="inline font-semibold">Trial ends: </dt><dd className="inline">{day(f.trialEndsAt)}</dd></div>
          <div><dt className="inline font-semibold">Code or admin access: </dt><dd className="inline">{accessText(f.accessUntil)}</dd></div>
          <div><dt className="inline font-semibold">School plan: </dt><dd className="inline">{accessText(f.schoolUntil)}</dd></div>
          <div><dt className="inline font-semibold">Subscription: </dt><dd className="inline">{f.subscriptionStatus ? `${f.subscriptionStatus}${f.subscriptionInterval ? `, ${f.subscriptionInterval}ly` : ""}${f.currentPeriodEnd ? `, renews ${day(f.currentPeriodEnd)}` : ""}` : "None"}</dd></div>
          <div><dt className="inline font-semibold">Waiting discount: </dt><dd className="inline">{f.discountCode ?? "None"}</dd></div>
          <div><dt className="inline font-semibold">Last practice: </dt><dd className="inline">{day(d.activity.lastActive)} ({d.activity.events.toLocaleString("en-CA")} events)</dd></div>
          <div><dt className="inline font-semibold">Last sign-in: </dt><dd className="inline">{d.parents[0]?.lastLogin ? formatAgo(d.parents[0].lastLogin) : "—"}</dd></div>
          <div><dt className="inline font-semibold">Signed in on: </dt><dd className="inline">{d.sessions.active} {d.sessions.active === 1 ? "device" : "devices"}</dd></div>
          <div><dt className="inline font-semibold">Open classes: </dt><dd className="inline">{d.classes}</dd></div>
          <div><dt className="inline font-semibold">Family id: </dt><dd className="inline break-all font-mono text-sm">{f.id}</dd></div>
        </dl>
        <h3 className="mt-4 font-bold">Children</h3>
        <p className="font-read">
          {d.children.length === 0 ? "None yet." : d.children.map((c) => `${GRADE_LABEL[c.grade as GradeId] ?? c.grade} (${regionName(c.framework)})`).join(", ")}
        </p>
        <p className="text-sm text-ink-soft">Names and results stay private to the family.</p>
        {d.redemptions.length > 0 && (
          <>
            <h3 className="mt-4 font-bold">Codes Used</h3>
            <ul className="font-read">
              {d.redemptions.map((r) => (
                <li key={r.code}>
                  <span className="font-mono">{r.code}</span> ({r.kind ?? "deleted"}) on {day(r.redeemedAt)}
                </li>
              ))}
            </ul>
          </>
        )}
        {Object.keys(d.experiments).length > 0 && (
          <>
            <h3 className="mt-4 font-bold">A/B Tests</h3>
            <p className="font-read">{Object.entries(d.experiments).map(([k, v]) => `${k}: ${v}`).join(", ")}</p>
          </>
        )}
      </div>

      <FamilySees d={d} flags={flags} />

      <FamilyNotes notes={d.notes} role={role} email={email} run={run} busy={busy} />

      {role === "admin" && (
        <>
      <div className={card}>
        <h3 className="text-xl font-bold">Access</h3>
        <div className="mt-2 flex flex-wrap items-end gap-2">
          <label className="flex flex-col text-sm font-semibold">
            Extend trial by (days)
            <input className={`${field} w-28`} type="number" min={1} max={365} value={trialDays} onChange={(e) => setTrialDays(e.target.value)} />
          </label>
          <button type="button" disabled={busy} className={quiet} onClick={() => void run("extend-trial", { days: Number(trialDays) }, "Trial extended.")}>
            Extend Trial
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <label className="flex flex-col text-sm font-semibold">
            Free access (days)
            <input className={`${field} w-28`} type="number" min={1} max={3650} value={accessDays} onChange={(e) => setAccessDays(e.target.value)} />
          </label>
          <button type="button" disabled={busy} className={quiet} onClick={() => void run("grant-access", { days: Number(accessDays) }, "Access added.")}>
            Add Days
          </button>
          <button type="button" disabled={busy} className={quiet} onClick={() => void run("grant-access", { days: null }, "Lifetime access given.")}>
            Give Lifetime Access
          </button>
          {f.accessUntil && (
            <button type="button" disabled={busy} className={danger} onClick={() => void run("remove-access", {}, "Code and admin access removed.")}>
              Remove Access
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <span className="text-sm font-semibold">School plan (roster import)</span>
          <button type="button" disabled={busy} className={quiet} onClick={() => void run("grant-school", { days: 365 }, "School plan added for a year.")}>
            Add A Year
          </button>
          <button type="button" disabled={busy} className={quiet} onClick={() => void run("grant-school", { days: null }, "Lifetime school plan given.")}>
            Give Lifetime School Plan
          </button>
          {f.schoolUntil && (
            <button type="button" disabled={busy} className={danger} onClick={() => void run("remove-school", {}, "School plan removed.")}>
              Remove School Plan
            </button>
          )}
        </div>
        <p className="mt-2 text-sm text-ink-soft">Access is separate from Stripe: it never changes a subscription, and cancelling one never removes it.</p>
      </div>

      <div className={card}>
        <h3 className="text-xl font-bold">Account</h3>
        <ul className="mt-2 flex flex-col gap-2">
          {d.parents.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-2">
              <span className="break-all">{p.email}</span>
              <span className="text-sm text-ink-soft">
                {p.verified ? "email confirmed" : "email not confirmed"}
                {p.bouncedAt ? ", bouncing" : ""}
                {`, weekly report ${p.weeklyReport ? "on" : "off"}, reminders ${p.practiceReminders ? "on" : "off"}, news and tips ${p.newsAndTips ? "on" : "off"}`}
              </span>
              {!p.verified && (
                <button type="button" disabled={busy} className={quiet} onClick={() => void run("verify-email", { parentId: p.id }, "Email marked as confirmed.")}>
                  Mark Email Confirmed
                </button>
              )}
            </li>
          ))}
        </ul>
        <button type="button" disabled={busy} className={`${quiet} mt-3`} onClick={() => void run("sign-out", {}, "Signed out on every device.")}>
          Sign Out Everywhere
        </button>
      </div>

      <FamilyBilling familyId={id} pastDue={d.family.subscriptionStatus === "past_due"} />

      <FamilyEmail familyId={id} parent={d.parents[0]} emails={d.emails} />

      <div className={card}>
        <h3 className="text-xl font-bold">Feature Flags for This Family</h3>
        <p className="text-sm text-ink-soft">An override wins over the site-wide setting and the rollout.</p>
        <ul className="mt-2 divide-y divide-line">
          {flags.map((fl) => {
            const o = d.overrides[fl.key];
            const value = o === undefined ? "site" : o ? "on" : "off";
            return (
              <li key={fl.key} className="flex flex-wrap items-center justify-between gap-2 py-2">
                <span className="font-semibold">{fl.label}</span>
                <SelectMenu
                  label={`${fl.label} for this family`}
                  hideLabel
                  block={false}
                  value={value}
                  onChange={(v) => void run("override", { key: fl.key, enabled: v === "site" ? null : v === "on" }, `${fl.label}: ${v === "site" ? "site-wide setting" : `forced ${v}`}.`)}
                  options={[
                    { value: "site", label: `Site-wide (${fl.enabled ? (fl.rollout < 100 ? `${fl.rollout}%` : "on") : "off"})` },
                    { value: "on", label: "Always on" },
                    { value: "off", label: "Always off" },
                  ]}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className={card}>
        <h3 className="text-xl font-bold">Delete This Account</h3>
        <p className="mt-1 font-read text-ink-soft">Cancels any subscription, then deletes the family, its children and all practice data. This can&apos;t be undone.</p>
        <div className="mt-2 flex flex-wrap items-end gap-2">
          <label className="flex min-w-60 flex-1 flex-col text-sm font-semibold">
            Type the account&apos;s email to confirm
            <input className={field} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
          </label>
          <button
            type="button"
            disabled={busy || !confirm}
            className={danger}
            onClick={async () => {
              if (await act("/api/admin/users/", "POST", { familyId: id, action: "delete", confirm }, "Deleted.")) setDeleted(true);
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
        </>
      )}
      {(err || ok) && (
        <div className={`sticky bottom-4 ${card} py-3 shadow-lg`}>
          <Notice err={err} ok={ok} />
        </div>
      )}
    </section>
  );
}

/** What the family itself sees, worked out the way their own screens do. Support staff use it to answer "why can't I see...?". */
function FamilySees({ d, flags }: { d: FamilyDetail; flags: FlagRow[] }) {
  const s = d.sees;
  const on = flags.filter((f) => s.flags.includes(f.key));
  return (
    <div className={card}>
      <h3 className="text-xl font-bold">What This Family Sees</h3>
      <p className="mt-1 font-read">
        {s.paid ? "A paid or code plan: every unit is open." : s.premium ? `Free trial, ${s.trialDaysLeft} ${s.trialDaysLeft === 1 ? "day" : "days"} left: every unit is open.` : "Free plan: the first 2 units of every course are open."}
      </p>
      <p className="mt-1 font-read text-ink-soft">
        {flags.length === 0 ? `${s.flags.length} optional features are on for them.` : on.length ? `Features on for them: ${on.map((f) => f.label).join(", ")}.` : "No optional features are on for them."}
      </p>
      <p className="mt-1 text-sm text-ink-soft">A read-only summary. It never shows a child&apos;s name or results.</p>
    </div>
  );
}

/** Private notes on a family. Never shown to the family, and not for anything about a child. */
function FamilyNotes({
  notes,
  role,
  email,
  run,
  busy,
}: {
  notes: FamilyDetail["notes"];
  role: Role;
  email: string;
  run: (action: string, extra: Record<string, unknown>, done: string) => Promise<boolean>;
  busy: boolean;
}) {
  const [text, setText] = useState("");
  return (
    <div className={card}>
      <h3 className="text-xl font-bold">Private Notes</h3>
      <p className="text-sm text-ink-soft">Only admins and support staff see these. Don&apos;t write anything about a child.</p>
      <form
        className="mt-2 flex flex-wrap items-end gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (await run("add-note", { body: text }, "Note saved.")) setText("");
        }}
      >
        <label className="flex min-w-60 flex-1 flex-col text-sm font-semibold">
          New note
          <textarea className={field} rows={2} maxLength={1000} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <button className={primary} disabled={busy || !text.trim()}>
          Save Note
        </button>
      </form>
      {notes.length === 0 ? (
        <p className="mt-3 text-ink-soft">No notes yet.</p>
      ) : (
        <ul className="mt-3 divide-y divide-line">
          {notes.map((n) => (
            <li key={n.id} className="flex flex-wrap items-start justify-between gap-2 py-2">
              <div>
                <p className="font-read whitespace-pre-wrap">{n.body}</p>
                <p className="text-sm text-ink-soft">
                  {n.author} on {day(n.createdAt)}
                </p>
              </div>
              {(role === "admin" || n.author === email) && (
                <button type="button" disabled={busy} className={quiet} onClick={() => void run("delete-note", { noteId: n.id }, "Note removed.")}>
                  Remove Note
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- Codes ----------

interface CodeRow {
  code: string;
  display: string;
  kind: "access" | "discount";
  days: number | null;
  percent_off: number | null;
  duration: string | null;
  months: number | null;
  max_uses: number | null;
  uses: number;
  expires_at: number | null;
  note: string | null;
  created_at: number;
  disabled_at: number | null;
}

function codeWhat(c: CodeRow) {
  if (c.kind === "access") return c.days ? `${c.days} days free` : "Lifetime access";
  const span = c.duration === "forever" ? "every payment" : c.duration === "repeating" ? `${c.months} months` : "first payment";
  return `${c.percent_off}% off ${span}`;
}

function Codes() {
  const [codes, setCodes] = useState<CodeRow[] | null>(null);
  const [kind, setKind] = useState<"access" | "discount">("access");
  const [lifetime, setLifetime] = useState(false);
  const [days, setDays] = useState("365");
  const [percent, setPercent] = useState("25");
  const [duration, setDuration] = useState("once");
  const [months, setMonths] = useState("3");
  const [maxUses, setMaxUses] = useState("");
  const [expires, setExpires] = useState("");
  const [custom, setCustom] = useState("");
  const [note, setNote] = useState("");
  const [made, setMade] = useState("");
  const load = useCallback(() => {
    call<{ codes: CodeRow[] }>("/api/admin/codes/").then((r) => setCodes(r.codes), () => setCodes([]));
  }, []);
  useEffect(load, [load]);
  const { act, err, ok, busy, setErr } = useAction(load);

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setMade("");
    const body: Record<string, unknown> = { kind, note: note.trim() || undefined, code: custom.trim() || undefined };
    if (kind === "access" && !lifetime) body.days = Number(days);
    if (kind === "discount") {
      body.percentOff = Number(percent);
      body.duration = duration;
      if (duration === "repeating") body.months = Number(months);
    }
    if (maxUses) body.maxUses = Number(maxUses);
    if (expires) body.expiresAt = endOfDay(expires);
    try {
      setErr("");
      const r = await call<{ code: CodeRow }>("/api/admin/codes/", "POST", body);
      setMade(r.code.display);
      setCustom("");
      setNote("");
      load();
    } catch (x) {
      setErr((x as Error).message);
    }
  };

  return (
    <section aria-labelledby="codes-h" className="flex flex-col gap-4">
      <h2 id="codes-h" className="text-2xl font-bold">Codes</h2>
      <form onSubmit={create} className={`${card} flex flex-col gap-3`}>
        <h3 className="text-xl font-bold">Make a Code</h3>
        <div className="flex flex-wrap gap-3">
          <SelectMenu
            label="Kind"
            block={false}
            value={kind}
            onChange={(v) => setKind(v as "access" | "discount")}
            options={[
              { value: "access", label: "Free access" },
              { value: "discount", label: "Discount at checkout" },
            ]}
          />
          {kind === "access" ? (
            <>
              <label className="flex items-center gap-2 self-end pb-3 text-sm font-semibold">
                <input type="checkbox" className="h-5 w-5" checked={lifetime} onChange={(e) => setLifetime(e.target.checked)} />
                Lifetime
              </label>
              {!lifetime && (
                <label className="flex flex-col text-sm font-semibold">
                  Days
                  <input className={`${field} w-28`} type="number" min={1} max={3650} value={days} onChange={(e) => setDays(e.target.value)} required />
                </label>
              )}
            </>
          ) : (
            <>
              <label className="flex flex-col text-sm font-semibold">
                Percent off
                <input className={`${field} w-28`} type="number" min={1} max={100} value={percent} onChange={(e) => setPercent(e.target.value)} required />
              </label>
              <SelectMenu
                label="For"
                block={false}
                value={duration}
                onChange={setDuration}
                options={[
                  { value: "once", label: "The first payment" },
                  { value: "repeating", label: "A number of months" },
                  { value: "forever", label: "Every payment" },
                ]}
              />
              {duration === "repeating" && (
                <label className="flex flex-col text-sm font-semibold">
                  Months
                  <input className={`${field} w-24`} type="number" min={1} max={36} value={months} onChange={(e) => setMonths(e.target.value)} required />
                </label>
              )}
            </>
          )}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col text-sm font-semibold">
            Use limit (optional)
            <input className={`${field} w-32`} type="number" min={1} value={maxUses} onChange={(e) => setMaxUses(e.target.value)} />
          </label>
          <DateField label="Expires (optional)" value={expires} onChange={setExpires} />
          <label className="flex flex-col text-sm font-semibold">
            Custom code (optional)
            <input className={`${field} w-48 font-mono uppercase`} value={custom} onChange={(e) => setCustom(e.target.value)} maxLength={40} />
          </label>
        </div>
        <label className="flex flex-col text-sm font-semibold">
          Note (who it&apos;s for, optional)
          <input className={field} value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} />
        </label>
        <p className="text-sm text-ink-soft">Leave the code empty for a random 12-character one. Short custom codes are easy to guess, so use them for discounts, not access.</p>
        <button disabled={busy} className={`${primary} self-start`}>Make Code</button>
        {made && (
          <p role="status" className="text-lg">
            New code: <b className="font-mono tracking-wider">{made}</b>
          </p>
        )}
        <Notice err={err} ok={ok} />
      </form>

      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[44rem] text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="p-3">Code</th>
              <th scope="col" className="p-3">Gives</th>
              <th scope="col" className="p-3">Used</th>
              <th scope="col" className="p-3">Expires</th>
              <th scope="col" className="p-3">Note</th>
              <th scope="col" className="p-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {!codes && <TableRowsShape cols={6} />}
            {codes?.length === 0 && (
              <tr>
                <td colSpan={6} className="p-3 text-ink-soft">No codes yet.</td>
              </tr>
            )}
            {codes?.map((c) => (
              <tr key={c.code} className="border-b border-line last:border-0">
                <th scope="row" className="p-3 font-mono font-normal">{c.display}</th>
                <td className="p-3">{codeWhat(c)}</td>
                <td className="p-3">{c.uses}{c.max_uses ? ` of ${c.max_uses}` : ""}</td>
                <td className="p-3">{c.expires_at ? day(c.expires_at) : "Never"}</td>
                <td className="p-3">{c.note ?? ""}</td>
                <td className="p-3">
                  {c.disabled_at ? (
                    <span className="text-ink-soft">Disabled {day(c.disabled_at)}</span>
                  ) : (
                    <button type="button" disabled={busy} className={danger} onClick={() => void act("/api/admin/codes/", "DELETE", { code: c.code }, `${c.display} disabled.`)}>
                      Disable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ---------- Flags ----------

interface FlagRow {
  key: string;
  label: string;
  description: string;
  scope: FlagScope;
  defaultOn: boolean;
  enabled: boolean;
  rollout: number;
  changed: boolean;
  overrides: number;
}

function FlagItem({ flag, onSaved }: { flag: FlagRow; onSaved: () => void }) {
  const [rollout, setRollout] = useState(String(flag.rollout));
  const { act, err, ok, busy } = useAction(onSaved);
  const save = (enabled: boolean, r = Number(rollout)) => act("/api/admin/flags/", "PUT", { key: flag.key, enabled, rollout: r }, "Saved.");
  return (
    <li className="flex flex-col gap-2 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="block font-bold">
            {flag.label} <span className="font-mono text-sm font-normal text-ink-soft">{flag.key}</span>
          </span>
          <span className="block font-read text-ink-soft">{flag.description}</span>
          <span className="block text-sm text-ink-soft">
            {flag.scope === "app" ? "Kids' app" : "Server"} · default {flag.defaultOn ? "on" : "off"}
            {flag.overrides ? ` · ${flag.overrides} family ${flag.overrides === 1 ? "override" : "overrides"}` : ""}
          </span>
        </div>
        <label className="flex items-center gap-2 font-semibold">
          <input type="checkbox" role="switch" className="h-6 w-6" checked={flag.enabled} disabled={busy} onChange={(e) => void save(e.target.checked)} />
          {flag.enabled ? "On" : "Off"}
        </label>
      </div>
      {flag.enabled && (
        <div className="flex flex-wrap items-end gap-2">
          <label className="flex flex-col text-sm font-semibold">
            Rollout (% of families)
            <input className={`${field} w-28`} type="number" min={0} max={100} value={rollout} onChange={(e) => setRollout(e.target.value)} />
          </label>
          <button type="button" disabled={busy || Number(rollout) === flag.rollout} className={quiet} onClick={() => void save(true)}>
            Save Rollout
          </button>
        </div>
      )}
      <Notice err={err} ok={ok} />
    </li>
  );
}

function Flags({ flags, reload }: { flags: FlagRow[] | null; reload: () => void }) {
  return (
    <section aria-labelledby="flags-h">
      <h2 id="flags-h" className="text-2xl font-bold">Feature Flags</h2>
      <p className="mt-1 font-read text-ink-soft">
        Switch a feature off for everyone, or roll it out to a share of families (the same families each time). Devices pick up a change the next time the app opens or comes back into view. To force a flag for one family, open them under Users.
      </p>
      {!flags ? (
        <LoadingRows rows={6} />
      ) : (
        <ul className={`mt-3 divide-y divide-line ${card}`}>
          {flags.map((f) => (
            <FlagItem key={`${f.key}:${f.enabled}:${f.rollout}`} flag={f} onSaved={reload} />
          ))}
        </ul>
      )}
    </section>
  );
}

// ---------- Experiments ----------

interface ExperimentRow {
  key: string;
  description: string;
  status: ExperimentStatus;
  variants: Variant[];
  winner: string | null;
  createdAt: number;
  startedAt: number | null;
  stoppedAt: number | null;
  results: { variant: string; families: number; paid: number; active: number; paidP: number | null; activeP: number | null }[];
}

const pText = (p: number | null) => (p == null ? "" : p < 0.05 ? ` (p ${p < 0.001 ? "< 0.001" : `= ${p.toFixed(3)}`}, significant)` : ` (p = ${p.toFixed(2)})`);

/** Which variant is ahead and how sure that is, with a button to use it for everyone. */
function Verdict({ e, busy, onPick }: { e: ExperimentRow; busy: boolean; onPick: (winner: string) => void }) {
  const v = verdict(e.results);
  return (
    <div className={`mt-3 rounded-xl p-3 ${v.ready ? "bg-[#e3f6ee]" : "bg-[#f1f5f9]"}`} role="status">
      <p className="font-semibold">{v.message}</p>
      {v.leader && (
        <button type="button" className={`${v.ready ? primary : quiet} mt-2`} disabled={busy} onClick={() => onPick(v.leader!)}>
          Use {v.leader} for Everyone
        </button>
      )}
    </div>
  );
}

function ExperimentCard({ e, reload }: { e: ExperimentRow; reload: () => void }) {
  const [winner, setWinner] = useState(e.variants[0]?.name ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { act, err, ok, busy } = useAction(reload);
  const total = e.variants.reduce((n, v) => n + v.weight, 0);
  return (
    <li className={card}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-mono text-xl font-bold">{e.key}</h3>
        <span className="font-semibold">
          {e.status === "draft" ? "Draft" : e.status === "running" ? `Running since ${day(e.startedAt)}` : `Stopped ${day(e.stoppedAt)}${e.winner ? `, everyone sees ${e.winner}` : ", everyone sees the control"}`}
        </span>
      </div>
      {e.description && <p className="mt-1 font-read">{e.description}</p>}
      <p className="mt-1 text-sm text-ink-soft">
        Variants: {e.variants.map((v, i) => `${v.name} ${Math.round((v.weight / total) * 100)}%${i === 0 ? " (control)" : ""}`).join(", ")}
      </p>
      {e.status !== "draft" && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[30rem] text-left">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-2 pr-3">Variant</th>
                <th scope="col" className="py-2 pr-3">Families</th>
                <th scope="col" className="py-2 pr-3">Paying</th>
                <th scope="col" className="py-2 pr-3">Practised this week</th>
              </tr>
            </thead>
            <tbody>
              {e.results.map((r) => (
                <tr key={r.variant} className="border-b border-line last:border-0">
                  <th scope="row" className="py-2 pr-3 font-mono font-normal">{r.variant}</th>
                  <td className="py-2 pr-3">{r.families}</td>
                  <td className="py-2 pr-3">{r.paid} · {pct(r.paid, r.families)}{pText(r.paidP)}</td>
                  <td className="py-2 pr-3">{r.active} · {pct(r.active, r.families)}{pText(r.activeP)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-1 text-sm text-ink-soft">Signed-in families are counted the first time their app asks for the test. p compares each variant with the control; under 0.05 is unlikely to be chance.</p>
        </div>
      )}
      {e.status === "running" && <Verdict e={e} busy={busy} onPick={(w) => void act("/api/admin/experiments/", "PATCH", { key: e.key, action: "stop", winner: w }, `Stopped. Everyone now sees ${w}.`)} />}
      <div className="mt-3 flex flex-wrap items-end gap-2">
        {e.status === "draft" && (
          <button type="button" disabled={busy} className={primary} onClick={() => void act("/api/admin/experiments/", "PATCH", { key: e.key, action: "start" }, "Started.")}>
            Start
          </button>
        )}
        {e.status !== "draft" && (
          <>
            <SelectMenu label="Everyone sees" block={false} value={winner} onChange={setWinner} options={e.variants.map((v) => ({ value: v.name, label: v.name }))} />
            <button type="button" disabled={busy} className={quiet} onClick={() => void act("/api/admin/experiments/", "PATCH", { key: e.key, action: "stop", winner }, e.status === "running" ? "Stopped." : "Saved.")}>
              {e.status === "running" ? "Stop Test" : "Change Winner"}
            </button>
          </>
        )}
        {confirmDelete ? (
          <button type="button" disabled={busy} className={danger} onClick={() => void act(`/api/admin/experiments/?key=${encodeURIComponent(e.key)}`, "DELETE", undefined, "Deleted.")}>
            Yes, Delete {e.key}
          </button>
        ) : (
          <button type="button" className={quiet} onClick={() => setConfirmDelete(true)}>
            Delete
          </button>
        )}
      </div>
      <Notice err={err} ok={ok} />
    </li>
  );
}

function Experiments() {
  const [list, setList] = useState<ExperimentRow[] | null>(null);
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState("control 50\nvariant 50");
  const load = useCallback(() => {
    call<{ experiments: ExperimentRow[] }>("/api/admin/experiments/").then((r) => setList(r.experiments), () => setList([]));
  }, []);
  useEffect(load, [load]);
  const { act, err, ok, busy } = useAction(load);
  const create = async (e: FormEvent) => {
    e.preventDefault();
    if (await act("/api/admin/experiments/", "POST", { key: key.trim(), description, variants: parseVariants(variants) }, "Draft saved. Start it when the code that reads it is live.")) {
      setKey("");
      setDescription("");
    }
  };
  return (
    <section aria-labelledby="exp-h" className="flex flex-col gap-4">
      <h2 id="exp-h" className="text-2xl font-bold">A/B Tests</h2>
      <p className="font-read text-ink-soft">
        Each family is put in one variant and stays there. A test changes something only where the code asks for it: in the kids&apos; app with <code className="font-mono">useVariant(&quot;key&quot;)</code>, on the server with <code className="font-mono">variantsFor</code>. Anyone not in a running test sees the first variant (the control).
      </p>
      <form onSubmit={create} className={`${card} flex flex-col gap-3`}>
        <h3 className="text-xl font-bold">New Test</h3>
        <label className="flex flex-col text-sm font-semibold">
          Key (lower-case letters, digits and dashes)
          <input className={`${field} font-mono`} value={key} onChange={(e) => setKey(e.target.value)} required maxLength={40} />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          What it tests (optional)
          <input className={field} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={300} />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          Variants, one per line with a weight (the first is the control)
          <textarea className={`${field} min-h-24 py-2 font-mono`} value={variants} onChange={(e) => setVariants(e.target.value)} />
        </label>
        <button disabled={busy} className={`${primary} self-start`}>Save Draft</button>
        <Notice err={err} ok={ok} />
      </form>
      {!list && <LoadingCards count={2} className="" />}
      {list?.length === 0 && <p className="font-read text-ink-soft">No tests yet.</p>}
      <ul className="flex flex-col gap-3">
        {list?.map((e) => <ExperimentCard key={`${e.key}:${e.status}:${e.winner}`} e={e} reload={load} />)}
      </ul>
    </section>
  );
}

// ---------- Customer feedback ----------

interface FeedbackRow {
  id: string;
  familyId: string | null;
  audience: string;
  rating: number | null;
  topic: string | null;
  comment: string;
  at: number;
  handled: boolean;
  email: string | null;
}

const FACES = ["", "😞", "😕", "😐", "🙂", "😍"];

function Feedback({ onOpenFamily }: { onOpenFamily: (id: string) => void }) {
  const [data, setData] = useState<{ feedback: FeedbackRow[]; averages: { audience: string; count: number; average: number | null }[] } | null>(null);
  const load = useCallback(() => {
    call<NonNullable<typeof data>>("/api/admin/app-feedback/").then(setData, () => setData({ feedback: [], averages: [] }));
  }, []);
  useEffect(load, [load]);
  const { act, err, ok, busy } = useAction(load);
  return (
    <section aria-labelledby="feedback-h">
      <h2 id="feedback-h" className="text-2xl font-bold">Customer Feedback</h2>
      <p className="mt-1 font-read text-ink-soft">
        What parents and teachers said in the app. Nothing here is about a child. An email shows only when the sender ticked &quot;OK to email me back&quot;.
      </p>
      {!!data?.averages.length && (
        <p className="mt-2 text-sm font-semibold">
          {data.averages.map((a) => `${a.audience === "teacher" ? "Teachers" : "Parents"}: ${a.average ?? "–"} out of 5 (${a.count})`).join(" · ")}
        </p>
      )}
      <Notice err={err} ok={ok} />
      {!data && <LoadingCards count={3} />}
      {data?.feedback.length === 0 && <p className="mt-3 font-read">No feedback yet.</p>}
      <ul className="mt-3 flex flex-col gap-3">
        {data?.feedback.map((f) => (
          <li key={f.id} className={card}>
            <p className="text-sm text-ink-soft">
              {f.audience === "teacher" ? "Teacher" : "Parent"} · {day(f.at)}
              {f.topic ? ` · ${f.topic}` : ""}
              {f.handled ? " · done" : ""}
            </p>
            {f.rating !== null && (
              <p className="text-2xl" role="img" aria-label={`${f.rating} out of 5`}>
                {FACES[f.rating]}
              </p>
            )}
            {f.comment && <p className="font-read text-lg whitespace-pre-wrap">{f.comment}</p>}
            <div className="mt-2 flex flex-wrap gap-2">
              {f.email && (
                <a className={primary} href={`mailto:${f.email}?subject=${encodeURIComponent("Your Gradelings feedback")}`}>
                  Reply to {f.email}
                </a>
              )}
              {f.familyId && f.email && (
                <button type="button" className={quiet} onClick={() => onOpenFamily(f.familyId!)}>
                  Open Family
                </button>
              )}
              {!f.handled && (
                <button type="button" disabled={busy} className={quiet} onClick={() => void act("/api/admin/app-feedback/", "PATCH", { id: f.id }, "Marked done.")}>
                  Mark Done
                </button>
              )}
              <button type="button" disabled={busy} className={quiet} onClick={() => void act("/api/admin/app-feedback/", "PATCH", { id: f.id, remove: true }, "Removed.")}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------- Question reports ----------

interface ReportRow {
  unitKey: string;
  prompt: string;
  reason: string;
  count: number;
  latest: number;
  /** Curricula it was reported in (older reports have none). */
  frameworks?: string[];
  /** What was on screen in the latest report. */
  details?: ReportDetails | null;
}

/** Shows a fallback instead of breaking the tab when a stored picture can't be drawn. */
class VisualBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <p className="text-sm text-ink-soft">The picture couldn&apos;t be drawn.</p> : this.props.children;
  }
}

function ReportedScreen({ details }: { details: ReportDetails }) {
  return (
    <div className="mt-2 flex flex-col gap-2">
      {details.visual && (
        <div className="max-h-96 overflow-auto rounded-xl border border-black/10 bg-white p-3" aria-label="Picture shown with the question">
          <VisualBoundary>
            <QuestionVisual visual={details.visual} />
          </VisualBoundary>
        </div>
      )}
      {details.choices && (
        <ul className="flex flex-wrap gap-2" aria-label="Choices">
          {details.choices.map((c, i) => (
            <li key={i} className={`rounded-lg border px-3 py-1 font-read ${c === details.answer ? "border-good-dark bg-good/15 font-bold" : "border-black/15"}`}>
              {c}
              {c === details.answer && <span className="sr-only"> (right answer)</span>}
            </li>
          ))}
        </ul>
      )}
      {details.answer && <p className="text-sm">Right answer: <b>{details.answer}</b></p>}
    </div>
  );
}

function Reports() {
  const [reports, setReports] = useState<ReportRow[] | null>(null);
  const load = useCallback(() => {
    call<{ reports: ReportRow[] }>("/api/admin/reports/").then((r) => setReports(r.reports), () => setReports([]));
  }, []);
  useEffect(load, [load]);
  const { act, err, ok, busy } = useAction(load);
  return (
    <section aria-labelledby="reports-h">
      <h2 id="reports-h" className="text-2xl font-bold">Question Reports</h2>
      <p className="mt-1 font-read text-ink-soft">What children and parents flagged with &quot;Report a problem&quot;, most reported first. Clear a question once it is fixed or checked.</p>
      <Notice err={err} ok={ok} />
      {!reports && <LoadingCards count={3} />}
      {reports?.length === 0 && <p className="mt-3 font-read">Nothing reported.</p>}
      <ul className="mt-3 flex flex-col gap-3">
        {reports?.map((r) => (
          <li key={`${r.unitKey}:${r.prompt}:${r.reason}`} className={card}>
            <p className="font-mono text-sm text-ink-soft">{r.unitKey}</p>
            {!!r.frameworks?.length && <p className="text-sm text-ink-soft">{r.frameworks.map((f) => getFramework(f).name).join(", ")}</p>}
            <p className="font-read text-lg">{r.prompt}</p>
            {r.details && <ReportedScreen details={r.details} />}
            <p className="text-sm">
              <b>{r.reason}</b> · {r.count} {r.count === 1 ? "report" : "reports"} · last {day(r.latest)}
            </p>
            <button type="button" disabled={busy} className={`${quiet} mt-2`} onClick={() => void act("/api/admin/reports/", "DELETE", { unitKey: r.unitKey, prompt: r.prompt }, "Cleared.")}>
              Clear
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------- Audit log ----------

interface AuditRow {
  id: number;
  at: number;
  admin: string;
  action: string;
  target: string | null;
  detail: string | null;
}

function AuditLog() {
  const [rows, setRows] = useState<AuditRow[] | null>(null);
  useEffect(() => {
    call<{ entries: AuditRow[] }>("/api/admin/audit/").then((r) => setRows(r.entries), () => setRows([]));
  }, []);
  return (
    <section aria-labelledby="log-h">
      <h2 id="log-h" className="text-2xl font-bold">Change Log</h2>
      <p className="mt-1 font-read text-ink-soft">Every change made here, newest first.</p>
      {!rows && <LoadingRows rows={8} />}
      {rows?.length === 0 && <p className="mt-3 font-read">No changes yet.</p>}
      {rows && rows.length > 0 && (
        <div className="mt-3 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-3">When</th>
                <th scope="col" className="p-3">Who</th>
                <th scope="col" className="p-3">What</th>
                <th scope="col" className="p-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-line align-top last:border-0">
                  <td className="p-3 whitespace-nowrap">{when(r.at)}</td>
                  <td className="p-3 break-all">{r.admin}</td>
                  <td className="p-3">
                    <b>{r.action}</b> <span className="break-all font-mono">{r.target ?? ""}</span>
                  </td>
                  <td className="p-3 break-all font-mono">{r.detail ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// ---------- The app ----------

const TABS = ["Overview", "To Do", "Users", "Funnel", "Traffic", "Emails", "Inbox", "Automations", "Codes", "Sales", "Flags", "A/B Tests", "Feedback", "Reports", "System", "Log"] as const;
type Tab = (typeof TABS)[number];

/** `?tab=` and `?family=` from a link in an alert email, read once when the panel opens. */
function linkTarget(): { tab: Tab; family: string | null } {
  const q = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const family = q.get("family");
  // Case-insensitive, so links sent before the tab names were capitalized ("To do") still open the tab.
  const tab = TABS.find((t) => t.toLowerCase() === q.get("tab")?.toLowerCase());
  return { tab: family ? "Users" : (tab ?? "Overview"), family };
}

/** The address for a tab (or a family's page), so Back and Forward move between tabs and a reload stays put. */
function tabHref(tab: Tab, family: string | null = null): string {
  const q = family ? `family=${encodeURIComponent(family)}` : tab === "Overview" ? "" : `tab=${encodeURIComponent(tab)}`;
  return `${window.location.pathname}${q ? `?${q}` : ""}`;
}

/** Adds a history entry for a tab, unless the address already shows it. */
function pushTab(tab: Tab, family: string | null = null) {
  const href = tabHref(tab, family);
  if (href !== `${window.location.pathname}${window.location.search}`) window.history.pushState(null, "", href);
}

/** The count on a tab ("To Do 3 waiting"), left out when nothing waits. */
function TabCount({ n }: { n: number | null }) {
  if (!n) return null;
  return (
    <>
      {" "}
      <span className="ml-1 rounded-full bg-[#ff9636] px-2 text-sm text-[#0f172a]">
        {n}
        <span className="sr-only"> waiting</span>
      </span>
    </>
  );
}

function Panel({ twoFactor, onSecurityChange, role, email }: { twoFactor: TwoFactorInfo | null; onSecurityChange: () => void; role: Role; email: string }) {
  // Support staff get the Users tab and nothing else.
  const staffTabs: readonly Tab[] = role === "support" ? ["Users"] : TABS;
  const [tab, setTab] = useState<Tab>(() => (role === "support" ? "Users" : linkTarget().tab));
  // A family opened from a dashboard list: Users starts on that family's page.
  const [family, setFamily] = useState<string | null>(() => linkTarget().family);
  // A group picked from the funnel: Emails starts on it.
  const [segment, setSegment] = useState<Segment>("quiet-7");
  // A message opened from the to-do list: Inbox starts on it.
  const [inboxId, setInboxId] = useState<string | null>(null);
  // How many to-do items are waiting, shown on the tab. Loaded once here so the count shows from any tab.
  const [todo, setTodo] = useState<number | null>(null);
  useEffect(() => {
    if (role === "support") return;
    call<{ items: unknown[] }>("/api/admin/queue/").then(
      (r) => setTodo(r.items?.length ?? null),
      () => setTodo(null),
    );
  }, [role]);
  // How many received emails nobody has answered or marked as done, shown on the Inbox tab.
  const [waiting, setWaiting] = useState<number | null>(null);
  useEffect(() => {
    if (role === "support") return;
    call<{ waiting?: number }>("/api/admin/inbox/?count=1").then(
      (r) => setWaiting(r.waiting ?? null),
      () => setWaiting(null),
    );
  }, [role]);
  // Maintenance mode: the banner shows on every tab while it is on; the switch is on the System tab.
  const [maintenance, setMaintenance] = useState<MaintenanceState | null>(null);
  useEffect(() => {
    if (role === "support") return;
    call<MaintenanceState>("/api/admin/maintenance/").then(setMaintenance, () => setMaintenance(null));
  }, [role]);
  const [flags, setFlags] = useState<FlagRow[] | null>(null);
  const loadFlags = useCallback(() => {
    if (role === "support") return;
    call<{ flags: FlagRow[] }>("/api/admin/flags/").then((r) => setFlags(r.flags), () => setFlags([]));
  }, [role]);
  useEffect(loadFlags, [loadFlags]);
  // Back and Forward: show the tab (or family) the address names.
  useEffect(() => {
    const onPop = () => {
      const target = linkTarget();
      setInboxId(null);
      setFamily(target.family);
      setTab(target.tab);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  /** Switches tab and records it in the browser history. */
  const go = (t: Tab, id: string | null = null) => {
    pushTab(t, id);
    setTab(t);
  };
  const openFamily = (id: string) => {
    setFamily(id);
    go("Users", id);
  };
  const body: Record<Tab, ReactNode> = {
    Overview: <Overview onOpenFamily={openFamily} />,
    "To Do": (
      <Queue
        onOpenFamily={openFamily}
        onReports={() => go("Reports")}
        onFeedback={() => go("Feedback")}
        onInbox={(id) => {
          setInboxId(id);
          go("Inbox");
        }}
        onCount={setTodo}
      />
    ),
    Users: <Users key={family ?? ""} flags={flags ?? []} role={role} email={email} initialOpen={family} />,
    Funnel: (
      <Funnel
        onEmailGroup={(g) => {
          setSegment(g);
          go("Emails");
        }}
      />
    ),
    Traffic: <Traffic />,
    Emails: <Emails key={segment} initialSegment={segment} onOpenFamily={openFamily} />,
    Automations: <Automations />,
    Inbox: <Inbox key={inboxId ?? ""} initialId={inboxId} onOpenFamily={openFamily} onWaiting={setWaiting} />,
    Codes: <Codes />,
    Sales: <Sales />,
    Flags: <Flags flags={flags} reload={loadFlags} />,
    "A/B Tests": <Experiments />,
    Feedback: <Feedback onOpenFamily={openFamily} />,
    Reports: <Reports />,
    System: (
      <>
        <MaintenanceCard state={maintenance} onChange={setMaintenance} />
        <TwoFactorCard info={twoFactor} onChange={onSecurityChange} />
        <System />
      </>
    ),
    Log: <AuditLog />,
  };
  return (
    <>
      <MaintenanceBanner state={maintenance} onChange={setMaintenance} />
      <nav aria-label="Admin sections" className="-mx-1 mb-5 flex flex-wrap gap-2">
        {staffTabs.map((t) => (
          <button
            key={t}
            type="button"
            aria-current={tab === t ? "page" : undefined}
            onClick={() => {
              setFamily(null);
              setInboxId(null);
              go(t);
            }}
            className={`${btn} ${tab === t ? "bg-[#0f172a] text-white" : "border border-line bg-white"}`}
          >
            {t}
            <TabCount n={t === "To Do" ? todo : t === "Inbox" ? waiting : null} />
          </button>
        ))}
      </nav>
      {body[tab]}
    </>
  );
}

type State =
  | { kind: "loading" }
  | { kind: "signed-out" }
  | { kind: "not-admin" }
  // An admin account that has to set up two-step sign-in (or sign in again with its code) before the panel opens.
  | { kind: "setup"; email: string; twoFactor: TwoFactorInfo }
  | { kind: "admin"; email: string; role: Role; twoFactor: TwoFactorInfo | null };

export function AdminApp() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const check = useCallback(() => {
    void call<{ email: string; role?: Role; ready?: boolean; twoFactor?: TwoFactorInfo }>("/api/admin/me/").then(
      (r) => {
        const twoFactor = r.twoFactor ?? null;
        if (r.ready === false && twoFactor) setState({ kind: "setup", email: r.email, twoFactor });
        else setState({ kind: "admin", email: r.email, role: r.role ?? "admin", twoFactor });
      },
      () =>
        // Not an admin: tell a signed-in account so, and show anyone else the sign-in form.
        call("/api/auth/me/").then(
          () => setState({ kind: "not-admin" }),
          () => setState({ kind: "signed-out" }),
        ),
    );
  }, []);
  useEffect(check, [check]);
  const signOut = () => void call("/api/auth/logout/", "POST").finally(() => setState({ kind: "signed-out" }));

  return (
    <div className="min-h-dvh bg-[#f6f5f1]">
      <SkipLink />
      <header className="border-b border-line bg-white" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <span className="flex items-center gap-2">
            <Link href="/" className="text-2xl font-bold tracking-tight" aria-label={APP_NAME}>
              {APP_NAME.split("").map((ch, i) => (
                <span key={i} aria-hidden="true" style={{ color: WORDMARK_COLOURS[i % WORDMARK_COLOURS.length] }}>
                  {ch}
                </span>
              ))}
            </Link>
            <span className="rounded-full bg-[#0f172a] px-3 py-1 text-sm font-bold tracking-wide text-white uppercase">{state.kind === "admin" && state.role === "support" ? "Support" : "Admin"}</span>
          </span>
          <div className="flex items-center gap-3">
            {(state.kind === "admin" || state.kind === "setup") && <span className="hidden text-sm text-ink-soft sm:inline">{state.email}</span>}
            <Link href="/" className="font-semibold underline">Home</Link>
            {(state.kind === "admin" || state.kind === "setup" || state.kind === "not-admin") && (
              <button type="button" className="font-semibold underline" onClick={signOut}>
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>
      <main id={MAIN_ID} tabIndex={-1} className="mx-auto max-w-5xl px-4 py-6">
        {state.kind === "loading" && <p className="font-read">Loading…</p>}
        {state.kind === "signed-out" && <SignIn onDone={check} />}
        {state.kind === "not-admin" && (
          <div className={`mx-auto mt-8 max-w-md ${card}`}>
            <h1 className="text-2xl font-bold">Not an Admin Account</h1>
            <p className="mt-2 font-read">This account can&apos;t open the admin panel. An admin account has a confirmed email that is listed in ADMIN_EMAILS on the server.</p>
          </div>
        )}
        {state.kind === "setup" && <TwoFactorSetup email={state.email} info={state.twoFactor} onDone={check} />}
        {state.kind === "admin" && <Panel twoFactor={state.twoFactor} onSecurityChange={check} role={state.role} email={state.email} />}
      </main>
    </div>
  );
}
