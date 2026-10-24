import type { Currency } from "@/content/money";
import { countryOf, type CountryCode } from "./country";
import type { FamilyInfo } from "./model";

// Subscription plans and what each one unlocks. Tune these numbers freely:
// the whole app reads them from here.

export const TRIAL_DAYS = 30;
export const FREE_UNITS_PER_COURSE = 2;
export const MAX_CHILDREN = 3;
/** Any payment is refunded in full when the parent asks within this many days of it. */
export const REFUND_DAYS = 14;

/** Referrals: when a friend signs up with your code and confirms their email, you get a free month of this length. */
export const REFERRAL_BONUS_DAYS = 30;
/** A family can earn at most this many free months from referrals. */
export const REFERRAL_MAX_REWARDS = 12;
/** Unambiguous characters only (no 0/O, 1/I/L), so a code read aloud or typed from a screenshot works. */
export const REFERRAL_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const REFERRAL_CODE_LENGTH = 8;

/** Shape check only; whether a code belongs to a family is decided on the server. */
export function normalizeReferralCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const code = raw.trim().toUpperCase();
  if (code.length !== REFERRAL_CODE_LENGTH) return null;
  for (const ch of code) if (!REFERRAL_ALPHABET.includes(ch)) return null;
  return code;
}

/** Where a family lives, for prices and US children's-privacy consent. Canada unless the first child added follows a US curriculum. */
export type Country = CountryCode;
export type { Currency };

export interface Price {
  amount: number;
  currency: Currency;
  label: string;
  note?: string;
}

/**
 * The family plan in each currency. Canadian labels keep a plain "$"; US labels say "US$", so the two are
 * never confused where both appear. One site serves both countries.
 */
export const PRICES_BY_CURRENCY: Record<Currency, { month: Price; year: Price & { note: string } }> = {
  CAD: {
    month: { amount: 14.99, currency: "CAD", label: "$14.99/month" },
    year: { amount: 119.99, currency: "CAD", label: "$119.99/year", note: "Save 33%" },
  },
  USD: {
    month: { amount: 14.99, currency: "USD", label: "US$14.99/month" },
    year: { amount: 119.99, currency: "USD", label: "US$119.99/year", note: "Save 33%" },
  },
};

/** Canadian prices: what public pages and Canadian families see. */
export const PRICES = PRICES_BY_CURRENCY.CAD;

/** A gift is one year of the family plan, paid once, and arrives as a code the buyer passes on. */
export const GIFT_DAYS = 365;
/** A gift code can be redeemed for this long after it is bought. */
export const GIFT_CODE_VALID_DAYS = 730;

/** What a gift costs: the yearly plan's price, once. */
export const giftPrice = (currency: Currency): Price => PRICES_BY_CURRENCY[currency].year;

/** The gift price in cents, as Stripe wants it. */
export const giftCents = (currency: Currency): number => Math.round(giftPrice(currency).amount * 100);

/** The currency a family pays in: US dollars for a US family, Canadian dollars for everyone else. */
export const currencyFor = (country: Country | null | undefined): Currency => countryOf(country).currency;

/** The family plan's prices for a family or visitor in this country. */
export const pricesFor = (country: Country | null | undefined) => PRICES_BY_CURRENCY[currencyFor(country)];

/**
 * What the plan costs per child per month with a full family of MAX_CHILDREN, to the nearest cent
 * (yearly: 119.99 / 12 / 3 = 3.33; monthly: 14.99 / 3 = 5.00). Pricing copy leads with this, always saying
 * "with 3 children".
 */
export function perChildMonthly(currency: Currency, interval: "month" | "year"): number {
  const price = PRICES_BY_CURRENCY[currency][interval].amount;
  return Math.round(((interval === "year" ? price / 12 : price) / MAX_CHILDREN) * 100) / 100;
}

