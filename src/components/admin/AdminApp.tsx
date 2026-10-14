"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
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
import { MaintenanceBanner, MaintenanceCard, type MaintenanceState } from "./Maintenance";
import { parseVariants, type ExperimentStatus, type FlagScope, type Variant } from "@/lib/flags";
import { verdict } from "@/lib/abVerdict";
import type { Segment } from "@/lib/adminEmails";
import { MAIN_ID, SkipLink } from "@/components/SkipLink";

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
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await call("/api/auth/login/", "POST", { email, password });
      onDone();
    } catch (x) {
      setErr((x as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} className={`mx-auto mt-8 flex max-w-sm flex-col gap-3 ${card}`}>
      <h1 className="text-2xl font-bold">Admin sign in</h1>
      <label className="flex flex-col text-sm font-semibold">
        Email
        <input className={field} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="flex flex-col text-sm font-semibold">
        Password
        <input className={field} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <Notice err={err} />
      <button disabled={busy} className={primary}>
        Sign in
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
}

function planText(u: { plan: string; trialEndsAt: number; subscriptionStatus: string | null }) {
  if (u.plan === "premium") return `Paying${u.subscriptionStatus ? ` (${u.subscriptionStatus})` : ""}`;
  if (u.plan === "trial" && u.trialEndsAt > Date.now()) return `Trial until ${day(u.trialEndsAt)}`;
  return "Free";
}

function Users({ flags, initialOpen = null }: { flags: FlagRow[]; initialOpen?: string | null }) {
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

  if (open) return <UserDetail id={open} flags={flags} onBack={() => { setOpen(null); search(q); }} />;
  return (
    <section aria-labelledby="users-h">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="users-h" className="text-2xl font-bold">Users</h2>
        <p className="flex flex-wrap gap-x-4">
          <a className="min-h-11 font-semibold text-[#2a5bd7] underline" href="/api/admin/export/?type=users" download>
            Download accounts CSV
          </a>
          <a className="min-h-11 font-semibold text-[#2a5bd7] underline" href="/api/admin/export/?type=payments" download>
            Download payments CSV
          </a>
        </p>
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

function UserDetail({ id, flags, onBack }: { id: string; flags: FlagRow[]; onBack: () => void }) {
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
  const run = (action: string, extra: Record<string, unknown>, done: string) => act("/api/admin/users/", "POST", { familyId: id, action, ...extra }, done);

  if (deleted)
    return (
      <section className={card}>
        <p role="status">The account and all its data were deleted.</p>
        <button type="button" className={`${quiet} mt-3`} onClick={onBack}>Back to users</button>
      </section>
    );
  if (!d)
    return loadErr ? (
      <Notice err={loadErr} />
    ) : (
      <section className="flex flex-col gap-4">
        <button type="button" className="self-start font-semibold underline" onClick={onBack}>
          ← All users
        </button>
        <LoadingCards count={4} className="" />
      </section>
    );
  const f = d.family;
  return (
    <section aria-labelledby="user-h" className="flex flex-col gap-4">
      <button type="button" className="self-start font-semibold underline" onClick={onBack}>
        ← All users
      </button>
      <div className={card}>
        <h2 id="user-h" className="break-all text-2xl font-bold">{d.parents.map((p) => p.email).join(", ")}</h2>
        <dl className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
          <div><dt className="inline font-semibold">Joined: </dt><dd className="inline">{day(f.createdAt)}</dd></div>
          <div><dt className="inline font-semibold">Plan: </dt><dd className="inline">{planText(f)}</dd></div>
          <div><dt className="inline font-semibold">Trial ends: </dt><dd className="inline">{day(f.trialEndsAt)}</dd></div>
          <div><dt className="inline font-semibold">Code or admin access: </dt><dd className="inline">{accessText(f.accessUntil)}</dd></div>
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
            <h3 className="mt-4 font-bold">Codes used</h3>
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
            <h3 className="mt-4 font-bold">A/B tests</h3>
            <p className="font-read">{Object.entries(d.experiments).map(([k, v]) => `${k}: ${v}`).join(", ")}</p>
          </>
        )}
      </div>

      <div className={card}>
        <h3 className="text-xl font-bold">Access</h3>
        <div className="mt-2 flex flex-wrap items-end gap-2">
          <label className="flex flex-col text-sm font-semibold">
            Extend trial by (days)
            <input className={`${field} w-28`} type="number" min={1} max={365} value={trialDays} onChange={(e) => setTrialDays(e.target.value)} />
          </label>
          <button type="button" disabled={busy} className={quiet} onClick={() => void run("extend-trial", { days: Number(trialDays) }, "Trial extended.")}>
            Extend trial
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <label className="flex flex-col text-sm font-semibold">
            Free access (days)
            <input className={`${field} w-28`} type="number" min={1} max={3650} value={accessDays} onChange={(e) => setAccessDays(e.target.value)} />
          </label>
          <button type="button" disabled={busy} className={quiet} onClick={() => void run("grant-access", { days: Number(accessDays) }, "Access added.")}>
            Add days
          </button>
          <button type="button" disabled={busy} className={quiet} onClick={() => void run("grant-access", { days: null }, "Lifetime access given.")}>
            Give lifetime access
          </button>
          {f.accessUntil && (
            <button type="button" disabled={busy} className={danger} onClick={() => void run("remove-access", {}, "Code and admin access removed.")}>
              Remove access
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
                  Mark email confirmed
                </button>
              )}
            </li>
          ))}
        </ul>
        <button type="button" disabled={busy} className={`${quiet} mt-3`} onClick={() => void run("sign-out", {}, "Signed out on every device.")}>
          Sign out everywhere
        </button>
      </div>

      <FamilyBilling familyId={id} pastDue={d.family.subscriptionStatus === "past_due"} />

      <FamilyEmail familyId={id} parent={d.parents[0]} emails={d.emails} />

      <div className={card}>
        <h3 className="text-xl font-bold">Feature flags for this family</h3>
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
        <h3 className="text-xl font-bold">Delete this account</h3>
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
            Delete account
          </button>
        </div>
      </div>
      {(err || ok) && (
        <div className={`sticky bottom-4 ${card} py-3 shadow-lg`}>
          <Notice err={err} ok={ok} />
        </div>
      )}
    </section>
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
        <h3 className="text-xl font-bold">Make a code</h3>
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
        <button disabled={busy} className={`${primary} self-start`}>Make code</button>
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
            Save rollout
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
      <h2 id="flags-h" className="text-2xl font-bold">Feature flags</h2>
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
          Use {v.leader} for everyone
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
              {e.status === "running" ? "Stop test" : "Change winner"}
            </button>
          </>
        )}
        {confirmDelete ? (
          <button type="button" disabled={busy} className={danger} onClick={() => void act(`/api/admin/experiments/?key=${encodeURIComponent(e.key)}`, "DELETE", undefined, "Deleted.")}>
            Yes, delete {e.key}
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
      <h2 id="exp-h" className="text-2xl font-bold">A/B tests</h2>
      <p className="font-read text-ink-soft">
        Each family is put in one variant and stays there. A test changes something only where the code asks for it: in the kids&apos; app with <code className="font-mono">useVariant(&quot;key&quot;)</code>, on the server with <code className="font-mono">variantsFor</code>. Anyone not in a running test sees the first variant (the control).
      </p>
      <form onSubmit={create} className={`${card} flex flex-col gap-3`}>
        <h3 className="text-xl font-bold">New test</h3>
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
        <button disabled={busy} className={`${primary} self-start`}>Save draft</button>
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

// ---------- Question reports ----------

interface ReportRow {
  unitKey: string;
  prompt: string;
  reason: string;
  count: number;
  latest: number;
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
      <h2 id="reports-h" className="text-2xl font-bold">Question reports</h2>
      <p className="mt-1 font-read text-ink-soft">What children and parents flagged with &quot;Report a problem&quot;, most reported first. Clear a question once it is fixed or checked.</p>
      <Notice err={err} ok={ok} />
      {!reports && <LoadingCards count={3} />}
      {reports?.length === 0 && <p className="mt-3 font-read">Nothing reported.</p>}
      <ul className="mt-3 flex flex-col gap-3">
        {reports?.map((r) => (
          <li key={`${r.unitKey}:${r.prompt}:${r.reason}`} className={card}>
            <p className="font-mono text-sm text-ink-soft">{r.unitKey}</p>
            <p className="font-read text-lg">{r.prompt}</p>
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
      <h2 id="log-h" className="text-2xl font-bold">Change log</h2>
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

const TABS = ["Overview", "To Do", "Users", "Funnel", "Traffic", "Emails", "Inbox", "Automations", "Codes", "Sales", "Flags", "A/B Tests", "Reports", "System", "Log"] as const;
type Tab = (typeof TABS)[number];

/** `?tab=` and `?family=` from a link in an alert email, read once when the panel opens. */
function linkTarget(): { tab: Tab; family: string | null } {
  const q = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const family = q.get("family");
  // Case-insensitive, so links sent before the tab names were capitalized ("To do") still open the tab.
  const tab = TABS.find((t) => t.toLowerCase() === q.get("tab")?.toLowerCase());
  return { tab: family ? "Users" : (tab ?? "Overview"), family };
}

function Panel() {
  const [tab, setTab] = useState<Tab>(() => linkTarget().tab);
  // A family opened from a dashboard list: Users starts on that family's page.
  const [family, setFamily] = useState<string | null>(() => linkTarget().family);
  // A group picked from the funnel: Emails starts on it.
  const [segment, setSegment] = useState<Segment>("quiet-7");
  // A message opened from the to-do list: Inbox starts on it.
  const [inboxId, setInboxId] = useState<string | null>(null);
  // How many to-do items are waiting, shown on the tab. Loaded once here so the count shows from any tab.
  const [todo, setTodo] = useState<number | null>(null);
  useEffect(() => {
    call<{ items: unknown[] }>("/api/admin/queue/").then(
      (r) => setTodo(r.items?.length ?? null),
      () => setTodo(null),
    );
  }, []);
  // Maintenance mode: the banner shows on every tab while it is on; the switch is on the System tab.
  const [maintenance, setMaintenance] = useState<MaintenanceState | null>(null);
  useEffect(() => {
    call<MaintenanceState>("/api/admin/maintenance/").then(setMaintenance, () => setMaintenance(null));
  }, []);
  const [flags, setFlags] = useState<FlagRow[] | null>(null);
  const loadFlags = useCallback(() => {
    call<{ flags: FlagRow[] }>("/api/admin/flags/").then((r) => setFlags(r.flags), () => setFlags([]));
  }, []);
  useEffect(loadFlags, [loadFlags]);
  const openFamily = (id: string) => {
    setFamily(id);
    setTab("Users");
  };
  const body: Record<Tab, ReactNode> = {
    Overview: <Overview onOpenFamily={openFamily} />,
    "To Do": (
      <Queue
        onOpenFamily={openFamily}
        onReports={() => setTab("Reports")}
        onInbox={(id) => {
          setInboxId(id);
          setTab("Inbox");
        }}
        onCount={setTodo}
      />
    ),
    Users: <Users key={family ?? ""} flags={flags ?? []} initialOpen={family} />,
    Funnel: (
      <Funnel
        onEmailGroup={(g) => {
          setSegment(g);
          setTab("Emails");
        }}
      />
    ),
    Traffic: <Traffic />,
    Emails: <Emails key={segment} initialSegment={segment} onOpenFamily={openFamily} />,
    Automations: <Automations />,
    Inbox: <Inbox key={inboxId ?? ""} initialId={inboxId} onOpenFamily={openFamily} />,
    Codes: <Codes />,
    Sales: <Sales />,
    Flags: <Flags flags={flags} reload={loadFlags} />,
    "A/B Tests": <Experiments />,
    Reports: <Reports />,
    System: (
      <>
        <MaintenanceCard state={maintenance} onChange={setMaintenance} />
        <System />
      </>
    ),
    Log: <AuditLog />,
  };
  return (
    <>
      <MaintenanceBanner state={maintenance} onChange={setMaintenance} />
      <nav aria-label="Admin sections" className="-mx-1 mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            aria-current={tab === t ? "page" : undefined}
            onClick={() => {
              setFamily(null);
              setInboxId(null);
              setTab(t);
            }}
            className={`${btn} ${tab === t ? "bg-[#0f172a] text-white" : "border border-line bg-white"}`}
          >
            {t}
            {t === "To Do" && todo ? (
              <>
                {" "}
                <span className="ml-1 rounded-full bg-[#ff9636] px-2 text-sm text-[#0f172a]">
                  {todo}
                  <span className="sr-only"> waiting</span>
                </span>
              </>
            ) : null}
          </button>
        ))}
      </nav>
      {body[tab]}
    </>
  );
}

type State = { kind: "loading" } | { kind: "signed-out" } | { kind: "not-admin" } | { kind: "admin"; email: string };

export function AdminApp() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const check = useCallback(() => {
    void call<{ email: string }>("/api/admin/me/").then(
      (r) => setState({ kind: "admin", email: r.email }),
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
            <span className="rounded-full bg-[#0f172a] px-3 py-1 text-sm font-bold tracking-wide text-white uppercase">Admin</span>
          </span>
          <div className="flex items-center gap-3">
            {state.kind === "admin" && <span className="hidden text-sm text-ink-soft sm:inline">{state.email}</span>}
            <Link href="/" className="font-semibold underline">Home</Link>
            {(state.kind === "admin" || state.kind === "not-admin") && (
              <button type="button" className="font-semibold underline" onClick={signOut}>
                Sign out
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
            <h1 className="text-2xl font-bold">Not an admin account</h1>
            <p className="mt-2 font-read">This account can&apos;t open the admin panel. An admin account has a confirmed email that is listed in ADMIN_EMAILS on the server.</p>
          </div>
        )}
        {state.kind === "admin" && <Panel />}
      </main>
    </div>
  );
}
