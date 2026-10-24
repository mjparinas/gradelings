import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as manitobaG9MoreLanguage } from "../manitoba/units/g9-more-language";
import { units as ontarioG9Language } from "../ontario/g9-language";
import { units as ontarioG9Math } from "../ontario/g9-math";
import { MEDIA_ANALYSIS as oregonLanguageMEDIA_ANALYSIS } from "../oregon/units/language";
import { RML_9 as washingtonLanguageRmlUpperRML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonLanguageSpellingSPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonMathUpperG9_UNITS } from "../washington/units/math-upper";
import { LANGUAGE_9 as californiaLanguage9 } from "../california/units/language-g9";
import { MATH_9 as californiaMath9 } from "../california/units/math-g9";
import { ohioGrade } from "./kit";
import { OWN } from "./units/own-g9";
import { units as sci0 } from "../ontario/g9-science";
import { SCIENCE_9 as sci1 } from "../washington/units/science-9";
import { SCIENCE_COPIES as sci2 } from "../california/units/science-g9";
import { OWN_SCIENCE as sci3 } from "../california/units/science-g9";
import { PHYSICAL_SCIENCE as sci4 } from "../california/units/science-g9-physical";
import { SOCIAL_9 as soc0 } from "../california/units/social-g9";

// Ohio Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG9Math, ...washingtonMathUpperG9_UNITS, ...californiaMath9],
  language: [...ontarioG9Language, ...manitobaG9MoreLanguage, ...washingtonLanguageRmlUpperRML_9, washingtonLanguageSpellingSPELLING_9, oregonLanguageMEDIA_ANALYSIS, ...californiaLanguage9],
  science: [...sci0, ...sci1, ...sci2, ...sci3, ...sci4],
  social: [...soc0],
};

export const courses: Course[] = ohioGrade("9", POOL, OWN);
