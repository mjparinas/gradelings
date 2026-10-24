import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaG8Math_units } from "../alberta/g8-math";
import { LANGUAGE_8 as californiaUnitsLanguageG8_LANGUAGE_8 } from "../california/units/language-g8";
import { MATH_8 as californiaUnitsMathG8_MATH_8 } from "../california/units/math-g8";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG6Science_course } from "../grades/g6/science";
import { course as gradesG7Science_course } from "../grades/g7/science";
import { units as manitobaUnitsG8MoreLanguage_units } from "../manitoba/units/g8-more-language";
import { UNITS as newYorkUnitsScienceG8_UNITS } from "../new-york/units/science-g8";
import { courses as ontarioG7_courses } from "../ontario/g7";
import { courses as ontarioG8_courses } from "../ontario/g8";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguage_WEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { reconstruction8 as oregonUnitsSocialCopies_reconstruction8 } from "../oregon/units/social-copies";
import { RML_8 as washingtonUnitsLanguageRmlUpper_RML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonUnitsMathUpper_G8_UNITS } from "../washington/units/math-upper";
import { SCIENCE_8 as washingtonUnitsScience68_SCIENCE_8 } from "../washington/units/science-68";
import { SCIENCE_7 as washingtonUnitsScience68_SCIENCE_7 } from "../washington/units/science-68";
import { G8 as washingtonUnitsSocial59G8_G8 } from "../washington/units/social-59-g8";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-g8";

// Tennessee Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpper_G8_UNITS, ...unitsOf(ontarioG8_courses, "math"), ...albertaG8Math_units, ...californiaUnitsMathG8_MATH_8, ...unitsOf(ontarioG7_courses, "math")],
  language: [...unitsOf(ontarioG8_courses, "language"), ...californiaUnitsLanguageG8_LANGUAGE_8, oregonUnitsLanguage_WEIGH_THE_EVIDENCE, ...manitobaUnitsG8MoreLanguage_units, ...washingtonUnitsLanguageRmlUpper_RML_8],
  science: [...washingtonUnitsScience68_SCIENCE_8, ...gradesG7Science_course.units, ...newYorkUnitsScienceG8_UNITS, ...washingtonUnitsScience68_SCIENCE_7, ...gradesG6Science_course.units],
  social: [...californiaUnitsSocialG5_SOCIAL_5, ...californiaUnitsSocialG8_SOCIAL_8, oregonUnitsSocialCopies_reconstruction8, ...washingtonUnitsSocial59G8_G8],
};

export const courses: Course[] = tennesseeGrade("8", POOL, OWN);
