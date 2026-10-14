import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_4 } from "./copies-g4";

/** Arizona's own Grade 4 units: copies of Washington's energy and hazards units with Arizona items. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: COPIES_4 },
};
