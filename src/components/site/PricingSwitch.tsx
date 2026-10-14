"use client";

import { useState } from "react";
import { CURRENCY_NAME, TAX_NOTE, type Currency } from "@/lib/plan";
import { PricingCards } from "./Pricing";

/**
 * The pricing page's plan cards. One site serves both countries, so once a US curriculum is offered (`usd`, worked
 * out from FRAMEWORKS by the page) a CAD/USD switch appears; Canadian dollars are shown first. Without one, the
 * cards are in Canadian dollars only.
 */
export function PricingWithCurrency({ usd }: { usd: boolean }) {
  const [currency, setCurrency] = useState<Currency>("CAD");
  const shown = usd ? currency : "CAD";
  return (
    <>
      {usd && (
        <div role="group" aria-label="Currency" className="mb-4 inline-flex rounded-full border border-line bg-white p-1">
          {(["CAD", "USD"] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={shown === c}
              onClick={() => setCurrency(c)}
              className={`min-h-11 rounded-full px-4 font-semibold ${shown === c ? "bg-[#253047] text-white" : "text-ink-soft"}`}
            >
              {c === "CAD" ? "Canada (CAD)" : "United States (USD)"}
            </button>
          ))}
        </div>
      )}
      <PricingCards currency={shown} />
      <p className="mt-2 font-read text-ink-soft">
        Prices are in {CURRENCY_NAME[shown]}, {TAX_NOTE[shown].long}.
      </p>
    </>
  );
}
