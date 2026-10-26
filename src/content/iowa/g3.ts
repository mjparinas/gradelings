import type { Course } from "../types";
import type { Pool } from "../placement";
import { LANGUAGE_3 as californiaUnitsLanguageG3LANGUAGE_3 } from "../california/units/language-g3";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL_5 } from "../california/units/social-g5";
import { polygons as manitobaUnitsG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaUnitsG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { life as manitobaUnitsG3ScienceLife } from "../manitoba/units/g3-science";
import { speed as manitobaUnitsG3ScienceSpeed } from "../manitoba/units/g3-science";
import { units as ontarioG3Language } from "../ontario/g3-language";
import { units as ontarioG3Math } from "../ontario/g3-math";
import { units as ontarioG3Science } from "../ontario/g3-science";
import { SCIENCE_3 as oregonUnitsScience35SCIENCE_3 } from "../oregon/units/science-35";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWN_SOCIAL_5 } from "../oregon/units/social-g5";
import { RML_3 as washingtonUnitsLanguageRmlMiddleRML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonUnitsMathMiddleG3_UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE_3 } from "../washington/units/science-35";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { withLessons } from "../lessons";
import { iowaGrade } from "./kit";
import { LESSONS } from "./lessons/g3";
import { OWN } from "./units/own-g3";

// Iowa Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Iowa's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG3Math, manitobaUnitsG3MathPolygons, ...washingtonUnitsMathMiddleG3_UNITS],
  language: [...ontarioG3Language, manitobaUnitsG3MoreLanguageWonder, washingtonUnitsLanguageRmlMiddleRML_3, ...californiaUnitsLanguageG3LANGUAGE_3],
  science: [...ontarioG3Science, manitobaUnitsG3ScienceLife, manitobaUnitsG3ScienceSpeed, ...washingtonUnitsScience35SCIENCE_3, ...oregonUnitsScience35SCIENCE_3],
  social: [...washingtonUnitsSocial59G5G5, ...californiaUnitsSocialG5SOCIAL_5, ...oregonUnitsSocialG5OWN_SOCIAL_5],
};

export const courses: Course[] = withLessons(iowaGrade("3", POOL, OWN), LESSONS);
