import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_2 } from "./copies-g2";

/** Arizona's own Grade 2 units: copies of other states' map and biography units with Arizona items. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: COPIES_2 },
};
