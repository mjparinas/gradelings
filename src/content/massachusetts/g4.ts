import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as ontarioG4Math } from "../ontario/g4-math";
import { units as albertaG4Math } from "../alberta/g4-math";
import { G4_UNITS as washingtonUnitsMathMiddleG4_UNITS } from "../washington/units/math-middle";
import { MATH_4 as californiaUnitsMathG4MATH_4 } from "../california/units/math-g4";
import { units as ontarioG4Language } from "../ontario/g4-language";
import { RML_4 as washingtonUnitsLanguageRmlMiddleRML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpellingSPELLING_4 } from "../washington/units/language-spelling";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReadingFIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { LANGUAGE_4 as californiaUnitsLanguageG4LANGUAGE_4 } from "../california/units/language-g4";
import { units as ontarioG4Science } from "../ontario/g4-science";
import { units as manitobaUnitsG4MoreScience } from "../manitoba/units/g4-more-science";
import { SCIENCE_4 as washingtonUnitsScience35SCIENCE_4 } from "../washington/units/science-35";
import { SCIENCE_COPIES as oregonScienceCopies } from "../oregon/units/science-copies";
import { G5 as washingtonUnitsSocial59G5G5 } from "../washington/units/social-59-g5";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWN_SOCIAL_5 } from "../oregon/units/social-g5";
import { UNITS as newYorkUnitsSocialG5UNITS } from "../new-york/units/social-g5";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL_7 } from "../california/units/social-g7";
import { SOCIAL_5 as texasUnitsSocialG5SOCIAL_5 } from "../texas/units/social-g5";
import { SOCIAL_5 as californiaUnitsSocialG5SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL_8 } from "../california/units/social-g8";
import { massachusettsGrade } from "./kit";
import { OWN } from "./units/own-g4";

// Massachusetts Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG4Math, ...albertaG4Math, ...washingtonUnitsMathMiddleG4_UNITS, ...californiaUnitsMathG4MATH_4],
  language: [...ontarioG4Language, washingtonUnitsLanguageRmlMiddleRML_4, washingtonUnitsLanguageSpellingSPELLING_4, oregonUnitsLanguageReadingFIRSTHAND_SECONDHAND, ...californiaUnitsLanguageG4LANGUAGE_4],
  science: [...ontarioG4Science, ...manitobaUnitsG4MoreScience, ...washingtonUnitsScience35SCIENCE_4, ...(oregonScienceCopies["4"] ?? [])],
  social: [...washingtonUnitsSocial59G5G5, ...oregonUnitsSocialG5OWN_SOCIAL_5, ...newYorkUnitsSocialG5UNITS, ...californiaUnitsSocialG7SOCIAL_7, ...texasUnitsSocialG5SOCIAL_5, ...californiaUnitsSocialG5SOCIAL_5, ...californiaUnitsSocialG8SOCIAL_8],
};

export const courses: Course[] = massachusettsGrade("4", POOL, OWN);
