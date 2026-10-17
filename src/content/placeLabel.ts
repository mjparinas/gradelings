import type { PlaceQuestion } from "./types";

/** How many whole steps fit between min and max (the ticks are at min + i * step). */
export const placeTicks = (q: Pick<PlaceQuestion, "min" | "max" | "step">) => Math.round((q.max - q.min) / q.step);

/** A tick's label: a decimal, or a fraction when the question counts in equal parts. */
export function placeLabel(q: Pick<PlaceQuestion, "fractionDenominator">, value: number): string {
  if (q.fractionDenominator) {
    const n = Math.round(value * q.fractionDenominator);
    return n === 0 ? "0" : n === q.fractionDenominator ? "1" : `${n}/${q.fractionDenominator}`;
  }
  return String(Math.round(value * 1000) / 1000);
}
