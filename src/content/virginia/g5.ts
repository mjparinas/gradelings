import type { Course } from "../types";
import type { Pool } from "../placement";
import { LANGUAGE_5 as californiaUnitsLanguageG5LANGUAGE5 } from "../california/units/language-g5";
import { LINE_PLOTS_5 as californiaUnitsMathG5LINEPLOTS5 } from "../california/units/math-g5";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL5 } from "../california/units/social-g5";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL7 } from "../california/units/social-g7";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL8 } from "../california/units/social-g8";
import { mental as manitobaUnitsG5MathMental, quadrilaterals as manitobaUnitsG5MathQuadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaUnitsG5MoreLanguageMultimodal } from "../manitoba/units/g5-more-language";
import { friction as manitobaUnitsG5ScienceFriction } from "../manitoba/units/g5-science";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { units as ontarioG5ScienceUnits } from "../ontario/g5-science";
import { peElectromagnets6 as princeEdwardIslandUnitsG6WorldSciencePeElectromagnets6 } from "../prince-edward-island/units/g6-world-science";
import { OWN as texasCoursesScience5OWN } from "../texas/courses/science-5";
import { RML_5 as washingtonUnitsLanguageRmlMiddleRML5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpellingSPELLING5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonUnitsMathMiddleG5UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonUnitsScience35SCIENCE4 } from "../washington/units/science-35";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { virginiaGrade } from "./kit";
import { OWN } from "./units/own-g5";

// Virginia Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathMiddleG5UNITS, manitobaUnitsG5MathQuadrilaterals, manitobaUnitsG5MathMental, californiaUnitsMathG5LINEPLOTS5],
  language: [...californiaUnitsLanguageG5LANGUAGE5, washingtonUnitsLanguageRmlMiddleRML5, manitobaUnitsG5MoreLanguageMultimodal, washingtonUnitsLanguageSpellingSPELLING5],
  science: [...ontarioG5ScienceUnits, ...ontarioG4ScienceUnits, princeEdwardIslandUnitsG6WorldSciencePeElectromagnets6, manitobaUnitsG5ScienceFriction, ...texasCoursesScience5OWN, ...washingtonUnitsScience35SCIENCE4],
  social: [...californiaUnitsSocialG5SOCIAL5, ...californiaUnitsSocialG8SOCIAL8, ...washingtonUnitsSocial59G5G5, ...californiaUnitsSocialG7SOCIAL7],
};

export const courses: Course[] = virginiaGrade("5", POOL, OWN);
