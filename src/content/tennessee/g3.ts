import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { COMPARE_AND_CONNECT_3 as californiaUnitsLanguageG3_COMPARE_AND_CONNECT_3 } from "../california/units/language-g3";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG2Science_course } from "../grades/g2/science";
import { course as gradesG6Science_course } from "../grades/g6/science";
import { polygons as manitobaUnitsG3Math_polygons } from "../manitoba/units/g3-math";
import { wonder as manitobaUnitsG3MoreLanguage_wonder } from "../manitoba/units/g3-more-language";
import { units as manitobaUnitsG4MoreScience_units } from "../manitoba/units/g4-more-science";
import { UNITS as newYorkUnitsScienceG4_UNITS } from "../new-york/units/science-g4";
import { courses as ontarioG3_courses } from "../ontario/g3";
import { courses as ontarioG5_courses } from "../ontario/g5";
import { peMagnetsStatic3 as princeEdwardIslandUnitsG3ScienceSocial_peMagnetsStatic3 } from "../prince-edward-island/units/g3-science-social";
import { RML_3 as washingtonUnitsLanguageRmlMiddle_RML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonUnitsMathMiddle_G3_UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35_SCIENCE_3 } from "../washington/units/science-35";
import { G5 as washingtonUnitsSocial59G5_G5 } from "../washington/units/social-59-g5";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-g3";

// Tennessee Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathMiddle_G3_UNITS, ...unitsOf(ontarioG3_courses, "math"), manitobaUnitsG3Math_polygons],
  language: [...unitsOf(ontarioG3_courses, "language"), californiaUnitsLanguageG3_COMPARE_AND_CONNECT_3, washingtonUnitsLanguageRmlMiddle_RML_3, manitobaUnitsG3MoreLanguage_wonder],
  science: [...newYorkUnitsScienceG4_UNITS, ...unitsOf(ontarioG5_courses, "science"), ...manitobaUnitsG4MoreScience_units, ...gradesG2Science_course.units, ...washingtonUnitsScience35_SCIENCE_3, ...unitsOf(ontarioG3_courses, "science"), princeEdwardIslandUnitsG3ScienceSocial_peMagnetsStatic3, ...gradesG6Science_course.units],
  social: [...californiaUnitsSocialG5_SOCIAL_5, ...californiaUnitsSocialG8_SOCIAL_8, ...washingtonUnitsSocial59G5_G5],
};

export const courses: Course[] = tennesseeGrade("3", POOL, OWN);
