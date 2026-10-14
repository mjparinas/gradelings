import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7Math } from "../alberta/g7-math";
import { wordRoots as manitobaG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonMathUpperG7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonScience68SCIENCE_6, SCIENCE_7 as washingtonScience68SCIENCE_7 } from "../washington/units/science-68";
import { course as bcG6Science } from "../grades/g6/science";
import { senses as newBrunswickG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { units as albertaG7Science } from "../alberta/g7-science";
import { motionForces as newBrunswickG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { peElectromagnets6 as princeEdwardIslandElectromagnets6 } from "../prince-edward-island/units/g6-world-science";
import { weather as manitobaG5ScienceWeather } from "../manitoba/units/g5-science";
import { SOCIAL_7 as californiaSocial7 } from "../california/units/social-g7";
import { OWN_SOCIAL_7 as oregonSocial7 } from "../oregon/units/social-g67";
import { OWN } from "./units/own-g7";
import { arizonaGrade } from "./kit";

// Arizona Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7_UNITS],
  language: [...ontarioG7Language, manitobaG7LanguageWordRoots, ...washingtonLanguageRmlUpperRML_7, washingtonLanguageSpellingSPELLING_7],
  science: [...washingtonScience68SCIENCE_6, ...bcG6Science.units, newBrunswickG6ScienceSenses, ...albertaG7Science, newBrunswickG8ScienceMotionForces, princeEdwardIslandElectromagnets6, ...washingtonScience68SCIENCE_7, manitobaG5ScienceWeather],
  social: [...californiaSocial7, ...oregonSocial7],
};

export const courses: Course[] = arizonaGrade("7", POOL, OWN);
