"use client";

import { useEffect, useSyncExternalStore } from "react";
import { APP_NAME } from "@/lib/brand";
import { normalizeReferralCode, TRIAL_DAYS } from "@/lib/plan";
import { saveReferralCode } from "@/lib/referral";
import { LinkCard } from "../AccountLinkPage";

const noSubscribe = () => () => {};

export function InviteView() {
  const ref = useSyncExternalStore(noSubscribe, () => new URLSearchParams(window.location.search).get("ref"), () => null);
  // Remember the code for the sign-up form; the page reads the same value, so nothing is stored twice on screen.
  useEffect(() => {
    saveReferralCode(ref);
  }, [ref]);
  const valid = ref === null ? null : normalizeReferralCode(ref) !== null;
  return (
    <LinkCard title={`A friend invited you to ${APP_NAME}`}>
      {valid !== true ? (
        <p className="font-read text-ink-soft">That invite link looks incomplete, but you can still start your {TRIAL_DAYS}-day free trial below.</p>
      ) : (
        <p className="font-read text-ink-soft">
          Start your {TRIAL_DAYS}-day free trial with everything on and no card needed. When you confirm your email, your friend gets a free month as a thank-you.
        </p>
      )}
      <a href="/parents/#/account" className="btn btn-good min-h-14 px-4 text-xl">
        Create my free account
      </a>
    </LinkCard>
  );
}
