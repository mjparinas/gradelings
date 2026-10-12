"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { APP_NAME, SITE_HOST } from "@/lib/brand";
import { devBilling, loadReferral, openBillingPortal, refreshAccount, resendVerification, startCheckout, type BillingInfo, type ReferralInfo } from "@/lib/account";
import { FREE_UNITS_PER_COURSE, hasPaidPlan, isPremium, MAX_CHILDREN, PRICES, trialDaysLeft, upgradeOffer } from "@/lib/plan";
import { inviteLink } from "@/lib/referral";
import { useRoute } from "@/lib/router";
import { useStore } from "@/lib/store";
import { isAndroidApp } from "@/lib/twa";
import { PageTitle, Panel } from "./common";

const noSubscribe = () => () => {};

const INCLUDED = [
  "Every unit in every subject, Kindergarten to Grade 9",
  "Adventure, Review, Speed Run and Challenge modes",
  "The arcade games, with your learn-to-play timer",
  "Full progress reports over time",
  `Up to ${MAX_CHILDREN} children`,
  "Sync across all your devices",
];

export function SubscriptionPage({ billing, onBilling }: { billing: BillingInfo | null; onBilling: (b: BillingInfo | null) => void }) {
  const family = useStore((s) => s.family);
  const { query } = useRoute();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // The server snapshot is false so the first render matches the static page.
  const inAndroidApp = useSyncExternalStore(noSubscribe, isAndroidApp, () => false);
  const premium = isPremium(family);
  const paid = hasPaidPlan(family);
  const subscribed = Boolean(family.subscription && ["active", "trialing", "past_due"].includes(family.subscription.status));
  const offer = upgradeOffer(family);
  const needsEmail = Boolean(family.account && family.account.verified === false);
  const checkout = query.get("checkout");
  const [resent, setResent] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    // Coming back from Stripe: pull the new plan from the server.
    if (checkout === "success") void refreshAccount().then(onBilling);
  }, [checkout, onBilling]);

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError("");
    try {
      await fn();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageTitle
        title={paid ? "Subscription" : "Subscribe"}
        sub={
          paid
            ? "One family membership covers all your children."
            : inAndroidApp
              ? `Open ${SITE_HOST} in your browser to subscribe. This app can't take a payment.`
            : offer === "trial"
              ? `Free trial · ${trialDaysLeft(family)} ${trialDaysLeft(family) === 1 ? "day" : "days"} left. You can subscribe now, before it ends.`
              : "The free trial is optional. Subscribe whenever you're ready, including before you've tried the app."
        }
      />
      {checkout === "success" && <Panel className="mb-5 border-good bg-good-soft">🎉 Thank you! Your membership is active.</Panel>}
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Your plan">
          <p className="text-2xl font-bold">
            {paid
              ? `⭐ Premium${family.subscription?.interval ? ` (${family.subscription.interval === "year" ? "yearly" : "monthly"})` : ""}`
              : premium
                ? `Free trial · ${trialDaysLeft(family)} ${trialDaysLeft(family) === 1 ? "day" : "days"} left`
                : "Free plan"}
          </p>
          {subscribed && family.subscription?.currentPeriodEnd && (
            <p className="text-ink-soft">Renews {new Date(family.subscription.currentPeriodEnd).toLocaleDateString("en-CA", { dateStyle: "long" })}</p>
          )}
          {!premium && (
            <p className="mt-2 font-read text-ink-soft">
              The free plan keeps the first {FREE_UNITS_PER_COURSE} units of each subject, the Daily Challenge, trophies and the report card guide.
            </p>
          )}
          <ul className="mt-4 flex flex-col gap-1.5">
            {INCLUDED.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-good">✓</span> {x}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={subscribed ? "Manage" : paid ? "Your membership" : "Choose a plan"}>
          {inAndroidApp ? (
            <p className="font-read">
              {paid ? (
                <>
                  To change or cancel your membership, open <b>{SITE_HOST}</b> in your browser.
                </>
              ) : (
                <>
                  To subscribe, open <b>{SITE_HOST}</b> in your browser. This app can&apos;t take a payment. Sign in with the same account and your membership shows up here.
                </>
              )}
            </p>
          ) : !family.account ? (
            <div className="flex flex-col gap-3">
              <p className="font-read">Create a parent account, then pick monthly or yearly. You can subscribe without starting the free trial.</p>
              <a href="#/account?next=subscription" className="btn btn-good min-h-12 px-4 text-lg">
                Create an account to subscribe
              </a>
              <PlanChoices />
            </div>
          ) : paid && !subscribed ? (
            <p className="font-read">Your membership is active.</p>
          ) : subscribed ? (
            <div className="flex flex-col gap-3">
              {billing?.stripe ? (
                <button type="button" disabled={busy} className="rounded-xl bg-[#253047] px-4 py-3 font-bold text-white" onClick={() => void run(openBillingPortal)}>
                  Manage billing, change plan or cancel
                </button>
              ) : billing?.dev ? (
                <button type="button" disabled={busy} className="rounded-xl border border-line px-4 py-3 font-semibold" onClick={() => void run(() => devBilling("cancel"))}>
                  Cancel (development mode)
                </button>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {offer === "trial" && (
                <p className="font-read">
                  Subscribing now keeps everything open. You&apos;re charged at checkout, the paid plan starts that day, and days left in the trial don&apos;t carry over.
                </p>
              )}
              {needsEmail && billing?.stripe && (
                <div className="rounded-xl bg-[#fff6e5] p-3 text-sm">
                  <p className="font-semibold">Confirm your email to subscribe.</p>
                  <p className="text-ink-soft">We sent a link when you signed up. Receipts and renewals go to that address.</p>
                  <button
                    type="button"
                    disabled={resent !== "idle"}
                    className="mt-2 rounded-xl border border-line bg-white px-3 py-1.5 font-semibold disabled:opacity-60"
                    onClick={() => {
                      setResent("sending");
                      void resendVerification().then(
                        () => setResent("sent"),
                        () => setResent("idle"),
                      );
                    }}
                  >
                    {resent === "sent" ? "Sent. Check your inbox" : resent === "sending" ? "Sending…" : "Send the link again"}
                  </button>
                </div>
              )}
              <PlanChoices
                disabled={busy || (needsEmail && Boolean(billing?.stripe)) || (!billing?.stripe && !billing?.dev)}
                onPick={(interval) => void run(() => (billing?.stripe ? startCheckout(interval) : devBilling("subscribe", interval)))}
              />
              {billing?.dev && !billing.stripe && (
                <p className="rounded-xl bg-nudge-soft p-3 text-sm">
                  <b>Development mode:</b> Stripe isn&apos;t configured, so these buttons simulate a subscription. Set the Stripe environment variables to take real payments.
                </p>
              )}
              {!billing && <p className="text-sm text-ink-soft">Connecting… (subscriptions need an internet connection)</p>}
            </div>
          )}
          {error && <p className="mt-3 font-semibold text-nudge-dark">{error}</p>}
        </Panel>
        {family.account && !family.account.student && <ReferralPanel />}
      </div>
    </>
  );
}

/** The parent's invite link and what it has earned. */
function ReferralPanel() {
  const [info, setInfo] = useState<ReferralInfo | null>(null);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    void loadReferral().then(setInfo, () => setFailed(true));
  }, []);
  const link = info ? inviteLink(window.location.origin, info.code) : "";
  return (
    <Panel title="🎁 Share and get a free month">
      <p className="font-read">
        Share your link with another family. When they sign up and confirm their email, you get a free month. They don&apos;t need to pay anything.
      </p>
      {failed ? (
        <p className="mt-3 text-sm text-ink-soft">Your invite link needs an internet connection. Try again when you&apos;re online.</p>
      ) : !info ? (
        <p className="mt-3 text-sm text-ink-soft">Loading your link…</p>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          <input readOnly aria-label="Your invite link" value={link} onFocus={(e) => e.currentTarget.select()} className="rounded-xl border-2 border-line px-3 py-2 text-base" />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-xl bg-[#25b47e] px-4 py-2 font-bold text-[#0f172a]"
              onClick={() => {
                const done = () => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2500);
                };
                void navigator.clipboard?.writeText(link).then(done, () => {});
              }}
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
            {typeof navigator !== "undefined" && "share" in navigator && (
              <button type="button" className="rounded-xl border border-line px-4 py-2 font-semibold" onClick={() => void navigator.share({ url: link, text: `Try ${APP_NAME} for free:` }).catch(() => {})}>
                Share…
              </button>
            )}
          </div>
          <p className="text-sm text-ink-soft">
            Your code: <b>{info.code}</b> · {info.joined} {info.joined === 1 ? "family has" : "families have"} joined · {info.monthsEarned} of {info.maxMonths} free months earned
          </p>
        </div>
      )}
    </Panel>
  );
}

function PlanChoices({ disabled, onPick }: { disabled?: boolean; onPick?: (interval: "month" | "year") => void }) {
  return (
    <div className="flex flex-col gap-3">
      {(["year", "month"] as const).map((interval) => {
        const className = `flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left disabled:opacity-50 ${interval === "year" ? "border-[#25b47e] bg-good-soft" : "border-line"}`;
        const body = (
          <>
            <span>
              <span className="block text-lg font-bold">{interval === "year" ? "Subscribe yearly" : "Subscribe monthly"}</span>
              <span className="block text-sm text-ink-soft">{interval === "year" ? `${PRICES.year.note} · billed once a year` : "Cancel any time"}</span>
            </span>
            <span className="text-xl font-bold">{PRICES[interval].label}</span>
          </>
        );
        if (!onPick) {
          return (
            <a key={interval} href="#/account?next=subscription" className={className}>
              {body}
            </a>
          );
        }
        return (
          <button key={interval} type="button" disabled={disabled} onClick={() => onPick(interval)} className={className}>
            {body}
          </button>
        );
      })}
      <p className="text-sm text-ink-soft">Prices in Canadian dollars. Payments are handled securely by Stripe; we never see your card details.</p>
    </div>
  );
}
