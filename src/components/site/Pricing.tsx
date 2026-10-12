import Link from "next/link";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, PRICES, SUBSCRIBE_HREF, TRIAL_DAYS } from "@/lib/plan";

/** The three plan cards, shared by the landing page and the pricing page. All numbers come from lib/plan.ts. */
export function PricingCards() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card flex flex-col p-6">
          <h3 className="text-xl font-bold">Free trial</h3>
          <p className="mt-2 text-4xl font-bold">
            $0 <span className="text-base font-semibold text-ink-soft">for {TRIAL_DAYS} days</span>
          </p>
          <p className="mt-2 font-read text-ink-soft">Everything included. No card needed. Afterwards, the first {FREE_UNITS_PER_COURSE} units of every subject stay free.</p>
          <Link prefetch={false} href="/play/" className="btn mt-4 min-h-12 px-4 text-lg">
            Start free
          </Link>
        </div>
        <div className="card flex flex-col border-[#4f8ef7] p-6">
          <h3 className="text-xl font-bold">Family · monthly</h3>
          <p className="mt-2 text-4xl font-bold">
            ${PRICES.month.amount} <span className="text-base font-semibold text-ink-soft">CAD / month</span>
          </p>
          <p className="mt-2 flex-1 font-read text-ink-soft">Up to {MAX_CHILDREN} children. Every grade, mode and game. Cancel anytime.</p>
          <a href={SUBSCRIBE_HREF} className="btn mt-4 min-h-12 px-4 text-lg">
            Subscribe monthly
          </a>
        </div>
        <div className="card relative flex flex-col border-[#25b47e] p-6">
          <span className="absolute -top-3 right-4 rounded-full bg-[#25b47e] px-3 py-1 text-sm font-bold text-[#0f172a]">{PRICES.year.note}</span>
          <h3 className="text-xl font-bold">Family · yearly</h3>
          <p className="mt-2 text-4xl font-bold">
            ${PRICES.year.amount} <span className="text-base font-semibold text-ink-soft">CAD / year</span>
          </p>
          <p className="mt-2 flex-1 font-read text-ink-soft">Everything in monthly, for about $10 a month.</p>
          <a href={SUBSCRIBE_HREF} className="btn btn-good mt-4 min-h-12 px-4 text-lg">
            Subscribe yearly
          </a>
        </div>
      </div>
      <p className="mt-4 font-read text-ink-soft">You can subscribe straight away. The free trial is optional, and no card is needed to start it.</p>
    </>
  );
}
