import type { FrameworkGuides } from "../guides";
import { BC_GUIDES, localText } from "../grades/guides";

/**
 * The Northwest Territories is adopting the BC curriculum, adapted for the NWT, so its guides are BC's with NWT wording.
 */
const nwtText = <T,>(value: T): T => localText(value, "the NWT", "NWT", "NWT Education, Culture and Employment");

export const NWT_GUIDES: FrameworkGuides = {
  ...nwtText(BC_GUIDES),
  assessment: {
    ...nwtText(BC_GUIDES.assessment),
    source: "NWT Education, Culture and Employment",
    intro:
      "The Foundation Skills Assessment is a check of reading, writing and numeracy that is being brought into NWT schools as the territory adopts BC's assessments (Grade 4 from 2024-25, Grade 7 from 2026-27). It is separate from the report card and from class marks. Check with your school for this year's schedule.",
  },
};
