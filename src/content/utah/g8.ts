import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7Science_units } from "../alberta/g7-science";
import { units as albertaG8Math_units } from "../alberta/g8-math";
import { LANGUAGE_8 as californiaUnitsLanguageG8_LANGUAGE_8 } from "../california/units/language-g8";
import { MATH_8 as californiaUnitsMathG8_MATH_8 } from "../california/units/math-g8";
import { OWN_SCIENCE as californiaUnitsScienceG6_OWN_SCIENCE } from "../california/units/science-g6";
import { OWN_SCIENCE as californiaUnitsScienceG7_OWN_SCIENCE } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaUnitsScienceG8_OWN_SCIENCE } from "../california/units/science-g8";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG6Science_course } from "../grades/g6/science";
import { units as manitobaUnitsG8MoreLanguage_units } from "../manitoba/units/g8-more-language";
import { MORE as newYorkUnitsScienceG8Signals_MORE } from "../new-york/units/science-g8-signals";
import { UNITS as newYorkUnitsSocialG9_UNITS } from "../new-york/units/social-g9";
import { units as ontarioG7Science_units } from "../ontario/g7-science";
import { units as ontarioG8Language_units } from "../ontario/g8-language";
import { units as ontarioG8Math_units } from "../ontario/g8-math";
import { units as ontarioG8Science_units } from "../ontario/g8-science";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguage_WEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { reconstruction8 as oregonUnitsSocialCopies_reconstruction8 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_8 as oregonUnitsSocialG8_OWN_SOCIAL_8 } from "../oregon/units/social-g8";
import { SOCIAL_8 as texasUnitsSocialG8_SOCIAL_8 } from "../texas/units/social-g8";
import { RML_8 as washingtonUnitsLanguageRmlUpper_RML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonUnitsMathUpper_G8_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonUnitsScience68_SCIENCE_7 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68_SCIENCE_8 } from "../washington/units/science-68";
import { G5 as washingtonUnitsSocial59G5_G5 } from "../washington/units/social-59-g5";
import { G6 as washingtonUnitsSocial59G6_G6 } from "../washington/units/social-59-g6";
import { G8 as washingtonUnitsSocial59G8_G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/g8";
import { OWN } from "./units/own-g8";

// Utah Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpper_G8_UNITS, ...ontarioG8Math_units, ...albertaG8Math_units, ...californiaUnitsMathG8_MATH_8],
  language: [...ontarioG8Language_units, ...californiaUnitsLanguageG8_LANGUAGE_8, oregonUnitsLanguage_WEIGH_THE_EVIDENCE, ...washingtonUnitsLanguageRmlUpper_RML_8, ...manitobaUnitsG8MoreLanguage_units],
  science: [...californiaUnitsScienceG7_OWN_SCIENCE, ...californiaUnitsScienceG6_OWN_SCIENCE, ...newYorkUnitsScienceG8Signals_MORE, ...washingtonUnitsScience68_SCIENCE_7, ...californiaUnitsScienceG8_OWN_SCIENCE, ...albertaG7Science_units, ...washingtonUnitsScience68_SCIENCE_8, ...gradesG6Science_course.units, ...ontarioG7Science_units, ...ontarioG8Science_units],
  social: [...californiaUnitsSocialG8_SOCIAL_8, ...washingtonUnitsSocial59G8_G8, ...washingtonUnitsSocial59G5_G5, oregonUnitsSocialCopies_reconstruction8, ...newYorkUnitsSocialG9_UNITS, ...oregonUnitsSocialG8_OWN_SOCIAL_8, ...texasUnitsSocialG8_SOCIAL_8, ...washingtonUnitsSocial59G6_G6, ...californiaUnitsSocialG5_SOCIAL_5],
};

export const courses: Course[] = withLessons(utahGrade("8", POOL, OWN), LESSONS);
