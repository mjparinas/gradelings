import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { units as albertaG7Math } from "../alberta/g7-math";
import { G7_UNITS as washingtonUnitsMathUpperG7_UNITS } from "../washington/units/math-upper";
import { MATH_7 as californiaUnitsMathG7MATH_7 } from "../california/units/math-g7";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { wordRoots as manitobaUnitsG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { RML_7 as washingtonUnitsLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE_6 } from "../washington/units/science-68";
import { units as ontarioG8Science } from "../ontario/g8-science";
import { units as ontarioG7Science } from "../ontario/g7-science";
import { SCIENCE_7 as washingtonUnitsScience68SCIENCE_7 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE_8 } from "../washington/units/science-68";
import { OWN_SCIENCE as californiaUnitsScienceG8OWN_SCIENCE } from "../california/units/science-g8";
import { G6 as washingtonUnitsSocial59G6G6 } from "../washington/units/social-59-g6";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL_6 } from "../california/units/social-g6";
import { UNITS as newYorkUnitsSocialG6UNITS } from "../new-york/units/social-g6";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL_7 } from "../california/units/social-g7";
import { SOCIAL_6 as georgiaUnitsSocialG67SOCIAL_6 } from "../georgia/units/social-g67";
import { massachusettsGrade } from "./kit";
import { OWN } from "./units/own-g7";

// Massachusetts Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math, ...washingtonUnitsMathUpperG7_UNITS, ...californiaUnitsMathG7MATH_7],
  language: [...ontarioG7Language, manitobaUnitsG7LanguageWordRoots, ...washingtonUnitsLanguageRmlUpperRML_7, washingtonUnitsLanguageSpellingSPELLING_7],
  science: [...washingtonUnitsScience68SCIENCE_6, ...ontarioG8Science, ...ontarioG7Science, ...washingtonUnitsScience68SCIENCE_7, ...washingtonUnitsScience68SCIENCE_8, ...californiaUnitsScienceG8OWN_SCIENCE],
  social: [...washingtonUnitsSocial59G6G6, ...californiaUnitsSocialG6SOCIAL_6, ...newYorkUnitsSocialG6UNITS, ...californiaUnitsSocialG7SOCIAL_7, ...georgiaUnitsSocialG67SOCIAL_6],
};

export const courses: Course[] = massachusettsGrade("7", POOL, OWN);
