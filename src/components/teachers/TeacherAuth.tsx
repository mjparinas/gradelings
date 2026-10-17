"use client";

import { useState, type FormEvent } from "react";
import { APP_NAME } from "@/lib/brand";
import { call } from "@/lib/classroom";
import { GoogleButton, useGoogleError } from "../GoogleButton";

const btn = "min-h-11 rounded-xl px-4 font-bold";

/** Sign in, create an account or ask for a reset link. A first visit opens on "create", since that is what the button said. */
export function AuthForm({ onDone, initialMode = "in" }: { onDone: () => void; initialMode?: "in" | "up" }) {
  const [mode, setMode] = useState<"in" | "up" | "forgot">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const googleError = useGoogleError();

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
      {mode !== "forgot" && <GoogleButton from="teachers" />}
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
      {(err || googleError) && (
        <p role="alert" className="text-nudge-dark">
          {err || googleError}
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
