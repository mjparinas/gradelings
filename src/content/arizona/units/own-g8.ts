import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_8 } from "./copies-g8";

/** Arizona's own Grade 8 units: copies of other states' resources, civics and economics units without their state questions. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: COPIES_8.filter((u) => u.id === "az-g8-resources-hazards") },
  social: { units: COPIES_8.filter((u) => u.id !== "az-g8-resources-hazards") },
};
