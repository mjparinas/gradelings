"use client";

import { useSyncExternalStore } from "react";
import { SITE_HOST } from "@/lib/brand";
import { SUBSCRIBE_HREF } from "@/lib/plan";
import { isAndroidApp } from "@/lib/twa";
import { Dialog } from "../ui";
import { Companion } from "./Companion";

const noSubscribe = () => () => {};

/** Shown when a child opens something the free plan doesn't include. Kids can't buy; a grown-up subscribes from the parent area. */
export function MembershipLock({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inAndroidApp = useSyncExternalStore(noSubscribe, isAndroidApp, () => false);
  return (
    <Dialog open={open} title="Ask a grown-up" onClose={onClose}>
      <div className="mb-4 flex justify-center">
        <Companion mood="think" size={110} />
      </div>
      <p className="mb-5 font-read text-lg text-ink-soft">
        {inAndroidApp ? (
          <>This part opens with a family membership. A grown-up can subscribe at <b>{SITE_HOST}</b> in a browser.</>
        ) : (
          "This part opens with a family membership. A grown-up can subscribe in the grown-ups area."
        )}
      </p>
      {!inAndroidApp && (
        <a href={SUBSCRIBE_HREF} className="btn mb-3 min-h-14 w-full text-xl">
          Grown-ups: subscribe
        </a>
      )}
      <button type="button" className="btn btn-good min-h-14 w-full text-xl" onClick={onClose}>
        OK
      </button>
    </Dialog>
  );
}
