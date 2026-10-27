import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2Math } from "../alberta/g2-math";
import { COPIES_2 as arizonaCopiesG2COPIES2 } from "../arizona/units/copies-g2";
import { LANGUAGE_2 as californiaLanguage2 } from "../california/units/language-g2";
import { MATH_2 as californiaMath2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaSocialG2SOCIAL2 } from "../california/units/social-g2";
import { evenOdd as manitobaG2MathEvenOdd, skipCounting as manitobaG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { moreSocial as manitobaG2MoreSocialMoreSocial } from "../manitoba/units/g2-more-social";
import { communityChange as novaScotiaG2SocialCommunityChange } from "../nova-scotia/units/g2-social";
import { units as ontarioG2Language } from "../ontario/g2-language";
import { units as ontarioG2ScienceUnits } from "../ontario/g2-science";
import { units as ontarioG2SocialUnits } from "../ontario/g2-social";
import { SCIENCE_2 as oregonScienceK2SCIENCE2 } from "../oregon/units/science-k2";
import { RML_2 as washingtonLanguageRmlEarlyRML_2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonMathEarlyG2_UNITS } from "../washington/units/math-early";
import { SCIENCE_2 as washingtonScienceK2SCIENCE2 } from "../washington/units/science-k2";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/g2";
import { OWN } from "./units/own-g2";

// West Virginia Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [...albertaG2Math, manitobaG2MathSkipCounting, manitobaG2MathEvenOdd, ...washingtonMathEarlyG2_UNITS, ...californiaMath2],
  language: [...ontarioG2Language, ...manitobaG2MoreLanguageMoreLanguage, washingtonLanguageRmlEarlyRML_2, ...californiaLanguage2],
  science: [...ontarioG2ScienceUnits, ...washingtonScienceK2SCIENCE2, ...oregonScienceK2SCIENCE2],
  social: [...ontarioG2SocialUnits, novaScotiaG2SocialCommunityChange, ...manitobaG2MoreSocialMoreSocial, ...californiaSocialG2SOCIAL2, ...arizonaCopiesG2COPIES2],
};

export const courses: Course[] = withLessons(westVirginiaGrade("2", POOL, OWN), LESSONS);
