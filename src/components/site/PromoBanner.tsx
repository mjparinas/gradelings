"use client";

import { useEffect, useState } from "react";
import { countdown, type LivePromo } from "@/lib/promo";
import { rememberPromoCode } from "@/lib/promoCode";
import { isStoreApp } from "@/lib/twa";

// The site-wide sale banner (src/lib/promo.ts), above the header on the public pages and on the parent
// area's Subscription page. Pages are static, so the sale is fetched after load; with no sale, nothing shows
// and the page is unchanged. The store apps sell nothing, so it never shows there, and the one-task account
// pages (reset a password, confirm an email, unsubscribe) stay free of selling.

const HIDDEN = "grademap.promo.hidden";

// The sale fetched on this page load. Each page renders its own banner, so without this a click in the nav
// bar would drop the banner and add it back a moment later, shifting the page.
let fetched: LivePromo | null | undefined;

/** For tests. */
export function forgetPromo() {
  fetched = undefined;
}

/** The store apps sell nothing, and the account pages stay free of selling. */
function offHere(): boolean {
  return isStoreApp() || window.location.pathname.startsWith("/account/");
}

function hiddenId(): string | null {
  try {
    return window.localStorage.getItem(HIDDEN);
  } catch {
    return null;
  }
}

export function PromoBanner({
  showLink = true,
  className = "",
}: {
  /** False where the visitor is already subscribing. */ showLink?: boolean;
  className?: string;
}) {
  // Only set on a client-side navigation: a full page load starts empty, matching the static HTML.
  const [promo, setPromo] = useState<LivePromo | null>(() =>
    fetched && !offHere() && hiddenId() !== fetched.id ? fetched : null,
  );
  const [now, setNow] = useState(() => Date.now());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (offHere() || fetched !== undefined) return;
    let live = true;
    fetch("/api/promo/")
      .then((r) =>
        r.ok ? (r.json() as Promise<{ promo: LivePromo | null }>) : null,
      )
      .then((r) => {
        const p = r?.promo;
        if (r) fetched = p ?? null;
        if (!live || !p || hiddenId() === p.id) return;
        rememberPromoCode(p.code, p.endsAt);
        setPromo(p);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!promo) return;
    const t = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(t);
  }, [promo]);

  if (!promo || promo.endsAt <= now) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(promo.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // No clipboard: the code is on screen to read.
    }
  };
  const hide = () => {
    try {
      window.localStorage.setItem(HIDDEN, promo.id);
    } catch {
      // Hidden for this page view only.
    }
    setPromo(null);
  };

  return (
    <aside
      aria-label="Sale"
      className={`print:hidden bg-[#0f172a] text-white ${className}`}
    >
      <div className="mx-auto flex max-w-6xl items-start gap-2 px-4 py-1.5 text-sm sm:items-center sm:py-2 sm:text-base">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1 sm:gap-y-2">
          <p className="min-w-0 flex-1 basis-64">
            <b className="font-bold">
              <span aria-hidden="true">{promo.emoji} </span>
              {promo.headline}
            </b>
            {/* Phones get the headline and code only, so the page's main button stays above the fold. */}
            {promo.body && (
              <span className="hidden font-read text-[#cbd5e1] sm:inline">
                {" "}
                {promo.body}
              </span>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void copy()}
              className="min-h-11 rounded-xl border-2 border-dashed border-[#ffd84d] bg-[#ffd84d] px-3 font-mono font-bold tracking-wider text-[#0f172a]"
            >
              {promo.code}
              <span className="sr-only">: copy code</span>
              <span
                aria-hidden="true"
                className="ml-2 font-sans text-sm font-semibold narrow:hidden"
              >
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
            <span role="status" className="sr-only">
              {copied ? "Code copied" : ""}
            </span>
            <span className="font-semibold text-[#cbd5e1] sm:text-sm">
              {countdown(promo.endsAt, now)}
            </span>
            {showLink && (
              <a
                href={promo.link}
                className="hidden min-h-11 items-center rounded-xl bg-white px-4 font-bold text-[#0f172a] sm:flex"
              >
                {promo.linkLabel}
              </a>
            )}
          </div>
        </div>
        {/* Beside the words, not under them, so the banner stays two rows on a 320 px phone. */}
        <button
          type="button"
          onClick={hide}
          aria-label="Hide this sale"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl hover:bg-white/10"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </aside>
  );
}
