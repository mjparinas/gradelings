import type { Unit } from "../../types";
import { units as ontarioG4Language } from "../../ontario/g4-language";
import { FIRSTHAND_SECONDHAND as oregonLanguageReadingFIRSTHAND_SECONDHAND } from "../../oregon/units/language-reading";
import { RML_4 as washingtonLanguageRmlMiddleRML_4 } from "../../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonLanguageSpellingSPELLING_4 } from "../../washington/units/language-spelling";

// The units New York's Grade 4 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG4Language, washingtonLanguageRmlMiddleRML_4, washingtonLanguageSpellingSPELLING_4, oregonLanguageReadingFIRSTHAND_SECONDHAND];
