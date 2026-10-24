import type { Unit } from "../../types";
import { units as ontarioG7LanguageUnits } from "../../ontario/g7-language";
import { LANGUAGE_7 as texasUnitsLanguage7LANGUAGE7 } from "../../texas/units/language-7";
import { RML_7 as washingtonUnitsLanguageRmlUpperRML7 } from "../../washington/units/language-rml-upper";
import { wordRoots as manitobaUnitsG7LanguageWordRoots } from "../../manitoba/units/g7-language";
import { SPELLING_7 as washingtonUnitsLanguageSpellingSPELLING7 } from "../../washington/units/language-spelling";
import { UNITS as newYorkUnitsLanguageG7UNITS } from "../../new-york/units/language-g7";

// The units Pennsylvania's Grade 7 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG7LanguageUnits, ...texasUnitsLanguage7LANGUAGE7, ...washingtonUnitsLanguageRmlUpperRML7, manitobaUnitsG7LanguageWordRoots, washingtonUnitsLanguageSpellingSPELLING7, ...newYorkUnitsLanguageG7UNITS];
