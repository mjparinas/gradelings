import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_7 } from "./science-g7";

/** Alaska's own Grade 7 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_7 },
};
