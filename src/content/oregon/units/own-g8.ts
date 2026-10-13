import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { OWN_SOCIAL_8 } from "./social-g8";
import { SCIENCE_COPIES } from "./science-copies";
import { WEIGH_THE_EVIDENCE } from "./language";
import { reconstruction8 } from "./social-copies";

/** Oregon-only units in Grade 8, by subject. Each grade has its own file so a grade's download carries only its own units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  language: { units: [WEIGH_THE_EVIDENCE] },
  science: { units: SCIENCE_COPIES["8"] ?? [] },
  social: { units: [...OWN_SOCIAL_8, reconstruction8] },
};
