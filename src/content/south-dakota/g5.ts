import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG5Science } from "../alberta/g5-science";
import { mental as manitobaG5MathMental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { weather as manitobaG5ScienceWeather } from "../manitoba/units/g5-science";
import { units as ontarioG5Science } from "../ontario/g5-science";
import { SCIENCE_5 as oregonScience35SCIENCE_5 } from "../oregon/units/science-35";
import { RML_5 as washingtonLanguageRmlMiddleRML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonLanguageSpellingSPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonMathMiddleG5_UNITS } from "../washington/units/math-middle";
import { SCIENCE_5 as washingtonScience35SCIENCE_5 } from "../washington/units/science-35";
import { LANGUAGE_5 as californiaLanguage5 } from "../california/units/language-g5";
import { MATH_5 as californiaMath5 } from "../california/units/math-g5";
import { SCIENCE_COPIES as californiaScienceCopies5 } from "../california/units/science-g5";
import { SOCIAL_6 as georgiaUnitsSocialG67_SOCIAL6 } from "../georgia/units/social-g67";
import { course as gradesG8Social_course } from "../grades/g8/social";
import { SOCIAL_7 as californiaUnitsSocialG7_SOCIAL7 } from "../california/units/social-g7";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL8 } from "../california/units/social-g8";
import { reconstruction8 as oregonUnitsSocialCopies_reconstruction8 } from "../oregon/units/social-copies";
import { UNITS as newYorkUnitsSocialG8_UNITS } from "../new-york/units/social-g8";
import { withLessons } from "../lessons";
import { southDakotaGrade } from "./kit";
import { LESSONS } from "./lessons/g5";
import { OWN } from "./units/own-g5";

// South Dakota Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for South Dakota's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [manitobaG5MathMental, manitobaG5MathQuadrilaterals, ...washingtonMathMiddleG5_UNITS, ...californiaMath5],
  language: [manitobaG5MoreLanguageMultimodal, washingtonLanguageRmlMiddleRML_5, washingtonLanguageSpellingSPELLING_5, ...californiaLanguage5],
  science: [...ontarioG5Science, ...albertaG5Science, manitobaG5ScienceWeather, ...washingtonScience35SCIENCE_5, ...oregonScience35SCIENCE_5, ...californiaScienceCopies5],
  social: [...georgiaUnitsSocialG67_SOCIAL6, ...gradesG8Social_course.units, ...californiaUnitsSocialG7_SOCIAL7, ...californiaUnitsSocialG5_SOCIAL5, ...californiaUnitsSocialG8_SOCIAL8, oregonUnitsSocialCopies_reconstruction8, ...newYorkUnitsSocialG8_UNITS],
};

export const courses: Course[] = withLessons(southDakotaGrade("5", POOL, OWN), LESSONS);
