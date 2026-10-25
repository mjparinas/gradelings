import type { Course } from "../types";
import type { Pool } from "../placement";
import { COMPARE_AND_CONNECT_3 as californiaUnitsLanguageG3COMPAREANDCONNECT3 } from "../california/units/language-g3";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL6 } from "../california/units/social-g6";
import { course as gradesG2ScienceCourse } from "../grades/g2/science";
import { course as gradesG4MathCourse } from "../grades/g4/math";
import { polygons as manitobaUnitsG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaUnitsG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { life as manitobaUnitsG3ScienceLife, speed as manitobaUnitsG3ScienceSpeed } from "../manitoba/units/g3-science";
import { units as manitobaUnitsG4MoreScienceUnits } from "../manitoba/units/g4-more-science";
import { UNITS as newYorkUnitsSocialG3UNITS } from "../new-york/units/social-g3";
import { units as ontarioG3LanguageUnits } from "../ontario/g3-language";
import { units as ontarioG3MathUnits } from "../ontario/g3-math";
import { units as ontarioG3ScienceUnits } from "../ontario/g3-science";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { OWN as texasCoursesScience5OWN } from "../texas/courses/science-5";
import { RML_3 as washingtonUnitsLanguageRmlMiddleRML3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonUnitsMathMiddleG3UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../washington/units/science-35";
import { G6 as washingtonUnitsSocial59G6G6 } from "../washington/units/social-59-g6";
import { virginiaGrade } from "./kit";
import { OWN } from "./units/own-g3";

// Virginia Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathMiddleG3UNITS, ...ontarioG3MathUnits, manitobaUnitsG3MathPolygons, ...gradesG4MathCourse.units],
  language: [...ontarioG3LanguageUnits, californiaUnitsLanguageG3COMPAREANDCONNECT3, washingtonUnitsLanguageRmlMiddleRML3, manitobaUnitsG3MoreLanguageWonder],
  science: [...washingtonUnitsScience35SCIENCE3, manitobaUnitsG3ScienceSpeed, manitobaUnitsG3ScienceLife, ...manitobaUnitsG4MoreScienceUnits, ...texasCoursesScience5OWN, ...gradesG2ScienceCourse.units, ...ontarioG4ScienceUnits, ...ontarioG3ScienceUnits],
  social: [...newYorkUnitsSocialG3UNITS, ...washingtonUnitsSocial59G6G6, ...californiaUnitsSocialG6SOCIAL6],
};

export const courses: Course[] = virginiaGrade("3", POOL, OWN);
