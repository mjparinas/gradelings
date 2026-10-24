import type { Unit } from "../../types";
import { units as ontarioG6LanguageUnits } from "../../ontario/g6-language";
import { LANGUAGE_6 as texasUnitsLanguage6LANGUAGE6 } from "../../texas/units/language-6";
import { RML_6 as washingtonUnitsLanguageRmlUpperRML6 } from "../../washington/units/language-rml-upper";
import { LANGUAGE_6 as californiaUnitsLanguageG6LANGUAGE6 } from "../../california/units/language-g6";
import { UNITS as newYorkUnitsLanguageG6UNITS } from "../../new-york/units/language-g6";
import { SPELLING_6 as washingtonUnitsLanguageSpellingSPELLING6 } from "../../washington/units/language-spelling";

// The units Pennsylvania's Grade 6 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG6LanguageUnits, ...texasUnitsLanguage6LANGUAGE6, ...washingtonUnitsLanguageRmlUpperRML6, ...californiaUnitsLanguageG6LANGUAGE6, ...newYorkUnitsLanguageG6UNITS, washingtonUnitsLanguageSpellingSPELLING6];
