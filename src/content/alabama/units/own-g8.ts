import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as science } from "./science-g8";
import { UNITS as social } from "./social-g8";

/** Alabama's own Grade 8 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  ...(science.length ? { science: { units: science } } : {}),
  ...(social.length ? { social: { units: social } } : {}),
};
