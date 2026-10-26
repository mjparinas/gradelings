import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";

/** Mississippi has no own units in Grade 5: every course is built from shared and adopted units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {};
