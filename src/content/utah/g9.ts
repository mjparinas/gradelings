import type { Course } from "../types";
import type { Pool } from "../placement";
import { COPIES_8 as arizonaUnitsCopiesG8_COPIES_8 } from "../arizona/units/copies-g8";
import { LANGUAGE_9 as californiaUnitsLanguageG9_LANGUAGE_9 } from "../california/units/language-g9";
import { MATH_9 as californiaUnitsMathG9_MATH_9 } from "../california/units/math-g9";
import { OWN_SCIENCE as californiaUnitsScienceG9_OWN_SCIENCE } from "../california/units/science-g9";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9Physical_PHYSICAL_SCIENCE } from "../california/units/science-g9-physical";
import { SOCIAL_COPIES as coloradoUnitsCopiesG6_SOCIAL_COPIES } from "../colorado/units/copies-g6";
import { SOCIAL_COPIES as georgiaUnitsCopiesG7_SOCIAL_COPIES } from "../georgia/units/copies-g7";
import { SOCIAL_6 as georgiaUnitsSocialG67_SOCIAL_6 } from "../georgia/units/social-g67";
import { SOCIAL_7 as georgiaUnitsSocialG67_SOCIAL_7 } from "../georgia/units/social-g67";
import { units as manitobaUnitsG9MoreLanguage_units } from "../manitoba/units/g9-more-language";
import { units as manitobaUnitsG9Science_units } from "../manitoba/units/g9-science";
import { UNITS as minnesotaUnitsSocialG8_UNITS } from "../minnesota/units/social-g8";
import { UNITS as newYorkUnitsSocialG5_UNITS } from "../new-york/units/social-g5";
import { UNITS as newYorkUnitsSocialG6_UNITS } from "../new-york/units/social-g6";
import { units as ontarioG8Social_units } from "../ontario/g8-social";
import { units as ontarioG9Language_units } from "../ontario/g9-language";
import { units as ontarioG9Math_units } from "../ontario/g9-math";
import { units as ontarioG9Science_units } from "../ontario/g9-science";
import { MEDIA_ANALYSIS as oregonUnitsLanguage_MEDIA_ANALYSIS } from "../oregon/units/language";
import { SOCIAL_6 as texasUnitsSocialG6_SOCIAL_6 } from "../texas/units/social-g6";
import { RML_9 as washingtonUnitsLanguageRmlUpper_RML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonUnitsLanguageSpelling_SPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonUnitsMathUpper_G9_UNITS } from "../washington/units/math-upper";
import { G6 as washingtonUnitsSocial59G6_G6 } from "../washington/units/social-59-g6";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/g9";
import { OWN } from "./units/own-g9";

// Utah Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpper_G9_UNITS, ...californiaUnitsMathG9_MATH_9, ...ontarioG9Math_units],
  language: [...ontarioG9Language_units, ...californiaUnitsLanguageG9_LANGUAGE_9, ...manitobaUnitsG9MoreLanguage_units, oregonUnitsLanguage_MEDIA_ANALYSIS, washingtonUnitsLanguageSpelling_SPELLING_9, ...washingtonUnitsLanguageRmlUpper_RML_9],
  science: [...californiaUnitsScienceG9_OWN_SCIENCE, ...californiaUnitsScienceG9Physical_PHYSICAL_SCIENCE, ...manitobaUnitsG9Science_units, ...ontarioG9Science_units],
  social: [...georgiaUnitsSocialG67_SOCIAL_7, ...georgiaUnitsSocialG67_SOCIAL_6, ...georgiaUnitsCopiesG7_SOCIAL_COPIES, ...washingtonUnitsSocial59G6_G6, ...coloradoUnitsCopiesG6_SOCIAL_COPIES, ...minnesotaUnitsSocialG8_UNITS, ...newYorkUnitsSocialG6_UNITS, ...arizonaUnitsCopiesG8_COPIES_8, ...texasUnitsSocialG6_SOCIAL_6, ...newYorkUnitsSocialG5_UNITS, ...ontarioG8Social_units],
};

export const courses: Course[] = withLessons(utahGrade("9", POOL, OWN), LESSONS);
