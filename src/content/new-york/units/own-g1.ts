import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as math } from "./math-g1";
import { UNITS as language } from "./language-g1";
import { UNITS as science } from "./science-g1";
import { UNITS as social } from "./social-g1";

/** New York's own Grade 1 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: math },
  language: { units: language },
  science: { units: science },
  social: { units: social },
};
