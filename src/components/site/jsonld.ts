import { APP_NAME } from "@/lib/brand";
import { PRICES } from "@/lib/plan";
import { absolute } from "@/lib/site";

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

/** A guide article published by the site. No dates: they'd go stale or be made up. */
export function articleJsonLd(a: { headline: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    url: absolute(a.path),
    mainEntityOfPage: absolute(a.path),
    inLanguage: "en-CA",
    isAccessibleForFree: true,
    author: { "@type": "Organization", name: APP_NAME },
    publisher: { "@type": "Organization", name: APP_NAME, url: absolute("/") },
  };
}

/**
 * The app itself, with the family plan's prices. Used on the home and pricing pages.
 * It is a SoftwareApplication, not a Product: Google's Product snippets expect reviews or
 * ratings, and we have no real ones to give. Never add made-up `review` or `aggregateRating`.
 */
export function appJsonLd() {
  const offer = (name: string, p: { amount: number; currency: string }) => ({
    "@type": "Offer",
    name,
    price: p.amount,
    priceCurrency: p.currency,
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
    offers: [offer("Family plan (monthly)", PRICES.month), offer("Family plan (yearly)", PRICES.year)],
  };
}
