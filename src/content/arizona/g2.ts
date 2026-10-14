import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math } from "../alberta/g2-math";
import { evenOdd as manitobaG2MathEvenOdd } from "../manitoba/units/g2-math";
import { skipCounting as manitobaG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { units as ontarioG2Language } from "../ontario/g2-language";
import { RML_2 as washingtonLanguageRmlEarlyRML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonMathEarlyG2_UNITS } from "../washington/units/math-early";
import { units as ontarioG2Science } from "../ontario/g2-science";
import { SCIENCE_2 as washingtonScienceK2SCIENCE_2 } from "../washington/units/science-k2";
import { SCIENCE_3 as washingtonScience35SCIENCE_3 } from "../washington/units/science-35";
import { units as ontarioG2Social } from "../ontario/g2-social";
import { UNITS as newYorkSocial3 } from "../new-york/units/social-g3";
import { SOCIAL_2 as californiaSocial2 } from "../california/units/social-g2";
import { OWN } from "./units/own-g2";
import { arizonaGrade } from "./kit";

// Arizona Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG2Math, manitobaG2MathSkipCounting, manitobaG2MathEvenOdd, ...washingtonMathEarlyG2_UNITS],
  language: [...ontarioG2Language, ...manitobaG2MoreLanguageMoreLanguage, washingtonLanguageRmlEarlyRML_2],
  science: [...ontarioG2Science, ...washingtonScienceK2SCIENCE_2, ...washingtonScience35SCIENCE_3],
  social: [...ontarioG2Social, ...newYorkSocial3, ...californiaSocial2],
};

export const courses: Course[] = arizonaGrade("2", POOL, OWN);
