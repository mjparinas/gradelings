import type { Entry } from "../kit";

// Washington social studies, Grades 5 to 9: the units Washington uses from other frameworks ("<grade>/social").
// Most Washington courses here are Washington's own (units/social-upper.ts), because the grade themes (US history to
// 1791, the ancient world, Washington State, US history 1763–1877, civics) rarely match a Canadian grade.
export const PLAN_SOCIAL_UPPER: Record<string, Entry[]> = {
  "8/social": [
    ["mb-evidence-8", "adopt", "H3.6-8.4; SSS2.6-8.2; SSS4.6-8.1", "analyzing and interpreting historical sources, judging their reliability and drawing conclusions from evidence"],
    ["maps-graphs-8", "adopt", "G1.6-8.1; G1.6-8.6", "constructing and analyzing maps, graphs and other representations to explain relationships between places"],
  ],
};
