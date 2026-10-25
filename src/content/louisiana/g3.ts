import type { Course } from "../types";
import type { Pool } from "../placement";
import { COPIES_2 as arizonaUnitsCopiesG2_COPIES_2 } from "../arizona/units/copies-g2";
import { COMPARE_AND_CONNECT_3 as californiaUnitsLanguageG3_COMPARE_AND_CONNECT_3 } from "../california/units/language-g3";
import { SOCIAL_3 as californiaUnitsSocialG3_SOCIAL_3 } from "../california/units/social-g3";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL_5 } from "../california/units/social-g5";
import { polygons as manitobaUnitsG3Math_polygons } from "../manitoba/units/g3-math";
import { wonder as manitobaUnitsG3MoreLanguage_wonder } from "../manitoba/units/g3-more-language";
import { life as manitobaUnitsG3Science_life } from "../manitoba/units/g3-science";
import { speed as manitobaUnitsG3Science_speed } from "../manitoba/units/g3-science";
import { units as ontarioG3Language_units } from "../ontario/g3-language";
import { units as ontarioG3Math_units } from "../ontario/g3-math";
import { units as ontarioG3Science_units } from "../ontario/g3-science";
import { SCIENCE_3 as oregonUnitsScience35_SCIENCE_3 } from "../oregon/units/science-35";
import { RML_3 as washingtonUnitsLanguageRmlMiddle_RML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonUnitsMathMiddle_G3_UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35_SCIENCE_3 } from "../washington/units/science-35";
import { withLessons } from "../lessons";
import { louisianaGrade } from "./kit";
import { LESSONS } from "./lessons/g3";
import { OWN } from "./units/own-g3";

// Louisiana Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Louisiana's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG3Math_units, manitobaUnitsG3Math_polygons, ...washingtonUnitsMathMiddle_G3_UNITS],
  language: [...ontarioG3Language_units, manitobaUnitsG3MoreLanguage_wonder, washingtonUnitsLanguageRmlMiddle_RML_3, californiaUnitsLanguageG3_COMPARE_AND_CONNECT_3],
  science: [...ontarioG3Science_units, manitobaUnitsG3Science_life, manitobaUnitsG3Science_speed, ...washingtonUnitsScience35_SCIENCE_3, ...oregonUnitsScience35_SCIENCE_3],
  social: [...californiaUnitsSocialG5_SOCIAL_5, ...californiaUnitsSocialG3_SOCIAL_3, ...arizonaUnitsCopiesG2_COPIES_2],
};

export const courses: Course[] = withLessons(louisianaGrade("3", POOL, OWN), LESSONS);
