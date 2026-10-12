// Plain-words verdict on an A/B test: which variant is ahead on paying families (the goal that matters most),
// and how likely it is to really be better than the control rather than chance. Uses the normal approximation to
// the difference of two proportions, which is fine at the sizes where it says anything.

export interface ResultRow {
  variant: string;
  families: number;
  paid: number;
  active: number;
}

export interface Verdict {
  /** The variant to use for everyone, or null while there isn't one. */
  leader: string | null;
  /** Chance (0 to 1) the leader really beats the control; null for the control or without enough data. */
  chance: number | null;
  /** Ready to call: enough families and at least 95% sure. */
  ready: boolean;
  message: string;
}

/** Families each variant needs before a verdict means much. */
export const MIN_FAMILIES = 30;

/** Standard normal cumulative distribution (Abramowitz and Stegun 26.2.17). */
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1 - p : p;
}

/** Chance that rate B is above rate A. */
export function chanceBetter(nA: number, xA: number, nB: number, xB: number): number | null {
  if (!nA || !nB) return null;
  const pA = xA / nA;
  const pB = xB / nB;
  const se = Math.sqrt((pA * (1 - pA)) / nA + (pB * (1 - pB)) / nB);
  if (se === 0) return pB > pA ? 1 : pB < pA ? 0 : 0.5;
  return normalCdf((pB - pA) / se);
}

const pct = (x: number) => `${Math.round(x * 100)}%`;

export function verdict(rows: ResultRow[], metric: "paid" | "active" = "paid"): Verdict {
  const control = rows[0];
  if (!control || rows.length < 2) return { leader: null, chance: null, ready: false, message: "Add a second variant to compare." };
  const small = rows.filter((r) => r.families < MIN_FAMILIES);
  if (small.length) return { leader: null, chance: null, ready: false, message: `Too early to call: each variant needs at least ${MIN_FAMILIES} families (${small.map((r) => `${r.variant} has ${r.families}`).join(", ")}).` };
  const rate = (r: ResultRow) => r[metric] / r.families;
  const best = rows.slice(1).reduce((b, r) => (rate(r) > rate(b) ? r : b), rows[1]);
  const what = metric === "paid" ? "paying" : "practising this week";
  if (rate(best) <= rate(control)) {
    const chance = chanceBetter(best.families, best[metric], control.families, control[metric]) ?? 0.5;
    return chance >= 0.95
      ? { leader: control.variant, chance, ready: true, message: `${control.variant} (the control) is ahead on families ${what}, and ${pct(chance)} likely to beat ${best.variant}. Keep the control.` }
      : { leader: null, chance: null, ready: false, message: `No variant beats the control on families ${what} yet.` };
  }
  const chance = chanceBetter(control.families, control[metric], best.families, best[metric]) ?? 0.5;
  return {
    leader: best.variant,
    chance,
    ready: chance >= 0.95,
    message:
      chance >= 0.95
        ? `${best.variant} is ahead: ${pct(rate(best))} of families ${what} against ${pct(rate(control))}, and ${pct(chance)} likely to really be better.`
        : `${best.variant} is ahead (${pct(rate(best))} against ${pct(rate(control))} ${what}), but only ${pct(chance)} likely to be better. Wait for more families.`,
  };
}
