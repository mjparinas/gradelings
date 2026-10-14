import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_9 } from "./copies-g9";
import { SOCIAL_9 } from "./social-g9";

/** Arizona's own Grade 9 units: Arizona government and the civics test. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: { units: [...COPIES_9, ...SOCIAL_9] },
};
