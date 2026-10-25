import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_COPIES } from "./copies-g7";
import { SCIENCE_7 } from "./science-g7";

/** North Carolina's own Grade 7 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: LANGUAGE_COPIES },
  science: { units: SCIENCE_7 },
};
