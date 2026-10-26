import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math } from "../alberta/g2-math";
import { LANGUAGE_2 as californiaUnitsLanguageG2LANGUAGE_2 } from "../california/units/language-g2";
import { MATH_2 as californiaUnitsMathG2MATH_2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL_2 } from "../california/units/social-g2";
import { evenOdd as manitobaUnitsG2MathEvenOdd } from "../manitoba/units/g2-math";
import { skipCounting as manitobaUnitsG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaUnitsG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { units as ontarioG2Language } from "../ontario/g2-language";
import { units as ontarioG2Science } from "../ontario/g2-science";
import { units as ontarioG2Social } from "../ontario/g2-social";
import { SCIENCE_2 as oregonUnitsScienceK2SCIENCE_2 } from "../oregon/units/science-k2";
import { RML_2 as washingtonUnitsLanguageRmlEarlyRML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonUnitsMathEarlyG2_UNITS } from "../washington/units/math-early";
import { SCIENCE_2 as washingtonUnitsScienceK2SCIENCE_2 } from "../washington/units/science-k2";
import { withLessons } from "../lessons";
import { idahoGrade } from "./kit";
import { LESSONS } from "./lessons/g2";
import { OWN } from "./units/own-g2";

// Idaho Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Idaho's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...albertaG2Math, manitobaUnitsG2MathSkipCounting, manitobaUnitsG2MathEvenOdd, ...washingtonUnitsMathEarlyG2_UNITS, ...californiaUnitsMathG2MATH_2],
  language: [...ontarioG2Language, ...manitobaUnitsG2MoreLanguageMoreLanguage, washingtonUnitsLanguageRmlEarlyRML_2, ...californiaUnitsLanguageG2LANGUAGE_2],
  science: [...ontarioG2Science, ...washingtonUnitsScienceK2SCIENCE_2, ...oregonUnitsScienceK2SCIENCE_2],
  social: [...californiaUnitsSocialG2SOCIAL_2, ...ontarioG2Social],
};

export const courses: Course[] = withLessons(idahoGrade("2", POOL, OWN), LESSONS);
