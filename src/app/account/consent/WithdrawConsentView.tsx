"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LinkCard } from "../AccountLinkPage";

/**
 * Opened from the withdraw link in a US consent email (src/server/consent.ts). The parent presses the button,
 * so a mail scanner that follows links never deletes anything.
 */
export function WithdrawConsentView() {
  const [token, setToken] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "busy" | "done" | "failed">("idle");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token") ?? "";
    // Keep the token out of the address bar and the browser history.
    window.history.replaceState(null, "", window.location.pathname);
    queueMicrotask(() => setToken(t));
  }, []);

  async function withdraw() {
    setState("busy");
    const res = await fetch(`/api/account/consent/withdraw/?token=${encodeURIComponent(token ?? "")}`, { method: "POST" }).catch(() => null);
    setState(res?.ok ? "done" : "failed");
  }

  return (
    <LinkCard title={state === "done" ? "Permission withdrawn" : "Withdraw your permission?"}>
      {state === "done" ? (
        <p className="font-read text-lg">We deleted your children’s information from our servers and stopped syncing it. Progress saved on your devices stays there. You can give permission again in the Parent area at any time.</p>
      ) : (
        <>
          <p className="font-read text-lg">We’ll delete your children’s profiles and progress from our servers straight away and stop syncing them. Your account stays, and progress saved on your devices stays there.</p>
          {state === "failed" && (
            <p role="alert" className="font-semibold text-nudge-dark">
              That link isn’t valid or couldn’t be reached. You can also withdraw in the Parent area under Account.
            </p>
          )}
          <button type="button" className="btn btn-nudge min-h-14 text-xl" disabled={!token || state === "busy"} onClick={() => void withdraw()}>
            {state === "busy" ? "One moment…" : "Withdraw permission"}
          </button>
        </>
      )}
      <Link href="/parents/" className="btn min-h-14 text-xl">
        Go to the Parent area
      </Link>
    </LinkCard>
  );
}
