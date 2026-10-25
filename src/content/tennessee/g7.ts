import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaG6Science_units } from "../alberta/g6-science";
import { units as albertaG7Math_units } from "../alberta/g7-math";
import { MATH_7 as californiaUnitsMathG7_MATH_7 } from "../california/units/math-g7";
import { OWN_SCIENCE as californiaUnitsScienceG7_OWN_SCIENCE } from "../california/units/science-g7";
import { SOCIAL_7 as californiaUnitsSocialG7_SOCIAL_7 } from "../california/units/social-g7";
import { course as gradesG6Science_course } from "../grades/g6/science";
import { course as gradesG8Science_course } from "../grades/g8/science";
import { course as gradesG8Social_course } from "../grades/g8/social";
import { wordRoots as manitobaUnitsG7Language_wordRoots } from "../manitoba/units/g7-language";
import { UNITS as newYorkUnitsSocialG5_UNITS } from "../new-york/units/social-g5";
import { UNITS as newYorkUnitsSocialG6_UNITS } from "../new-york/units/social-g6";
import { UNITS as newYorkUnitsSocialG9_UNITS } from "../new-york/units/social-g9";
import { courses as ontarioG7_courses } from "../ontario/g7";
import { courses as ontarioG9_courses } from "../ontario/g9";
import { SCIENCE_6 as oregonUnitsScience68_SCIENCE_6 } from "../oregon/units/science-68";
import { OWN_SOCIAL_7 as oregonUnitsSocialG67_OWN_SOCIAL_7 } from "../oregon/units/social-g67";
import { RML_7 as washingtonUnitsLanguageRmlUpper_RML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpelling_SPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonUnitsMathUpper_G7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonUnitsScience68_SCIENCE_7 } from "../washington/units/science-68";
import { SCIENCE_6 as washingtonUnitsScience68_SCIENCE_6 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68_SCIENCE_8 } from "../washington/units/science-68";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-g7";

// Tennessee Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpper_G7_UNITS, ...unitsOf(ontarioG7_courses, "math"), ...californiaUnitsMathG7_MATH_7, ...albertaG7Math_units],
  language: [...unitsOf(ontarioG7_courses, "language"), ...washingtonUnitsLanguageRmlUpper_RML_7, manitobaUnitsG7Language_wordRoots, washingtonUnitsLanguageSpelling_SPELLING_7],
  science: [...unitsOf(ontarioG7_courses, "science"), ...oregonUnitsScience68_SCIENCE_6, ...californiaUnitsScienceG7_OWN_SCIENCE, ...gradesG8Science_course.units, ...albertaG6Science_units, ...unitsOf(ontarioG9_courses, "science"), ...washingtonUnitsScience68_SCIENCE_7, ...washingtonUnitsScience68_SCIENCE_6, ...washingtonUnitsScience68_SCIENCE_8, ...gradesG6Science_course.units],
  social: [...californiaUnitsSocialG7_SOCIAL_7, ...gradesG8Social_course.units, ...newYorkUnitsSocialG6_UNITS, ...newYorkUnitsSocialG9_UNITS, ...newYorkUnitsSocialG5_UNITS, ...oregonUnitsSocialG67_OWN_SOCIAL_7],
};

export const courses: Course[] = tennesseeGrade("7", POOL, OWN);
