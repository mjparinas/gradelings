import type { Course } from "../types";
import type { Pool } from "../placement";
import { LANGUAGE_9 as californiaUnitsLanguageG9LANGUAGE9 } from "../california/units/language-g9";
import { MATH_9 as californiaUnitsMathG9MATH9 } from "../california/units/math-g9";
import { OWN_SCIENCE as californiaUnitsScienceG9OWNSCIENCE } from "../california/units/science-g9";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9PhysicalPHYSICALSCIENCE } from "../california/units/science-g9-physical";
import { SOCIAL_6 as californiaUnitsSocialG6SOCIAL6 } from "../california/units/social-g6";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL7 } from "../california/units/social-g7";
import { course as gradesG7SocialCourse } from "../grades/g7/social";
import { course as gradesG8ScienceCourse } from "../grades/g8/science";
import { course as gradesG8SocialCourse } from "../grades/g8/social";
import { units as manitobaUnitsG9MoreLanguageUnits } from "../manitoba/units/g9-more-language";
import { units as manitobaUnitsG9ScienceUnits } from "../manitoba/units/g9-science";
import { UNITS as newYorkUnitsSocialG9UNITS } from "../new-york/units/social-g9";
import { units as ontarioG9LanguageUnits } from "../ontario/g9-language";
import { units as ontarioG9MathUnits } from "../ontario/g9-math";
import { units as ontarioG9ScienceUnits } from "../ontario/g9-science";
import { MEDIA_ANALYSIS as oregonUnitsLanguageMEDIAANALYSIS } from "../oregon/units/language";
import { RML_9 as washingtonUnitsLanguageRmlUpperRML9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonUnitsLanguageSpellingSPELLING9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonUnitsMathUpperG9UNITS } from "../washington/units/math-upper";
import { G6 as washingtonUnitsSocial59G6G6 } from "../washington/units/social-59-g6";
import { virginiaGrade } from "./kit";
import { OWN } from "./units/own-g9";

// Virginia Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpperG9UNITS, ...californiaUnitsMathG9MATH9, ...ontarioG9MathUnits],
  language: [...ontarioG9LanguageUnits, ...californiaUnitsLanguageG9LANGUAGE9, ...manitobaUnitsG9MoreLanguageUnits, washingtonUnitsLanguageSpellingSPELLING9, oregonUnitsLanguageMEDIAANALYSIS, ...washingtonUnitsLanguageRmlUpperRML9],
  science: [...californiaUnitsScienceG9PhysicalPHYSICALSCIENCE, ...californiaUnitsScienceG9OWNSCIENCE, ...manitobaUnitsG9ScienceUnits, ...gradesG8ScienceCourse.units, ...ontarioG9ScienceUnits],
  social: [...californiaUnitsSocialG7SOCIAL7, ...californiaUnitsSocialG6SOCIAL6, ...gradesG8SocialCourse.units, ...gradesG7SocialCourse.units, ...newYorkUnitsSocialG9UNITS, ...washingtonUnitsSocial59G6G6],
};

export const courses: Course[] = virginiaGrade("9", POOL, OWN);
