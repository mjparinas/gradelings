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
import { LANGUAGE_8 as californiaLanguage8 } from "../california/units/language-g8";
import { MATH_8 as californiaMath8 } from "../california/units/math-g8";
import { OWN_SCIENCE as californiaOwnScience8, SCIENCE_COPIES as californiaScienceCopies8 } from "../california/units/science-g8";
import { OWN_SOCIAL_8 as oregonSocialG8OWN_SOCIAL_8 } from "../oregon/units/social-g8";
import { G8 as washingtonSocial59G8G8 } from "../washington/units/social-59-g8";
import { SOCIAL_8 as californiaSocial8 } from "../california/units/social-g8";
import { SOCIAL_9 as californiaSocial9 } from "../california/units/social-g9";
import { COPIES_8 as arizonaCopies8 } from "../arizona/units/copies-g8";
import { withLessons } from "../lessons";
import { dcGrade } from "./kit";
import { LESSONS } from "./lessons/g8";
import { OWN } from "./units/own-g8";

// Washington, DC Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for the District's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG8Math, ...albertaG8Math, ...washingtonMathUpperG8_UNITS, ...californiaMath8],
  language: [...ontarioG8Language, ...manitobaG8MoreLanguage, ...washingtonLanguageRmlUpperRML_8, oregonLanguageWEIGH_THE_EVIDENCE, ...californiaLanguage8],
  science: [newBrunswickG8ScienceMotionForces, ...washingtonScience68SCIENCE_8, ...(oregonScienceCopiesSCIENCE_COPIES["8"] ?? []), ...californiaOwnScience8, ...californiaScienceCopies8],
  social: [...oregonSocialG8OWN_SOCIAL_8, ...washingtonSocial59G8G8, ...californiaSocial8, ...californiaSocial9, ...arizonaCopies8],
};

export const courses: Course[] = withLessons(dcGrade("8", POOL, OWN), LESSONS);
