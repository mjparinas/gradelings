import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { COPIES_7 } from "./copies-g7";
import { SOCIAL_7 } from "./social-g7";

/** Arizona's own Grade 7 units: industry and empire, and copies of other states' modern world history units without their state questions. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  social: {
    units: [...SOCIAL_7, ...COPIES_7],
    order: [
      "ca-g7-science-enlightenment",
      "or-g7-age-of-revolutions",
      "az-g7-industry-and-empire",
      "az-g7-world-war-i",
      "az-g7-world-war-ii",
      "az-g7-cold-war",
      "az-g7-civil-rights",
      "az-g7-world-since-1945",
      "az-g7-population",
      "az-g7-economies",
    ],
  },
};
