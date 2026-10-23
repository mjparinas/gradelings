"use client";

import { useState } from "react";
import { signUpForReports } from "@/lib/account";
import { dayKey } from "@/lib/model";
import { useFlag } from "@/lib/remoteFlags";
import { askToSaveProgress } from "@/lib/saveNudge";
import { useActiveProfile, useDerived, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";

/**
 * A quiet card for grown-ups under the end-of-lesson buttons, after the first lesson: progress is on this device
 * only until a parent gives an email. One field makes a free account with no password and the weekly report on
 * (`signUpForReports`), so a parent who has just watched their child finish a lesson isn't sent through a PIN and a
 * password form first. A parent who already has an account signs in from the parent area.
 */
export function SaveProgress() {
  const family = useStore((s) => s.family);
  const profile = useActiveProfile();
  const d = useDerived();
  const now = useNow();
  const on = useFlag("save-progress-card");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [taken, setTaken] = useState(false);
  const [sent, setSent] = useState("");

  if (sent) {
    return (
      <section className="w-full rounded-2xl border-2 border-dashed border-line bg-white/70 p-4 text-left" aria-label="For grown-ups" role="status">
        <p className="font-read text-base">
          <b>📬 Done!</b> {profile?.name ?? "Your child"}&apos;s progress is backed up. Check <b>{sent}</b> for a link to confirm, and the weekly report will start.
        </p>
      </section>
    );
  }
  if (!on || !profile) return null;
  if (!askToSaveProgress(family, d.totals.sessions, d.days[dayKey(now)]?.sessions ?? 0, now)) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setTaken(false);
    try {
      await signUpForReports(email.trim());
      setSent(email.trim());
    } catch (err) {
      const message = (err as Error).message;
      setTaken(/already has an account/.test(message));
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="w-full rounded-2xl border-2 border-dashed border-line bg-white/70 p-4 text-left" aria-label="For grown-ups">
      <p className="font-read text-base">
        <b>🔒 For grown-ups:</b> get {profile.name}&apos;s progress report by email each week, and a note before the free trial ends. It&apos;s free and backs up their progress, which is on this device only for now.
      </p>
      <form className="mt-3 flex flex-col gap-2 sm:flex-row" onSubmit={submit}>
        <label className="sr-only" htmlFor="save-progress-email">
          Your email
        </label>
        <input
          id="save-progress-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value.slice(0, 200))}
          className="min-h-12 flex-1 rounded-xl border-2 border-line bg-white px-3 font-read text-lg focus:border-[#4f8ef7]"
        />
        <button type="submit" className="btn min-h-12 px-4 text-lg" disabled={busy}>
          {busy ? "Sending…" : "Send me the reports"}
        </button>
      </form>
      {error && (
        <p className="mt-2 font-read text-base text-[#b42318]" role="alert">
          {error}{" "}
          {taken && (
            <a href="/parents/#/account" className="inline-flex min-h-12 items-center font-bold underline">
              Sign in
            </a>
          )}
        </p>
      )}
      <p className="mt-2 font-read text-sm text-ink-soft">
        No password needed. Emails carry first names and practice totals only.{" "}
        <a href="/parents/#/account" className="inline-flex min-h-12 items-center font-bold text-[#2f6fd6] underline">
          I have an account
        </a>
      </p>
    </section>
  );
}
