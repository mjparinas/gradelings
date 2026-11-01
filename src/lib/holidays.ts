import type { CountryCode } from "./country";

// Holiday themes: for a few weeks before each big holiday the kids' app and parent area wear a festive look
// (a tinted page, a ribbon along the top) and every character wears the holiday's hat or ears. It is read from
// the calendar day, so nothing is stored or synced, and it only changes how things look: scoring, content and
// the festivals in seasons.ts are untouched. (The seasonal festivals are about the seasons; these are the holidays.)
//
// To change a window, edit `windowDays` below (days before the holiday, counting the day itself). To add a
// holiday, add an entry here, a `html.holiday-<id>` block in globals.css and a hat in `HolidayHat`
// (CritterArt.tsx). Thanksgiving falls on a different day in Canada and the US, so it names its country.

export type HolidayId = "valentines" | "stpatricks" | "easter" | "halloween" | "thanksgiving" | "christmas";

export interface Holiday {
  id: HolidayId;
  name: string;
  emoji: string;
  /** How many days before the holiday the theme starts, counting the day itself (21 = three weeks). */
  windowDays: number;
  /** Where the date falls, as year, month (1-12) and day. */
  date: (year: number, country: CountryCode) => { month: number; day: number };
}

/** Western Easter Sunday (the Gregorian "computus" of Meeus, Jones and Butcher). */
export function easterSunday(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

/** The nth weekday (0 = Sunday) of a month: nthWeekday(2026, 10, 1, 2) is the second Monday of October. */
export function nthWeekday(year: number, month: number, weekday: number, n: number): number {
  const first = new Date(year, month - 1, 1).getDay();
  return 1 + ((weekday - first + 7) % 7) + (n - 1) * 7;
}

export const HOLIDAYS: Holiday[] = [
  { id: "valentines", name: "Valentine's Day", emoji: "💝", windowDays: 14, date: () => ({ month: 2, day: 14 }) },
  { id: "stpatricks", name: "St. Patrick's Day", emoji: "☘️", windowDays: 14, date: () => ({ month: 3, day: 17 }) },
  { id: "easter", name: "Easter", emoji: "🐰", windowDays: 18, date: (y) => easterSunday(y) },
  { id: "halloween", name: "Halloween", emoji: "🎃", windowDays: 21, date: () => ({ month: 10, day: 31 }) },
  {
    id: "thanksgiving",
    name: "Thanksgiving",
    emoji: "🍂",
    windowDays: 14,
    // Canada: second Monday of October. United States: fourth Thursday of November.
    date: (y, country) => (country === "US" ? { month: 11, day: nthWeekday(y, 11, 4, 4) } : { month: 10, day: nthWeekday(y, 10, 1, 2) }),
  },
  { id: "christmas", name: "Christmas", emoji: "🎄", windowDays: 21, date: () => ({ month: 12, day: 25 }) },
];

const DAY = 86_400_000;
const dayNumber = (year: number, month: number, day: number) => Math.round(Date.UTC(year, month - 1, day) / DAY);

/** The holiday whose window covers a day ("2026-12-10"), if any. The nearest one wins when two windows overlap. */
export function holidayOn(day: string, country: CountryCode = "CA", holidays: Holiday[] = HOLIDAYS): Holiday | null {
  const [y, m, d] = day.split("-").map(Number);
  if (!y || !m || !d) return null;
  const today = dayNumber(y, m, d);
  let best: { holiday: Holiday; left: number } | null = null;
  for (const holiday of holidays) {
    const { month, day: dom } = holiday.date(y, country);
    const left = dayNumber(y, month, dom) - today; // days until the holiday; 0 on the day
    if (left >= 0 && left < holiday.windowDays && (!best || left < best.left)) best = { holiday, left };
  }
  return best?.holiday ?? null;
}

// The holiday the app is wearing right now. Set by the store (a client-only module), so server-drawn
// pictures such as share cards never wear one.
let current: HolidayId | null = null;
export const currentHoliday = (): HolidayId | null => current;
export function setCurrentHoliday(id: HolidayId | null): void {
  current = id;
}
