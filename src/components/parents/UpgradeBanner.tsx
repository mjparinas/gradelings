"use client";

import { useSyncExternalStore } from "react";
import { SITE_HOST } from "@/lib/brand";
import { firstChargeAt, FREE_UNITS_PER_COURSE, MAX_CHILDREN, PRICES, trialDaysLeft, upgradeOffer } from "@/lib/plan";
import { useRoute } from "@/lib/router";
import { useStore } from "@/lib/store";
import { isAndroidApp } from "@/lib/twa";

const noSubscribe = () => () => {};

/** A subscribe prompt on every parent screen except the subscribe page itself. In the Android app it names the website, with no payment button. */
export function UpgradeBanner() {
  const family = useStore((s) => s.family);
  const offer = upgradeOffer(family);
  const { path } = useRoute();
  const inAndroidApp = useSyncExternalStore(noSubscribe, isAndroidApp, () => false);
  if (!offer || path[0] === "subscription") return null;
  if (inAndroidApp) {
    return (
      <section className="mb-5 rounded-2xl border-2 border-[#25b47e] bg-good-soft p-5">
        <h2 className="text-xl font-bold">Subscribe at {SITE_HOST}</h2>
        <p className="mt-1 font-read">
          This app can&apos;t take a payment. Open <b>{SITE_HOST}</b> in your browser to subscribe. Sign in with the same account and your membership shows up here.
        </p>
      </section>
    );
  }

  const href = family.account ? "#/subscription" : "#/account?next=subscription";
  const days = trialDaysLeft(family);
  return (
    <section className="mb-5 rounded-2xl border-2 border-[#25b47e] bg-good-soft p-5">
      <h2 className="text-xl font-bold">{offer === "trial" ? "Subscribe before the trial ends" : "Subscribe to unlock the full app"}</h2>
      <p className="mt-1 font-read">
        {offer === "trial" ? (
          <>
            {days} {days === 1 ? "day" : "days"} of full access left. Subscribe now and every unit, mode and game stays open for up to {MAX_CHILDREN} children. {PRICES.year.label} ({PRICES.year.note}) or {PRICES.month.label}.
          </>
        ) : (
          <>
            The first {FREE_UNITS_PER_COURSE} units of each subject stay free. A family plan opens every unit, Adventure, Review, Speed Run, Challenge and the games for up to {MAX_CHILDREN} children. {PRICES.year.label} ({PRICES.year.note}) or {PRICES.month.label}.
          </>
        )}
      </p>
      {offer === "trial" && (
        <p className="mt-1 text-sm text-ink-soft">
          {firstChargeAt(family.trialEndsAt, Boolean(family.subscription))
            ? "You keep your free days: the first payment is when the trial ends."
            : "You're charged at checkout. The paid plan starts that day."}
        </p>
      )}
      <a href={href} className="btn btn-good mt-3 min-h-12 px-5 text-lg">
        {family.account ? "Subscribe" : "Create an account to subscribe"}
      </a>
    </section>
  );
}
