import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4MathUnits } from "../alberta/g4-math";
import { units as albertaG4ScienceUnits } from "../alberta/g4-science";
import { LANGUAGE_4 as californiaUnitsLanguageG4LANGUAGE4 } from "../california/units/language-g4";
import { TENTHS_HUNDREDTHS_4 as californiaUnitsMathG4TENTHSHUNDREDTHS4 } from "../california/units/math-g4";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { units as manitobaUnitsG4MoreScienceUnits } from "../manitoba/units/g4-more-science";
import { weather as manitobaUnitsG5ScienceWeather } from "../manitoba/units/g5-science";
import { units as ontarioG4LanguageUnits } from "../ontario/g4-language";
import { units as ontarioG4MathUnits } from "../ontario/g4-math";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReadingFIRSTHANDSECONDHAND } from "../oregon/units/language-reading";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { RML_4 as washingtonUnitsLanguageRmlMiddleRML4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpellingSPELLING4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonUnitsMathMiddleG4UNITS } from "../washington/units/math-middle";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { virginiaGrade } from "./kit";
import { OWN } from "./units/own-g4";

// Virginia Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathMiddleG4UNITS, ...ontarioG4MathUnits, californiaUnitsMathG4TENTHSHUNDREDTHS4, ...albertaG4MathUnits],
  language: [...californiaUnitsLanguageG4LANGUAGE4, washingtonUnitsLanguageRmlMiddleRML4, oregonUnitsLanguageReadingFIRSTHANDSECONDHAND, washingtonUnitsLanguageSpellingSPELLING4, ...ontarioG4LanguageUnits],
  science: [...ontarioG4ScienceUnits, manitobaUnitsG5ScienceWeather, ...manitobaUnitsG4MoreScienceUnits, ...gradesG6ScienceCourse.units, ...albertaG4ScienceUnits],
  social: [oregonUnitsSocialCopiesReconstruction8, ...washingtonUnitsSocial59G5G5],
};

export const courses: Course[] = virginiaGrade("4", POOL, OWN);
