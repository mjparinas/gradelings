import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as math } from "./math-g8";
import { UNITS as language } from "./language-g8";
import { UNITS as science } from "./science-g8";
import { UNITS as social } from "./social-g8";

/** New York's own Grade 8 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: math },
  language: { units: language },
  science: { units: science },
  social: { units: social },
};
