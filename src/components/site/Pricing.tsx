import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, money, perChildMonthly, PRICES_BY_CURRENCY, SUBSCRIBE_HREF, TAX_NOTE, TRIAL_DAYS, type Currency } from "@/lib/plan";
import { AppLink } from "./AppLink";

/**
 * The three plan cards, shared by the landing page and the pricing page. All numbers come from lib/plan.ts.
 * Canadian dollars unless the pricing page's CAD/USD switch (shown once a US curriculum is offered) asks for US dollars.
 */
export function PricingCards({ currency = "CAD" }: { currency?: Currency }) {
  const prices = PRICES_BY_CURRENCY[currency];
  // "$14.99 CAD / month" as before, or "US$14.99 / month".
  const symbol = currency === "USD" ? "US$" : "$";
  const unit = currency === "USD" ? "" : "CAD ";
  const perChild = (interval: "month" | "year") => (
    <p className="mt-2 self-start rounded-full bg-good-soft px-3 py-1 font-bold text-[#0f172a]">
      {money(perChildMonthly(currency, interval), currency)} a month per child
      <span className="block text-sm font-semibold text-ink-soft">with {MAX_CHILDREN} children</span>
    </p>
  );
  return (
    <>
      <p className="mb-4 text-2xl font-bold">
        From {money(perChildMonthly(currency, "year"), currency)} a month per child.{" "}
        <span className="font-read text-lg font-normal text-ink-soft">One plan covers up to {MAX_CHILDREN} children and every subject.</span>
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card flex flex-col p-6">
          <h3 className="text-xl font-bold">Free trial</h3>
          <p className="mt-2 text-4xl font-bold">
            $0 <span className="text-base font-semibold text-ink-soft">for {TRIAL_DAYS} days</span>
          </p>
          <p className="mt-2 font-read text-ink-soft">Everything included. No card needed. Afterwards, the first {FREE_UNITS_PER_COURSE} units of every subject stay free.</p>
          <AppLink href="/play/" className="btn mt-4 min-h-12 px-4 text-lg">
            Start free
          </AppLink>
        </div>
        <div className="card flex flex-col border-[#4f8ef7] p-6">
          <h3 className="text-xl font-bold">Family · monthly</h3>
          <p className="mt-2 text-4xl font-bold">
            {symbol}
            {prices.month.amount} <span className="text-base font-semibold text-ink-soft">{unit}/ month</span>
          </p>
          <p className="text-sm font-semibold text-ink-soft">{TAX_NOTE[currency].short}</p>
          {perChild("month")}
          <p className="mt-2 flex-1 font-read text-ink-soft">Up to {MAX_CHILDREN} children. Every grade, mode and game. Cancel anytime.</p>
          <a href={SUBSCRIBE_HREF} className="btn mt-4 min-h-12 px-4 text-lg">
            Subscribe monthly
          </a>
        </div>
        <div className="card relative flex flex-col border-[#25b47e] p-6">
          <span className="absolute -top-3 right-4 rounded-full bg-[#25b47e] px-3 py-1 text-sm font-bold text-[#0f172a]">{prices.year.note}</span>
          <h3 className="text-xl font-bold">Family · yearly</h3>
          <p className="mt-2 text-4xl font-bold">
            {symbol}
            {prices.year.amount} <span className="text-base font-semibold text-ink-soft">{unit}/ year</span>
          </p>
          <p className="text-sm font-semibold text-ink-soft">{TAX_NOTE[currency].short}</p>
          {perChild("year")}
          <p className="mt-2 flex-1 font-read text-ink-soft">Everything in monthly, for about {symbol}
            {Math.round(prices.year.amount / 12)} a month.</p>
          <a href={SUBSCRIBE_HREF} className="btn btn-good mt-4 min-h-12 px-4 text-lg">
            Subscribe yearly
          </a>
        </div>
      </div>
      <p className="mt-4 font-read text-ink-soft">Prices are {TAX_NOTE[currency].long}. You can subscribe straight away. The free trial is optional, and no card is needed to start it.</p>
    </>
  );
}
