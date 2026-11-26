// The rules and the stored settings of the feature series (lib/featureSeries.ts has the emails). Pure, so the admin
// panel and tests can read them.

/** A family can join the series if it signed up this long before the owner switched it on (recent sign-ups start at email 1). */
export const SERIES_JOIN_GRACE_DAYS = 14;
/** The series stops reaching a family this long after it signed up, whatever is left. */
export const SERIES_WINDOW_DAYS = 100;
/** At most one email a day: this many hours between two tips, and a family signs up at least this long before its first. */
export const SERIES_MIN_GAP_HOURS = 20;
/** The series steps aside for any other email to the family (trial notice, weekly report, a nudge) in this many hours. */
export const SERIES_QUIET_HOURS = 20;
export const SERIES_DEFAULT_CAP = 100;
export const SERIES_MAX_CAP = 500;

export const FEATURE_SERIES = {
  name: "Feature tips",
  description: "One email a day to a parent after signing up, each about one feature of the app with a screenshot. Never the same email twice.",
} as const;

export interface SeriesConfig {
  on: boolean;
  dailyCap: number;
  onBy: string | null;
  onAt: number | null;
}

export const defaultSeriesConfig = (): SeriesConfig => ({ on: false, dailyCap: SERIES_DEFAULT_CAP, onBy: null, onAt: null });

export const validSeriesCap = (n: unknown): n is number => Number.isInteger(n) && (n as number) >= 1 && (n as number) <= SERIES_MAX_CAP;

export function parseSeriesConfig(raw: string | null): SeriesConfig {
  const base = defaultSeriesConfig();
  if (!raw) return base;
  try {
    const c = JSON.parse(raw) as Partial<SeriesConfig>;
    return { on: c.on === true, dailyCap: validSeriesCap(c.dailyCap) ? c.dailyCap : base.dailyCap, onBy: typeof c.onBy === "string" ? c.onBy : null, onAt: typeof c.onAt === "number" ? c.onAt : null };
  } catch {
    return base;
  }
}
