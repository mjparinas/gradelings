"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LinkCard } from "../AccountLinkPage";

type Kind = "weekly" | "reminders" | "updates";
const COPY: Record<Kind, { title: string; ask: string; done: string }> = {
  weekly: { title: "Stop the weekly report?", ask: "We’ll stop sending the weekly progress email.", done: "You won’t get the weekly progress email any more." },
  reminders: { title: "Stop practice reminders?", ask: "We’ll stop sending practice reminders.", done: "You won’t get practice reminders any more." },
  updates: { title: "Stop news and tips?", ask: "We’ll stop sending news and tips.", done: "You won’t get news and tips from us any more." },
};

export function UnsubscribeView() {
  const [token, setToken] = useState<string | null>(null);
  const [kind, setKind] = useState<Kind>("weekly");
  const [state, setState] = useState<"idle" | "busy" | "done" | "failed">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") ?? "";
    const k = params.get("kind");
    const fromLink: Kind = k === "reminders" || k === "updates" ? k : "weekly";
    window.history.replaceState(null, "", window.location.pathname);
    queueMicrotask(() => {
      setToken(t);
      setKind(fromLink);
    });
  }, []);

  async function unsubscribe() {
    setState("busy");
    const res = await fetch(`/api/email/unsubscribe/?${kind === "weekly" ? "" : `kind=${kind}&`}token=${encodeURIComponent(token ?? "")}`, { method: "POST" }).catch(() => null);
    setState(res?.ok ? "done" : "failed");
  }

  return (
    <LinkCard title={state === "done" ? "You’re unsubscribed" : COPY[kind].title}>
      {state === "done" ? (
        <p className="font-read text-lg">{COPY[kind].done} You can turn it back on any time in the Parent area under Account &amp; sync.</p>
      ) : (
        <>
          <p className="font-read text-lg">{COPY[kind].ask} Account emails, like password resets, will still reach you when you ask for them.</p>
          {state === "failed" && (
            <p role="alert" className="font-semibold text-nudge-dark">
              That link isn’t valid or couldn’t be reached. You can also switch it off in the Parent area under Account &amp; sync.
            </p>
          )}
          <button type="button" className="btn btn-good min-h-14 text-xl" disabled={!token || state === "busy"} onClick={() => void unsubscribe()}>
            {state === "busy" ? "One moment…" : "Unsubscribe"}
          </button>
        </>
      )}
      <Link href="/parents/" className="btn min-h-14 text-xl">
        Go to the Parent area
      </Link>
    </LinkCard>
  );
}
