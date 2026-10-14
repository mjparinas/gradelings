"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { changePassword, deleteAccount, forgotPassword, listDevices, signOutDevices, type DeviceSession, refreshAccount, resendVerification, signIn, signOut, signUp, type BillingInfo } from "@/lib/account";
import * as localdb from "@/lib/localdb";
import { go, useRoute } from "@/lib/router";
import { useLocale } from "@/lib/say";
import { useStore } from "@/lib/store";
import { savedReferralCode } from "@/lib/referral";
import { syncNow } from "@/lib/sync";
import { Dialog } from "../ui";
import { emailChoice, emailPatch, type EmailChoice, type EmailPrefs } from "@/lib/settingChoices";
import { Choice, PageTitle, Panel } from "./common";
import { ParentPin } from "./ParentPin";
import { PrivacyPanels } from "./Privacy";
import { VoicePicker } from "./VoicePicker";

const noSubscribe = () => () => {};

function AuthForm({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"signup" | "signin" | "forgot">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  // The server snapshot is false so the first render matches the static page.
  const invited = useSyncExternalStore(noSubscribe, () => savedReferralCode() !== null, () => false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (mode === "forgot") {
        setNotice(await forgotPassword(email));
        return;
      }
      if (mode === "signup") await signUp(email, password);
      else await signIn(email, password);
      onDone();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} className="flex max-w-md flex-col gap-3">
      <div className="flex gap-2">
        {(["signup", "signin"] as const).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-xl px-3 py-2 text-sm font-semibold ${mode === m ? "bg-[#253047] text-white" : "bg-paper"}`}>
            {m === "signup" ? "Create account" : "Sign in"}
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1">
        <span className="font-semibold">Email</span>
        <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border-2 border-line px-3 py-2 text-lg" />
      </label>
      {mode !== "forgot" && (
      <label className="flex flex-col gap-1">
        <span className="font-semibold">Password</span>
        <input
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border-2 border-line px-3 py-2 text-lg"
        />
        {mode === "signup" && <span className="text-sm text-ink-soft">At least 8 characters.</span>}
      </label>
      )}
      {notice && <p className="rounded-xl bg-[#e8f7f0] p-3 font-semibold">{notice}</p>}
      {error && <p className="font-semibold text-nudge-dark">{error}</p>}
      {mode === "signup" && invited && (
        <p className="rounded-xl bg-[#e8f7f0] p-3 font-semibold">🎁 A friend invited you. When you confirm your email, they get a free month. Thank you!</p>
      )}
      {mode === "signup" && (
        <p className="text-sm text-ink-soft">
          By creating an account you confirm you are a parent or guardian and agree to the{" "}
          <a href="/terms/" target="_blank" rel="noreferrer" className="underline">
            terms
          </a>{" "}
          and{" "}
          <a href="/privacy/" target="_blank" rel="noreferrer" className="underline">
            privacy policy
          </a>
          .
        </p>
      )}
      <button type="submit" disabled={busy} className="rounded-xl bg-[#25b47e] px-4 py-3 text-lg font-bold text-[#0f172a] disabled:opacity-60">
        {busy ? "One moment…" : mode === "signup" ? "Create account & sync" : mode === "forgot" ? "Email me a reset link" : "Sign in & sync"}
      </button>
      {mode === "signin" && (
        <button type="button" className="self-start text-sm font-semibold underline" onClick={() => setMode("forgot")}>
          Forgot your password?
        </button>
      )}
      {mode === "forgot" && (
        <button type="button" className="self-start text-sm font-semibold underline" onClick={() => setMode("signin")}>
          Back to sign in
        </button>
      )}
      <p className="text-sm text-ink-soft">Your children&apos;s progress from this device is uploaded and merged with anything already in your account.</p>
    </form>
  );
}

const EMAIL_HELP: Record<EmailChoice, string> = {
  weekly: "A short summary every Sunday. Unsubscribe any time.",
  both: "The Sunday summary, plus a friendly note to you, never to your child, after a few quiet days. At most once a week.",
  none: "No progress emails. You still get receipts and account emails.",
};

function EmailChoicePanel({ verified }: { verified: boolean }) {
  const [prefs, setPrefs] = useState<(EmailPrefs & { adminMail?: boolean }) | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    void fetch("/api/account/prefs/", { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: (EmailPrefs & { adminMail?: boolean }) | null) => setPrefs(d))
      .catch(() => setPrefs(null));
  }, []);
  if (!prefs) return null;
  const value = emailChoice(prefs);
  async function save(patch: Partial<EmailPrefs & { adminMail: boolean }>) {
    setError("");
    const res = await fetch("/api/account/prefs/", {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(() => null);
    const data = (await res?.json().catch(() => ({}))) as (EmailPrefs & { adminMail?: boolean; error?: string }) | undefined;
    if (res?.ok && data) setPrefs({ weeklyReport: Boolean(data.weeklyReport), practiceReminders: Boolean(data.practiceReminders), adminMail: Boolean(data.adminMail) });
    else setError(data?.error ?? "You’re offline. Try again when connected.");
  }
  const pick = (choice: EmailChoice) => save(emailPatch(choice));
  return (
    <div className="mt-3">
      <Choice
        label="Progress emails"
        value={value}
        options={[
          { value: "weekly", label: "Weekly summary" },
          { value: "both", label: "Summary and reminders" },
          { value: "none", label: "None" },
        ]}
        onChange={(v) => void pick(v)}
        help={!verified ? "Confirm your email first to turn these on." : value ? EMAIL_HELP[value] : "Practice reminders only. Pick an option to change it."}
      />
      <div className="mt-3">
        <Choice
          label="News and tips"
          value={prefs.adminMail === false ? "off" : "on"}
          options={[
            { value: "on", label: "On" },
            { value: "off", label: "Off" },
          ]}
          onChange={(v) => void save({ adminMail: v === "on" })}
          help="Now and then, a note from us: new features, ideas to try and offers. Never to your child."
        />
      </div>
      {error && <p className="mt-1 text-sm text-nudge-dark">{error}</p>}
    </div>
  );
}

function SecurityPanel() {
  const locale = useLocale();
  const [devices, setDevices] = useState<DeviceSession[] | null>(null);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const load = () => void listDevices().then(setDevices, () => setDevices(null));
  useEffect(load, []);
  const run = async (fn: () => Promise<void>, done: string) => {
    setError("");
    setMessage("");
    try {
      await fn();
      setMessage(done);
      load();
    } catch (e) {
      setError((e as Error).message);
    }
  };
  return (
    <Panel title="🔒 Security">
      <form
        className="flex max-w-md flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void run(async () => {
            await changePassword(current, next);
            setCurrent("");
            setNext("");
          }, "Password changed. Other devices were signed out.");
        }}
      >
        <h3 className="font-semibold">Change password</h3>
        <input type="password" autoComplete="current-password" required placeholder="Current password" value={current} onChange={(e) => setCurrent(e.target.value)} className="rounded-xl border-2 border-line px-3 py-2" aria-label="Current password" />
        <input type="password" autoComplete="new-password" required minLength={8} placeholder="New password (8+ characters)" value={next} onChange={(e) => setNext(e.target.value)} className="rounded-xl border-2 border-line px-3 py-2" aria-label="New password" />
        <button type="submit" className="self-start rounded-xl border border-line px-4 py-2 font-semibold">
          Change password
        </button>
      </form>
      <h3 className="mt-4 font-semibold">Devices signed in</h3>
      {devices && (
        <ul className="mt-1 flex flex-col gap-1.5 text-sm">
          {devices.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2">
              <span>
                {d.device}
                {d.current && <b> (this device)</b>} · since {new Date(d.createdAt).toLocaleDateString(locale)}
              </span>
              {!d.current && (
                <button type="button" className="font-semibold underline" onClick={() => void run(() => signOutDevices(d.id), "Signed out.")}>
                  Sign out
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {devices && devices.length > 1 && (
        <button type="button" className="mt-2 rounded-xl border border-line px-4 py-2 font-semibold" onClick={() => void run(() => signOutDevices(), "Every other device was signed out.")}>
          Sign out everywhere else
        </button>
      )}
      {message && <p className="mt-2 font-semibold">{message}</p>}
      {error && <p className="mt-2 font-semibold text-nudge-dark">{error}</p>}
    </Panel>
  );
}

function VerifyNotice() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  return (
    <div className="mt-3 rounded-xl bg-[#fff6e5] p-3 text-sm">
      <p className="font-semibold">Please confirm your email.</p>
      <p className="text-ink-soft">We sent a link when you signed up. Confirming lets you subscribe and get account emails.</p>
      <button
        type="button"
        disabled={state === "sending" || state === "sent"}
        className="mt-2 rounded-xl border border-line bg-white px-3 py-1.5 font-semibold disabled:opacity-60"
        onClick={() => {
          setState("sending");
          void resendVerification().then(
            () => setState("sent"),
            (e: Error) => {
              setMessage(e.message);
              setState("error");
            },
          );
        }}
      >
        {state === "sent" ? "Sent. Check your inbox" : "Send the link again"}
      </button>
      {state === "error" && <p className="mt-1 text-nudge-dark">{message}</p>}
    </div>
  );
}

export function AccountPage({ onBilling }: { onBilling: (b: BillingInfo | null) => void }) {
  const account = useStore((s) => s.family.account);
  const sync = useStore((s) => s.sync);
  const locale = useLocale();
  const { query } = useRoute();
  const [pending, setPending] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    void localdb.unsyncedEvents(5000).then((e) => setPending(e.length));
  }, [sync.lastSyncAt, sync.status]);

  return (
    <>
      <PageTitle title="Account" sub="Sign-in and sync, emails, this device, and your data." />
      {/* Two independent columns, so the tall voice panel doesn't leave gaps beside the short ones. */}
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          {account ? (
            <Panel title="☁️ Signed in">
              <p className="text-lg">
                <b>{account.email}</b>
              </p>
              <p className="mt-1 text-sm text-ink-soft">{sync.lastSyncAt ? `Synced ${new Date(sync.lastSyncAt).toLocaleString(locale)}` : "Not synced yet"}</p>
              {account.verified === false && <VerifyNotice />}
              <EmailChoicePanel verified={account.verified !== false} />
              {sync.error && <p className="mt-2 text-sm text-nudge-dark">{sync.error}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="rounded-xl bg-[#4f8ef7] px-4 py-2 font-bold text-[#0f172a]" onClick={() => void syncNow()}>
                  Sync now
                </button>
                <button type="button" className="rounded-xl border border-line px-4 py-2 font-semibold" onClick={() => void signOut()}>
                  Sign out
                </button>
              </div>
              <details className="mt-4 text-sm">
                <summary className="cursor-pointer font-semibold">Sync details</summary>
                <dl className="mt-2 grid grid-cols-2 gap-2">
                  <dt className="text-ink-soft">Status</dt>
                  <dd className="font-semibold capitalize">{sync.status}</dd>
                  <dt className="text-ink-soft">Waiting to upload</dt>
                  <dd className="font-semibold">{pending ?? "…"} events</dd>
                </dl>
                <p className="mt-2 text-ink-soft">
                  Progress is saved on this device first and merges answer by answer, so nothing is lost offline. <a className="underline" href="/help/">More in Help</a>.
                </p>
              </details>
            </Panel>
          ) : (
            <Panel title={query.get("next") === "subscription" ? "Create an account to subscribe" : "Create a free account"}>
              {query.get("next") === "subscription" && (
                <p className="mb-3 font-read text-ink-soft">After this you&apos;ll pick monthly or yearly. The free trial is optional, and confirming your email lets you pay.</p>
              )}
              <AuthForm
                onDone={() => {
                  void refreshAccount().then(onBilling);
                  if (query.get("next") === "subscription") go("/subscription");
                }}
              />
            </Panel>
          )}
          {account && <SecurityPanel />}
          <ParentPin />
          <PrivacyPanels />
          {account && (
            <Panel title="Delete account">
              <p className="mb-3 font-read text-ink-soft">Permanently deletes your account and all progress stored on our servers, and clears this device.</p>
              <button type="button" className="rounded-xl border border-[#e57a12] px-4 py-2 font-semibold text-nudge-dark" onClick={() => setConfirmDelete(true)}>
                Delete my account…
              </button>
            </Panel>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <VoicePicker />
        </div>
      </div>
      <Dialog open={confirmDelete} title="Delete everything?" onClose={() => setConfirmDelete(false)}>
        <p className="mb-3 font-read text-ink-soft">This can&apos;t be undone. Type your password to confirm.</p>
        <input type="password" autoComplete="current-password" aria-label="Password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} className="mb-4 w-full rounded-xl border-2 border-line px-3 py-2 text-lg" />
        {error && <p className="mb-2 text-nudge-dark">{error}</p>}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="btn btn-nudge min-h-14 text-xl"
            onClick={() =>
              void deleteAccount(deletePassword)
                .then(() => router.push("/play/"))
                .catch((e: Error) => setError(e.message))
            }
          >
            Yes, delete my account
          </button>
          <button type="button" className="btn min-h-14 text-xl" onClick={() => setConfirmDelete(false)}>
            Cancel
          </button>
        </div>
      </Dialog>
    </>
  );
}
