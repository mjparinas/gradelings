import type { Unit } from "../../types";
import { RML_7 as washingtonUnitsLanguageRmlUpperRML_7 } from "../../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpellingSPELLING_7 } from "../../washington/units/language-spelling";
import { units as ontarioG7LanguageUnits } from "../../ontario/g7-language";
import { wordRoots as manitobaUnitsG7LanguageWordRoots } from "../../manitoba/units/g7-language";

// The units Minnesota's Grade 7 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG7LanguageUnits, manitobaUnitsG7LanguageWordRoots, ...washingtonUnitsLanguageRmlUpperRML_7, washingtonUnitsLanguageSpellingSPELLING_7];
