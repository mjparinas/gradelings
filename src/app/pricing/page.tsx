import type { Metadata } from "next";
import Link from "next/link";
import { appJsonLd, breadcrumbJsonLd } from "@/components/site/jsonld";
import { PricingWithCurrency } from "@/components/site/PricingSwitch";
import { offersUsd, siteCurrencies } from "@/components/site/provinces";
import { Crumbs, SitePage, SubscribeActions } from "@/components/site/SiteChrome";
import { FRAMEWORKS } from "@/content/frameworks";
import { APP_NAME } from "@/lib/brand";
import { FREE_UNITS_PER_COURSE, MAX_CHILDREN, PRICES, PRICES_BY_CURRENCY, REFUND_DAYS, TRIAL_DAYS } from "@/lib/plan";
import { JsonLd } from "@/lib/site";
import { pageMeta } from "@/lib/pageMeta";
import { FaqSection } from "@/components/site/FaqSection";
import { pricingFaqs } from "@/components/site/pageFaqs";

export const metadata: Metadata = pageMeta({
  title: "Pricing",
  description: `${APP_NAME} is free for ${TRIAL_DAYS} days, then ${PRICES.month.label} or ${PRICES.year.label} (CAD)${offersUsd(FRAMEWORKS) ? `, or ${PRICES_BY_CURRENCY.USD.month.label} or ${PRICES_BY_CURRENCY.USD.year.label} in the US,` : ""} for up to ${MAX_CHILDREN} children. No ads, and the first ${FREE_UNITS_PER_COURSE} units of every course stay free.`,
  path: "/pricing/",
});

export default function PricingPage() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Pricing" }];
  return (
    <SitePage>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          appJsonLd(siteCurrencies(FRAMEWORKS)),
        ]}
      />
      <Crumbs items={crumbs} />
      <h1 className="text-4xl font-bold">Simple pricing for the whole family</h1>
      <p className="mt-2 max-w-2xl font-read text-lg text-ink-soft">One plan covers up to {MAX_CHILDREN} children, every grade from Kindergarten to Grade 9, every mode and every game.{offersUsd(FRAMEWORKS) ? " Families in Canada pay in Canadian dollars, and families in the US in US dollars." : ""}</p>
      <section className="mt-8" aria-labelledby="plans">
        <h2 id="plans" className="sr-only">
          Plans
        </h2>
        <PricingWithCurrency usd={offersUsd(FRAMEWORKS)} />
      </section>
      <ul className="mt-8 flex max-w-2xl flex-col gap-2 font-read text-lg">
        <li>✓ No ads, and we never sell information.</li>
        <li>✓ Children can’t buy anything. Coins are earned only by learning.</li>
        <li>✓ Cancel any time in the Parent area. You keep access until the end of the period you’ve paid for.</li>
        <li>✓ Changed your mind? Full refund if you ask within {REFUND_DAYS} days of any payment.</li>
        <li>✓ After the trial, the first {FREE_UNITS_PER_COURSE} units of every course stay free forever.</li>
      </ul>
      <section className="mt-12 max-w-2xl" aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="text-2xl font-bold">
          How pricing works
        </h2>
        <ol className="mt-4 flex list-decimal flex-col gap-3 pl-6 font-read text-lg">
          <li>
            <b>Subscribe now, or start free.</b> You can pay straight away. Or your first {TRIAL_DAYS} days have everything switched on, with no card, and we never charge you when the trial ends.
          </li>
          <li>
            <b>After the trial, the free plan stays.</b> The first {FREE_UNITS_PER_COURSE} units of every course remain open. Adventure, Review, Speed Run, Challenge, the arcade games and units {FREE_UNITS_PER_COURSE + 1} and up need the family plan. Progress is never deleted: it is waiting if you subscribe later.
          </li>
          <li>
            <b>Subscribe when you’re ready, including during the trial.</b> Choose monthly or yearly in the Parent area. You pay at checkout, and your card is charged at the start of each period. If you subscribe during the trial, you keep your free days: your card is saved at checkout and the first payment is taken when the trial ends.
          </li>
          <li>
            <b>It renews automatically</b> at the same price each month or year until you cancel. If we ever change the price, we’ll email you before it affects your plan, and you can cancel before then.
          </li>
          <li>
            <b>Cancel any time</b> in the Parent area under Subscription. No call or email is needed. You keep access until the end of the period you’ve paid for and won’t be charged again.
          </li>
          <li>
            <b>If a payment fails,</b> your access continues while Stripe retries the card. If the payment still can’t be taken, the plan ends and you go back to the free plan. You can subscribe again at any time.
          </li>
          <li>
            <b>{REFUND_DAYS}-day refunds.</b> Changed your mind? <Link href="/contact/">Ask us</Link> within {REFUND_DAYS} days of any payment, including a renewal, and we refund it in full, no reason needed. Read the full <Link href="/terms/">terms</Link>.
          </li>
        </ol>
      </section>
      <FaqSection title="Pricing questions" id="pricing-faq" faqs={pricingFaqs(offersUsd(FRAMEWORKS))} />
      <div className="mt-8 flex flex-wrap gap-3">
        <SubscribeActions trialLabel="Start the free trial" />
        <Link href="/help/#billing" className="btn min-h-14 px-6 text-lg">
          Billing questions
        </Link>
      </div>
    </SitePage>
  );
}
