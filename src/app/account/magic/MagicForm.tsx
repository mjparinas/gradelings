"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { rememberTeacher } from "@/lib/teacherHint";
import { LinkCard } from "../AccountLinkPage";

/** Signing in needs a tap, so a mail scanner that opens the link can't use up the one-time token. */
export function MagicForm() {
  const [token, setToken] = useState<string | null>(null);
  const [teacher, setTeacher] = useState(false);
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    // Read after hydration; the query string isn't available while pre-rendering.
    queueMicrotask(() => {
      setToken(q.get("token") ?? "");
      setTeacher(q.get("to") === "teachers");
    });
    // Keep the one-time token out of the address bar and browser history.
    if (q.get("token")) window.history.replaceState(null, "", window.location.pathname);
  }, []);

  async function signIn() {
    setState("busy");
    setError("");
    try {
      const res = await fetch("/api/auth/magic/verify/", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      if (teacher) rememberTeacher(true);
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  const home = teacher ? "/teachers/" : "/parents/";
  const homeName = teacher ? "Go to the teacher area" : "Go to the Parent area";
  if (state === "done") {
    return (
      <LinkCard title="You're signed in">
        <p className="font-read text-lg">Welcome back.</p>
        <Link href={home} className="btn btn-good min-h-14 text-xl">
          {homeName}
        </Link>
      </LinkCard>
    );
  }
  if (token === "") {
    return (
      <LinkCard title="This link isn’t valid">
        <p className="font-read text-lg">Open the link from your email, or ask for a new one from the sign-in form.</p>
        <Link href={home} className="btn min-h-14 text-xl">
          {homeName}
        </Link>
      </LinkCard>
    );
  }
  return (
    <LinkCard title="Sign in">
      <p className="font-read text-lg">Tap the button to sign in on this device. You won&apos;t need your password.</p>
      {error && (
        <p role="alert" className="font-semibold text-nudge-dark">
          {error}
        </p>
      )}
      <button type="button" onClick={signIn} disabled={state === "busy" || token === null} className="btn btn-good min-h-14 text-xl disabled:opacity-60">
        {state === "busy" ? "One moment…" : "Sign in"}
      </button>
    </LinkCard>
  );
}
