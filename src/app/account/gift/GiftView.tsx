"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Crumbs, SitePage } from "@/components/site/SiteChrome";
import { APP_NAME } from "@/lib/brand";
import { CURRENCY_NAME, GIFT_DAYS, MAX_CHILDREN, REFUND_DAYS, TAX_NOTE, giftPrice, money, type Currency } from "@/lib/plan";

type Open = Record<Currency, boolean>;

/**
 * Buy a year of the family plan as a gift code (no account needed). The code arrives by email to the
 * buyer, who passes it on; the family enters it under Subscription. Opens only when the server says so.
 */
export function GiftView() {
  const [open, setOpen] = useState<Open | null>(null);
  const [currency, setCurrency] = useState<Currency>("CAD");
  const [thanks, setThanks] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    queueMicrotask(() => setThanks(new URLSearchParams(window.location.search).get("thanks") === "1"));
    let live = true;
    fetch("/api/billing/gift/")
      .then((r) => r.json() as Promise<{ open: Open }>)
      .then((d) => {
        if (!live) return;
        setOpen(d.open);
        // Start on a currency that is open.
        setCurrency((c) => (d.open[c] ? c : d.open.USD ? "USD" : "CAD"));
      })
      .catch(() => live && setOpen({ CAD: false, USD: false }));
    return () => {
      live = false;
    };
  }, []);

  async function buy() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/billing/gift/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ currency }) });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Something went wrong. Please try again.");
      window.location.assign(data.url);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  const price = giftPrice(currency);
  const anyOpen = Boolean(open && (open.CAD || open.USD));
  const both = Boolean(open?.CAD && open?.USD);

  return (
    <SitePage>
      <Crumbs items={[{ label: "Home", href: "/" }, { label: "Give a gift" }]} />
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold">🎁 Give a year of {APP_NAME}</h1>
        {thanks ? (
          <div className="card mt-5 p-6 font-read text-lg" role="status">
            <p className="font-bold">Thank you! Your gift is on its way.</p>
            <p className="mt-2">We emailed the gift code to the address you gave at checkout. It can take a minute, and it may land in your spam folder. Pass the code on to the family: they sign in to the Parent area, open Subscription and choose “Have a code?”.</p>
          </div>
        ) : (
          <>
            <p className="mt-3 font-read text-lg">
              A gift is {GIFT_DAYS} days of the family plan, paid once, for up to {MAX_CHILDREN} children, with every lesson, game and report unlocked. It doesn&apos;t renew, so nobody is ever billed again.
            </p>
            <ol className="mt-5 flex flex-col gap-2 font-read text-lg">
              <li>1. Pay once at checkout. You don&apos;t need an account.</li>
              <li>2. We email you the gift code.</li>
              <li>3. Pass it on. The family opens the Parent area, then Subscription, and enters it under “Have a code?”.</li>
            </ol>
            <div className="card mt-6 flex flex-col gap-4 p-6">
              {open === null ? (
                <p className="font-read text-lg text-ink-soft">One moment…</p>
              ) : !anyOpen ? (
                <p className="font-read text-lg" role="status">
                  Gifts aren&apos;t open yet. Please check back soon.
                </p>
              ) : (
                <>
                  {both && (
                    <div role="radiogroup" aria-label="Currency" className="flex gap-2">
                      {(["CAD", "USD"] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          role="radio"
                          aria-checked={currency === c}
                          onClick={() => setCurrency(c)}
                          className={`min-h-12 flex-1 rounded-xl border-2 px-3 font-semibold ${currency === c ? "border-good-dark bg-good text-[#0f172a]" : "border-line bg-white"}`}
                        >
                          {CURRENCY_NAME[c]}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="text-3xl font-bold">
                    {money(price.amount, currency)} <span className="text-base font-semibold text-ink-soft">once, {TAX_NOTE[currency].short}</span>
                  </p>
                  {error && (
                    <p role="alert" className="font-semibold text-nudge-dark">
                      {error}
                    </p>
                  )}
                  <button type="button" className="btn btn-good min-h-14 text-xl" disabled={busy} onClick={() => void buy()}>
                    {busy ? "One moment…" : "Buy the gift"}
                  </button>
                </>
              )}
            </div>
            <p className="mt-4 text-sm text-ink-soft">
              Changed your mind? Reply to the gift email within {REFUND_DAYS} days for a full refund. We email the code to you only, and never to the person it is for. See the{" "}
              <Link href="/privacy/" className="underline">
                privacy policy
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </SitePage>
  );
}
