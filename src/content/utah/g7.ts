import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7Math_units } from "../alberta/g7-math";
import { MATH_7 as californiaUnitsMathG7_MATH_7 } from "../california/units/math-g7";
import { OWN_SCIENCE as californiaUnitsScienceG8_OWN_SCIENCE } from "../california/units/science-g8";
import { course as gradesG5Science_course } from "../grades/g5/science";
import { course as gradesG6Science_course } from "../grades/g6/science";
import { wordRoots as manitobaUnitsG7Language_wordRoots } from "../manitoba/units/g7-language";
import { motionForces as newBrunswickUnitsG8Science_motionForces } from "../new-brunswick/units/g8-science";
import { units as ontarioG7Language_units } from "../ontario/g7-language";
import { units as ontarioG7Math_units } from "../ontario/g7-math";
import { SCIENCE_7 as texasUnitsScience7_SCIENCE_7 } from "../texas/units/science-7";
import { RML_7 as washingtonUnitsLanguageRmlUpper_RML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpelling_SPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonUnitsMathUpper_G7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68_SCIENCE_6 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68_SCIENCE_8 } from "../washington/units/science-68";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/g7";
import { OWN } from "./units/own-g7";

// Utah Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpper_G7_UNITS, ...ontarioG7Math_units, ...californiaUnitsMathG7_MATH_7, ...albertaG7Math_units],
  language: [...washingtonUnitsLanguageRmlUpper_RML_7, ...ontarioG7Language_units, manitobaUnitsG7Language_wordRoots, washingtonUnitsLanguageSpelling_SPELLING_7],
  science: [...washingtonUnitsScience68_SCIENCE_8, newBrunswickUnitsG8Science_motionForces, ...californiaUnitsScienceG8_OWN_SCIENCE, ...texasUnitsScience7_SCIENCE_7, ...washingtonUnitsScience68_SCIENCE_6, ...gradesG5Science_course.units, ...gradesG6Science_course.units],
};

export const courses: Course[] = withLessons(utahGrade("7", POOL, OWN), LESSONS);
