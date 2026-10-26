import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { LANGUAGE_COPIES, SCIENCE_COPIES } from "./copies-g7";
import { SCIENCE_7 } from "./science-g7";

/** Nebraska's own Grade 7 units. Grade 7 social studies (World Studies II) is all adopted (see ../plan/social.ts). */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_7, ...SCIENCE_COPIES] },
  language: { units: LANGUAGE_COPIES },
};
