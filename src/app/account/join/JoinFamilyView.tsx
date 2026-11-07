"use client";

import Link from "@/components/PublicLink";
import { useEffect, useState } from "react";
import { LinkCard } from "../AccountLinkPage";

/** Where the emailed link from a family owner lands: choose a password, and the account is made on that family. */
export function JoinFamilyView() {
  const [token, setToken] = useState("");
  const [details, setDetails] = useState<{ email: string; from: string } | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "invalid" | "done">("loading");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token") ?? "";
    window.history.replaceState(null, "", window.location.pathname);
    queueMicrotask(() => setToken(t));
    if (!t) {
      queueMicrotask(() => setState("invalid"));
      return;
    }
    void fetch(`/api/account/adults/accept/?token=${encodeURIComponent(t)}`, { credentials: "same-origin" })
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as { email?: string; from?: string; error?: string };
        if (!res.ok || !data.email) throw new Error(data.error ?? "This invitation has expired or was already used.");
        setDetails({ email: data.email, from: data.from ?? "" });
        setState("ready");
      })
      .catch((e: Error) => {
        setError(e.message);
        setState("invalid");
      });
  }, []);

  async function accept(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/account/adults/accept/", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setState("done");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <LinkCard title={state === "done" ? "You're in" : state === "invalid" ? "We couldn’t open that invitation" : "Join a family"}>
      {state === "loading" && <p className="font-read text-lg">Checking your invitation…</p>}
      {state === "invalid" && <p className="font-read text-lg">{error || "This invitation isn’t valid. Open the link from your email, or ask for a new one."}</p>}
      {state === "ready" && details && (
        <form className="flex flex-col gap-3" onSubmit={(e) => void accept(e)}>
          <p className="font-read text-lg">
            {details.from ? <b>{details.from}</b> : "A family owner"} invited <b>{details.email}</b> to follow their children&apos;s practice. Choose a password to make your own sign-in.
          </p>
          <input type="password" autoComplete="new-password" required minLength={8} placeholder="Password (8+ characters)" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl border-2 border-line px-3 py-2 text-lg" />
          {error && <p className="font-semibold text-nudge-dark">{error}</p>}
          <button type="submit" disabled={busy} className="btn btn-good min-h-14 text-xl">
            Join the family
          </button>
        </form>
      )}
      {state === "done" && (
        <>
          <p className="font-read text-lg">You&apos;re signed in. You can now see the family&apos;s children, reports and settings.</p>
          <Link href="/parents/?signedin=1#/overview" className="btn btn-good min-h-14 text-xl">
            Go to the Parent area
          </Link>
        </>
      )}
    </LinkCard>
  );
}
