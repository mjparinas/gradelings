import type { Course } from "../types";
import { type Pool } from "../placement";
import { withLessons } from "../lessons";
import { units as albertaG7Math_units } from "../alberta/g7-math";
import { units as albertaG7Science_units } from "../alberta/g7-science";
import { REWRITE_7 as californiaUnitsMathG7_REWRITE_7 } from "../california/units/math-g7";
import { OWN_SCIENCE as californiaUnitsScienceG6_OWN_SCIENCE } from "../california/units/science-g6";
import { OWN_SCIENCE as californiaUnitsScienceG7_OWN_SCIENCE } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaUnitsScienceG8_OWN_SCIENCE } from "../california/units/science-g8";
import { SOCIAL_9 as californiaUnitsSocialG9_SOCIAL_9 } from "../california/units/social-g9";
import { SOCIAL_COPIES as georgiaUnitsCopiesG7_SOCIAL_COPIES } from "../georgia/units/copies-g7";
import { SOCIAL_6 as georgiaUnitsSocialG67_SOCIAL_6 } from "../georgia/units/social-g67";
import { SOCIAL_7 as georgiaUnitsSocialG67_SOCIAL_7 } from "../georgia/units/social-g67";
import { course as gradesG6Science_course } from "../grades/g6/science";
import { wordRoots as manitobaUnitsG7Language_wordRoots } from "../manitoba/units/g7-language";
import { UNITS as newYorkUnitsSocialG6_UNITS } from "../new-york/units/social-g6";
import { units as ontarioG7Language_units } from "../ontario/g7-language";
import { units as ontarioG7Math_units } from "../ontario/g7-math";
import { units as ontarioG7Science_units } from "../ontario/g7-science";
import { units as ontarioG8Science_units } from "../ontario/g8-science";
import { units as ontarioG8Social_units } from "../ontario/g8-social";
import { RML_7 as washingtonUnitsLanguageRmlUpper_RML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpelling_SPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonUnitsMathUpper_G7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonUnitsScience68_SCIENCE_7 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68_SCIENCE_8 } from "../washington/units/science-68";
import { oklahomaGrade } from "./kit";
import { LESSONS } from "./lessons/g7";
import { OWN } from "./units/own-g7";

// Oklahoma Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for
// Oklahoma's own units, which ship in this download.
const POOL: Pool = {
  math: [...ontarioG7Math_units, ...albertaG7Math_units, ...washingtonUnitsMathUpper_G7_UNITS, californiaUnitsMathG7_REWRITE_7],
  language: [...ontarioG7Language_units, manitobaUnitsG7Language_wordRoots, ...washingtonUnitsLanguageRmlUpper_RML_7, washingtonUnitsLanguageSpelling_SPELLING_7],
  science: [...washingtonUnitsScience68_SCIENCE_7, ...gradesG6Science_course.units, ...californiaUnitsScienceG7_OWN_SCIENCE, ...washingtonUnitsScience68_SCIENCE_8, ...ontarioG8Science_units, ...ontarioG7Science_units, ...albertaG7Science_units, ...californiaUnitsScienceG6_OWN_SCIENCE, ...californiaUnitsScienceG8_OWN_SCIENCE],
  social: [...newYorkUnitsSocialG6_UNITS, ...georgiaUnitsSocialG67_SOCIAL_6, ...georgiaUnitsSocialG67_SOCIAL_7, ...georgiaUnitsCopiesG7_SOCIAL_COPIES, ...californiaUnitsSocialG9_SOCIAL_9, ...ontarioG8Social_units],
};

export const courses: Course[] = withLessons(oklahomaGrade("7", POOL, OWN), LESSONS);
