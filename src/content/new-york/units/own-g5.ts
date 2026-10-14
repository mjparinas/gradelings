import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as math } from "./math-g5";
import { UNITS as language } from "./language-g5";
import { UNITS as science } from "./science-g5";
import { UNITS as social } from "./social-g5";

/** New York's own Grade 5 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: math },
  language: { units: language },
  science: { units: science },
  social: { units: social },
};
