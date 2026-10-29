import type { FrameworkGuides } from "../guides";
import { BC_GUIDES, localText } from "../grades/guides";

/**
 * Yukon implements the BC curriculum, so its guides are BC's with the Yukon's wording: the same scale, Core
 * Competencies, Foundation Skills Assessment and French programs, described for Yukon families.
 */
const yukonText = <T,>(value: T): T => localText(value, "Yukon", "Yukon", "Yukon Education");

const bc = yukonText(BC_GUIDES);

export const YUKON_GUIDES: FrameworkGuides = {
  ...bc,
  gradeNotes: {
    ...bc.gradeNotes,
    pk: {
      overview:
        "Early Kindergarten is an optional, play-based school year for four-year-olds, offered in most rural Yukon schools. It follows the BC Kindergarten curriculum, informed by the BC Early Learning Framework: relationships, well-being and belonging, communication and literacies, and connection to land, culture and community.",
      lookFor:
        "Early Kindergarten has no marks; teachers share what your child is exploring. Notice counting, rhyming, letters from your child's name, curiosity about animals and weather, and how they share and name feelings.",
    },
  },
  assessment: {
    ...yukonText(BC_GUIDES.assessment),
    source: "Yukon Education",
    intro:
      "The Foundation Skills Assessment is an annual check of reading, writing and numeracy that students in Grades 4 and 7 write in Yukon schools. It is set by the BC Ministry of Education and Child Care and is separate from the report card and from class marks.",
  },
};
