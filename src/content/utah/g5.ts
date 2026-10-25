import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG5Science_units } from "../alberta/g5-science";
import { LANGUAGE_5 as californiaUnitsLanguageG5_LANGUAGE_5 } from "../california/units/language-g5";
import { LINE_PLOTS_5 as californiaUnitsMathG5_LINE_PLOTS_5 } from "../california/units/math-g5";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG3Science_course } from "../grades/g3/science";
import { mental as manitobaUnitsG5Math_mental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaUnitsG5Math_quadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaUnitsG5MoreLanguage_multimodal } from "../manitoba/units/g5-more-language";
import { weather as manitobaUnitsG5Science_weather } from "../manitoba/units/g5-science";
import { UNITS as newYorkUnitsSocialG5_UNITS } from "../new-york/units/social-g5";
import { UNITS as newYorkUnitsSocialG8_UNITS } from "../new-york/units/social-g8";
import { units as ontarioG5Science_units } from "../ontario/g5-science";
import { RML_5 as washingtonUnitsLanguageRmlMiddle_RML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpelling_SPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonUnitsMathMiddle_G5_UNITS } from "../washington/units/math-middle";
import { SCIENCE_5 as washingtonUnitsScience35_SCIENCE_5 } from "../washington/units/science-35";
import { G5 as washingtonUnitsSocial59G5_G5 } from "../washington/units/social-59-g5";
import { G8 as washingtonUnitsSocial59G8_G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/g5";
import { OWN } from "./units/own-g5";

// Utah Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathMiddle_G5_UNITS, manitobaUnitsG5Math_mental, manitobaUnitsG5Math_quadrilaterals, californiaUnitsMathG5_LINE_PLOTS_5],
  language: [...californiaUnitsLanguageG5_LANGUAGE_5, manitobaUnitsG5MoreLanguage_multimodal, washingtonUnitsLanguageRmlMiddle_RML_5, washingtonUnitsLanguageSpelling_SPELLING_5],
  science: [...ontarioG5Science_units, manitobaUnitsG5Science_weather, ...albertaG5Science_units, ...washingtonUnitsScience35_SCIENCE_5, ...gradesG3Science_course.units],
  social: [...californiaUnitsSocialG5_SOCIAL_5, ...newYorkUnitsSocialG8_UNITS, ...washingtonUnitsSocial59G5_G5, ...washingtonUnitsSocial59G8_G8, ...newYorkUnitsSocialG5_UNITS, ...californiaUnitsSocialG8_SOCIAL_8],
};

export const courses: Course[] = withLessons(utahGrade("5", POOL, OWN), LESSONS);
