// Quotes from parents for the home page. Only real quotes, given with permission, may be marked
// `sample: false`. The sample quotes below are made up to show the layout: they appear in development
// and on preview deploys, never on the live site (`visibleQuotes`), because a made-up review shown as a
// real parent breaks Canada's Competition Act rules on testimonials. Replace them with real ones.

export interface ParentQuote {
  quote: string;
  /** First name and last initial, as the parent agreed. */
  name: string;
  /** Such as "Parent of a Grade 3 child, Ontario". */
  about: string;
  sample: boolean;
}

export const PARENT_QUOTES: ParentQuote[] = [
  {
    quote: "The report card finally makes sense. I can see which units she's still growing in and what to practise before the next conference.",
    name: "Priya S.",
    about: "Parent of a Grade 3 child, Ontario",
    sample: true,
  },
  {
    quote: "He asks to do his fifteen minutes so he can earn game time. The wrong-answer hints are gentle, so there are no tears.",
    name: "Daniel M.",
    about: "Parent of a Grade 1 child, British Columbia",
    sample: true,
  },
  {
    quote: "Two kids in two grades on one plan, and it works offline in the car. That sold me.",
    name: "Aisha K.",
    about: "Parent of children in Grades 2 and 5, Alberta",
    sample: true,
  },
  {
    quote: "The calm mode turned off the timers and the noise. My son can just focus on the math.",
    name: "Marie-Claire T.",
    about: "Parent of a Grade 4 child, Nova Scotia",
    sample: true,
  },
];

/**
 * The quotes a build may show. Real quotes always; sample quotes only in development, on Vercel preview
 * deploys, or when SHOW_SAMPLE_QUOTES=1, so a made-up quote can never reach the live site.
 */
export function visibleQuotes(env: Record<string, string | undefined> = process.env, quotes = PARENT_QUOTES): ParentQuote[] {
  const samplesOk = env.NODE_ENV === "development" || env.VERCEL_ENV === "preview" || env.SHOW_SAMPLE_QUOTES === "1";
  if (env.VERCEL_ENV === "production") return quotes.filter((q) => !q.sample);
  return quotes.filter((q) => !q.sample || samplesOk);
}
