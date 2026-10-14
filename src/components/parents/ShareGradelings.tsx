"use client";

import { useState, useSyncExternalStore } from "react";
import { APP_NAME } from "@/lib/brand";
import { isGoodWeek, shareSnoozed, snoozeShare } from "@/lib/goodWeek";
import { myInviteCode, shareLink } from "@/lib/referral";
import { useFlag } from "@/lib/remoteFlags";
import { shareOrCopy } from "@/lib/share";
import { derivedFor, useStore } from "@/lib/store";
import { isStoreApp } from "@/lib/twa";
import { useNow } from "@/lib/useNow";
import { Panel } from "./common";

const noSubscribe = () => () => {};

/**
 * After a good week (a child practised on 3 of the last 7 days), a quiet card asks the parent to tell another
 * family. The link is the home page, with the parent's invite code when this device knows it: nothing about a
 * child. Not in the store apps, and "Not now" keeps it away from this device for a month.
 */
export function ShareGradelings() {
  const on = useFlag("share-good-week");
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  const student = useStore((s) => Boolean(s.family.account?.student));
  const events = useStore((s) => s.events);
  const profiles = useStore((s) => s.profiles);
  const now = useNow();
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);
  const snoozed = useSyncExternalStore(noSubscribe, () => shareSnoozed(Date.now()), () => true);
  const invite = useSyncExternalStore(noSubscribe, () => myInviteCode() !== null, () => false);

  if (!on || inStoreApp || student || snoozed || hidden || !now) return null;
  if (!profiles.some((p) => isGoodWeek(derivedFor({ events, profiles }, p.id).days, now))) return null;

  async function share() {
    const url = shareLink(window.location.origin, "/");
    const result = await shareOrCopy(url, APP_NAME, `${APP_NAME}: practice that speaks the language of the report card, with kind feedback and learning games. Try it free:`);
    if (result === "copied") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else if (result === "failed") window.prompt("Copy this link:", url);
  }

  return (
    <Panel className="mb-5 border-[#e9559a]/40 bg-[#fff1f7]">
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">🎉</span>
        <div className="flex-1">
          <p className="font-bold">A good week of practice!</p>
          <p className="font-read text-sm">
            Know a family who might like {APP_NAME} too? Share a link to it. The link says nothing about your child.
            {invite && " Your invite is in it: a family that joins gives you a free month."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => void share()} className="min-h-11 rounded-xl bg-[#253047] px-4 py-2 text-sm font-bold text-white">
              <span aria-hidden="true">🔗 </span>
              {copied ? "Link copied!" : `Share ${APP_NAME}`}
            </button>
            <button
              type="button"
              onClick={() => {
                snoozeShare(Date.now());
                setHidden(true);
              }}
              className="min-h-11 rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold"
            >
              Not now
            </button>
          </div>
          <span role="status" className="sr-only">
            {copied ? "Link copied" : ""}
          </span>
        </div>
      </div>
    </Panel>
  );
}
