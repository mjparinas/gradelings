import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG5Science } from "../alberta/g5-science";
import { mental as manitobaG5MathMental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { weather as manitobaG5ScienceWeather } from "../manitoba/units/g5-science";
import { units as ontarioG5Science } from "../ontario/g5-science";
import { SCIENCE_5 as oregonScience35SCIENCE_5 } from "../oregon/units/science-35";
import { RML_5 as washingtonLanguageRmlMiddleRML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonLanguageSpellingSPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonMathMiddleG5_UNITS } from "../washington/units/math-middle";
import { SCIENCE_5 as washingtonScience35SCIENCE_5 } from "../washington/units/science-35";
import { OWN_SOCIAL_5 as oregonSocialG5OWN_SOCIAL_5 } from "../oregon/units/social-g5";
import { G5 as washingtonSocial59G5G5 } from "../washington/units/social-59-g5";
import { SOCIAL_5 as californiaSocial5 } from "../california/units/social-g5";
import { LANGUAGE_5 as californiaLanguage5 } from "../california/units/language-g5";
import { MATH_5 as californiaMath5 } from "../california/units/math-g5";
import { SCIENCE_COPIES as californiaScienceCopies5 } from "../california/units/science-g5";
import { SOCIAL_7 as californiaSocial7 } from "../california/units/social-g7";
import { withLessons } from "../lessons";
import { connecticutGrade } from "./kit";
import { LESSONS } from "./lessons/g5";
import { OWN } from "./units/own-g5";

// Connecticut Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Connecticut's own units.
const POOL: Pool = {
  math: [manitobaG5MathMental, manitobaG5MathQuadrilaterals, ...washingtonMathMiddleG5_UNITS, ...californiaMath5],
  language: [manitobaG5MoreLanguageMultimodal, washingtonLanguageRmlMiddleRML_5, washingtonLanguageSpellingSPELLING_5, ...californiaLanguage5],
  science: [...ontarioG5Science, ...albertaG5Science, manitobaG5ScienceWeather, ...washingtonScience35SCIENCE_5, ...oregonScience35SCIENCE_5, ...californiaScienceCopies5],
  social: [...washingtonSocial59G5G5, ...oregonSocialG5OWN_SOCIAL_5, ...californiaSocial5, ...californiaSocial7],
};

export const courses: Course[] = withLessons(connecticutGrade("5", POOL, OWN), LESSONS);
