import { WHATS_NEW, type NewsDay, type NewsItem } from "@/lib/whatsNew";

/** How many days of posts the parent area lists; the public page has them all. */
export const PARENT_NEWS_DAYS = 20;

const SEEN_KEY = "gradelings.news.seen";
const CHANGE = "gradelings:news-seen";

/** Words a store app must not carry: those apps show no prices, trials or where to pay (see AGENTS.md, "Store apps sell nothing"). */
const PAYMENT_WORDS = /trial|subscri|price|pricing|payment|premium|member|refund|checkout|\bplan\b|\bcode\b|C\$|US\$|\$\d|google play|app store/i;

/**
 * The posts a parent sees in the parent area: new things and fixes only (the "For teachers" items are for the teacher area),
 * and in a store app nothing that talks about paying. Days left with nothing are dropped. Newest first.
 */
export function parentNews(storeApp: boolean, days: NewsDay[] = WHATS_NEW): NewsDay[] {
  const keep = (item: NewsItem) => item.kind !== "teachers" && !(storeApp && PAYMENT_WORDS.test(`${item.title} ${item.body}`));
  return days
    .map((d) => ({ ...d, items: d.items.filter(keep) }))
    .filter((d) => d.items.length > 0 && !(storeApp && PAYMENT_WORDS.test(d.headline)))
    .slice(0, PARENT_NEWS_DAYS);
}

/** The newest day this device has looked at (a day like 2026-11-13), or null when it has never been recorded. */
export function newsSeen(): string | null {
  try {
    return localStorage.getItem(SEEN_KEY);
  } catch {
    return null;
  }
}

/** Remember that posts up to `day` were seen. Only ever moves forward. */
export function markNewsSeen(day: string): void {
  try {
    const seen = newsSeen();
    if (seen && seen >= day) return;
    localStorage.setItem(SEEN_KEY, day);
    window.dispatchEvent(new Event(CHANGE));
  } catch {
    /* storage blocked: the dot just stays */
  }
}

export function subscribeNewsSeen(onChange: () => void): () => void {
  window.addEventListener(CHANGE, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * The posts newer than what this device has seen. A device that has never looked starts from the newest post, so a new
 * parent isn't greeted by a "new" mark for things from before they arrived.
 */
export function unseenNews(news: NewsDay[], seen: string | null): NewsDay[] {
  if (seen === null) return [];
  return news.filter((d) => d.day > seen);
}
