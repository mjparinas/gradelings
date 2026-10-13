"use client";

import { useEffect, useState } from "react";
import { CURRENCY_NAME, type Currency } from "@/lib/plan";
import { PricingCards } from "./Pricing";

/**
 * The pricing page's plan cards. Canadian dollars only, until the `us-launch` flag is switched on in the admin
 * panel: then a CAD/USD switch appears. The page stays static; the flag is asked for once in the browser, with
 * no device id, and anything but a clear "on" keeps the Canadian cards.
 */
export function PricingWithCurrency() {
  const [us, setUs] = useState(false);
  const [currency, setCurrency] = useState<Currency>("CAD");

  useEffect(() => {
    let live = true;
    fetch("/api/flags/", { credentials: "same-origin", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { flags?: Record<string, boolean> } | null) => {
        if (live && d?.flags?.["us-launch"] === true) setUs(true);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const shown = us ? currency : "CAD";
  return (
    <>
      {us && (
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
        Prices are in {CURRENCY_NAME[shown]}; {shown === "USD" ? "sales tax is added where it applies" : "taxes may be added"}.
      </p>
    </>
  );
}
