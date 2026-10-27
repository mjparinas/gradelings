import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG5ScienceUnits } from "../alberta/g5-science";
import { LANGUAGE_5 as californiaLanguage5 } from "../california/units/language-g5";
import { MATH_5 as californiaMath5 } from "../california/units/math-g5";
import { SOCIAL_8 as californiaSocialG8SOCIAL8 } from "../california/units/social-g8";
import { SOCIAL_5 as georgiaSocialG5SOCIAL5 } from "../georgia/units/social-g5";
import { mental as manitobaG5MathMental, quadrilaterals as manitobaG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { weather as manitobaG5ScienceWeather } from "../manitoba/units/g5-science";
import { UNITS as newYorkSocialG8UNITS } from "../new-york/units/social-g8";
import { units as ontarioG5ScienceUnits } from "../ontario/g5-science";
import { SCIENCE_5 as oregonScience35SCIENCE5 } from "../oregon/units/science-35";
import { reconstruction8 as oregonSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonSocialG5OWNSOCIAL5 } from "../oregon/units/social-g5";
import { RML_5 as washingtonLanguageRmlMiddleRML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonLanguageSpellingSPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonMathMiddleG5_UNITS } from "../washington/units/math-middle";
import { SCIENCE_5 as washingtonScience35SCIENCE5 } from "../washington/units/science-35";
import { G8 as washingtonSocial59G8G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/g5";
import { OWN } from "./units/own-g5";

// West Virginia Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [manitobaG5MathMental, manitobaG5MathQuadrilaterals, ...washingtonMathMiddleG5_UNITS, ...californiaMath5],
  language: [manitobaG5MoreLanguageMultimodal, washingtonLanguageRmlMiddleRML_5, washingtonLanguageSpellingSPELLING_5, ...californiaLanguage5],
  science: [...ontarioG5ScienceUnits, ...albertaG5ScienceUnits, manitobaG5ScienceWeather, ...washingtonScience35SCIENCE5, ...oregonScience35SCIENCE5],
  social: [...californiaSocialG8SOCIAL8, ...washingtonSocial59G8G8, oregonSocialCopiesReconstruction8, ...newYorkSocialG8UNITS, ...georgiaSocialG5SOCIAL5, ...oregonSocialG5OWNSOCIAL5],
};

export const courses: Course[] = withLessons(westVirginiaGrade("5", POOL, OWN), LESSONS);
