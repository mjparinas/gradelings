import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4ScienceUnits } from "../alberta/g4-science";
import { units as albertaG5ScienceUnits } from "../alberta/g5-science";
import { LANGUAGE_5 as californiaLanguageG5LANGUAGE_5 } from "../california/units/language-g5";
import { MATH_5 as californiaMathG5MATH_5 } from "../california/units/math-g5";
import { SOCIAL_5 as californiaSocialG5SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaSocialG8SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG3ScienceCourse } from "../grades/g3/science";
import { speed as manitobaG3ScienceSpeed } from "../manitoba/units/g3-science";
import { quadrilaterals as manitobaG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { mental as manitobaG5MathMental } from "../manitoba/units/g5-math";
import { multimodal as manitobaG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { friction as manitobaG5ScienceFriction } from "../manitoba/units/g5-science";
import { UNITS as newYorkSocialG5UNITS } from "../new-york/units/social-g5";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { units as ontarioG5ScienceUnits } from "../ontario/g5-science";
import { OWN_SOCIAL_5 as oregonSocialG5OWN_SOCIAL_5 } from "../oregon/units/social-g5";
import { SCIENCE_5 as texasScience5SCIENCE_5 } from "../texas/units/science-5";
import { RML_5 as washingtonLanguageRmlMiddleRML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonLanguageSpellingSPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonMathMiddleG5_UNITS } from "../washington/units/math-middle";
import { SCIENCE_5 as washingtonScience35SCIENCE_5 } from "../washington/units/science-35";
import { G5 as washingtonSocial59G5G5 } from "../washington/units/social-59-g5";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/g5";
import { OWN } from "./units/own-g5";

// Mississippi Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...washingtonMathMiddleG5_UNITS, ...californiaMathG5MATH_5, manitobaG5MathMental, manitobaG5MathQuadrilaterals],
  language: [...californiaLanguageG5LANGUAGE_5, washingtonLanguageRmlMiddleRML_5, washingtonLanguageSpellingSPELLING_5, manitobaG5MoreLanguageMultimodal],
  science: [...ontarioG5ScienceUnits, manitobaG3ScienceSpeed, ...albertaG5ScienceUnits, manitobaG5ScienceFriction, ...texasScience5SCIENCE_5, ...albertaG4ScienceUnits, ...ontarioG4ScienceUnits, ...gradesG3ScienceCourse.units, ...washingtonScience35SCIENCE_5],
  social: [...californiaSocialG5SOCIAL_5, ...newYorkSocialG5UNITS, ...oregonSocialG5OWN_SOCIAL_5, ...californiaSocialG8SOCIAL_8, ...washingtonSocial59G5G5],
};

export const courses: Course[] = withLessons(mississippiGrade("5", POOL, OWN), LESSONS);
