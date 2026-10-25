import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaG6Math_units } from "../alberta/g6-math";
import { LANGUAGE_6 as californiaUnitsLanguageG6_LANGUAGE_6 } from "../california/units/language-g6";
import { MATH_6 as californiaUnitsMathG6_MATH_6 } from "../california/units/math-g6";
import { OWN_SCIENCE as californiaUnitsScienceG6_OWN_SCIENCE } from "../california/units/science-g6";
import { SOCIAL_6 as californiaUnitsSocialG6_SOCIAL_6 } from "../california/units/social-g6";
import { SOCIAL_7 as californiaUnitsSocialG7_SOCIAL_7 } from "../california/units/social-g7";
import { course as gradesG7Social_course } from "../grades/g7/social";
import { UNITS as newYorkUnitsSocialG6_UNITS } from "../new-york/units/social-g6";
import { courses as ontarioG6_courses } from "../ontario/g6";
import { courses as ontarioG7_courses } from "../ontario/g7";
import { RML_6 as washingtonUnitsLanguageRmlUpper_RML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpelling_SPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonUnitsMathUpper_G6_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68_SCIENCE_6 } from "../washington/units/science-68";
import { SCIENCE_7 as washingtonUnitsScience68_SCIENCE_7 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68_SCIENCE_8 } from "../washington/units/science-68";
import { G6 as washingtonUnitsSocial59G6_G6 } from "../washington/units/social-59-g6";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-g6";

// Tennessee Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpper_G6_UNITS, ...californiaUnitsMathG6_MATH_6, ...unitsOf(ontarioG6_courses, "math"), ...albertaG6Math_units],
  language: [...unitsOf(ontarioG6_courses, "language"), ...californiaUnitsLanguageG6_LANGUAGE_6, ...washingtonUnitsLanguageRmlUpper_RML_6, washingtonUnitsLanguageSpelling_SPELLING_6],
  science: [...washingtonUnitsScience68_SCIENCE_6, ...unitsOf(ontarioG7_courses, "science"), ...washingtonUnitsScience68_SCIENCE_7, ...californiaUnitsScienceG6_OWN_SCIENCE, ...washingtonUnitsScience68_SCIENCE_8],
  social: [...californiaUnitsSocialG6_SOCIAL_6, ...washingtonUnitsSocial59G6_G6, ...gradesG7Social_course.units, ...newYorkUnitsSocialG6_UNITS, ...californiaUnitsSocialG7_SOCIAL_7],
};

export const courses: Course[] = tennesseeGrade("6", POOL, OWN);
