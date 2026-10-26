import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG5Science } from "../alberta/g5-science";
import { LANGUAGE_5 as californiaUnitsLanguageG5LANGUAGE_5 } from "../california/units/language-g5";
import { MATH_5 as californiaUnitsMathG5MATH_5 } from "../california/units/math-g5";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL_5 } from "../california/units/social-g5";
import { mental as manitobaUnitsG5MathMental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaUnitsG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaUnitsG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { weather as manitobaUnitsG5ScienceWeather } from "../manitoba/units/g5-science";
import { units as ontarioG5Science } from "../ontario/g5-science";
import { SCIENCE_5 as oregonUnitsScience35SCIENCE_5 } from "../oregon/units/science-35";
import { RML_5 as washingtonUnitsLanguageRmlMiddleRML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpellingSPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonUnitsMathMiddleG5_UNITS } from "../washington/units/math-middle";
import { SCIENCE_5 as washingtonUnitsScience35SCIENCE_5 } from "../washington/units/science-35";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { G8 as washingtonUnitsSocial59G8G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { idahoGrade } from "./kit";
import { LESSONS } from "./lessons/g5";
import { OWN } from "./units/own-g5";

// Idaho Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Idaho's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [manitobaUnitsG5MathMental, manitobaUnitsG5MathQuadrilaterals, ...washingtonUnitsMathMiddleG5_UNITS, ...californiaUnitsMathG5MATH_5],
  language: [manitobaUnitsG5MoreLanguageMultimodal, washingtonUnitsLanguageRmlMiddleRML_5, washingtonUnitsLanguageSpellingSPELLING_5, ...californiaUnitsLanguageG5LANGUAGE_5],
  science: [...ontarioG5Science, ...albertaG5Science, manitobaUnitsG5ScienceWeather, ...washingtonUnitsScience35SCIENCE_5, ...oregonUnitsScience35SCIENCE_5],
  social: [...washingtonUnitsSocial59G5G5, ...californiaUnitsSocialG5SOCIAL_5, ...washingtonUnitsSocial59G8G8],
};

export const courses: Course[] = withLessons(idahoGrade("5", POOL, OWN), LESSONS);
