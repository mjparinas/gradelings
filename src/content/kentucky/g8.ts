import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG8Math } from "../alberta/g8-math";
import { units as manitobaG8MoreLanguage } from "../manitoba/units/g8-more-language";
import { units as ontarioG8Language } from "../ontario/g8-language";
import { units as ontarioG8Math } from "../ontario/g8-math";
import { WEIGH_THE_EVIDENCE as oregonLanguageWEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { RML_8 as washingtonLanguageRmlUpperRML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonMathUpperG8_UNITS } from "../washington/units/math-upper";
import { reconstruction8 as oregonSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_8 as oregonSocialG8OWN_SOCIAL_8 } from "../oregon/units/social-g8";
import { G8 as washingtonSocial59G8G8 } from "../washington/units/social-59-g8";
import { SOCIAL_8 as californiaSocial8 } from "../california/units/social-g8";
import { LANGUAGE_8 as californiaLanguage8 } from "../california/units/language-g8";
import { MATH_8 as californiaMath8 } from "../california/units/math-g8";
import { units as ontarioG8Social } from "../ontario/g8-social";
import { withLessons } from "../lessons";
import { kentuckyGrade } from "./kit";
import { LESSONS } from "./lessons/g8";
import { OWN } from "./units/own-g8";
import { SOCIAL_5 as californiaSocial5 } from "../california/units/social-g5";
import { OWN_SCIENCE as californiaOwnScience6, SCIENCE_COPIES as californiaScienceCopies6 } from "../california/units/science-g6";
import { OWN_SCIENCE as californiaOwnScience7, SCIENCE_COPIES as californiaScienceCopies7 } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaOwnScience8, SCIENCE_COPIES as californiaScienceCopies8 } from "../california/units/science-g8";
import { units as ontarioG7Science } from "../ontario/g7-science";
import { SCIENCE_8 as washingtonScience68SCIENCE_8 } from "../washington/units/science-68";

// Kentucky Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG8Math, ...albertaG8Math, ...washingtonMathUpperG8_UNITS, ...californiaMath8],
  language: [...ontarioG8Language, ...manitobaG8MoreLanguage, ...washingtonLanguageRmlUpperRML_8, oregonLanguageWEIGH_THE_EVIDENCE, ...californiaLanguage8],
  science: [...californiaOwnScience6, ...californiaScienceCopies6, ...californiaOwnScience7, ...californiaScienceCopies7, ...californiaOwnScience8, ...californiaScienceCopies8, ...ontarioG7Science, ...washingtonScience68SCIENCE_8],
  social: [...californiaSocial5, ...californiaSocial8, oregonSocialCopiesReconstruction8, ...oregonSocialG8OWN_SOCIAL_8, ...washingtonSocial59G8G8, ...ontarioG8Social],
};

export const courses: Course[] = withLessons(kentuckyGrade("8", POOL, OWN), LESSONS);
