import type { CountryCode } from "@/lib/country";
import { REGISTRY } from "./registry";
import type { FrameworkId, GradeId, SubjectId } from "./types";

// Everything that differs between provinces/states lives here: names, which
// grades exist, how report cards grade students, and the report-card guide.

export interface ProficiencyLevel {
  id: string;
  label: string;
  /** Official description, shown to parents. */
  description: string;
  /** A short, friendly version for kids. */
  kidLabel: string;
  icon: string;
  colour: string;
  /** What this usually looks like at home, in plain words. */
  atHome: string;
  /** How the report card records this level, if it uses marks (e.g. "B range" or "70–79%"). */
  marks?: string;
}

export interface ScoringScheme {
  id: string;
  name: string;
  /** Lowest to highest. */
  levels: ProficiencyLevel[];
  source: string;
  /**
   * True when the region's report card has no named levels for these grades, so the levels are our own practice steps.
   * Pages then never say the report card uses them.
   */
  practiceSteps?: boolean;
}

export interface ReportCardGuide {
  title: string;
  intro: string;
  facts: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export interface Framework {
  id: FrameworkId;
  /** URL slug, e.g. /curriculum/bc/ */
  slug: string;
  name: string;
  shortName: string;
  country: CountryCode;
  /** What the region is called in sentences, when not the country's usual word (the territories). */
  regionKind?: "territory";
  curriculumName: string;
  /** The place name used in sentences, e.g. "Ontario". */
  region: string;
  /** What this framework calls the big picture of a course, shown to parents. */
  overviewLabel: string;
  /** What this framework calls one learning standard, e.g. "Learning standard" or "Expectation". */
  standardLabel: string;
  /** Where the standards come from, shown on public pages. */
  sourceName: string;
  sourceUrl: string;
  grades: GradeId[];
  /** Subjects with content for this framework. */
  subjects: SubjectId[];
  scoringFor: (grade: GradeId) => ScoringScheme;
  reportCard: ReportCardGuide;
}

/** The frameworks offered to families, in the registry's order (./registry). */
export const FRAMEWORKS: Framework[] = REGISTRY.filter((m) => !m.upcoming).map((m) => m.framework);

/**
 * Frameworks being built but not offered yet (`upcoming` in their manifest). They have content and tests, but no
 * public pages, no place in the province pickers and no sitemap entries until they launch. getFramework still finds them.
 * Empty since Alabama launched (October 2026).
 * Empty since Illinois launched (October 2026).
 */
export const UPCOMING_FRAMEWORKS: Framework[] = REGISTRY.filter((m) => m.upcoming).map((m) => m.framework);

export const DEFAULT_FRAMEWORK: FrameworkId = "ca-bc";

export function getFramework(id: FrameworkId | string = DEFAULT_FRAMEWORK): Framework {
  return [...FRAMEWORKS, ...UPCOMING_FRAMEWORKS].find((f) => f.id === id || f.slug === id) ?? FRAMEWORKS[0];
}
