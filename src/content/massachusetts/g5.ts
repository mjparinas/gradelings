import type { Course } from "../types";
import type { Pool } from "../placement";
import { mental as manitobaUnitsG5MathMental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaUnitsG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { G5_UNITS as washingtonUnitsMathMiddleG5_UNITS } from "../washington/units/math-middle";
import { MATH_5 as californiaUnitsMathG5MATH_5 } from "../california/units/math-g5";
import { multimodal as manitobaUnitsG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { RML_5 as washingtonUnitsLanguageRmlMiddleRML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpellingSPELLING_5 } from "../washington/units/language-spelling";
import { LANGUAGE_5 as californiaUnitsLanguageG5LANGUAGE_5 } from "../california/units/language-g5";
import { units as ontarioG5Science } from "../ontario/g5-science";
import { units as albertaG5Science } from "../alberta/g5-science";
import { weather as manitobaUnitsG5ScienceWeather } from "../manitoba/units/g5-science";
import { SCIENCE_5 as washingtonUnitsScience35SCIENCE_5 } from "../washington/units/science-35";
import { SCIENCE_COPIES as californiaUnitsScienceG5SCIENCE_COPIES } from "../california/units/science-g5";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL_5 } from "../california/units/social-g5";
import { G8 as washingtonUnitsSocial59G8G8 } from "../washington/units/social-59-g8";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL_8 } from "../california/units/social-g8";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { UNITS as newYorkUnitsSocialG8UNITS } from "../new-york/units/social-g8";
import { massachusettsGrade } from "./kit";
import { OWN } from "./units/own-g5";

// Massachusetts Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [manitobaUnitsG5MathMental, manitobaUnitsG5MathQuadrilaterals, ...washingtonUnitsMathMiddleG5_UNITS, ...californiaUnitsMathG5MATH_5],
  language: [manitobaUnitsG5MoreLanguageMultimodal, washingtonUnitsLanguageRmlMiddleRML_5, washingtonUnitsLanguageSpellingSPELLING_5, ...californiaUnitsLanguageG5LANGUAGE_5],
  science: [...ontarioG5Science, ...albertaG5Science, manitobaUnitsG5ScienceWeather, ...washingtonUnitsScience35SCIENCE_5, ...californiaUnitsScienceG5SCIENCE_COPIES],
  social: [...washingtonUnitsSocial59G5G5, ...californiaUnitsSocialG5SOCIAL_5, ...washingtonUnitsSocial59G8G8, ...californiaUnitsSocialG8SOCIAL_8, oregonUnitsSocialCopiesReconstruction8, ...newYorkUnitsSocialG8UNITS],
};

export const courses: Course[] = massachusettsGrade("5", POOL, OWN);
