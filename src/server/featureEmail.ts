import "server-only";
import { APP_NAME } from "@/lib/brand";
import { toCountryCode } from "@/lib/country";
import type { FeatureEmail } from "@/lib/featureSeries";
import type { FamilyInfo } from "@/lib/model";
import { hasCodeAccess, pricesFor, REFUND_DAYS, trialDaysLeft } from "@/lib/plan";
import type { Email } from "./email";
import { layout } from "./emailLayout";

// Builds one feature email (lib/featureSeries.ts has the words) in the shared branded layout. What it says about
// the plan depends on what the reader has: in the trial, a paid feature is open and the email says it will need the
// plan afterwards; for a member it is simply theirs; on the free plan it is named as Family plan only.

export type PlanState = "member" | "trial" | "free";

export function planState(family: FamilyInfo, now = Date.now()): PlanState {
  if (family.plan === "premium" || hasCodeAccess(family, now) || (family.subscription && ["active", "trialing", "past_due"].includes(family.subscription.status))) return "member";
  return now < family.trialEndsAt ? "trial" : "free";
}

/** The line about the plan under a paid feature, or null for a free one. */
export function planLine(e: Pick<FeatureEmail, "tier">, family: FamilyInfo, now = Date.now()): { title: string; body: string } | null {
  if (e.tier === "free") return null;
  const state = planState(family, now);
  const both = e.tier === "both";
  const price = pricesFor(toCountryCode(family.country));
  const cost = `${price.month.label} or ${price.year.label} (${price.year.note}), for up to 5 children`;
  if (state === "member") return { title: "Part of your Family plan", body: both ? "The Family plan parts of this are yours to use." : "This is yours to use, as part of your Family plan." };
  if (state === "trial") {
    const left = trialDaysLeft(family, now);
    return {
      title: "Open for you during your free trial",
      body: `${both ? "The Family plan part of this" : "This"} is part of the Family plan, and everything is open for the ${left} ${left === 1 ? "day" : "days"} left in your trial. After that it needs the plan: ${cost}. Not for you? Ask within ${REFUND_DAYS} days of any payment for a full refund.`,
    };
  }
  return {
    title: "Family plan only",
    body: `${both ? "The Family plan part of this" : "This"} is part of the Family plan: ${cost}. Every payment can be refunded within ${REFUND_DAYS} days, no reason needed.`,
  };
}

const absolute = (origin: string, path: string) => (path.startsWith("http") ? path : `${origin}${path}`);

export function featureTipEmail(to: string, origin: string, e: FeatureEmail, family: FamilyInfo, unsubToken: string, now = Date.now()): Email {
  const q = encodeURIComponent(unsubToken);
  const plan = planLine(e, family, now);
  return layout({
    kind: "feature-tip",
    to,
    origin,
    country: family.country,
    subject: e.subject,
    preheader: e.preheader,
    heading: e.title,
    body: [e.intro],
    bullets: e.points,
    hero: { path: `/email/features/${e.id}-v1.jpg`, alt: e.alt, width: 520, height: 340 },
    spotlight: [...(plan ? [{ title: plan.title, body: plan.body, paid: true, accent: 2 }] : []), { title: "Did you know?", body: e.dyk, accent: e.tier === "free" ? 0 : 1 }],
    button: { label: e.button.label, url: absolute(origin, e.button.path) },
    unsubscribeUrl: `${origin}/api/email/unsubscribe/?kind=updates&token=${q}`,
    unsubscribePage: `${origin}/account/unsubscribe/?kind=updates&token=${q}`,
    footnote: `You're getting this because you have a ${APP_NAME} account. One short tip a day while you're getting started. You can turn off news and tips any time.`,
  });
}
