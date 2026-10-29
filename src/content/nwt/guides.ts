import type { FrameworkGuides } from "../guides";
import { BC_GUIDES, localText } from "../grades/guides";

/**
 * The Northwest Territories is adopting the BC curriculum, adapted for the NWT, so its guides are BC's with NWT wording.
 */
const nwtText = <T,>(value: T): T => localText(value, "the NWT", "NWT", "NWT Education, Culture and Employment");

const bc = nwtText(BC_GUIDES);

export const NWT_GUIDES: FrameworkGuides = {
  ...bc,
  gradeNotes: {
    ...bc.gradeNotes,
    pk: {
      overview:
        "Junior Kindergarten is a free, play-based school year for four-year-olds in every NWT community. It follows the NWT's own JK/K curriculum, A Holistic Approach to Children's Early Learning: eleven competencies such as sense of identity, relationship with the land, communication and applied literacies in reading, writing and math.",
      lookFor:
        "Junior Kindergarten has no marks; teachers share what your child is exploring and how they are growing in each competency. Look for joining in, taking turns, naming feelings, rhyming, letters from your child's name and counting small groups.",
    },
  },
  assessment: {
    ...nwtText(BC_GUIDES.assessment),
    source: "NWT Education, Culture and Employment",
    intro:
      "The Foundation Skills Assessment is a check of reading, writing and numeracy that is being brought into NWT schools as the territory adopts BC's assessments (Grade 4 from 2024-25, Grade 7 from 2026-27). It is separate from the report card and from class marks. Check with your school for this year's schedule.",
  },
};
