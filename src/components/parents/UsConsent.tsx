"use client";

import Link from "next/link";
import { useState } from "react";
import { giveConsent } from "@/lib/account";
import { APP_NAME } from "@/lib/brand";
import { CONSENT_NOTICE, consentNeeded } from "@/lib/coppa";
import { useStore } from "@/lib/store";

/**
 * The direct notice and consent a US parent gives before their children's information is synced (COPPA, see
 * src/lib/coppa.ts). Shown on every parent screen until consent is recorded; nothing for Canadian families.
 */
export function UsConsent() {
  const family = useStore((s) => s.family);
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  if (!consentNeeded(family)) return null;

  const submit = async () => {
    setBusy(true);
    setMessage(null);
    try {
      await giveConsent();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mb-5 rounded-2xl border-2 border-[#4f8ef7] bg-white p-5" aria-labelledby="us-consent-h">
      <h2 id="us-consent-h" className="text-xl font-bold">
        Your permission to save your children’s progress
      </h2>
      <p className="mt-1 font-read">
        US law (the Children’s Online Privacy Protection Act) asks us to get a parent’s permission before we keep children’s information. Until you agree, your children’s progress stays on this device only and doesn’t sync.
      </p>
      <dl className="mt-3 flex flex-col gap-2 font-read text-ink-soft">
        <div>
          <dt className="font-bold text-ink">What we keep</dt>
          <dd>{CONSENT_NOTICE.collect}</dd>
        </div>
        <div>
          <dt className="font-bold text-ink">Why</dt>
          <dd>{CONSENT_NOTICE.why}</dd>
        </div>
        <div>
          <dt className="font-bold text-ink">What we never do</dt>
          <dd>{CONSENT_NOTICE.never}</dd>
        </div>
        <div>
          <dt className="font-bold text-ink">How long</dt>
          <dd>{CONSENT_NOTICE.retention}</dd>
        </div>
        <div>
          <dt className="font-bold text-ink">Your choices</dt>
          <dd>{CONSENT_NOTICE.rights}</dd>
        </div>
      </dl>
      <p className="mt-2 text-sm text-ink-soft">
        We’ll email you a confirmation now and again in a day or two, each with a link to withdraw. Read the full <Link href="/privacy/#united-states">privacy policy</Link>.
      </p>
      <label className="mt-3 flex items-start gap-3 font-read">
        <input type="checkbox" className="mt-1 size-6 shrink-0" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        <span>I’m the parent or legal guardian of the children on this account, and I agree that {APP_NAME} may keep their information as described above.</span>
      </label>
      <button type="button" className="btn btn-good mt-3 min-h-12 px-5 text-lg disabled:opacity-60" disabled={!agreed || busy} onClick={() => void submit()}>
        {busy ? "Saving…" : "Agree and sync"}
      </button>
      {message && (
        <p role="alert" className="mt-2 font-semibold text-nudge-dark">
          {message}
        </p>
      )}
    </section>
  );
}
