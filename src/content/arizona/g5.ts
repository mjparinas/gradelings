import type { Course } from "../types";
import type { Pool } from "../placement";
import { mental as manitobaG5MathMental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { RML_5 as washingtonLanguageRmlMiddleRML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonLanguageSpellingSPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonMathMiddleG5_UNITS } from "../washington/units/math-middle";
import { units as albertaG5Science } from "../alberta/g5-science";
import { units as ontarioG5Science } from "../ontario/g5-science";
import { speed as manitobaG3ScienceSpeed } from "../manitoba/units/g3-science";
import { UNITS as newYorkScience5 } from "../new-york/units/science-g5";
import { SCIENCE_5 as texasScience5 } from "../texas/units/science-5";
import { SCIENCE_3 as washingtonScience35SCIENCE_3 } from "../washington/units/science-35";
import { SCIENCE_5 as oregonScience35SCIENCE_5 } from "../oregon/units/science-35";
import { SOCIAL_5 as californiaSocial5 } from "../california/units/social-g5";
import { G5 as washingtonSocial59G5G5 } from "../washington/units/social-59-g5";
import { SOCIAL_8 as californiaSocial8 } from "../california/units/social-g8";
import { reconstruction8 as oregonSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonSocialG5OWN_SOCIAL_5 } from "../oregon/units/social-g5";
import { arizonaGrade } from "./kit";

// Arizona Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [manitobaG5MathMental, manitobaG5MathQuadrilaterals, ...washingtonMathMiddleG5_UNITS],
  language: [manitobaG5MoreLanguageMultimodal, washingtonLanguageRmlMiddleRML_5, washingtonLanguageSpellingSPELLING_5],
  science: [...ontarioG5Science, ...albertaG5Science, manitobaG3ScienceSpeed, ...newYorkScience5, ...texasScience5, ...washingtonScience35SCIENCE_3, ...oregonScience35SCIENCE_5],
  social: [...californiaSocial5, ...washingtonSocial59G5G5, ...californiaSocial8, oregonSocialCopiesReconstruction8, ...oregonSocialG5OWN_SOCIAL_5],
};

export const courses: Course[] = arizonaGrade("5", POOL, {});
