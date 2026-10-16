"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { call } from "@/lib/classroom";
import { go } from "@/lib/router";
import { TeacherDialog } from "./Dialog";

// A teacher's own account, kept apart from classes: change the password, sign out of other devices, delete the account.
// Teacher accounts are ordinary accounts, so these use the same routes as the parent area.

const btn = "min-h-11 rounded-xl px-4 font-bold";
const field = "mt-1 min-h-11 rounded-xl border border-line px-3";

function Message({ text, bad }: { text: string; bad?: boolean }) {
  if (!text) return null;
  return (
    <p role={bad ? "alert" : "status"} className={bad ? "text-nudge-dark" : "font-read text-ink-soft"}>
      {text}
    </p>
  );
}

function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState<{ text: string; bad?: boolean }>({ text: "" });
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg({ text: "" });
    try {
      await call("/api/auth/password/", "POST", { current, password: next });
      setCurrent("");
      setNext("");
      setMsg({ text: "Password changed. Other devices were signed out." });
    } catch (x) {
      setMsg({ text: (x as Error).message, bad: true });
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} className="mt-4 flex max-w-sm flex-col gap-3 rounded-2xl border border-line bg-white p-5" aria-label="Change your password">
      <h2 className="text-xl font-bold">Change your password</h2>
      <label className="flex flex-col text-sm font-semibold">
        Current password
        <input className={field} type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
      </label>
      <label className="flex flex-col text-sm font-semibold">
        New password (at least 8 characters)
        <input className={field} type="password" autoComplete="new-password" minLength={8} value={next} onChange={(e) => setNext(e.target.value)} required />
      </label>
      <Message {...msg} />
      <button disabled={busy} className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`}>
        Change password
      </button>
    </form>
  );
}

function SignOutEverywhere() {
  const [msg, setMsg] = useState<{ text: string; bad?: boolean }>({ text: "" });
  const [busy, setBusy] = useState(false);
  const run = async () => {
    setBusy(true);
    setMsg({ text: "" });
    try {
      const r = await call<{ removed?: number }>("/api/auth/sessions/", "DELETE");
      const n = r.removed ?? 0;
      setMsg({ text: n > 0 ? `Signed out of ${n} other ${n === 1 ? "device" : "devices"}. You stay signed in here.` : "No other devices were signed in." });
    } catch (x) {
      setMsg({ text: (x as Error).message, bad: true });
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="mt-4 max-w-sm rounded-2xl border border-line bg-white p-5" aria-label="Sign out everywhere">
      <h2 className="text-xl font-bold">Sign out everywhere</h2>
      <p className="mt-1 font-read text-ink-soft">Use this if you signed in on a shared or school computer and forgot to sign out. This device stays signed in.</p>
      <button type="button" disabled={busy} className={`${btn} mt-3 border border-line disabled:opacity-50`} onClick={() => void run()}>
        Sign out of other devices
      </button>
      <div className="mt-2">
        <Message {...msg} />
      </div>
    </section>
  );
}

function DeleteAccount({ onDeleted }: { onDeleted: () => void }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const confirm = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await call("/api/account/", "DELETE", { password });
      onDeleted();
    } catch (x) {
      setErr((x as Error).message);
      setBusy(false);
    }
  };
  return (
    <section className="mt-4 max-w-xl rounded-2xl border border-line bg-white p-5" aria-label="Delete your account">
      <h2 className="text-xl font-bold">Delete your account</h2>
      <p className="mt-1 font-read text-ink-soft">This can’t be undone. Here is what happens to your classes:</p>
      <ul className="mt-2 list-disc pl-6 font-read text-ink-soft">
        <li>A class you own that has a co-teacher passes to the co-teacher who has been there longest. Its students keep their accounts and practice.</li>
        <li>Any other class you own is deleted, with its students’ login codes, practice and assignments.</li>
        <li>Classes you co-teach just lose you. Their students are not affected.</li>
        <li>Students that families linked from the parent area stay with their families.</li>
        <li>This is the same account as the parent area. Any children, progress or subscription on it are deleted too.</li>
      </ul>
      <button ref={opener} type="button" className={`${btn} mt-3 border-2 border-nudge-dark text-nudge-dark`} onClick={() => setOpen(true)}>
        Delete my account…
      </button>
      {open && (
        <TeacherDialog title="Delete your account?" onClose={() => (busy ? undefined : setOpen(false))}>
          <form onSubmit={confirm} className="flex flex-col gap-3">
            <p className="font-read text-ink-soft">Type your password to confirm. Your classes will be handled as described on the page.</p>
            <label className="flex flex-col text-sm font-semibold">
              Password
              <input className={field} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <Message text={err} bad />
            <div className="flex flex-wrap gap-3">
              <button disabled={busy} className={`${btn} bg-nudge-dark text-white disabled:opacity-50`}>
                Delete my account
              </button>
              <button type="button" disabled={busy} className={`${btn} border border-line`} onClick={() => setOpen(false)}>
                Keep my account
              </button>
            </div>
          </form>
        </TeacherDialog>
      )}
    </section>
  );
}

export function AccountPage({ email, onSignedOut }: { email?: string; onSignedOut: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  return (
    <>
      <h1 ref={heading} tabIndex={-1} className="text-3xl font-bold outline-none">
        Your account
      </h1>
      {email && <p className="font-read text-ink-soft">Signed in as {email}</p>}
      <p className="mt-2">
        <a href="#/" className="inline-flex min-h-11 items-center font-semibold underline">
          ← All classes
        </a>
      </p>
      <ChangePassword />
      <SignOutEverywhere />
      <DeleteAccount
        onDeleted={() => {
          onSignedOut();
          go("/");
        }}
      />
    </>
  );
}
