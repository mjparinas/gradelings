import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Math } from "../alberta/g6-math";
import { senses as newBrunswickG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { units as ontarioG6Language } from "../ontario/g6-language";
import { units as ontarioG6Math } from "../ontario/g6-math";
import { units as ontarioG8Science } from "../ontario/g8-science";
import { RML_6 as washingtonLanguageRmlUpperRML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonLanguageSpellingSPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonMathUpperG6_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonScience68SCIENCE_6 } from "../washington/units/science-68";
import { course as gradesG7Social } from "../grades/g7/social";
import { LANGUAGE_6 as californiaLanguage6 } from "../california/units/language-g6";
import { MATH_6 as californiaMath6 } from "../california/units/math-g6";
import { OWN_SCIENCE as californiaOwnScience6, SCIENCE_COPIES as californiaScienceCopies6 } from "../california/units/science-g6";
import { SOCIAL_6 as georgiaSocial6 } from "../georgia/units/social-g67";
import { worldMaps6 as oregonSocialCopiesWorldMaps6 } from "../oregon/units/social-copies";
import { SOCIAL_7 as californiaSocial7 } from "../california/units/social-g7";
import { SOCIAL_6 as texasSocial6 } from "../texas/units/social-g6";
import { units as ontarioG8Social } from "../ontario/g8-social";
import { withLessons } from "../lessons";
import { connecticutGrade } from "./kit";
import { LESSONS } from "./lessons/g6";
import { OWN } from "./units/own-g6";

// Connecticut Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Connecticut's own units.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math, ...washingtonMathUpperG6_UNITS, ...californiaMath6],
  language: [...ontarioG6Language, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6, ...californiaLanguage6],
  science: [newBrunswickG6ScienceSenses, ...washingtonScience68SCIENCE_6, ...ontarioG8Science, ...californiaOwnScience6, ...californiaScienceCopies6],
  social: [...gradesG7Social.units, ...georgiaSocial6, oregonSocialCopiesWorldMaps6, ...californiaSocial7, ...texasSocial6, ...ontarioG8Social],
};

export const courses: Course[] = withLessons(connecticutGrade("6", POOL, OWN), LESSONS);
