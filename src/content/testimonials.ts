import { APP_NAME } from "@/lib/brand";

// Quotes from parents for the home page. Only real quotes, given with permission, may be marked
// `sample: false`. A made-up quote must be marked `sample: true`: it then appears only in development
// and on preview deploys, never on the live site (`visibleQuotes`), because a made-up review shown as a
// real parent breaks Canada's Competition Act rules on testimonials. A parent with a tie to the company
// (staff, founder, family) is marked `connected` and says so in `about`, as the Competition Act and the
// FTC's endorsement rules require.

export interface ParentQuote {
  quote: string;
  /** First name and last initial, as the parent agreed. */
  name: string;
  /** Such as "Parent of a Grade 3 child, Ontario". */
  about: string;
  sample: boolean;
  /** The parent works for or is family of the company; `about` must say so. */
  connected?: boolean;
}

export const PARENT_QUOTES: ParentQuote[] = [
  {
    quote: "My son has ADHD, and this keeps his attention. It plays like a game, so he has fun while he learns. I think it's great.",
    name: "Melvin P.",
    about: `${APP_NAME} founder, parent of a Grade 2 child`,
    sample: false,
    connected: true,
  },
  {
    quote: "My son is in Kindergarten, and I'm impressed by how quickly he's picking things up and how well he's doing.",
    name: "Marufa",
    about: `Parent of a Kindergarten child, family of the ${APP_NAME} founder`,
    sample: false,
    connected: true,
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
