import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG5ScienceUnits } from "../alberta/g5-science";
import { LANGUAGE_5 as californiaUnitsLanguageG5LANGUAGE5 } from "../california/units/language-g5";
import { MATH_5 as californiaUnitsMathG5MATH5 } from "../california/units/math-g5";
import { SCIENCE_COPIES as californiaUnitsScienceG5SCIENCECOPIES } from "../california/units/science-g5";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL5 } from "../california/units/social-g5";
import { mental as manitobaUnitsG5MathMental, quadrilaterals as manitobaUnitsG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaUnitsG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { weather as manitobaUnitsG5ScienceWeather } from "../manitoba/units/g5-science";
import { UNITS as newYorkUnitsSocialG5UNITS } from "../new-york/units/social-g5";
import { units as ontarioG5ScienceUnits } from "../ontario/g5-science";
import { SCIENCE_5 as oregonUnitsScience35SCIENCE5 } from "../oregon/units/science-35";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../oregon/units/social-g5";
import { RML_5 as washingtonUnitsLanguageRmlMiddleRML5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpellingSPELLING5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonUnitsMathMiddleG5UNITS } from "../washington/units/math-middle";
import { SCIENCE_5 as washingtonUnitsScience35SCIENCE5 } from "../washington/units/science-35";
import { indianaGrade } from "./kit";
import { OWN } from "./units/own-g5";

// Indiana Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [manitobaUnitsG5MathMental, manitobaUnitsG5MathQuadrilaterals, ...washingtonUnitsMathMiddleG5UNITS, ...californiaUnitsMathG5MATH5],
  language: [manitobaUnitsG5MoreLanguageMultimodal, washingtonUnitsLanguageRmlMiddleRML5, washingtonUnitsLanguageSpellingSPELLING5, ...californiaUnitsLanguageG5LANGUAGE5],
  science: [...ontarioG5ScienceUnits, ...albertaG5ScienceUnits, manitobaUnitsG5ScienceWeather, ...washingtonUnitsScience35SCIENCE5, ...oregonUnitsScience35SCIENCE5, ...californiaUnitsScienceG5SCIENCECOPIES],
  social: [...californiaUnitsSocialG5SOCIAL5, ...newYorkUnitsSocialG5UNITS, ...oregonUnitsSocialG5OWNSOCIAL5],
};

export const courses: Course[] = indianaGrade("5", POOL, OWN);
