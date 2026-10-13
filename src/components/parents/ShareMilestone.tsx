"use client";

import { useState } from "react";
import { APP_NAME } from "@/lib/brand";
import { shareLink } from "@/lib/referral";
import { shareOrCopy } from "@/lib/share";

/**
 * Shares a milestone card page (src/lib/milestoneShare.ts). The card never names the child; the link
 * carries the parent's invite code when this device knows it.
 */
export function ShareMilestone({ path, what }: { path: string; what: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Share “${what}”`}
      title="Share a card with no name on it"
      className="min-h-11 shrink-0 rounded-xl border border-line bg-white px-3 text-sm font-semibold print:hidden"
      onClick={async () => {
        const url = shareLink(window.location.origin, path);
        const result = await shareOrCopy(url, what, `A practice milestone in ${APP_NAME}:`);
        if (result === "copied") {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } else if (result === "failed") window.prompt("Copy this link:", url);
      }}
    >
      <span aria-hidden="true">🔗 </span>
      {copied ? "Link copied!" : "Share"}
      <span role="status" className="sr-only">{copied ? "Link copied" : ""}</span>
    </button>
  );
}
