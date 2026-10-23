"use client";

import { useState, useSyncExternalStore } from "react";
import { FeedbackForm } from "@/components/FeedbackForm";
import { feedbackSnoozed, snoozeFeedback } from "@/lib/appFeedback";
import { isGoodWeek, shareSnoozed } from "@/lib/goodWeek";
import { useFlag } from "@/lib/remoteFlags";
import { derivedFor, useStore } from "@/lib/store";
import { isStoreApp } from "@/lib/twa";
import { useNow } from "@/lib/useNow";
import { Panel } from "./common";

const noSubscribe = () => () => {};

/**
 * "How's Gradelings?" on the parent Overview, after a good week (the same moment as the share card, so a happy
 * parent isn't asked for two things at once: this one waits until the share card has been dismissed). Answering or
 * "Not now" keeps it away from this device for 60 days.
 */
export function FeedbackCard() {
  const on = useFlag("app-feedback");
  const shareOn = useFlag("share-good-week");
  const student = useStore((s) => Boolean(s.family.account?.student));
  const signedIn = useStore((s) => Boolean(s.family.account));
  const events = useStore((s) => s.events);
  const profiles = useStore((s) => s.profiles);
  const now = useNow();
  const [hidden, setHidden] = useState(false);
  const snoozed = useSyncExternalStore(noSubscribe, () => feedbackSnoozed(Date.now()), () => true);
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  const shareSnoozedNow = useSyncExternalStore(noSubscribe, () => shareSnoozed(Date.now()), () => true);
  // The share card shows on the same good week; this one waits until it is gone (or never shows). Feedback is welcome in the store apps too: it sells nothing.
  const shareShowing = shareOn && !inStoreApp && !shareSnoozedNow;

  if (!on || student || snoozed || hidden || shareShowing || !now) return null;
  if (!profiles.some((p) => isGoodWeek(derivedFor({ events, profiles }, p.id).days, now))) return null;

  return (
    <Panel className="mb-5">
      <FeedbackForm
        audience="parent"
        signedIn={signedIn}
        compact
        onSent={() => {
          snoozeFeedback(Date.now());
          setTimeout(() => setHidden(true), 3500);
        }}
        onCancel={() => {
          snoozeFeedback(Date.now());
          setHidden(true);
        }}
      />
    </Panel>
  );
}
