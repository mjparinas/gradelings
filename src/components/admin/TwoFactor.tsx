"use client";

import { useState, type FormEvent } from "react";
import { call } from "@/lib/classroom";
import { QrCode } from "@/components/teachers/QrCode";
import { Notice } from "./Engage";

// Two-step sign-in for the admin panel (src/server/twoFactor.ts): the setup screen an admin sees until it is on,
// and the card on the System tab for recovery codes and turning it off.

const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const primary = `${btn} bg-[#4f8ef7] text-[#0f172a]`;
const quiet = `${btn} border border-line bg-white`;
const danger = `${btn} border border-[#e57a12] bg-white text-nudge-dark`;
const field = "mt-1 min-h-11 rounded-xl border border-line bg-white px-3";
const card = "rounded-2xl border border-line bg-white p-5";
const when = (t: number) => new Date(t).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });

export interface TwoFactorInfo {
  enabled: boolean;
  required: boolean;
  backupCodesLeft: number;
  enabledAt: number | null;
}

/** The recovery codes, shown once. */
function RecoveryCodes({ codes, onDone }: { codes: string[]; onDone: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <h2 className="text-xl font-bold">Save Your Recovery Codes</h2>
      <p className="mt-2 font-read">
        If you lose your phone, each of these codes signs you in once instead of an authenticator code. They are shown only now. Keep them somewhere safe and apart from your password, such as a password manager.
      </p>
      <ul className="mt-3 grid grid-cols-2 gap-2 font-mono text-lg" aria-label="Recovery codes">
        {codes.map((c) => (
          <li key={c} className="rounded-lg border border-line bg-[#f6f5f1] px-3 py-2">
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={quiet} onClick={() => void navigator.clipboard?.writeText(codes.join("\n"))}>
          Copy Codes
        </button>
      </div>
      <label className="mt-4 flex items-start gap-2 font-semibold">
        <input type="checkbox" className="mt-1 size-5" checked={saved} onChange={(e) => setSaved(e.target.checked)} />I have saved these codes somewhere safe.
      </label>
      <button type="button" disabled={!saved} className={`mt-3 ${primary}`} onClick={onDone}>
        Continue
      </button>
    </div>
  );
}

/** The screen an admin sees until two-step sign-in is on (and, if it is already on, a note to sign in again with the code). */
export function TwoFactorSetup({ email, info, onDone }: { email: string; info: TwoFactorInfo; onDone: () => void }) {
  const [started, setStarted] = useState<{ secret: string; uri: string } | null>(null);
  const [code, setCode] = useState("");
  const [codes, setCodes] = useState<string[] | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (info.enabled) {
    return (
      <div className={`mx-auto mt-8 max-w-md ${card}`}>
        <h1 className="text-2xl font-bold">Sign In With Your Code</h1>
        <p className="mt-2 font-read">This account uses two-step sign-in, and this sign-in didn&apos;t include the code. Sign out, then sign in again and enter the code from your authenticator app (or a recovery code).</p>
      </div>
    );
  }
  if (codes) {
    return (
      <div className={`mx-auto mt-8 max-w-md ${card}`}>
        <RecoveryCodes codes={codes} onDone={onDone} />
      </div>
    );
  }
  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setErr("");
    try {
      await fn();
    } catch (x) {
      setErr((x as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const start = () => run(async () => setStarted(await call<{ secret: string; uri: string }>("/api/admin/2fa/", "POST", { action: "start" })));
  const confirm = (e: FormEvent) => {
    e.preventDefault();
    void run(async () => setCodes((await call<{ codes: string[] }>("/api/admin/2fa/", "POST", { action: "confirm", code })).codes));
  };
  return (
    <div className={`mx-auto mt-8 max-w-md ${card}`}>
      <h1 className="text-2xl font-bold">{info.required ? "Set Up Two-Step Sign-In" : "Turn On Two-Step Sign-In"}</h1>
      <p className="mt-2 font-read">
        {info.required ? "The admin panel needs a second step at sign-in. " : ""}
        The panel can refund payments, delete families and email everyone, so a password alone isn&apos;t enough. You&apos;ll need an authenticator app on your phone, such as Google Authenticator, Microsoft Authenticator, 1Password or Authy.
      </p>
      {!started ? (
        <>
          <Notice err={err} />
          <button type="button" disabled={busy} className={`mt-4 ${primary}`} onClick={start}>
            Start Setup
          </button>
        </>
      ) : (
        <form onSubmit={confirm} className="mt-4 flex flex-col gap-3">
          <ol className="list-decimal space-y-3 pl-5 font-read">
            <li>
              Open your authenticator app and add an account by scanning this code.
              <div className="mt-2 w-48 max-w-full">
                <QrCode text={started.uri} label={`QR code to add ${email} to an authenticator app`} className="h-auto w-full" />
              </div>
              <details className="mt-2">
                <summary className="cursor-pointer font-semibold underline">Can&apos;t scan it?</summary>
                <p className="mt-1">
                  Choose “enter a setup key” in the app and type this key (time-based):
                </p>
                <p className="mt-1 font-mono break-all select-all" aria-label="Setup key">
                  {started.secret}
                </p>
              </details>
            </li>
            <li>Type the 6-digit code the app shows now.</li>
          </ol>
          <label className="flex flex-col text-sm font-semibold">
            6-digit code
            <input className={field} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9 ]*" maxLength={7} value={code} onChange={(e) => setCode(e.target.value)} required />
          </label>
          <Notice err={err} />
          <button disabled={busy || code.replace(/\s/g, "").length !== 6} className={primary}>
            Turn On
          </button>
        </form>
      )}
    </div>
  );
}

/** System tab: whether it is on, new recovery codes, and turning it off. */
export function TwoFactorCard({ info, onChange }: { info: TwoFactorInfo | null; onChange: () => void }) {
  const [mode, setMode] = useState<"idle" | "codes" | "off">("idle");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [fresh, setFresh] = useState<string[] | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  if (!info) return null;
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (mode === "codes") {
        setFresh((await call<{ codes: string[] }>("/api/admin/2fa/", "POST", { action: "regenerate", code })).codes);
        setMode("idle");
        setCode("");
        onChange();
      } else {
        await call("/api/admin/2fa/", "POST", { action: "disable", code, password });
        onChange();
      }
    } catch (x) {
      setErr((x as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section aria-labelledby="mfa-h" className={`mb-5 ${card}`}>
      <h2 id="mfa-h" className="text-xl font-bold">
        Two-Step Sign-In
      </h2>
      {!info.enabled ? (
        <p className="mt-2 font-read">Off for this account. Sign out and back in to set it up.</p>
      ) : (
        <p className="mt-2 font-read">
          On since {info.enabledAt ? when(info.enabledAt) : "setup"}. {info.backupCodesLeft} recovery {info.backupCodesLeft === 1 ? "code" : "codes"} left.
          {info.backupCodesLeft <= 2 ? " Make new ones soon." : ""}
        </p>
      )}
      {fresh && <div className="mt-3"><RecoveryCodes codes={fresh} onDone={() => setFresh(null)} /></div>}
      {info.enabled && !fresh && mode === "idle" && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className={quiet} onClick={() => setMode("codes")}>
            Make New Recovery Codes
          </button>
          <button type="button" className={danger} onClick={() => setMode("off")}>
            Turn Off
          </button>
        </div>
      )}
      {info.enabled && !fresh && mode !== "idle" && (
        <form onSubmit={submit} className="mt-3 flex max-w-sm flex-col gap-3">
          <p className="font-read">{mode === "codes" ? "Making new codes cancels the old ones. Enter a current code to continue." : `Turning it off ${info.required ? "means you'll be asked to set it up again straight away. " : ""}signs you out on your other devices.`}</p>
          {mode === "off" && (
            <label className="flex flex-col text-sm font-semibold">
              Password
              <input className={field} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
          )}
          <label className="flex flex-col text-sm font-semibold">
            Code from your authenticator app
            <input className={field} inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} required />
          </label>
          <Notice err={err} />
          <div className="flex gap-2">
            <button disabled={busy} className={mode === "off" ? danger : primary}>
              {mode === "off" ? "Turn Off" : "Make New Codes"}
            </button>
            <button type="button" className={quiet} onClick={() => { setMode("idle"); setErr(""); setCode(""); }}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
