import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG9_UNITS } from "../alabama/units/social-g9";
import { units as albertaG6Math_units } from "../alberta/g6-math";
import { units as albertaG6Science_units } from "../alberta/g6-science";
import { LANGUAGE_6 as californiaUnitsLanguageG6_LANGUAGE_6 } from "../california/units/language-g6";
import { MATH_6 as californiaUnitsMathG6_MATH_6 } from "../california/units/math-g6";
import { SOCIAL_7 as californiaUnitsSocialG7_SOCIAL_7 } from "../california/units/social-g7";
import { course as gradesG7Science_course } from "../grades/g7/science";
import { course as gradesG7Social_course } from "../grades/g7/social";
import { course as gradesG8Social_course } from "../grades/g8/social";
import { UNITS as newYorkUnitsSocialG5_UNITS } from "../new-york/units/social-g5";
import { units as ontarioG6Language_units } from "../ontario/g6-language";
import { units as ontarioG6Math_units } from "../ontario/g6-math";
import { units as ontarioG6Science_units } from "../ontario/g6-science";
import { units as ontarioG7Science_units } from "../ontario/g7-science";
import { OWN_SOCIAL_7 as oregonUnitsSocialG67_OWN_SOCIAL_7 } from "../oregon/units/social-g67";
import { peHumanRights6 as princeEdwardIslandUnitsG6WorldScience_peHumanRights6 } from "../prince-edward-island/units/g6-world-science";
import { RML_6 as washingtonUnitsLanguageRmlUpper_RML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpelling_SPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonUnitsMathUpper_G6_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68_SCIENCE_6 } from "../washington/units/science-68";
import { G6 as washingtonUnitsSocial59G6_G6 } from "../washington/units/social-59-g6";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/g6";
import { OWN } from "./units/own-g6";

// Utah Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpper_G6_UNITS, ...californiaUnitsMathG6_MATH_6, ...ontarioG6Math_units, ...albertaG6Math_units],
  language: [...washingtonUnitsLanguageRmlUpper_RML_6, ...californiaUnitsLanguageG6_LANGUAGE_6, ...ontarioG6Language_units, washingtonUnitsLanguageSpelling_SPELLING_6],
  science: [...ontarioG7Science_units, ...washingtonUnitsScience68_SCIENCE_6, ...gradesG7Science_course.units, ...albertaG6Science_units, ...ontarioG6Science_units],
  social: [...gradesG7Social_course.units, ...washingtonUnitsSocial59G6_G6, ...alabamaUnitsSocialG9_UNITS, princeEdwardIslandUnitsG6WorldScience_peHumanRights6, ...oregonUnitsSocialG67_OWN_SOCIAL_7, ...gradesG8Social_course.units, ...newYorkUnitsSocialG5_UNITS, ...californiaUnitsSocialG7_SOCIAL_7],
};

export const courses: Course[] = withLessons(utahGrade("6", POOL, OWN), LESSONS);
