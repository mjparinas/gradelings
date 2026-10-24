import type { Course } from "../types";
import type { Pool } from "../placement";
import { LANGUAGE_5 as californiaUnitsLanguageG5LANGUAGE5 } from "../california/units/language-g5";
import { MATH_5 as californiaUnitsMathG5MATH5 } from "../california/units/math-g5";
import { course as gradesG3ScienceCourse } from "../grades/g3/science";
import { mental as manitobaUnitsG5MathMental, quadrilaterals as manitobaUnitsG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaUnitsG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { UNITS as newYorkUnitsSocialG8UNITS } from "../new-york/units/social-g8";
import { units as ontarioG5ScienceUnits } from "../ontario/g5-science";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../oregon/units/social-g5";
import { peElectromagnets6 as princeEdwardIslandUnitsG6WorldSciencePeElectromagnets6, peMicrobesArthropods6 as princeEdwardIslandUnitsG6WorldSciencePeMicrobesArthropods6 } from "../prince-edward-island/units/g6-world-science";
import { OWN as texasCoursesScience5OWN } from "../texas/courses/science-5";
import { RML_5 as washingtonUnitsLanguageRmlMiddleRML5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpellingSPELLING5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonUnitsMathMiddleG5UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../washington/units/science-35";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6 } from "../washington/units/science-68";
import { georgiaGrade } from "./kit";
import { OWN } from "./units/own-g5";

// Georgia Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [manitobaUnitsG5MathMental, manitobaUnitsG5MathQuadrilaterals, ...washingtonUnitsMathMiddleG5UNITS, ...californiaUnitsMathG5MATH5],
  language: [manitobaUnitsG5MoreLanguageMultimodal, washingtonUnitsLanguageRmlMiddleRML5, washingtonUnitsLanguageSpellingSPELLING5, ...californiaUnitsLanguageG5LANGUAGE5],
  science: [...gradesG3ScienceCourse.units, ...texasCoursesScience5OWN, ...washingtonUnitsScience35SCIENCE3, ...washingtonUnitsScience68SCIENCE6, princeEdwardIslandUnitsG6WorldSciencePeMicrobesArthropods6, ...ontarioG5ScienceUnits, princeEdwardIslandUnitsG6WorldSciencePeElectromagnets6],
  social: [...newYorkUnitsSocialG8UNITS, ...oregonUnitsSocialG5OWNSOCIAL5],
};

export const courses: Course[] = georgiaGrade("5", POOL, OWN);
