import type { PlaceQuestion } from "./types";

/** How many whole steps fit between min and max (the ticks are at min + i * step). */
export const placeTicks = (q: Pick<PlaceQuestion, "min" | "max" | "step">) => Math.round((q.max - q.min) / q.step);

/** A tick's label: a decimal, or a fraction (a mixed number past 1) when the question counts in equal parts. */
export function placeLabel(q: Pick<PlaceQuestion, "fractionDenominator">, value: number): string {
  if (q.fractionDenominator) {
    const den = q.fractionDenominator;
    const n = Math.round(value * den);
    if (n % den === 0) return String(n / den);
    return n > den ? `${Math.floor(n / den)} ${n % den}/${den}` : `${n}/${den}`;
  }
  return String(Math.round(value * 1000) / 1000).replace("-", "\u2212");
}
