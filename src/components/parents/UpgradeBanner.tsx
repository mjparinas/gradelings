"use client";

import { useSyncExternalStore } from "react";
import { firstChargeAt, FREE_UNITS_PER_COURSE, MAX_CHILDREN, pricesFor, TAX_NOTE, trialDaysLeft, upgradeOffer } from "@/lib/plan";
import { useRoute } from "@/lib/router";
import { useStore } from "@/lib/store";
import { isStoreApp } from "@/lib/twa";
import { StakeLines } from "./MembersOnly";

const noSubscribe = () => () => {};

/** A subscribe prompt on every parent screen except the subscribe page itself. None in the store apps. */
export function UpgradeBanner() {
  const family = useStore((s) => s.family);
  const offer = upgradeOffer(family);
  const { path } = useRoute();
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  if (!offer || path[0] === "subscription") return null;
  // Google Play and the App Store don't allow pointing to a payment outside the app, so the store apps show no subscribe prompt.
  if (inStoreApp) return null;

  const href = family.account ? "#/subscription" : "#/account?next=subscription";
  const days = trialDaysLeft(family);
  const prices = pricesFor(family.country);
  return (
    <section className="mb-5 rounded-2xl border-2 border-[#25b47e] bg-good-soft p-5">
      <h2 className="text-xl font-bold">{offer === "trial" ? "Subscribe before the trial ends" : "Subscribe to unlock the full app"}</h2>
      <p className="mt-1 font-read">
        {offer === "trial" ? (
          <>
            {days} {days === 1 ? "day" : "days"} of full access left. Subscribe now and every unit, mode and game stays open for up to {MAX_CHILDREN} children. {prices.year.label} ({prices.year.note}) or {prices.month.label}, {TAX_NOTE[prices.month.currency].short}.
          </>
        ) : (
          <>
            The first {FREE_UNITS_PER_COURSE} units of each subject stay free. A family plan opens every unit, Adventure, Review, Speed Run, Challenge and the games for up to {MAX_CHILDREN} children. {prices.year.label} ({prices.year.note}) or {prices.month.label}, {TAX_NOTE[prices.month.currency].short}.
          </>
        )}
      </p>
      <StakeLines className="mt-2" />
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
