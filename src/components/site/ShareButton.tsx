"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { myInviteCode, saveReferralCode, shareLink } from "@/lib/referral";
import { shareOrCopy } from "@/lib/share";

// Share buttons for public pages (src/lib/share.ts: the share sheet on phones, a copied link elsewhere).
// A parent signed in on this device shares their invite link with it.

const noSubscribe = () => () => {};

export function ShareButton({ path, title, text, label = "Share this page" }: { path: string; title: string; text?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const invite = useSyncExternalStore(noSubscribe, () => myInviteCode() !== null, () => false);

  async function share() {
    const url = shareLink(window.location.origin, path);
    const result = await shareOrCopy(url, title, text);
    if (result === "copied") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else if (result === "failed") window.prompt("Copy this link:", url);
  }

  return (
    <div className="flex flex-col items-start gap-1 print:hidden">
      <button type="button" onClick={() => void share()} className="btn min-h-12 px-5 text-lg">
        <span aria-hidden="true">🔗</span> {copied ? "Link copied!" : label}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
      {invite && <span className="text-sm text-ink-soft">Your invite is in the link: a family that joins gives you a free month.</span>}
    </div>
  );
}

/** "Save to Pinterest" as a plain link (no Pinterest script), with a tall image made for pins. `media` is absolute. */
export function PinLink({ path, media, description }: { path: string; media: string; description: string }) {
  const href = (url: string) =>
    `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(description)}`;
  return (
    <a
      href={href(new URL(path, media).toString())}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.currentTarget.href = href(shareLink(window.location.origin, path));
      }}
      className="btn min-h-12 px-5 text-lg print:hidden"
    >
      <span aria-hidden="true">📌</span> Save to Pinterest
    </a>
  );
}

/** Opening any public page from a shared link remembers the invite code for sign-up, like /account/invite/. */
export function RefCapture() {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) saveReferralCode(ref);
  }, []);
  return null;
}
