// The admin panel's Traffic tab: how people find the site in Google (Search Console) and visits to the public
// pages (Vercel Web Analytics, which sets no cookies and is off in the kids' app and parent area). Both are read
// on the server with read-only credentials; this file holds the shapes and the plain arithmetic.

export const TRAFFIC_PERIODS = [7, 28, 90] as const;
export type TrafficPeriod = (typeof TRAFFIC_PERIODS)[number];

const DAY = 86_400_000;
/** Search Console's numbers settle about two to three days late, so its periods end three days ago. */
export const SEARCH_LAG_DAYS = 3;

export const isPeriod = (n: number): n is TrafficPeriod => (TRAFFIC_PERIODS as readonly number[]).includes(n);

const iso = (t: number) => new Date(t).toISOString().slice(0, 10);

/** The period and the one before it, as inclusive YYYY-MM-DD dates (UTC), ending `lagDays` ago. */
export function periodDates(days: number, now: number, lagDays = 0): { start: string; end: string; prevStart: string; prevEnd: string } {
  const end = Date.UTC(new Date(now).getUTCFullYear(), new Date(now).getUTCMonth(), new Date(now).getUTCDate()) - lagDays * DAY;
  const start = end - (days - 1) * DAY;
  return { start: iso(start), end: iso(end), prevStart: iso(start - days * DAY), prevEnd: iso(start - DAY) };
}

export interface SearchTotals {
  clicks: number;
  impressions: number;
  /** Clicks ÷ impressions, 0 to 1. */
  ctr: number;
  /** Average position in Google results (1 is the top). */
  position: number;
}

export interface SearchRow extends SearchTotals {
  key: string;
}

export interface SitemapInfo {
  path: string;
  lastDownloaded: number | null;
  errors: number;
  warnings: number;
  submitted: number;
}

export interface SearchReport {
  site: string;
  start: string;
  end: string;
  totals: SearchTotals;
  previous: SearchTotals;
  daily: { date: string; clicks: number; impressions: number }[];
  queries: SearchRow[];
  pages: SearchRow[];
  sitemaps: SitemapInfo[];
}

export interface VisitsReport {
  start: string;
  end: string;
  visitors: number;
  pageviews: number;
  previous: { visitors: number; pageviews: number };
  daily: { date: string; visitors: number; pageviews: number }[];
  pages: { key: string; visitors: number; pageviews: number }[];
  referrers: { key: string; visitors: number; pageviews: number }[];
  countries: { key: string; visitors: number; pageviews: number }[];
}

/** A part that isn't set up says which settings to add; one that failed says why. */
export type Part<T> = { state: "ok"; report: T } | { state: "setup"; setup: string } | { state: "error"; error: string };

export interface TrafficData {
  days: TrafficPeriod;
  search: Part<SearchReport>;
  visits: Part<VisitsReport>;
}

/** "up 12% on the 28 days before", or "" when there's nothing to compare. */
export function changeText(now: number, before: number, days: number): string {
  if (!before) return now ? `none in the ${days} days before` : "";
  const pct = Math.round(((now - before) / before) * 100);
  if (pct === 0) return `same as the ${days} days before`;
  return `${pct > 0 ? "up" : "down"} ${Math.abs(pct)}% on the ${days} days before`;
}

/** Shows a page URL from Search Console as a path on the site. */
export function pathOf(url: string): string {
  try {
    const u = new URL(url);
    return decodeURIComponent(u.pathname) + u.search;
  } catch {
    return url;
  }
}
