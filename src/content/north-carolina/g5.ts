import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG5ScienceUnits } from "../alberta/g5-science";
import { LANGUAGE_5 as californiaUnitsLanguageG5LANGUAGE5 } from "../california/units/language-g5";
import { MATH_5 as californiaUnitsMathG5MATH5 } from "../california/units/math-g5";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL8 } from "../california/units/social-g8";
import { course as gradesG3ScienceCourse } from "../grades/g3/science";
import { speed as manitobaUnitsG3ScienceSpeed } from "../manitoba/units/g3-science";
import { mental as manitobaUnitsG5MathMental, quadrilaterals as manitobaUnitsG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaUnitsG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { friction as manitobaUnitsG5ScienceFriction, weather as manitobaUnitsG5ScienceWeather } from "../manitoba/units/g5-science";
import { UNITS as newYorkUnitsSocialG8UNITS } from "../new-york/units/social-g8";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { units as ontarioG5ScienceUnits } from "../ontario/g5-science";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../oregon/units/social-g5";
import { OWN as texasCoursesScience5OWN } from "../texas/courses/science-5";
import { SOCIAL_5 as texasUnitsSocialG5SOCIAL5 } from "../texas/units/social-g5";
import { RML_5 as washingtonUnitsLanguageRmlMiddleRML5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpellingSPELLING5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonUnitsMathMiddleG5UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../washington/units/science-35";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { G8 as washingtonUnitsSocial59G8G8 } from "../washington/units/social-59-g8";
import { northCarolinaGrade } from "./kit";
import { OWN } from "./units/own-g5";

// North Carolina Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [manitobaUnitsG5MathMental, manitobaUnitsG5MathQuadrilaterals, ...washingtonUnitsMathMiddleG5UNITS, ...californiaUnitsMathG5MATH5],
  language: [manitobaUnitsG5MoreLanguageMultimodal, washingtonUnitsLanguageRmlMiddleRML5, washingtonUnitsLanguageSpellingSPELLING5, ...californiaUnitsLanguageG5LANGUAGE5],
  science: [...albertaG5ScienceUnits, ...ontarioG5ScienceUnits, manitobaUnitsG5ScienceFriction, manitobaUnitsG3ScienceSpeed, ...ontarioG4ScienceUnits, ...gradesG3ScienceCourse.units, ...texasCoursesScience5OWN, ...washingtonUnitsScience35SCIENCE3, manitobaUnitsG5ScienceWeather],
  social: [...washingtonUnitsSocial59G5G5, ...californiaUnitsSocialG5SOCIAL5, ...washingtonUnitsSocial59G8G8, ...oregonUnitsSocialG5OWNSOCIAL5, ...californiaUnitsSocialG8SOCIAL8, oregonUnitsSocialCopiesReconstruction8, ...newYorkUnitsSocialG8UNITS, ...texasUnitsSocialG5SOCIAL5],
};

export const courses: Course[] = northCarolinaGrade("5", POOL, OWN);
