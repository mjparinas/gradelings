import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES_6 } from "./copies";
import { SCIENCE_6 } from "./science";

/** Virginia's own Grade 6 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_COPIES_6, ...SCIENCE_6] },
};
