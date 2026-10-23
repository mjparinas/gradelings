"use client";

import { useState } from "react";
import { FeedbackForm } from "@/components/FeedbackForm";
import type { FeedbackAudience } from "@/lib/appFeedback";
import { useFlag } from "@/lib/remoteFlags";

/** A "Feedback" button at the foot of the parent and teacher areas that opens the form in place. */
export function FeedbackLink({ audience, signedIn }: { audience: FeedbackAudience; signedIn: boolean }) {
  const on = useFlag("app-feedback");
  const [open, setOpen] = useState(false);
  if (!on) return null;
  return (
    <aside aria-label="Feedback" className="mx-auto max-w-4xl px-4 pb-8 print:hidden">
      {open ? (
        <div className="rounded-2xl border border-line bg-white p-5">
          <FeedbackForm audience={audience} signedIn={signedIn} onSent={() => setTimeout(() => setOpen(false), 3500)} onCancel={() => setOpen(false)} />
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="min-h-11 rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold">
          <span aria-hidden="true">💬 </span>Send feedback
        </button>
      )}
    </aside>
  );
}
