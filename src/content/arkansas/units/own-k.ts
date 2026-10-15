import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as social } from "./social-k";

/** Arkansas's own Kindergarten units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  ...(social.length ? { social: { units: social } } : {}),
};
