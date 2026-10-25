import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Science_units } from "../alberta/g6-science";
import { units as albertaG7Math_units } from "../alberta/g7-math";
import { units as albertaG7Science_units } from "../alberta/g7-science";
import { REWRITE_7 as californiaUnitsMathG7_REWRITE_7 } from "../california/units/math-g7";
import { TRIANGLES_SLICES_7 as californiaUnitsMathG7_TRIANGLES_SLICES_7 } from "../california/units/math-g7";
import { OWN_SCIENCE as californiaUnitsScienceG7_OWN_SCIENCE } from "../california/units/science-g7";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG6Science_course } from "../grades/g6/science";
import { wordRoots as manitobaUnitsG7Language_wordRoots } from "../manitoba/units/g7-language";
import { units as ontarioG7Language_units } from "../ontario/g7-language";
import { units as ontarioG7Math_units } from "../ontario/g7-math";
import { units as ontarioG7Science_units } from "../ontario/g7-science";
import { reconstruction8 as oregonUnitsSocialCopies_reconstruction8 } from "../oregon/units/social-copies";
import { RML_7 as washingtonUnitsLanguageRmlUpper_RML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpelling_SPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonUnitsMathUpper_G7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonUnitsScience68_SCIENCE_7 } from "../washington/units/science-68";
import { withLessons } from "../lessons";
import { louisianaGrade } from "./kit";
import { LESSONS } from "./lessons/g7";
import { OWN } from "./units/own-g7";

// Louisiana Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Louisiana's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG7Math_units, ...albertaG7Math_units, ...washingtonUnitsMathUpper_G7_UNITS, californiaUnitsMathG7_REWRITE_7, californiaUnitsMathG7_TRIANGLES_SLICES_7],
  language: [...ontarioG7Language_units, manitobaUnitsG7Language_wordRoots, ...washingtonUnitsLanguageRmlUpper_RML_7, washingtonUnitsLanguageSpelling_SPELLING_7],
  science: [...gradesG6Science_course.units, ...ontarioG7Science_units, ...albertaG7Science_units, ...washingtonUnitsScience68_SCIENCE_7, ...albertaG6Science_units, ...californiaUnitsScienceG7_OWN_SCIENCE],
  social: [...californiaUnitsSocialG8_SOCIAL_8, oregonUnitsSocialCopies_reconstruction8],
};

export const courses: Course[] = withLessons(louisianaGrade("7", POOL, OWN), LESSONS);
