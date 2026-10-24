import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math } from "../alberta/g2-math";
import { evenOdd as manitobaG2MathEvenOdd } from "../manitoba/units/g2-math";
import { skipCounting as manitobaG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { units as ontarioG2Language } from "../ontario/g2-language";
import { RML_2 as washingtonLanguageRmlEarlyRML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonMathEarlyG2_UNITS } from "../washington/units/math-early";
import { LANGUAGE_2 as californiaLanguage2 } from "../california/units/language-g2";
import { MATH_2 as californiaMath2 } from "../california/units/math-g2";
import { ohioGrade } from "./kit";
import { OWN } from "./units/own-g2";
import { airAndWeather as sci0 } from "../manitoba/units/g2-science";
import { SCIENCE_3 as sci1 } from "../washington/units/science-35";
import { units as sci2 } from "../alberta/k-science";
import { units as soc0 } from "../ontario/g2-social";
import { communityChange as soc1 } from "../nova-scotia/units/g2-social";
import { moreSocial as soc2 } from "../manitoba/units/g2-more-social";
import { SOCIAL_2 as soc3 } from "../california/units/social-g2";
import { units as scix0 } from "../ontario/g2-science";

// Ohio Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG2Math, manitobaG2MathSkipCounting, manitobaG2MathEvenOdd, ...washingtonMathEarlyG2_UNITS, ...californiaMath2],
  language: [...ontarioG2Language, ...manitobaG2MoreLanguageMoreLanguage, washingtonLanguageRmlEarlyRML_2, ...californiaLanguage2],
  science: [sci0, ...sci1, ...sci2, ...scix0],
  social: [...soc0, soc1, ...soc2, ...soc3],
};

export const courses: Course[] = ohioGrade("2", POOL, OWN);
