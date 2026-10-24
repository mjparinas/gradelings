import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG8Math } from "../alberta/g8-math";
import { units as manitobaG8MoreLanguage } from "../manitoba/units/g8-more-language";
import { units as ontarioG8Language } from "../ontario/g8-language";
import { units as ontarioG8Math } from "../ontario/g8-math";
import { WEIGH_THE_EVIDENCE as oregonLanguageWEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { RML_8 as washingtonLanguageRmlUpperRML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonMathUpperG8_UNITS } from "../washington/units/math-upper";
import { LANGUAGE_8 as californiaLanguage8 } from "../california/units/language-g8";
import { MATH_8 as californiaMath8 } from "../california/units/math-g8";
import { ohioGrade } from "./kit";
import { OWN } from "./units/own-g8";
import { units as sci0 } from "../manitoba/units/g8-science";
import { course as sci1 } from "../grades/g7/science";
import { SCIENCE_8 as sci2 } from "../washington/units/science-68";
import { units as sci3 } from "../alberta/g7-science";
import { course as sci4 } from "../grades/g6/science";
import { G5 as soc0 } from "../washington/units/social-59-g5";
import { G8 as soc1 } from "../washington/units/social-59-g8";
import { reconstruction8 as soc2 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_8 as soc3 } from "../oregon/units/social-g8";
import { SOCIAL_8 as soc4 } from "../california/units/social-g8";
import { units as soc5 } from "../ontario/g8-social";
import { units as soc6 } from "../manitoba/units/g8-more-social-b";
import { SCIENCE_6 as scix0 } from "../texas/units/science-6";
import { SCIENCE_7 as scix1 } from "../texas/units/science-7";

// Ohio Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG8Math, ...albertaG8Math, ...washingtonMathUpperG8_UNITS, ...californiaMath8],
  language: [...ontarioG8Language, ...manitobaG8MoreLanguage, ...washingtonLanguageRmlUpperRML_8, oregonLanguageWEIGH_THE_EVIDENCE, ...californiaLanguage8],
  science: [...sci0, ...sci1.units, ...sci2, ...sci3, ...sci4.units, ...scix0, ...scix1],
  social: [...soc0, ...soc1, soc2, ...soc3, ...soc4, ...soc5, ...soc6],
};

export const courses: Course[] = ohioGrade("8", POOL, OWN);
