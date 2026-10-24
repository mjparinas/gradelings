import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG9ScienceUnits } from "../alberta/g9-science";
import { COPIES_8 as arizonaUnitsCopiesG8COPIES8 } from "../arizona/units/copies-g8";
import { LANGUAGE_9 as californiaUnitsLanguageG9LANGUAGE9 } from "../california/units/language-g9";
import { MATH_9 as californiaUnitsMathG9MATH9 } from "../california/units/math-g9";
import { OWN_SCIENCE as californiaUnitsScienceG9OWNSCIENCE, SCIENCE_COPIES as californiaUnitsScienceG9SCIENCECOPIES } from "../california/units/science-g9";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9PhysicalPHYSICALSCIENCE } from "../california/units/science-g9-physical";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL9 } from "../california/units/social-g9";
import { SOCIAL_9 as maineUnitsSocialG9SOCIAL9 } from "../maine/units/social-g9";
import { units as manitobaUnitsG9MoreLanguageUnits } from "../manitoba/units/g9-more-language";
import { units as manitobaUnitsG9MoreScienceUnits } from "../manitoba/units/g9-more-science";
import { units as manitobaUnitsG9ScienceUnits } from "../manitoba/units/g9-science";
import { units as ontarioG9LanguageUnits } from "../ontario/g9-language";
import { units as ontarioG9MathUnits } from "../ontario/g9-math";
import { units as ontarioG9ScienceUnits } from "../ontario/g9-science";
import { MEDIA_ANALYSIS as oregonUnitsLanguageMEDIAANALYSIS } from "../oregon/units/language";
import { RML_9 as washingtonUnitsLanguageRmlUpperRML9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonUnitsLanguageSpellingSPELLING9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonUnitsMathUpperG9UNITS } from "../washington/units/math-upper";
import { SCIENCE_9 as washingtonUnitsScience9SCIENCE9 } from "../washington/units/science-9";
import { indianaGrade } from "./kit";
import { OWN } from "./units/own-g9";

// Indiana Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG9MathUnits, ...washingtonUnitsMathUpperG9UNITS, ...californiaUnitsMathG9MATH9],
  language: [...ontarioG9LanguageUnits, ...manitobaUnitsG9MoreLanguageUnits, ...washingtonUnitsLanguageRmlUpperRML9, washingtonUnitsLanguageSpellingSPELLING9, oregonUnitsLanguageMEDIAANALYSIS, ...californiaUnitsLanguageG9LANGUAGE9],
  science: [...ontarioG9ScienceUnits, ...albertaG9ScienceUnits, ...manitobaUnitsG9ScienceUnits, ...manitobaUnitsG9MoreScienceUnits, ...washingtonUnitsScience9SCIENCE9, ...californiaUnitsScienceG9OWNSCIENCE, ...californiaUnitsScienceG9SCIENCECOPIES, ...californiaUnitsScienceG9PhysicalPHYSICALSCIENCE],
  social: [...californiaUnitsSocialG9SOCIAL9, ...maineUnitsSocialG9SOCIAL9, ...arizonaUnitsCopiesG8COPIES8],
};

export const courses: Course[] = indianaGrade("9", POOL, OWN);
