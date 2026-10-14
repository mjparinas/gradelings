import type { Unit } from "../../types";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReadingFIRSTHAND_SECONDHAND } from "../../oregon/units/language-reading";
import { RML_4 as washingtonUnitsLanguageRmlMiddleRML_4 } from "../../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpellingSPELLING_4 } from "../../washington/units/language-spelling";
import { units as ontarioG4LanguageUnits } from "../../ontario/g4-language";

// The units Minnesota's Grade 4 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG4LanguageUnits, washingtonUnitsLanguageRmlMiddleRML_4, washingtonUnitsLanguageSpellingSPELLING_4, oregonUnitsLanguageReadingFIRSTHAND_SECONDHAND];
