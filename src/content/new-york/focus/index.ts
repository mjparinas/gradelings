import { FOCUS_LANGUAGE } from "./language";
import { FOCUS_MATH } from "./math";
import { FOCUS_SCIENCE } from "./science";
import { FOCUS_SOCIAL } from "./social";

// What each New York course focuses on, shown to parents as the course overview ("Focus areas"). Written in the app's
// house style; New York families see it in US English.
export const FOCUS: Record<string, string[]> = {
  ...FOCUS_MATH,
  ...FOCUS_LANGUAGE,
  ...FOCUS_SCIENCE,
  ...FOCUS_SOCIAL,
};
