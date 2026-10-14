import type { FrameworkGuides } from "../guides";
import { BC_GUIDES, localText } from "../grades/guides";

/**
 * Yukon implements the BC curriculum, so its guides are BC's with the Yukon's wording: the same scale, Core
 * Competencies, Foundation Skills Assessment and French programs, described for Yukon families.
 */
const yukonText = <T,>(value: T): T => localText(value, "Yukon", "Yukon", "Yukon Education");

export const YUKON_GUIDES: FrameworkGuides = {
  ...yukonText(BC_GUIDES),
  assessment: {
    ...yukonText(BC_GUIDES.assessment),
    source: "Yukon Education",
    intro:
      "The Foundation Skills Assessment is an annual check of reading, writing and numeracy that students in Grades 4 and 7 write in Yukon schools. It is set by the BC Ministry of Education and Child Care and is separate from the report card and from class marks.",
  },
};
