import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as social } from "./social-g2";

/** Minnesota's own Grade 2 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: social },
};
