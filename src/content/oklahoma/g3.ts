import type { Course } from "../types";
import { type Pool } from "../placement";
import { withLessons } from "../lessons";
import { COMPARE_AND_CONNECT_3 as californiaUnitsLanguageG3_COMPARE_AND_CONNECT_3 } from "../california/units/language-g3";
import { polygons as manitobaUnitsG3Math_polygons } from "../manitoba/units/g3-math";
import { wonder as manitobaUnitsG3MoreLanguage_wonder } from "../manitoba/units/g3-more-language";
import { life as manitobaUnitsG3Science_life } from "../manitoba/units/g3-science";
import { speed as manitobaUnitsG3Science_speed } from "../manitoba/units/g3-science";
import { UNITS as newYorkUnitsSocialG3_UNITS } from "../new-york/units/social-g3";
import { units as ontarioG3Language_units } from "../ontario/g3-language";
import { units as ontarioG3Math_units } from "../ontario/g3-math";
import { units as ontarioG3Science_units } from "../ontario/g3-science";
import { SCIENCE_3 as oregonUnitsScience35_SCIENCE_3 } from "../oregon/units/science-35";
import { coinsBillsG3 as texasUnitsMathG3_coinsBillsG3 } from "../texas/units/math-g3";
import { RML_3 as washingtonUnitsLanguageRmlMiddle_RML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonUnitsMathMiddle_G3_UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35_SCIENCE_3 } from "../washington/units/science-35";
import { oklahomaGrade } from "./kit";
import { LESSONS } from "./lessons/g3";
import { OWN } from "./units/own-g3";

// Oklahoma Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for
// Oklahoma's own units, which ship in this download.
const POOL: Pool = {
  math: [...ontarioG3Math_units, manitobaUnitsG3Math_polygons, ...washingtonUnitsMathMiddle_G3_UNITS, texasUnitsMathG3_coinsBillsG3],
  language: [...ontarioG3Language_units, manitobaUnitsG3MoreLanguage_wonder, washingtonUnitsLanguageRmlMiddle_RML_3, californiaUnitsLanguageG3_COMPARE_AND_CONNECT_3],
  science: [...ontarioG3Science_units, manitobaUnitsG3Science_life, manitobaUnitsG3Science_speed, ...washingtonUnitsScience35_SCIENCE_3, ...oregonUnitsScience35_SCIENCE_3],
  social: [...newYorkUnitsSocialG3_UNITS],
};

export const courses: Course[] = withLessons(oklahomaGrade("3", POOL, OWN), LESSONS);
