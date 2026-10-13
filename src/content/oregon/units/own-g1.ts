import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { OWN_SOCIAL_1 } from "./social-k3";
import { SCIENCE_COPIES } from "./science-copies";
import { STORY_OR_FACTS } from "./language-reading";

/** Oregon-only units in Grade 1, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: [STORY_OR_FACTS] },
  science: { units: SCIENCE_COPIES["1"] ?? [] },
  social: { units: OWN_SOCIAL_1 },
};
