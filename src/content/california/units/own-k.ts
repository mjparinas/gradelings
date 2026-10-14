import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { MATH_K } from "./math-gk";
import { LANGUAGE_K } from "./language-k";
import { SOCIAL_K } from "./social-k";

/** California's own Kindergarten units, including its copies of Washington and Oregon units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  math: { units: MATH_K },
  language: { units: LANGUAGE_K },
  social: { units: SOCIAL_K },
};
