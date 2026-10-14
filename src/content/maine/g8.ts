import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG8Math } from "../alberta/g8-math";
import { units as manitobaG8MoreLanguage } from "../manitoba/units/g8-more-language";
import { motionForces as newBrunswickG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { units as ontarioG8Language } from "../ontario/g8-language";
import { units as ontarioG8Math } from "../ontario/g8-math";
import { WEIGH_THE_EVIDENCE as oregonLanguageWEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { SCIENCE_COPIES as oregonScienceCopiesSCIENCE_COPIES } from "../oregon/units/science-copies";
import { RML_8 as washingtonLanguageRmlUpperRML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonMathUpperG8_UNITS } from "../washington/units/math-upper";
import { SCIENCE_8 as washingtonScience68SCIENCE_8 } from "../washington/units/science-68";
import { maineGrade } from "./kit";
import { reconstruction8 as oregonSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_8 as oregonSocialG8OWN_SOCIAL_8 } from "../oregon/units/social-g8";
import { G8 as washingtonSocial59G8G8 } from "../washington/units/social-59-g8";
import { SOCIAL_8 as californiaSocial8 } from "../california/units/social-g8";
import { units as ontarioG8Social } from "../ontario/g8-social";
import { units as manitobaG8MoreSocialB } from "../manitoba/units/g8-more-social-b";
import { OWN } from "./units/own-g8";

// Maine Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG8Math, ...albertaG8Math, ...washingtonMathUpperG8_UNITS],
  language: [...ontarioG8Language, ...manitobaG8MoreLanguage, ...washingtonLanguageRmlUpperRML_8, oregonLanguageWEIGH_THE_EVIDENCE],
  science: [newBrunswickG8ScienceMotionForces, ...washingtonScience68SCIENCE_8, ...(oregonScienceCopiesSCIENCE_COPIES["8"] ?? [])],
  social: [...washingtonSocial59G8G8, oregonSocialCopiesReconstruction8, ...oregonSocialG8OWN_SOCIAL_8, ...californiaSocial8, ...ontarioG8Social, ...manitobaG8MoreSocialB],
};

export const courses: Course[] = maineGrade("8", POOL, OWN);
