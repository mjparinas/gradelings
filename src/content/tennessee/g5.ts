import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { courses as albertaG4_courses } from "../alberta/g4";
import { COPIES_2 as arizonaUnitsCopiesG2_COPIES_2 } from "../arizona/units/copies-g2";
import { LANGUAGE_5 as californiaUnitsLanguageG5_LANGUAGE_5 } from "../california/units/language-g5";
import { LINE_PLOTS_5 as californiaUnitsMathG5_LINE_PLOTS_5 } from "../california/units/math-g5";
import { course as gradesG4Science_course } from "../grades/g4/science";
import { course as gradesG6Science_course } from "../grades/g6/science";
import { speed as manitobaUnitsG3Science_speed } from "../manitoba/units/g3-science";
import { mental as manitobaUnitsG5Math_mental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaUnitsG5Math_quadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaUnitsG5MoreLanguage_multimodal } from "../manitoba/units/g5-more-language";
import { UNITS as newYorkUnitsScienceG8_UNITS } from "../new-york/units/science-g8";
import { UNITS as newYorkUnitsSocialG5_UNITS } from "../new-york/units/social-g5";
import { courses as ontarioG5_courses } from "../ontario/g5";
import { worldMaps6 as oregonUnitsSocialCopies_worldMaps6 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5_OWN_SOCIAL_5 } from "../oregon/units/social-g5";
import { RML_5 as washingtonUnitsLanguageRmlMiddle_RML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpelling_SPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonUnitsMathMiddle_G5_UNITS } from "../washington/units/math-middle";
import { SCIENCE_5 as washingtonUnitsScience35_SCIENCE_5 } from "../washington/units/science-35";
import { SCIENCE_3 as washingtonUnitsScience35_SCIENCE_3 } from "../washington/units/science-35";
import { G5 as washingtonUnitsSocial59G5_G5 } from "../washington/units/social-59-g5";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-g5";

// Tennessee Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathMiddle_G5_UNITS, californiaUnitsMathG5_LINE_PLOTS_5, manitobaUnitsG5Math_mental, manitobaUnitsG5Math_quadrilaterals],
  language: [...californiaUnitsLanguageG5_LANGUAGE_5, washingtonUnitsLanguageRmlMiddle_RML_5, washingtonUnitsLanguageSpelling_SPELLING_5, manitobaUnitsG5MoreLanguage_multimodal],
  science: [...washingtonUnitsScience35_SCIENCE_5, ...gradesG4Science_course.units, ...newYorkUnitsScienceG8_UNITS, manitobaUnitsG3Science_speed, ...unitsOf(ontarioG5_courses, "science"), ...unitsOf(albertaG4_courses, "science"), ...washingtonUnitsScience35_SCIENCE_3, ...gradesG6Science_course.units],
  social: [oregonUnitsSocialCopies_worldMaps6, ...arizonaUnitsCopiesG2_COPIES_2, ...newYorkUnitsSocialG5_UNITS, ...oregonUnitsSocialG5_OWN_SOCIAL_5, ...washingtonUnitsSocial59G5_G5],
};

export const courses: Course[] = tennesseeGrade("5", POOL, OWN);
