import { parseUnitKey } from "@/content";
import type { AppEvent } from "./model";

// Short help videos for a child who has missed a question twice (flag `video-help`, members only). The list is
// small and lives in code; the files are in public/videos/help/. See docs/video-help/README.md.

export interface HelpVideo {
  id: string;
  title: string;
  /** Length in seconds, 30 to 90 for a real video. */
  seconds: number;
  src: string;
  captions: string;
}

/** Videos by unit key (`<grade>/<subject>/<unit id>`). Shared units share the video, so it names no region or money. */
export const HELP_VIDEOS: Record<string, HelpVideo> = {
  "3/math/fractions": {
    id: "fractions-equal-parts",
    title: "What a fraction is",
    seconds: 47,
    src: "/videos/help/fractions-equal-parts.mp4",
    captions: "/videos/help/fractions-equal-parts.vtt",
  },
  "3/math/multiplication": {
    id: "multiplication-equal-groups",
    title: "Multiplying with equal groups",
    seconds: 44,
    src: "/videos/help/multiplication-equal-groups.mp4",
    captions: "/videos/help/multiplication-equal-groups.vtt",
  },
  "3/math/division": {
    id: "division-sharing-equally",
    title: "Dividing means sharing equally",
    seconds: 30,
    src: "/videos/help/division-sharing-equally.mp4",
    captions: "/videos/help/division-sharing-equally.vtt",
  },
  "2/math/tens-and-ones": {
    id: "tens-and-ones",
    title: "Tens and ones",
    seconds: 32,
    src: "/videos/help/tens-and-ones.mp4",
    captions: "/videos/help/tens-and-ones.vtt",
  },
  "5/math/equivalent-fractions": {
    id: "equivalent-fractions",
    title: "Equivalent fractions",
    seconds: 34,
    src: "/videos/help/equivalent-fractions.mp4",
    captions: "/videos/help/equivalent-fractions.vtt",
  },
  "4/math/decimals": {
    id: "decimals-tenths",
    title: "Tenths as decimals",
    seconds: 31,
    src: "/videos/help/decimals-tenths.mp4",
    captions: "/videos/help/decimals-tenths.vtt",
  },
  "5/math/area-and-perimeter": {
    id: "area-square-units",
    title: "Finding area",
    seconds: 33,
    src: "/videos/help/area-square-units.mp4",
    captions: "/videos/help/area-square-units.vtt",
  },
  "6/math/percents-and-budgets": {
    id: "percent-out-of-100",
    title: "What percent means",
    seconds: 33,
    src: "/videos/help/percent-out-of-100.mp4",
    captions: "/videos/help/percent-out-of-100.vtt",
  },
  "1/math/make-ten": {
    id: "make-ten",
    title: "Making ten",
    seconds: 32,
    src: "/videos/help/make-ten.mp4",
    captions: "/videos/help/make-ten.vtt",
  },
  "1/math/adding": {
    id: "adding-put-together",
    title: "Adding means putting together",
    seconds: 40,
    src: "/videos/help/adding-put-together.mp4",
    captions: "/videos/help/adding-put-together.vtt",
  },
  "1/math/take-away": {
    id: "take-away-how-many-left",
    title: "Taking away",
    seconds: 34,
    src: "/videos/help/take-away-how-many-left.mp4",
    captions: "/videos/help/take-away-how-many-left.vtt",
  },
  "2/math/patterns": {
    id: "skip-counting",
    title: "Skip counting",
    seconds: 35,
    src: "/videos/help/skip-counting.mp4",
    captions: "/videos/help/skip-counting.vtt",
  },
  "3/math/time": {
    id: "telling-time",
    title: "Telling time",
    seconds: 41,
    src: "/videos/help/telling-time.mp4",
    captions: "/videos/help/telling-time.vtt",
  },
  "4/math/times-tables": {
    id: "times-tables-tricks",
    title: "Tricks for fives and nines",
    seconds: 45,
    src: "/videos/help/times-tables-tricks.mp4",
    captions: "/videos/help/times-tables-tricks.vtt",
  },
  "3/math/numbers-to-1000": {
    id: "hundreds-tens-ones",
    title: "Hundreds, tens and ones",
    seconds: 40,
    src: "/videos/help/hundreds-tens-ones.mp4",
    captions: "/videos/help/hundreds-tens-ones.vtt",
  },
  "4/math/numbers-to-10000": {
    id: "rounding",
    title: "Rounding numbers",
    seconds: 42,
    src: "/videos/help/rounding.mp4",
    captions: "/videos/help/rounding.vtt",
  },
  "4/math/fractions": {
    id: "comparing-fractions",
    title: "Comparing fractions",
    seconds: 41,
    src: "/videos/help/comparing-fractions.mp4",
    captions: "/videos/help/comparing-fractions.vtt",
  },
  "5/math/divide": {
    id: "division-remainders",
    title: "Division with a remainder",
    seconds: 32,
    src: "/videos/help/division-remainders.mp4",
    captions: "/videos/help/division-remainders.vtt",
  },
  "6/math/mixed-numbers-and-ratios": {
    id: "ratios",
    title: "What a ratio is",
    seconds: 34,
    src: "/videos/help/ratios.mp4",
    captions: "/videos/help/ratios.vtt",
  },
  "6/math/equations": {
    id: "order-of-operations",
    title: "Order of operations",
    seconds: 44,
    src: "/videos/help/order-of-operations.mp4",
    captions: "/videos/help/order-of-operations.vtt",
  },
  "7/math/integer-add-subtract": {
    id: "negative-numbers",
    title: "Adding with negative numbers",
    seconds: 42,
    src: "/videos/help/negative-numbers.mp4",
    captions: "/videos/help/negative-numbers.vtt",
  },
  "7/math/two-step-equations": {
    id: "two-step-equations",
    title: "Solving two-step equations",
    seconds: 36,
    src: "/videos/help/two-step-equations.mp4",
    captions: "/videos/help/two-step-equations.vtt",
  },
  "1/math/numbers-to-20": {
    id: "teen-numbers",
    title: "Numbers from 11 to 19",
    seconds: 34,
    src: "/videos/help/teen-numbers.mp4",
    captions: "/videos/help/teen-numbers.vtt",
  },
  "2/math/adding-to-100": {
    id: "adding-to-100",
    title: "Adding bigger numbers",
    seconds: 36,
    src: "/videos/help/adding-to-100.mp4",
    captions: "/videos/help/adding-to-100.vtt",
  },
  "2/math/facts-to-20": {
    id: "facts-to-20-bridge",
    title: "Adding past ten",
    seconds: 37,
    src: "/videos/help/facts-to-20-bridge.mp4",
    captions: "/videos/help/facts-to-20-bridge.vtt",
  },
  "2/math/measuring": {
    id: "measuring-centimetres",
    title: "Measuring with a ruler",
    seconds: 34,
    src: "/videos/help/measuring-centimetres.mp4",
    captions: "/videos/help/measuring-centimetres.vtt",
  },
  "3/math/add-subtract-1000": {
    id: "adding-1000-regrouping",
    title: "Adding big numbers",
    seconds: 40,
    src: "/videos/help/adding-1000-regrouping.mp4",
    captions: "/videos/help/adding-1000-regrouping.vtt",
  },
  "4/math/multiply-divide": {
    id: "multiply-partial-products",
    title: "Multiplying bigger numbers",
    seconds: 36,
    src: "/videos/help/multiply-partial-products.mp4",
    captions: "/videos/help/multiply-partial-products.vtt",
  },
  "5/math/multiply": {
    id: "multiply-two-digits",
    title: "Multiplying by two digits",
    seconds: 35,
    src: "/videos/help/multiply-two-digits.mp4",
    captions: "/videos/help/multiply-two-digits.vtt",
  },
  "5/math/decimals": {
    id: "hundredths",
    title: "Hundredths",
    seconds: 42,
    src: "/videos/help/hundredths.mp4",
    captions: "/videos/help/hundredths.vtt",
  },
  "6/math/decimal-multiply-divide": {
    id: "multiplying-decimals",
    title: "Multiplying decimals",
    seconds: 39,
    src: "/videos/help/multiplying-decimals.mp4",
    captions: "/videos/help/multiplying-decimals.vtt",
  },
  "6/math/perimeter-and-area": {
    id: "triangle-area",
    title: "Area of a triangle",
    seconds: 34,
    src: "/videos/help/triangle-area.mp4",
    captions: "/videos/help/triangle-area.vtt",
  },
  "7/math/fractions-decimals-percents": {
    id: "fraction-decimal-percent",
    title: "Fractions, decimals and percents",
    seconds: 39,
    src: "/videos/help/fraction-decimal-percent.mp4",
    captions: "/videos/help/fraction-decimal-percent.vtt",
  },
  "8/math/pythagorean-theorem": {
    id: "pythagorean-theorem",
    title: "The Pythagorean theorem",
    seconds: 43,
    src: "/videos/help/pythagorean-theorem.mp4",
    captions: "/videos/help/pythagorean-theorem.vtt",
  },
  "8/math/squares-and-roots": {
    id: "squares-and-roots",
    title: "Squares and square roots",
    seconds: 36,
    src: "/videos/help/squares-and-roots.mp4",
    captions: "/videos/help/squares-and-roots.vtt",
  },
  "9/math/exponent-laws": {
    id: "exponent-product-rule",
    title: "Multiplying powers",
    seconds: 35,
    src: "/videos/help/exponent-product-rule.mp4",
    captions: "/videos/help/exponent-product-rule.vtt",
  },
};

