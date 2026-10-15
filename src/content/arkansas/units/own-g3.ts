import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as social } from "./social-g3";

/** Arkansas's own Grade 3 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  ...(social.length ? { social: { units: social } } : {}),
};
