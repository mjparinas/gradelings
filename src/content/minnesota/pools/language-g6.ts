import type { Unit } from "../../types";
import { RML_6 as washingtonUnitsLanguageRmlUpperRML_6 } from "../../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpellingSPELLING_6 } from "../../washington/units/language-spelling";
import { units as ontarioG6LanguageUnits } from "../../ontario/g6-language";

// The units Minnesota's Grade 6 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG6LanguageUnits, ...washingtonUnitsLanguageRmlUpperRML_6, washingtonUnitsLanguageSpellingSPELLING_6];
