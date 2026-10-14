import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as social } from "./social-g9";

/** Minnesota's own Grade 9 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: social },
};
