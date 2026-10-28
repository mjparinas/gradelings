import type { Course } from "../types";
import type { Pool } from "../placement";
import { polygons as manitobaG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { life as manitobaG3ScienceLife } from "../manitoba/units/g3-science";
import { speed as manitobaG3ScienceSpeed } from "../manitoba/units/g3-science";
import { units as ontarioG3Language } from "../ontario/g3-language";
import { units as ontarioG3Math } from "../ontario/g3-math";
import { units as ontarioG3Science } from "../ontario/g3-science";
import { SCIENCE_3 as oregonScience35SCIENCE_3 } from "../oregon/units/science-35";
import { RML_3 as washingtonLanguageRmlMiddleRML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonMathMiddleG3_UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonScience35SCIENCE_3 } from "../washington/units/science-35";
import { LANGUAGE_3 as californiaLanguage3 } from "../california/units/language-g3";
import { UNITS as newYorkUnitsSocialG3_UNITS } from "../new-york/units/social-g3";
import { G6 as washingtonUnitsSocial59G6_G6 } from "../washington/units/social-59-g6";
import { SOCIAL_6 as californiaUnitsSocialG6_SOCIAL6 } from "../california/units/social-g6";
import { SOCIAL_COPIES as georgiaUnitsCopiesG3_SOCIALCOPIES } from "../georgia/units/copies-g3";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL5 } from "../california/units/social-g5";
import { withLessons } from "../lessons";
import { southDakotaGrade } from "./kit";
import { LESSONS } from "./lessons/g3";
import { OWN } from "./units/own-g3";

// South Dakota Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for South Dakota's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG3Math, manitobaG3MathPolygons, ...washingtonMathMiddleG3_UNITS],
  language: [...ontarioG3Language, manitobaG3MoreLanguageWonder, washingtonLanguageRmlMiddleRML_3, ...californiaLanguage3],
  science: [...ontarioG3Science, manitobaG3ScienceLife, manitobaG3ScienceSpeed, ...washingtonScience35SCIENCE_3, ...oregonScience35SCIENCE_3],
  social: [...newYorkUnitsSocialG3_UNITS, ...washingtonUnitsSocial59G6_G6, ...californiaUnitsSocialG6_SOCIAL6, ...georgiaUnitsCopiesG3_SOCIALCOPIES, ...californiaUnitsSocialG5_SOCIAL5],
};

export const courses: Course[] = withLessons(southDakotaGrade("3", POOL, OWN), LESSONS);
