import type { Course } from "../types";
import type { Pool } from "../placement";
import { LANGUAGE_3 as californiaUnitsLanguageG3LANGUAGE3 } from "../california/units/language-g3";
import { course as gradesG1ScienceCourse } from "../grades/g1/science";
import { course as gradesG5ScienceCourse } from "../grades/g5/science";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { polygons as manitobaUnitsG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaUnitsG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { speed as manitobaUnitsG3ScienceSpeed } from "../manitoba/units/g3-science";
import { life as manitobaUnitsG3SocialBLife } from "../manitoba/units/g3-social-b";
import { units as ontarioG2SocialUnits } from "../ontario/g2-social";
import { units as ontarioG3LanguageUnits } from "../ontario/g3-language";
import { units as ontarioG3MathUnits } from "../ontario/g3-math";
import { units as ontarioG3ScienceUnits } from "../ontario/g3-science";
import { units as ontarioG5ScienceUnits } from "../ontario/g5-science";
import { peGrowingConditions3 as princeEdwardIslandUnitsG3ScienceSocialPeGrowingConditions3 } from "../prince-edward-island/units/g3-science-social";
import { OWN as texasCoursesScience1OWN } from "../texas/courses/science-1";
import { RML_3 as washingtonUnitsLanguageRmlMiddleRML3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonUnitsMathMiddleG3UNITS } from "../washington/units/math-middle";
import { northCarolinaGrade } from "./kit";
import { OWN } from "./units/own-g3";

// North Carolina Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG3MathUnits, manitobaUnitsG3MathPolygons, ...washingtonUnitsMathMiddleG3UNITS],
  language: [...ontarioG3LanguageUnits, manitobaUnitsG3MoreLanguageWonder, washingtonUnitsLanguageRmlMiddleRML3, ...californiaUnitsLanguageG3LANGUAGE3],
  science: [...ontarioG5ScienceUnits, ...ontarioG3ScienceUnits, manitobaUnitsG3ScienceSpeed, ...texasCoursesScience1OWN, ...gradesG5ScienceCourse.units, princeEdwardIslandUnitsG3ScienceSocialPeGrowingConditions3, ...gradesG6ScienceCourse.units, ...gradesG1ScienceCourse.units],
  social: [manitobaUnitsG3SocialBLife, ...ontarioG2SocialUnits],
};

export const courses: Course[] = northCarolinaGrade("3", POOL, OWN);