/** "$3.33" or "US$3.33". */
export const money = (amount: number, currency: Currency) => `${currency === "USD" ? "US$" : "$"}${amount.toFixed(2)}`;

/**
 * Prices are before tax: Canadian checkouts add GST and PST (or HST) and US checkouts add sales tax where it applies,
 * so every price a parent reads says so. "plus tax" next to a price; the longer form in a sentence about prices.
 */
export const TAX_NOTE: Record<Currency, { short: string; long: string }> = {
  CAD: { short: "plus tax", long: "plus GST and PST, or HST, where they apply" },
  USD: { short: "plus sales tax", long: "plus sales tax where it applies" },
};

/** How a currency is named in a sentence ("Prices in Canadian dollars"). */
export const CURRENCY_NAME: Record<Currency, string> = { CAD: "Canadian dollars", USD: "US dollars" };

export type Feature = "allUnits" | "adventure" | "review" | "speed" | "facts" | "challenge" | "arcade" | "fullReports";

const ACTIVE = new Set(["active", "trialing", "past_due"]);

/** Parent-area page where a family starts or manages a paid plan. Works before anyone opens the kids' app. */
export const SUBSCRIBE_HREF = "/parents/#/subscription";

/** `accessUntil` for a code that never runs out: the latest time a JavaScript Date can hold. */
export const LIFETIME_ACCESS = 8_640_000_000_000_000;

/** Free access from a redeemed code (lifetime, a year, six months...), as opposed to a subscription. */
export function hasCodeAccess(family: FamilyInfo, now = Date.now()): boolean {
  return Boolean(family.accessUntil && now < family.accessUntil);
}

export function isLifetime(family: FamilyInfo): boolean {
  return (family.accessUntil ?? 0) >= LIFETIME_ACCESS;
}

export function isPremium(family: FamilyInfo, now = Date.now()): boolean {
  if (family.plan === "premium") return true;
  if (hasCodeAccess(family, now)) return true;
  if (family.subscription && ACTIVE.has(family.subscription.status)) return true;
  return now < family.trialEndsAt;
}

/** A membership (paid, or granted by a code), as opposed to the free trial or the free plan. */
export function hasPaidPlan(family: FamilyInfo, now = Date.now()): boolean {
  if (family.plan === "premium") return true;
  if (hasCodeAccess(family, now)) return true;
  return Boolean(family.subscription && ACTIVE.has(family.subscription.status));
}

/** Who should see a subscribe prompt: families still on the trial, or already on the free plan. */
export function upgradeOffer(family: FamilyInfo, now = Date.now()): "trial" | "free" | null {
  if (hasPaidPlan(family, now)) return null;
  return isPremium(family, now) ? "trial" : "free";
}

/** Stripe needs a trial to run at least 48 hours; an hour more covers the time spent at checkout. */
export const MIN_TRIAL_CARRY_MS = 49 * 3_600_000;

/**
 * When a family that subscribes now is first charged: the end of their free trial, so subscribing
 * early never costs trial days, or null when they're charged at checkout (the trial is over or
 * nearly over, or they had a paid plan before and the trial was already used).
 */
export function firstChargeAt(trialEndsAt: number, subscribedBefore: boolean, now = Date.now()): number | null {
  if (subscribedBefore || trialEndsAt - now < MIN_TRIAL_CARRY_MS) return null;
  return trialEndsAt;
}

export function trialDaysLeft(family: FamilyInfo, now = Date.now()): number {
  return Math.max(0, Math.ceil((family.trialEndsAt - now) / 86_400_000));
}

export function canUse(family: FamilyInfo, _feature: Feature, now = Date.now()): boolean {
  // Every premium feature is currently on the same plan.
  return isPremium(family, now);
}

/** On the free plan, the first few units of each course stay open. */
export function unitOpen(family: FamilyInfo, unitIndex: number, now = Date.now()): boolean {
  return isPremium(family, now) || unitIndex < FREE_UNITS_PER_COURSE;
}
