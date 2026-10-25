import type { Course } from "../types";
import type { Pool } from "../placement";
import { LANGUAGE_3 as californiaUnitsLanguageG3_LANGUAGE_3 } from "../california/units/language-g3";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL_5 } from "../california/units/social-g5";
import { course as gradesG2Science_course } from "../grades/g2/science";
import { polygons as manitobaUnitsG3Math_polygons } from "../manitoba/units/g3-math";
import { wonder as manitobaUnitsG3MoreLanguage_wonder } from "../manitoba/units/g3-more-language";
import { team as manitobaUnitsG3MoreSocial_team } from "../manitoba/units/g3-more-social";
import { speed as manitobaUnitsG3Science_speed } from "../manitoba/units/g3-science";
import { life as manitobaUnitsG3SocialB_life } from "../manitoba/units/g3-social-b";
import { UNITS as newYorkUnitsSocialG3_UNITS } from "../new-york/units/social-g3";
import { UNITS as newYorkUnitsSocialG5_UNITS } from "../new-york/units/social-g5";
import { units as ontarioG2Social_units } from "../ontario/g2-social";
import { units as ontarioG3Language_units } from "../ontario/g3-language";
import { units as ontarioG3Math_units } from "../ontario/g3-math";
import { units as ontarioG3Science_units } from "../ontario/g3-science";
import { SCIENCE_3 as oregonUnitsScience35_SCIENCE_3 } from "../oregon/units/science-35";
import { peMagnetsStatic3 as princeEdwardIslandUnitsG3ScienceSocial_peMagnetsStatic3 } from "../prince-edward-island/units/g3-science-social";
import { RML_3 as washingtonUnitsLanguageRmlMiddle_RML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonUnitsMathMiddle_G3_UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35_SCIENCE_3 } from "../washington/units/science-35";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/g3";
import { OWN } from "./units/own-g3";

// Utah Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathMiddle_G3_UNITS, ...ontarioG3Math_units, manitobaUnitsG3Math_polygons],
  language: [...ontarioG3Language_units, manitobaUnitsG3MoreLanguage_wonder, washingtonUnitsLanguageRmlMiddle_RML_3, ...californiaUnitsLanguageG3_LANGUAGE_3],
  science: [...washingtonUnitsScience35_SCIENCE_3, ...ontarioG3Science_units, manitobaUnitsG3Science_speed, princeEdwardIslandUnitsG3ScienceSocial_peMagnetsStatic3, ...oregonUnitsScience35_SCIENCE_3, ...gradesG2Science_course.units],
  social: [...newYorkUnitsSocialG3_UNITS, manitobaUnitsG3MoreSocial_team, manitobaUnitsG3SocialB_life, ...ontarioG2Social_units, ...newYorkUnitsSocialG5_UNITS, ...californiaUnitsSocialG5_SOCIAL_5],
};

export const courses: Course[] = withLessons(utahGrade("3", POOL, OWN), LESSONS);
