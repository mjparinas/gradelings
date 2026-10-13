import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG8Math } from "../alberta/g8-math";
import { units as manitobaG8MoreLanguage } from "../manitoba/units/g8-more-language";
import { units as manitobaG8MoreSocialB } from "../manitoba/units/g8-more-social-b";
import { motionForces as newBrunswickG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { units as ontarioG8Language } from "../ontario/g8-language";
import { units as ontarioG8Math } from "../ontario/g8-math";
import { units as ontarioG8Social } from "../ontario/g8-social";
import { RML_8 as washingtonLanguageRmlUpperRML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonMathUpperG8_UNITS } from "../washington/units/math-upper";
import { SCIENCE_8 as washingtonScience68SCIENCE_8 } from "../washington/units/science-68";
import { G8 as washingtonSocial59G8G8 } from "../washington/units/social-59-g8";
import { oregonGrade } from "./kit";
import { OWN } from "./units/own-g8";

// Oregon Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG8Math, ...albertaG8Math, ...washingtonMathUpperG8_UNITS],
  language: [...ontarioG8Language, ...manitobaG8MoreLanguage, ...washingtonLanguageRmlUpperRML_8],
  science: [newBrunswickG8ScienceMotionForces, ...washingtonScience68SCIENCE_8],
  social: [...washingtonSocial59G8G8, ...ontarioG8Social, ...manitobaG8MoreSocialB],
};

export const courses: Course[] = oregonGrade("8", POOL, OWN);
