import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4MathUnits } from "../alberta/g4-math";
import { LANGUAGE_4 as californiaUnitsLanguageG4LANGUAGE4 } from "../california/units/language-g4";
import { MATH_4 as californiaUnitsMathG4MATH4 } from "../california/units/math-g4";
import { OWN_SCIENCE as californiaUnitsScienceG4OWNSCIENCE } from "../california/units/science-g4";
import { units as manitobaUnitsG4MoreScienceUnits } from "../manitoba/units/g4-more-science";
import { units as ontarioG4LanguageUnits } from "../ontario/g4-language";
import { units as ontarioG4MathUnits } from "../ontario/g4-math";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReadingFIRSTHANDSECONDHAND } from "../oregon/units/language-reading";
import { SCIENCE_COPIES as oregonUnitsScienceCopiesSCIENCECOPIES } from "../oregon/units/science-copies";
import { historyDetective5 as oregonUnitsSocialCopiesHistoryDetective5 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../oregon/units/social-g5";
import { RML_4 as washingtonUnitsLanguageRmlMiddleRML4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpellingSPELLING4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonUnitsMathMiddleG4UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonUnitsScience35SCIENCE4 } from "../washington/units/science-35";
import { indianaGrade } from "./kit";
import { OWN } from "./units/own-g4";

// Indiana Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG4MathUnits, ...albertaG4MathUnits, ...washingtonUnitsMathMiddleG4UNITS, ...californiaUnitsMathG4MATH4],
  language: [...ontarioG4LanguageUnits, washingtonUnitsLanguageRmlMiddleRML4, washingtonUnitsLanguageSpellingSPELLING4, oregonUnitsLanguageReadingFIRSTHANDSECONDHAND, ...californiaUnitsLanguageG4LANGUAGE4],
  science: [...ontarioG4ScienceUnits, ...manitobaUnitsG4MoreScienceUnits, ...washingtonUnitsScience35SCIENCE4, ...(oregonUnitsScienceCopiesSCIENCECOPIES["4"] ?? []), ...californiaUnitsScienceG4OWNSCIENCE],
  social: [oregonUnitsSocialCopiesHistoryDetective5, ...oregonUnitsSocialG5OWNSOCIAL5],
};

export const courses: Course[] = indianaGrade("4", POOL, OWN);
