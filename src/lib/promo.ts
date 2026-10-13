// Site-wide sales: a banner at the top of the public pages that names a redeem code and counts down to the
// end of the sale. The owner makes one in the admin panel's Sales tab from a preset (Black Friday, Back to
// school...) or from scratch, and links it to an existing code (src/server/codes.ts). Stored by
// src/server/promo.ts and served to the site by /api/promo/. Never shown in the store apps (isStoreApp), which
// sell nothing.

/** The code made for founding families (seeded in src/server/db.ts): 33% off every payment, for life. */
export const FOUNDER_CODE = "FOUNDER";

export const PROMO_LIMITS = { headline: 90, body: 220 } as const;

/** Where the banner's button can go. Kept to a fixed list, so a sale can never link off the site. */
export const PROMO_LINKS = [
  { href: "/pricing/", label: "See pricing" },
  { href: "/parents/#/subscription", label: "Subscribe" },
  { href: "/play/", label: "Start free" },
] as const;
export type PromoLink = (typeof PROMO_LINKS)[number]["href"];
export const isPromoLink = (v: unknown): v is PromoLink => PROMO_LINKS.some((l) => l.href === v);
export const promoLinkLabel = (href: string) => PROMO_LINKS.find((l) => l.href === href)?.label ?? "See pricing";

/** What the linked code gives, as the banner says it. */
export interface PromoOffer {
  code: string;
  kind: "discount" | "access";
  percentOff: number | null;
  duration: "once" | "repeating" | "forever" | null;
  months: number | null;
  days: number | null;
}

/** "for life", "on your first payment", "for 3 months", or for access codes "free for 30 days". */
export function offerTerm(o: PromoOffer): string {
  if (o.kind === "access") return o.days == null ? "free for life" : `free for ${o.days} ${o.days === 1 ? "day" : "days"}`;
  if (o.duration === "forever") return "for life";
  if (o.duration === "repeating" && o.months) return `for ${o.months} ${o.months === 1 ? "month" : "months"}`;
  return "on your first payment";
}

/**
 * Fills a banner's words: {percent} ("33%"), {code} ("FOUNDER") and {for} (offerTerm). Unknown braces stay
 * as typed, so a typo shows in the preview instead of vanishing.
 */
export function fillPromoText(text: string, o: PromoOffer): string {
  return text
    .replaceAll("{percent}", o.percentOff != null ? `${o.percentOff}%` : "")
    .replaceAll("{code}", o.code)
    .replaceAll("{for}", offerTerm(o))
    .replace(/\s{2,}/g, " ")
    .trim();
}

export interface PromoPreset {
  id: string;
  name: string;
  emoji: string;
  headline: string;
  body: string;
  /** The usual first and last day in a year (the last day may fall in the next year). Null: today for 30 days. */
  dates: ((year: number) => { start: Date; end: Date }) | null;
  /** The code the preset suggests, when there is one. */
  code?: string;
}

const d = (y: number, m: number, day: number) => new Date(y, m - 1, day);

/** US Thanksgiving is the fourth Thursday of November; Black Friday is the day after. */
export function blackFriday(year: number): Date {
  const first = d(year, 11, 1).getDay();
  const thursday = 1 + ((4 - first + 7) % 7) + 21;
  return d(year, 11, thursday + 1);
}

