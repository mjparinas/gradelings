// Why families cancel, as Stripe's billing portal asks it (`cancellation_details.feedback` on the
// subscription). Only the reason is kept, never the optional comment, which is free text that could name
// a child; the comment stays in Stripe.

export const CANCEL_REASONS: Record<string, string> = {
  too_expensive: "Too expensive",
  unused: "Not using it enough",
  missing_features: "Missing something they need",
  too_complex: "Too hard to use",
  low_quality: "Not good enough",
  switched_service: "Switched to something else",
  customer_service: "Unhappy with support",
  other: "Something else",
};

/** A Stripe feedback value we know, or null for anything else (including none). */
export function cancelReason(feedback: unknown): string | null {
  return typeof feedback === "string" && feedback in CANCEL_REASONS ? feedback : null;
}

/** Chart rows, most common first, with each reason's share of the total. */
export function cancelReasonRows(counts: { reason: string; n: number }[]): { label: string; value: number; note: string }[] {
  const total = counts.reduce((s, c) => s + c.n, 0);
  return counts
    .filter((c) => c.n > 0 && CANCEL_REASONS[c.reason])
    .sort((a, b) => b.n - a.n)
    .map((c) => ({ label: CANCEL_REASONS[c.reason], value: c.n, note: `${Math.round((c.n / total) * 100)}%` }));
}
