import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_K } from "./copies-k";

/** Arizona's own Kindergarten units: copies of other states' symbols and stories units with Arizona items. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: COPIES_K },
};
