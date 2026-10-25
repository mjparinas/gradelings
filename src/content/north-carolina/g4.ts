import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4MathUnits } from "../alberta/g4-math";
import { units as albertaG4ScienceUnits } from "../alberta/g4-science";
import { LANGUAGE_4 as californiaUnitsLanguageG4LANGUAGE4 } from "../california/units/language-g4";
import { MATH_4 as californiaUnitsMathG4MATH4 } from "../california/units/math-g4";
import { course as gradesG3ScienceCourse } from "../grades/g3/science";
import { course as gradesG5ScienceCourse } from "../grades/g5/science";
import { UNITS as newYorkUnitsScienceG3UNITS } from "../new-york/units/science-g3";
import { units as ontarioG4LanguageUnits } from "../ontario/g4-language";
import { units as ontarioG4MathUnits } from "../ontario/g4-math";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { units as ontarioG5ScienceUnits } from "../ontario/g5-science";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReadingFIRSTHANDSECONDHAND } from "../oregon/units/language-reading";
import { historyDetective5 as oregonUnitsSocialCopiesHistoryDetective5 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../oregon/units/social-g5";
import { peMagnetsStatic3 as princeEdwardIslandUnitsG3ScienceSocialPeMagnetsStatic3 } from "../prince-edward-island/units/g3-science-social";
import { peAdaptations4 as princeEdwardIslandUnitsG4ScienceSocialPeAdaptations4, peMinerals4 as princeEdwardIslandUnitsG4ScienceSocialPeMinerals4 } from "../prince-edward-island/units/g4-science-social";
import { OWN as texasCoursesScience5OWN } from "../texas/courses/science-5";
import { RML_4 as washingtonUnitsLanguageRmlMiddleRML4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpellingSPELLING4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonUnitsMathMiddleG4UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../washington/units/science-35";
import { northCarolinaGrade } from "./kit";
import { OWN } from "./units/own-g4";

// North Carolina Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG4MathUnits, ...albertaG4MathUnits, ...washingtonUnitsMathMiddleG4UNITS, ...californiaUnitsMathG4MATH4],
  language: [...ontarioG4LanguageUnits, washingtonUnitsLanguageRmlMiddleRML4, washingtonUnitsLanguageSpellingSPELLING4, oregonUnitsLanguageReadingFIRSTHANDSECONDHAND, ...californiaUnitsLanguageG4LANGUAGE4],
  science: [...albertaG4ScienceUnits, princeEdwardIslandUnitsG3ScienceSocialPeMagnetsStatic3, ...ontarioG5ScienceUnits, ...texasCoursesScience5OWN, ...ontarioG4ScienceUnits, princeEdwardIslandUnitsG4ScienceSocialPeAdaptations4, ...washingtonUnitsScience35SCIENCE3, ...newYorkUnitsScienceG3UNITS, princeEdwardIslandUnitsG4ScienceSocialPeMinerals4, ...gradesG5ScienceCourse.units, ...gradesG3ScienceCourse.units],
  social: [...oregonUnitsSocialG5OWNSOCIAL5, oregonUnitsSocialCopiesHistoryDetective5],
};

export const courses: Course[] = northCarolinaGrade("4", POOL, OWN);
