import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4Math } from "../alberta/g4-math";
import { LANGUAGE_4 as californiaLanguage4 } from "../california/units/language-g4";
import { MATH_4 as californiaMath4 } from "../california/units/math-g4";
import { OWN_SCIENCE as californiaScienceG4OWNSCIENCE } from "../california/units/science-g4";
import { SOCIAL_5 as californiaSocialG5SOCIAL5 } from "../california/units/social-g5";
import { units as manitobaG4MoreScienceUnits } from "../manitoba/units/g4-more-science";
import { units as ontarioG4Language } from "../ontario/g4-language";
import { units as ontarioG4Math } from "../ontario/g4-math";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { FIRSTHAND_SECONDHAND as oregonLanguageReadingFIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { SOCIAL_5 as texasSocialG5SOCIAL5 } from "../texas/units/social-g5";
import { RML_4 as washingtonLanguageRmlMiddleRML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonLanguageSpellingSPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonMathMiddleG4_UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonScience35SCIENCE4 } from "../washington/units/science-35";
import { G5 as washingtonSocial59G5G5 } from "../washington/units/social-59-g5";
import { G8 as washingtonSocial59G8G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/g4";
import { OWN } from "./units/own-g4";

// West Virginia Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [...ontarioG4Math, ...albertaG4Math, ...washingtonMathMiddleG4_UNITS, ...californiaMath4],
  language: [...ontarioG4Language, washingtonLanguageRmlMiddleRML_4, washingtonLanguageSpellingSPELLING_4, oregonLanguageReadingFIRSTHAND_SECONDHAND, ...californiaLanguage4],
  science: [...ontarioG4ScienceUnits, ...manitobaG4MoreScienceUnits, ...washingtonScience35SCIENCE4, ...californiaScienceG4OWNSCIENCE],
  social: [...washingtonSocial59G5G5, ...californiaSocialG5SOCIAL5, ...washingtonSocial59G8G8, ...texasSocialG5SOCIAL5],
};

export const courses: Course[] = withLessons(westVirginiaGrade("4", POOL, OWN), LESSONS);
