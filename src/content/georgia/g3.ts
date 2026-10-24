import type { Course } from "../types";
import type { Pool } from "../placement";
import { LANGUAGE_3 as californiaUnitsLanguageG3LANGUAGE3 } from "../california/units/language-g3";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL5 } from "../california/units/social-g5";
import { course as gradesG4MathCourse } from "../grades/g4/math";
import { polygons as manitobaUnitsG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaUnitsG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { units as manitobaUnitsG4MoreScienceUnits } from "../manitoba/units/g4-more-science";
import { UNITS as newYorkUnitsScienceG3UNITS } from "../new-york/units/science-g3";
import { UNITS as newYorkUnitsSocialG3UNITS } from "../new-york/units/social-g3";
import { units as ontarioG3LanguageUnits } from "../ontario/g3-language";
import { units as ontarioG3MathUnits } from "../ontario/g3-math";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3OWNSOCIAL2 } from "../oregon/units/social-k3";
import { peMinerals4 as princeEdwardIslandUnitsG4ScienceSocialPeMinerals4 } from "../prince-edward-island/units/g4-science-social";
import { OWN as texasCoursesScience1OWN } from "../texas/courses/science-1";
import { OWN as texasCoursesScience5OWN } from "../texas/courses/science-5";
import { RML_3 as washingtonUnitsLanguageRmlMiddleRML3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonUnitsMathMiddleG3UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../washington/units/science-35";
import { georgiaGrade } from "./kit";
import { OWN } from "./units/own-g3";

// Georgia Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG3MathUnits, manitobaUnitsG3MathPolygons, ...washingtonUnitsMathMiddleG3UNITS, ...gradesG4MathCourse.units],
  language: [...ontarioG3LanguageUnits, manitobaUnitsG3MoreLanguageWonder, washingtonUnitsLanguageRmlMiddleRML3, ...californiaUnitsLanguageG3LANGUAGE3],
  science: [princeEdwardIslandUnitsG4ScienceSocialPeMinerals4, ...newYorkUnitsScienceG3UNITS, ...manitobaUnitsG4MoreScienceUnits, ...washingtonUnitsScience35SCIENCE3, ...texasCoursesScience5OWN, ...texasCoursesScience1OWN],
  social: [...oregonUnitsSocialK3OWNSOCIAL2, ...californiaUnitsSocialG5SOCIAL5, ...newYorkUnitsSocialG3UNITS],
};

export const courses: Course[] = georgiaGrade("3", POOL, OWN);
