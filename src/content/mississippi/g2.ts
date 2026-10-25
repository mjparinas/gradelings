import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2MathUnits } from "../alberta/g2-math";
import { LANGUAGE_2 as californiaLanguageG2LANGUAGE_2 } from "../california/units/language-g2";
import { MATH_2 as californiaMathG2MATH_2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaSocialG2SOCIAL_2 } from "../california/units/social-g2";
import { course as gradesG3ScienceCourse } from "../grades/g3/science";
import { skipCounting as manitobaG2MathSkipCounting } from "../manitoba/units/g2-math";
import { evenOdd as manitobaG2MathEvenOdd } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { scienceUnits as manitobaGkMoreScienceScienceUnits } from "../manitoba/units/gk-more-science";
import { UNITS as newYorkSocialG3UNITS } from "../new-york/units/social-g3";
import { units as ontarioG2LanguageUnits } from "../ontario/g2-language";
import { units as ontarioG2ScienceUnits } from "../ontario/g2-science";
import { units as ontarioG2SocialUnits } from "../ontario/g2-social";
import { peWorkAndPrices2 as princeEdwardIslandG2ScienceSocialPeWorkAndPrices2 } from "../prince-edward-island/units/g2-science-social";
import { SCIENCE_1 as texasScience1SCIENCE_1 } from "../texas/units/science-1";
import { SCIENCE_K as texasScienceKSCIENCE_K } from "../texas/units/science-k";
import { RML_2 as washingtonLanguageRmlEarlyRML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonMathEarlyG2_UNITS } from "../washington/units/math-early";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/g2";
import { OWN } from "./units/own-g2";

// Mississippi Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...washingtonMathEarlyG2_UNITS, ...californiaMathG2MATH_2, ...albertaG2MathUnits, manitobaG2MathSkipCounting, manitobaG2MathEvenOdd],
  language: [...ontarioG2LanguageUnits, ...californiaLanguageG2LANGUAGE_2, washingtonLanguageRmlEarlyRML_2, ...manitobaG2MoreLanguageMoreLanguage],
  science: [...texasScience1SCIENCE_1, ...ontarioG2ScienceUnits, ...texasScienceKSCIENCE_K, ...manitobaGkMoreScienceScienceUnits, ...gradesG3ScienceCourse.units],
  social: [...californiaSocialG2SOCIAL_2, ...newYorkSocialG3UNITS, ...ontarioG2SocialUnits, princeEdwardIslandG2ScienceSocialPeWorkAndPrices2],
};

export const courses: Course[] = withLessons(mississippiGrade("2", POOL, OWN), LESSONS);
