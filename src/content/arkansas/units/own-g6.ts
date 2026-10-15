import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { UNITS as science } from "./science-g6";

/** Arkansas's own Grade 6 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  ...(science.length ? { science: { units: science } } : {}),
};
