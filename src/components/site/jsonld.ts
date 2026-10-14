import { APP_NAME } from "@/lib/brand";
import { PRICES_BY_CURRENCY, type Currency } from "@/lib/plan";
import type { Framework } from "@/content/frameworks";
import type { GradeId } from "@/content/types";
import { pageLocale } from "@/lib/pageMeta";
import { ORG_REF, absolute } from "@/lib/site";

export function breadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absolute(c.href) } : {}),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/**
 * A guide article published by the site. `updated` is the day its content last changed as recorded by the curriculum
 * lock (src/content/updated.ts); with no recorded day there is no date, never a made-up one.
 */
export function articleJsonLd(a: { headline: string; description: string; path: string; framework?: Pick<Framework, "country">; updated?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    url: absolute(a.path),
    mainEntityOfPage: absolute(a.path),
    inLanguage: pageLocale(a.framework),
    isAccessibleForFree: true,
    ...(a.updated ? { dateModified: a.updated } : {}),
    author: ORG_REF,
    publisher: ORG_REF,
  };
}

/** The units (or other pages) a page lists, in order. */
export function itemListJsonLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: absolute(item.path) })),
  };
}

/** Usual ages for a grade: Kindergarten 5–6, Grade 1 6–7 and so on. */
export function typicalAgeRange(grade: GradeId): string {
  const n = grade === "k" ? 0 : Number(grade);
  return `${n + 5}-${n + 6}`;
}

/**
 * The app itself, with the family plan's prices. Used on the home and pricing pages.
 * It is a SoftwareApplication, not a Product: Google's Product snippets expect reviews or
 * ratings, and we have no real ones to give. Never add made-up `review` or `aggregateRating`.
 * Canadian prices by default; pages pass `siteCurrencies(FRAMEWORKS)` so the US offers are listed too once a US
 * curriculum is offered (each with its region, so the two are never mixed up).
 */
export function appJsonLd(currencies: Currency[] = ["CAD"]) {
  const both = currencies.length > 1;
  const offer = (name: string, p: { amount: number; currency: string }) => ({
    "@type": "Offer",
    name: both ? `${name}, ${p.currency}` : name,
    price: p.amount,
    priceCurrency: p.currency,
    ...(both ? { eligibleRegion: p.currency === "USD" ? "US" : "CA" } : {}),
    availability: "https://schema.org/InStock",
    url: absolute("/pricing/"),
  });
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absolute("/")}#app`,
    name: APP_NAME,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web, Android, iOS, Windows, macOS, ChromeOS",
    url: absolute("/play/"),
    audience: { "@type": "EducationalAudience", educationalRole: "student" },
    offers: currencies.flatMap((c) => [offer("Family plan (monthly)", PRICES_BY_CURRENCY[c].month), offer("Family plan (yearly)", PRICES_BY_CURRENCY[c].year)]),
  };
}
