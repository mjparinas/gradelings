import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as ontarioG3Math } from "../ontario/g3-math";
import { polygons as manitobaUnitsG3MathPolygons } from "../manitoba/units/g3-math";
import { G3_UNITS as washingtonUnitsMathMiddleG3_UNITS } from "../washington/units/math-middle";
import { units as ontarioG3Language } from "../ontario/g3-language";
import { wonder as manitobaUnitsG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { RML_3 as washingtonUnitsLanguageRmlMiddleRML_3 } from "../washington/units/language-rml-middle";
import { LANGUAGE_3 as californiaUnitsLanguageG3LANGUAGE_3 } from "../california/units/language-g3";
import { units as ontarioG3Science } from "../ontario/g3-science";
import { life as manitobaUnitsG3ScienceLife } from "../manitoba/units/g3-science";
import { speed as manitobaUnitsG3ScienceSpeed } from "../manitoba/units/g3-science";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE_3 } from "../washington/units/science-35";
import { SCIENCE_3 as oregonUnitsScience35SCIENCE_3 } from "../oregon/units/science-35";
import { SCIENCE_5 as oregonUnitsScience35SCIENCE_5 } from "../oregon/units/science-35";
import { OWN_SCIENCE as californiaUnitsScienceG4OWN_SCIENCE } from "../california/units/science-g4";
import { UNITS as newYorkUnitsSocialG3UNITS } from "../new-york/units/social-g3";
import { UNITS as newYorkUnitsSocialG5UNITS } from "../new-york/units/social-g5";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { massachusettsGrade } from "./kit";
import { OWN } from "./units/own-g3";

// Massachusetts Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG3Math, manitobaUnitsG3MathPolygons, ...washingtonUnitsMathMiddleG3_UNITS],
  language: [...ontarioG3Language, manitobaUnitsG3MoreLanguageWonder, washingtonUnitsLanguageRmlMiddleRML_3, ...californiaUnitsLanguageG3LANGUAGE_3],
  science: [...ontarioG3Science, manitobaUnitsG3ScienceLife, manitobaUnitsG3ScienceSpeed, ...washingtonUnitsScience35SCIENCE_3, ...oregonUnitsScience35SCIENCE_3, ...oregonUnitsScience35SCIENCE_5, ...californiaUnitsScienceG4OWN_SCIENCE],
  social: [...newYorkUnitsSocialG3UNITS, ...newYorkUnitsSocialG5UNITS, ...washingtonUnitsSocial59G5G5],
};

export const courses: Course[] = massachusettsGrade("3", POOL, OWN);
