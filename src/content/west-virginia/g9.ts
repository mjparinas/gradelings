import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaSocialG9UNITS } from "../alabama/units/social-g9";
import { units as albertaG9ScienceUnits } from "../alberta/g9-science";
import { LANGUAGE_9 as californiaLanguage9 } from "../california/units/language-g9";
import { MATH_9 as californiaMath9 } from "../california/units/math-g9";
import { OWN_SCIENCE as californiaScienceG9OWNSCIENCE } from "../california/units/science-g9";
import { PHYSICAL_SCIENCE as californiaScienceG9PhysicalPHYSICALSCIENCE } from "../california/units/science-g9-physical";
import { SOCIAL_6 as californiaSocialG6SOCIAL6 } from "../california/units/social-g6";
import { SOCIAL_7 as californiaSocialG7SOCIAL7 } from "../california/units/social-g7";
import { units as manitobaG9MoreLanguage } from "../manitoba/units/g9-more-language";
import { units as manitobaG9MoreScienceUnits } from "../manitoba/units/g9-more-science";
import { units as manitobaG9ScienceUnits } from "../manitoba/units/g9-science";
import { UNITS as newYorkSocialG6UNITS } from "../new-york/units/social-g6";
import { UNITS as newYorkSocialG9UNITS } from "../new-york/units/social-g9";
import { units as ontarioG9Language } from "../ontario/g9-language";
import { units as ontarioG9Math } from "../ontario/g9-math";
import { units as ontarioG9ScienceUnits } from "../ontario/g9-science";
import { MEDIA_ANALYSIS as oregonLanguageMEDIA_ANALYSIS } from "../oregon/units/language";
import { OWN_SOCIAL_7 as oregonSocialG67OWNSOCIAL7 } from "../oregon/units/social-g67";
import { RML_9 as washingtonLanguageRmlUpperRML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonLanguageSpellingSPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonMathUpperG9_UNITS } from "../washington/units/math-upper";
import { SCIENCE_9 as washingtonScience9SCIENCE9 } from "../washington/units/science-9";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/g9";
import { OWN } from "./units/own-g9";

// West Virginia Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [...ontarioG9Math, ...washingtonMathUpperG9_UNITS, ...californiaMath9],
  language: [...ontarioG9Language, ...manitobaG9MoreLanguage, ...washingtonLanguageRmlUpperRML_9, washingtonLanguageSpellingSPELLING_9, oregonLanguageMEDIA_ANALYSIS, ...californiaLanguage9],
  science: [...ontarioG9ScienceUnits, ...albertaG9ScienceUnits, ...manitobaG9ScienceUnits, ...manitobaG9MoreScienceUnits, ...washingtonScience9SCIENCE9, ...californiaScienceG9OWNSCIENCE, ...californiaScienceG9PhysicalPHYSICALSCIENCE],
  social: [...californiaSocialG6SOCIAL6, ...newYorkSocialG6UNITS, ...newYorkSocialG9UNITS, ...californiaSocialG7SOCIAL7, ...alabamaSocialG9UNITS, ...oregonSocialG67OWNSOCIAL7],
};

export const courses: Course[] = withLessons(westVirginiaGrade("9", POOL, OWN), LESSONS);
