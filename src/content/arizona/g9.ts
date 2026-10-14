import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG9Science } from "../alberta/g9-science";
import { units as manitobaG9MoreLanguage } from "../manitoba/units/g9-more-language";
import { units as manitobaG9MoreScience } from "../manitoba/units/g9-more-science";
import { units as manitobaG9Science } from "../manitoba/units/g9-science";
import { units as ontarioG9Language } from "../ontario/g9-language";
import { units as ontarioG9Math } from "../ontario/g9-math";
import { units as ontarioG9Science } from "../ontario/g9-science";
import { MEDIA_ANALYSIS as oregonLanguageMEDIA_ANALYSIS } from "../oregon/units/language";
import { RML_9 as washingtonLanguageRmlUpperRML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonLanguageSpellingSPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonMathUpperG9_UNITS } from "../washington/units/math-upper";
import { SCIENCE_9 as washingtonScience9SCIENCE_9 } from "../washington/units/science-9";
import { SOCIAL_9 as californiaSocial9 } from "../california/units/social-g9";
import { SOCIAL_9 as texasSocial9 } from "../texas/units/social-g9";
import { OWN } from "./units/own-g9";
import { arizonaGrade } from "./kit";

// Arizona Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG9Math, ...washingtonMathUpperG9_UNITS],
  language: [...ontarioG9Language, ...manitobaG9MoreLanguage, ...washingtonLanguageRmlUpperRML_9, washingtonLanguageSpellingSPELLING_9, oregonLanguageMEDIA_ANALYSIS],
  science: [...ontarioG9Science, ...albertaG9Science, ...manitobaG9Science, ...manitobaG9MoreScience, ...washingtonScience9SCIENCE_9],
  social: [...californiaSocial9, ...texasSocial9],
};

export const courses: Course[] = arizonaGrade("9", POOL, OWN);
