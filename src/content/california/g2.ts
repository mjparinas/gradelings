import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math } from "../alberta/g2-math";
import { evenOdd as manitobaG2MathEvenOdd } from "../manitoba/units/g2-math";
import { skipCounting as manitobaG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { moreSocial as manitobaG2MoreSocialMoreSocial } from "../manitoba/units/g2-more-social";
import { communityChange as novaScotiaG2SocialCommunityChange } from "../nova-scotia/units/g2-social";
import { units as ontarioG2Language } from "../ontario/g2-language";
import { units as ontarioG2Science } from "../ontario/g2-science";
import { units as ontarioG2Social } from "../ontario/g2-social";
import { SCIENCE_2 as oregonScienceK2SCIENCE_2 } from "../oregon/units/science-k2";
import { OWN_SOCIAL_2 as oregonSocialK3OWN_SOCIAL_2 } from "../oregon/units/social-k3";
import { RML_2 as washingtonLanguageRmlEarlyRML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonMathEarlyG2_UNITS } from "../washington/units/math-early";
import { SCIENCE_2 as washingtonScienceK2SCIENCE_2 } from "../washington/units/science-k2";
import { californiaGrade } from "./kit";
import { OWN } from "./units/own-g2";

// California Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG2Math, manitobaG2MathSkipCounting, manitobaG2MathEvenOdd, ...washingtonMathEarlyG2_UNITS],
  language: [...ontarioG2Language, ...manitobaG2MoreLanguageMoreLanguage, washingtonLanguageRmlEarlyRML_2],
  science: [...ontarioG2Science, ...washingtonScienceK2SCIENCE_2, ...oregonScienceK2SCIENCE_2],
  social: [...ontarioG2Social, novaScotiaG2SocialCommunityChange, ...manitobaG2MoreSocialMoreSocial, ...oregonSocialK3OWN_SOCIAL_2],
};

export const courses: Course[] = californiaGrade("2", POOL, OWN);
