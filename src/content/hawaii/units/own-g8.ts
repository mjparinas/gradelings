import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES } from "./copies-g8";
import { SCIENCE_8 } from "./science-g8";

/** Hawaiʻi's own Grade 8 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_8, ...SCIENCE_COPIES] },
};
