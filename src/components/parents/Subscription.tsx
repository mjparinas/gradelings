"use client";

import { countryOf } from "@/lib/country";
import { useEffect, useState, useSyncExternalStore } from "react";
import { APP_NAME } from "@/lib/brand";
import { devBilling, loadReferral, openBillingPortal, redeemCode, refreshAccount, resendVerification, startCheckout, type BillingInfo, type ReferralInfo } from "@/lib/account";
import { firstChargeAt, FREE_UNITS_PER_COURSE, hasCodeAccess, hasPaidPlan, isLifetime, isPremium, LIFETIME_ACCESS, MAX_CHILDREN, CURRENCY_NAME, pricesFor, trialDaysLeft, upgradeOffer } from "@/lib/plan";
import { inviteLink, rememberMyInvite } from "@/lib/referral";
import { useRoute } from "@/lib/router";
import { useStore } from "@/lib/store";
import { isIosApp, isStoreApp } from "@/lib/twa";
import { PageTitle, Panel } from "./common";

const noSubscribe = () => () => {};
const longDate = (t: number) => new Date(t).toLocaleDateString("en-CA", { dateStyle: "long" });

/** What the plan includes. US families read the grade range the US way. */
export const includedFor = (country?: "CA" | "US") => [
  `Every unit in every subject, ${countryOf(country).gradeRange}`,
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
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  // The App Store doesn't allow unlocking paid content with a code from outside Apple, so the iOS app has no "Have a code?" box.
  const inIosApp = useSyncExternalStore(noSubscribe, isIosApp, () => false);
  const premium = isPremium(family);
  const paid = hasPaidPlan(family);
  const chargeAt = firstChargeAt(family.trialEndsAt, Boolean(family.subscription));
  const subscribed = Boolean(family.subscription && ["active", "trialing", "past_due"].includes(family.subscription.status));
  const offer = upgradeOffer(family);
  const needsEmail = Boolean(family.account && family.account.verified === false);
  const checkout = query.get("checkout");
  const codeAccess = hasCodeAccess(family);
  const lifetime = codeAccess && isLifetime(family);
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
            : inStoreApp
              ? "This app can't take a payment. A family membership shows up here once you sign in."
            : offer === "trial"
              ? `Free trial · ${trialDaysLeft(family)} ${trialDaysLeft(family) === 1 ? "day" : "days"} left. You can subscribe now, before it ends.`
              : "The free trial is optional. Subscribe whenever you're ready, including before you've tried the app."
        }
      />
      {checkout === "success" && <Panel className="mb-5 border-good bg-good-soft">🎉 Thank you! Your membership is active.</Panel>}
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Your plan">
          <p className="text-2xl font-bold">
            {lifetime
              ? "⭐ Premium · lifetime access"
              : paid && !subscribed && codeAccess
                ? "⭐ Premium from your code"
                : paid
              ? `⭐ Premium${family.subscription?.interval ? ` (${family.subscription.interval === "year" ? "yearly" : "monthly"})` : ""}`
              : premium
                ? `Free trial · ${trialDaysLeft(family)} ${trialDaysLeft(family) === 1 ? "day" : "days"} left`
                : "Free plan"}
          </p>
          {codeAccess && !lifetime && <p className="text-ink-soft">Free access until {longDate(family.accessUntil!)}</p>}
          {subscribed && family.subscription?.currentPeriodEnd && (
            <p className="text-ink-soft">
              {family.subscription.status === "trialing" ? "Free trial until" : "Renews"} {longDate(family.subscription.currentPeriodEnd)}
              {family.subscription.status === "trialing" && ". Your first payment is that day."}
            </p>
          )}
          {!premium && (
            <p className="mt-2 font-read text-ink-soft">
              The free plan keeps the first {FREE_UNITS_PER_COURSE} units of each subject, the Daily Challenge, trophies and the report card guide.
            </p>
          )}
          <ul className="mt-4 flex flex-col gap-1.5">
            {includedFor(family.country).map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-good">✓</span> {x}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={subscribed ? "Manage" : paid ? "Your membership" : "Choose a plan"}>
          {inStoreApp ? (
            <p className="font-read">
              {paid ? (
                "Billing changes aren't made in this app. Your membership stays active on every device you sign in to."
              ) : (
                "This app can't take a payment. If your family has a membership, sign in with the same account and it shows up here."
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
            <p className="font-read">
              {lifetime
                ? "Your code gives your family lifetime access. There's nothing to pay."
                : codeAccess
                  ? `Your code gives your family everything until ${longDate(family.accessUntil!)}. You can subscribe here when it ends.`
                  : "Your membership is active."}
            </p>
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
              {family.discount && (
                <p className="rounded-xl bg-good-soft p-3 font-semibold">
                  🎟️ Code {family.discount.code}: {family.discount.percentOff}% off is taken off at checkout.
                </p>
              )}
              {offer === "trial" && (
                <p className="font-read">
                  {chargeAt
                    ? `Subscribing now keeps everything open and keeps your free days. Your card is saved at checkout and the first payment is on ${longDate(chargeAt)}, when the trial ends. Cancel before then and you pay nothing.`
                    : "Subscribing now keeps everything open. You're charged at checkout and the paid plan starts that day."}
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
        {family.account && !lifetime && !inIosApp && <RedeemPanel />}
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
    void loadReferral().then((r) => {
      setInfo(r);
      rememberMyInvite(r.code);
    }, () => setFailed(true));
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

/** A box for a code from a school, a partner or a gift: free access for a while, or a discount. */
function RedeemPanel() {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const submit = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const result = await redeemCode(code);
      setCode("");
      setMessage({
        ok: true,
        text:
          result.kind === "discount"
            ? `🎉 ${result.percentOff}% off is saved for when you subscribe.`
            : result.accessUntil >= LIFETIME_ACCESS
              ? "🎉 Your family has lifetime access."
              : `🎉 Everything is open until ${longDate(result.accessUntil)}.`,
      });
    } catch (e) {
      setMessage({ ok: false, text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  return (
    <Panel title="Have a code?">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (code.trim()) void submit();
        }}
      >
        <label className="sr-only" htmlFor="redeem-code">
          Code
        </label>
        <input
          id="redeem-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={40}
          placeholder="ABCD-EFGH-JKMN"
          className="min-h-12 flex-1 rounded-xl border border-line px-3 font-mono text-lg uppercase"
        />
        <button type="submit" disabled={busy || !code.trim()} className="btn btn-good min-h-12 px-5 text-lg disabled:opacity-60">
          {busy ? "Checking…" : "Redeem"}
        </button>
      </form>
      <p className="mt-2 text-sm text-ink-soft">A code can give your family free access for a while, or money off when you subscribe. Each code works once per family.</p>
      {message && (
        <p role="status" className={`mt-3 font-semibold ${message.ok ? "text-good-dark" : "text-nudge-dark"}`}>
          {message.text}
        </p>
      )}
    </Panel>
  );
}

function PlanChoices({ disabled, onPick }: { disabled?: boolean; onPick?: (interval: "month" | "year") => void }) {
  // A US family sees and pays US dollars; everyone else Canadian dollars.
  const prices = pricesFor(useStore((s) => s.family.country));
  return (
    <div className="flex flex-col gap-3">
      {(["year", "month"] as const).map((interval) => {
        const className = `flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left disabled:opacity-50 ${interval === "year" ? "border-[#25b47e] bg-good-soft" : "border-line"}`;
        const body = (
          <>
            <span>
              <span className="block text-lg font-bold">{interval === "year" ? "Subscribe yearly" : "Subscribe monthly"}</span>
              <span className="block text-sm text-ink-soft">{interval === "year" ? `${prices.year.note} · billed once a year` : "Cancel any time"}</span>
            </span>
            <span className="text-xl font-bold">{prices[interval].label}</span>
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
      <p className="text-sm text-ink-soft">Prices in {CURRENCY_NAME[prices.month.currency]}{prices.month.currency === "USD" ? ", plus sales tax where it applies" : ""}. Payments are handled securely by Stripe; we never see your card details.</p>
    </div>
  );
}
