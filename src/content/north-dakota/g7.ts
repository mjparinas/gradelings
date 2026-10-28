import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Science } from "../alberta/g6-science";
import { units as albertaG7Math } from "../alberta/g7-math";
import { units as albertaG7Science } from "../alberta/g7-science";
import { course as gradesG6Science } from "../grades/g6/science";
import { wordRoots as manitobaG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { units as ontarioG7Science } from "../ontario/g7-science";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonMathUpperG7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonScience68SCIENCE_7 } from "../washington/units/science-68";
import { LANGUAGE_7 as californiaLanguage7 } from "../california/units/language-g7";
import { MATH_7 as californiaMath7 } from "../california/units/math-g7";
import { OWN_SCIENCE as californiaOwnScience7, SCIENCE_COPIES as californiaScienceCopies7 } from "../california/units/science-g7";
import { SOCIAL_COPIES as georgiaCopiesG7SOCIAL_COPIES } from "../georgia/units/copies-g7";
import { worldMaps6 as oregonSocialCopiesWorldMaps6 } from "../oregon/units/social-copies";
import { UNITS as newYorkSocialG6 } from "../new-york/units/social-g6";
import { SOCIAL_6 as georgiaSocial6, SOCIAL_7 as georgiaSocial7 } from "../georgia/units/social-g67";
import { course as gradesG7Social } from "../grades/g7/social";
import { withLessons } from "../lessons";
import { northDakotaGrade } from "./kit";
import { LESSONS } from "./lessons/g7";
import { OWN } from "./units/own-g7";

// North Dakota Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for North Dakota's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7_UNITS, ...californiaMath7],
  language: [...ontarioG7Language, manitobaG7LanguageWordRoots, ...washingtonLanguageRmlUpperRML_7, washingtonLanguageSpellingSPELLING_7, ...californiaLanguage7],
  science: [...ontarioG7Science, ...albertaG7Science, ...washingtonScience68SCIENCE_7, ...gradesG6Science.units, ...albertaG6Science, ...californiaOwnScience7, ...californiaScienceCopies7],
  social: [oregonSocialCopiesWorldMaps6, ...newYorkSocialG6, ...georgiaSocial6, ...georgiaSocial7, ...georgiaCopiesG7SOCIAL_COPIES, ...gradesG7Social.units],
};

export const courses: Course[] = withLessons(northDakotaGrade("7", POOL, OWN), LESSONS);
