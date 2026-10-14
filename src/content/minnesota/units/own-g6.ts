import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as science } from "./science-g6";
import { UNITS as social } from "./social-g6";

/** Minnesota's own Grade 6 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: science },
  social: { units: social },
};
