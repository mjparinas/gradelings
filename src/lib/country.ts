import type { Currency } from "@/content/money";

// Everything that differs by country, in one place. A framework (province or state) names its country; code reads
// what it needs from that country here instead of testing for "US". Lists keyed by `CountryCode` (Record<CountryCode, …>)
// are exhaustive, so adding a country makes the type checker point at every place that needs its data.

export type CountryCode = "CA" | "US";

export interface Country {
  code: CountryCode;
  /** "Canada", for headings and pickers. */
  name: string;
  /** The English content and copy are shown in. */
  locale: "en-CA" | "en-US";
  /** What families pay in, and the money questions and games use. */
  currency: Currency;
  /** Between groups of three digits in big numbers: "10 000" or "10,000". */
  thousandsSeparator: " " | ",";
  /** A region's name in sentences when the framework doesn't say otherwise ("province", "state"). */
  regionKind: "province" | "state";
  /** Kindergarten to Grade 9, in the country's wording, for plan and marketing lines. */
  gradeRange: string;
  /** Children's data waits for a parent's consent before it is stored on the server (US: COPPA). */
  parentalConsent: boolean;
}

export const COUNTRIES: Record<CountryCode, Country> = {
  CA: {
    code: "CA",
    name: "Canada",
    locale: "en-CA",
    currency: "CAD",
    thousandsSeparator: " ",
    regionKind: "province",
    gradeRange: "Kindergarten to Grade 9",
    parentalConsent: false,
  },
  US: {
    code: "US",
    name: "United States",
    locale: "en-US",
    currency: "USD",
    thousandsSeparator: ",",
    regionKind: "state",
    gradeRange: "kindergarten through 9th grade",
    parentalConsent: true,
  },
};

/** The order pickers and lists show countries in: Canada first. */
export const COUNTRY_ORDER: CountryCode[] = ["CA", "US"];

/**
 * A stored country code (a database column, a request body). Empty means Canada, the column's default. Anything else
 * that isn't a known country throws, so a new country is never treated as Canada by accident.
 */
export function toCountryCode(value: unknown): CountryCode {
  if (value === null || value === undefined || value === "") return "CA";
  if (typeof value === "string" && Object.hasOwn(COUNTRIES, value)) return value as CountryCode;
  throw new Error(`Unknown country "${String(value)}"`);
}

/** The country for a code, or for anything that names its country (a framework, a family). No country means Canada. */
export function countryOf(from: CountryCode | { country?: CountryCode | null } | null | undefined): Country {
  const code = typeof from === "string" ? from : from?.country;
  return code ? COUNTRIES[code] : COUNTRIES.CA;
}
