import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math } from "../alberta/g2-math";
import { evenOdd as manitobaG2MathEvenOdd } from "../manitoba/units/g2-math";
import { skipCounting as manitobaG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { units as ontarioG2Language } from "../ontario/g2-language";
import { units as ontarioG2Science } from "../ontario/g2-science";
import { SCIENCE_2 as oregonScienceK2SCIENCE_2 } from "../oregon/units/science-k2";
import { RML_2 as washingtonLanguageRmlEarlyRML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonMathEarlyG2_UNITS } from "../washington/units/math-early";
import { SCIENCE_2 as washingtonScienceK2SCIENCE_2 } from "../washington/units/science-k2";
import { LANGUAGE_2 as californiaLanguage2 } from "../california/units/language-g2";
import { MATH_2 as californiaMath2 } from "../california/units/math-g2";
import { units as ontarioG2Social } from "../ontario/g2-social";
import { moreSocial as manitobaG2MoreSocialMoreSocial } from "../manitoba/units/g2-more-social";
import { SOCIAL_2 as californiaSocial2 } from "../california/units/social-g2";
import { COPIES_2 as arizonaCopies2 } from "../arizona/units/copies-g2";
import { withLessons } from "../lessons";
import { vermontGrade } from "./kit";
import { LESSONS } from "./lessons/g2";
import { OWN } from "./units/own-g2";

// Vermont Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Vermont's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...albertaG2Math, manitobaG2MathSkipCounting, manitobaG2MathEvenOdd, ...washingtonMathEarlyG2_UNITS, ...californiaMath2],
  language: [...ontarioG2Language, ...manitobaG2MoreLanguageMoreLanguage, washingtonLanguageRmlEarlyRML_2, ...californiaLanguage2],
  science: [...ontarioG2Science, ...washingtonScienceK2SCIENCE_2, ...oregonScienceK2SCIENCE_2],
  social: [...ontarioG2Social, ...manitobaG2MoreSocialMoreSocial, ...californiaSocial2, ...arizonaCopies2],
};

export const courses: Course[] = withLessons(vermontGrade("2", POOL, OWN), LESSONS);
