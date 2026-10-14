"use client";

import { useEffect, useState } from "react";
import { checkHealth, STATE_TEXT, type ServiceState } from "@/lib/status";

const DOT: Record<ServiceState, string> = {
  checking: "bg-[#94a3b8]",
  ok: "bg-[#1f8a5b]",
  degraded: "bg-[#d97706]",
  unreachable: "bg-[#c2410c]",
};

/** Live result of /api/health/, checked when the page opens and on demand. */
export function StatusCheck() {
  const [state, setState] = useState<ServiceState>("checking");
  const [at, setAt] = useState<string | null>(null);

  const check = () =>
    checkHealth().then((next) => {
      setState(next);
      setAt(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    });

  useEffect(() => {
    void check();
    // Once, when the page opens.
  }, []);

  const run = () => {
    setState("checking");
    void check();
  };

  const text = STATE_TEXT[state];
  return (
    <section aria-live="polite" className="card flex flex-col gap-3 p-6" data-state={state}>
      <h2 className="flex items-center gap-3 text-2xl font-bold">
        <span aria-hidden="true" className={`inline-block h-4 w-4 shrink-0 rounded-full border border-black/20 ${DOT[state]}`} />
        {text.title}
      </h2>
      <p className="font-read text-lg text-ink-soft">{text.body}</p>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn min-h-12 px-5" onClick={run} disabled={state === "checking"}>
          Check again
        </button>
        {at && <span className="text-sm text-ink-soft">Last checked at {at}</span>}
      </div>
    </section>
  );
}
