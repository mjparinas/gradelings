import type { Unit } from "../../types";
import { RML_7 as washingtonUnitsLanguageRmlUpperRML7 } from "../../washington/units/language-rml-upper";
import { LANGUAGE_7 as texasUnitsLanguage7LANGUAGE7 } from "../../texas/units/language-7";
import { units as ontarioG7LanguageUnits } from "../../ontario/g7-language";
import { SPELLING_7 as washingtonUnitsLanguageSpellingSPELLING7 } from "../../washington/units/language-spelling";
import { wordRoots as manitobaUnitsG7LanguageWordRoots } from "../../manitoba/units/g7-language";

// The units Florida's Grade 7 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...washingtonUnitsLanguageRmlUpperRML7, ...texasUnitsLanguage7LANGUAGE7, ...ontarioG7LanguageUnits, washingtonUnitsLanguageSpellingSPELLING7, manitobaUnitsG7LanguageWordRoots];