export const PROMO_PRESETS: PromoPreset[] = [
  {
    id: "founder",
    name: "Founding families",
    emoji: "🌱",
    headline: "Founding family price: {percent} off {for}",
    body: "Be one of our first families and keep this price for as long as you stay. Use code {code} when you subscribe.",
    dates: null,
    code: FOUNDER_CODE,
  },
  {
    id: "back-to-school",
    name: "Back to school",
    emoji: "🎒",
    headline: "Back to school: {percent} off {for}",
    body: "Start the school year with practice that follows your child's curriculum. Use code {code} when you subscribe.",
    dates: (y) => ({ start: d(y, 8, 15), end: d(y, 9, 15) }),
  },
  {
    id: "report-cards",
    name: "Report card season",
    emoji: "📝",
    headline: "Report card time: {percent} off {for}",
    body: "Turn the next steps on the report card into a little practice each day. Use code {code} when you subscribe.",
    dates: (y) => ({ start: d(y, 1, 20), end: d(y, 2, 15) }),
  },
  {
    id: "black-friday",
    name: "Black Friday",
    emoji: "🛍️",
    headline: "Black Friday: {percent} off {for}",
    body: "Our biggest sale of the year, through Cyber Monday. Use code {code} when you subscribe.",
    // Black Friday through Cyber Monday.
    dates: (y) => {
      const start = blackFriday(y);
      return { start, end: d(y, 11, start.getDate() + 3) };
    },
  },
  {
    id: "christmas",
    name: "Christmas",
    emoji: "🎄",
    headline: "A gift that keeps growing: {percent} off {for}",
    body: "Give a year of kind, curriculum-matched practice this Christmas. Use code {code} when you subscribe.",
    dates: (y) => ({ start: d(y, 12, 1), end: d(y, 12, 26) }),
  },
  {
    id: "new-year",
    name: "New Year",
    emoji: "🎉",
    headline: "New year, new skills: {percent} off {for}",
    body: "Start the year with a few minutes of practice a day. Use code {code} when you subscribe.",
    dates: (y) => ({ start: d(y, 12, 27), end: d(y + 1, 1, 15) }),
  },
  {
    id: "spring-break",
    name: "Spring break",
    emoji: "🌷",
    headline: "Spring break: {percent} off {for}",
    body: "Keep skills fresh over the break with short, fun sessions. Use code {code} when you subscribe.",
    dates: (y) => ({ start: d(y, 3, 7), end: d(y, 3, 31) }),
  },
  {
    id: "summer",
    name: "Summer learning",
    emoji: "☀️",
    headline: "Beat the summer slide: {percent} off {for}",
    body: "A few minutes a day keeps this year's learning ready for next year. Use code {code} when you subscribe.",
    dates: (y) => ({ start: d(y, 6, 20), end: d(y, 8, 15) }),
  },
  {
    id: "custom",
    name: "Custom",
    emoji: "✨",
    headline: "{percent} off {for}",
    body: "Use code {code} when you subscribe.",
    dates: null,
  },
];

export const getPreset = (id: string) => PROMO_PRESETS.find((p) => p.id === id);

/** `YYYY-MM-DD` in local time, for the date pickers. */
export const isoDay = (t: Date) => `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;

/**
 * The preset's next dates as `YYYY-MM-DD`: this year's if they haven't ended (starting today if already
 * under way), otherwise next year's. Presets without dates run from today for 30 days.
 */
export function presetDates(p: PromoPreset, now = new Date()): { start: string; end: string } {
  const today = d(now.getFullYear(), now.getMonth() + 1, now.getDate());
  if (!p.dates) return { start: isoDay(today), end: isoDay(d(today.getFullYear(), today.getMonth() + 1, today.getDate() + 30)) };
  // A window that started last year (New Year) may still be on.
  for (const y of [now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1]) {
    const { start, end } = p.dates(y);
    if (end >= today) return { start: isoDay(start < today ? today : start), end: isoDay(end) };
  }
  const { start, end } = p.dates(now.getFullYear() + 1);
  return { start: isoDay(start), end: isoDay(end) };
}

/** "Ends in 3 days", "Ends in 5 h 12 min", "Ends in 4 min", or "Ends soon" in the last minute. */
export function countdown(endsAt: number, now = Date.now()): string {
  const ms = endsAt - now;
  if (ms < 60_000) return "Ends soon";
  const min = Math.floor(ms / 60_000);
  const days = Math.floor(min / 1440);
  if (days >= 2) return `Ends in ${days} days`;
  const h = Math.floor(min / 60);
  if (h >= 1) return `Ends in ${h} h ${min % 60} min`;
  return `Ends in ${min} min`;
}

/** What /api/promo/ sends: the live sale with its words filled in, or null. */
export interface LivePromo {
  id: string;
  emoji: string;
  headline: string;
  body: string;
  code: string;
  link: string;
  linkLabel: string;
  endsAt: number;
}
