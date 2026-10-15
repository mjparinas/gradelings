import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_5 } from "./science-g5";

/** Alaska's own Grade 5 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: SCIENCE_5 },
};
