import type { Unit } from "../../types";
import { UNITS as newYorkLanguageG4 } from "../../new-york/units/language-g4";
import { units as ontarioG4Language } from "../../ontario/g4-language";
import { LANGUAGE_4 as texasLanguage4 } from "../../texas/units/language-4";
import { RML_4 as washingtonLanguageRmlMiddleRML_4 } from "../../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonLanguageSpellingSPELLING_4 } from "../../washington/units/language-spelling";

// The units Alabama's Grade 4 English language arts course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG4Language, washingtonLanguageRmlMiddleRML_4, washingtonLanguageSpellingSPELLING_4, ...texasLanguage4, ...newYorkLanguageG4];
