import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import { SCIENCE_COPIES_4 } from "./copies";
import { SCIENCE_4 } from "./science";
import { SOCIAL_4 } from "./social-g4";

/** Virginia's own Grade 4 units. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = {
  science: { units: [...SCIENCE_COPIES_4, ...SCIENCE_4] },
  social: {
    units: SOCIAL_4,
    // Virginia Studies in the order it is taught, with the two adopted units beside the standards they practise.
    order: [
      "va-g4-regions",
      "va-g4-first-peoples",
      "va-g4-jamestown",
      "va-g4-colonial-virginia",
      "wa-g5-road-to-revolution",
      "va-g4-revolution",
      "va-g4-new-nation",
      "va-g4-civil-war",
      "or-g8-reconstruction",
      "va-g4-reconstruction",
      "va-g4-modern-virginia",
      "va-g4-virginia-today",
      "va-g4-timeline",
    ],
  },
};
