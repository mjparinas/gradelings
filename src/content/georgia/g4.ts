import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4MathUnits } from "../alberta/g4-math";
import { units as albertaG4ScienceUnits } from "../alberta/g4-science";
import { LANGUAGE_4 as californiaUnitsLanguageG4LANGUAGE4 } from "../california/units/language-g4";
import { MATH_4 as californiaUnitsMathG4MATH4 } from "../california/units/math-g4";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL8 } from "../california/units/social-g8";
import { course as gradesG2ScienceCourse } from "../grades/g2/science";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { weather as manitobaUnitsG5ScienceWeather } from "../manitoba/units/g5-science";
import { units as ontarioG3ScienceUnits } from "../ontario/g3-science";
import { units as ontarioG4LanguageUnits } from "../ontario/g4-language";
import { units as ontarioG4MathUnits } from "../ontario/g4-math";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReadingFIRSTHANDSECONDHAND } from "../oregon/units/language-reading";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../oregon/units/social-g5";
import { RML_4 as washingtonUnitsLanguageRmlMiddleRML4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpellingSPELLING4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonUnitsMathMiddleG4UNITS } from "../washington/units/math-middle";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { G8 as washingtonUnitsSocial59G8G8 } from "../washington/units/social-59-g8";
import { georgiaGrade } from "./kit";
import { OWN } from "./units/own-g4";

// Georgia Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG4MathUnits, ...albertaG4MathUnits, ...washingtonUnitsMathMiddleG4UNITS, ...californiaUnitsMathG4MATH4],
  language: [...ontarioG4LanguageUnits, washingtonUnitsLanguageRmlMiddleRML4, washingtonUnitsLanguageSpellingSPELLING4, oregonUnitsLanguageReadingFIRSTHANDSECONDHAND, ...californiaUnitsLanguageG4LANGUAGE4],
  science: [...albertaG4ScienceUnits, ...gradesG6ScienceCourse.units, ...gradesG2ScienceCourse.units, manitobaUnitsG5ScienceWeather, ...ontarioG4ScienceUnits, ...ontarioG3ScienceUnits],
  social: [...washingtonUnitsSocial59G5G5, ...californiaUnitsSocialG5SOCIAL5, ...washingtonUnitsSocial59G8G8, ...californiaUnitsSocialG8SOCIAL8, oregonUnitsSocialCopiesReconstruction8, ...oregonUnitsSocialG5OWNSOCIAL5],
};

export const courses: Course[] = georgiaGrade("4", POOL, OWN);
