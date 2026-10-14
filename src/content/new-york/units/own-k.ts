import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as math } from "./math-k";
import { UNITS as language } from "./language-k";
import { UNITS as science } from "./science-k";
import { UNITS as social } from "./social-k";

/** New York's own Kindergarten units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: math },
  language: { units: language },
  science: { units: science },
  social: { units: social },
};
