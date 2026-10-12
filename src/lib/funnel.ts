import type { Segment } from "./adminEmails";

// The admin panel's sign-up funnel: how far families who signed up in a period got, and the email group that
// reaches the families who stopped at each step.

export const FUNNEL_STEPS: { id: string; label: string; /** The group of families who reached the step before but not this one. */ segment: Segment | null; stuck: string }[] = [
  { id: "signed-up", label: "Signed up", segment: null, stuck: "" },
  { id: "confirmed", label: "Confirmed their email", segment: null, stuck: "Unconfirmed accounts can only get the confirmation email again (see To do)." },
  { id: "child", label: "Added a child", segment: "no-child", stuck: "Email the families who haven't added a child" },
  { id: "practised", label: "A child practised", segment: "never-practised", stuck: "Email the families whose children haven't practised" },
  { id: "regular", label: "Practised on 3 or more days", segment: "tried-few", stuck: "Email the families who tried it and stopped" },
  { id: "paying", label: "Paid", segment: "engaged-not-paying", stuck: "Email the families practising often but not paying" },
];

export const FUNNEL_PERIODS = [30, 90, 365] as const;
export type FunnelPeriod = (typeof FUNNEL_PERIODS)[number];

export interface FunnelStep {
  id: string;
  label: string;
  count: number;
  /** Share of sign-ups that reached this step, 0 to 1. */
  ofStart: number;
  /** Share of the step before that reached this one, 0 to 1 (1 for the first step). */
  ofPrevious: number;
}

export function funnelSteps(counts: number[]): FunnelStep[] {
  return FUNNEL_STEPS.map((s, i) => ({
    id: s.id,
    label: s.label,
    count: counts[i] ?? 0,
    ofStart: counts[0] ? (counts[i] ?? 0) / counts[0] : 0,
    ofPrevious: i === 0 ? 1 : counts[i - 1] ? (counts[i] ?? 0) / counts[i - 1] : 0,
  }));
}

/** The step that loses the biggest share of families, to point at first. Null with too few families to say. */
export function biggestDrop(steps: FunnelStep[]): FunnelStep | null {
  if ((steps[0]?.count ?? 0) < 5) return null;
  let worst: FunnelStep | null = null;
  for (const s of steps.slice(1)) if (steps[steps.indexOf(s) - 1].count && (!worst || s.ofPrevious < worst.ofPrevious)) worst = s;
  return worst;
}
