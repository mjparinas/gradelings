import type { Unit } from "../../types";
import { LANGUAGE_5 as californiaUnitsLanguageG5LANGUAGE5 } from "../../california/units/language-g5";
import { LANGUAGE_5 as texasUnitsLanguage5LANGUAGE5 } from "../../texas/units/language-5";
import { SPELLING_5 as washingtonUnitsLanguageSpellingSPELLING5 } from "../../washington/units/language-spelling";
import { multimodal as manitobaUnitsG5MoreLanguageMultimodal } from "../../manitoba/units/g5-more-language";
import { RML_5 as washingtonUnitsLanguageRmlMiddleRML5 } from "../../washington/units/language-rml-middle";
import { UNITS as newYorkUnitsLanguageG5UNITS } from "../../new-york/units/language-g5";
import { units as ontarioG5LanguageUnits } from "../../ontario/g5-language";

// The units Pennsylvania's Grade 5 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsLanguageG5LANGUAGE5, ...texasUnitsLanguage5LANGUAGE5, washingtonUnitsLanguageSpellingSPELLING5, manitobaUnitsG5MoreLanguageMultimodal, washingtonUnitsLanguageRmlMiddleRML5, ...newYorkUnitsLanguageG5UNITS, ...ontarioG5LanguageUnits];
