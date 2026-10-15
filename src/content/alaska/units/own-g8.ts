import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_8 } from "./science-g8";

/** Alaska's own Grade 8 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_8 },
};