export function helpVideoFor(unitKey: string): HelpVideo | undefined {
  return HELP_VIDEOS[unitKey];
}

export const VIDEO_DAYS = 30;
/** The next answer on the same unit counts as "after the video" only within this long. */
const FOLLOW_MS = 24 * 3_600_000;

export interface VideoStats {
  /** Videos watched in the last `VIDEO_DAYS` days. */
  watched: number;
  /** Of those, how many were followed by an answer on the same unit, and how many of those were right on the first try. */
  followed: number;
  right: number;
  /** Units watched, most recent first. */
  units: string[];
}

/** What one child did with help videos lately. Read from events only; practice, not a report-card mark. */
export function videoStats(events: AppEvent[], profileId: string, now: number, resetAt = 0): VideoStats {
  const since = Math.max(now - VIDEO_DAYS * 86_400_000, resetAt);
  const mine = events.filter((e) => e.profileId === profileId && e.t > resetAt).sort((a, b) => a.t - b.t);
  const out: VideoStats = { watched: 0, followed: 0, right: 0, units: [] };
  const seen = new Set<string>();
  for (let i = 0; i < mine.length; i++) {
    const v = mine[i];
    if (v.type !== "video" || v.t <= since || seen.has(v.id) || !parseUnitKey(v.unit)) continue;
    seen.add(v.id);
    out.watched++;
    out.units.unshift(v.unit);
    const next = mine.slice(i + 1).find((e) => e.type === "answer" && e.unit === v.unit && !e.fact);
    if (next && next.type === "answer" && next.t - v.t <= FOLLOW_MS) {
      out.followed++;
      if (next.correct) out.right++;
    }
  }
  out.units = [...new Set(out.units)];
  return out;
}
