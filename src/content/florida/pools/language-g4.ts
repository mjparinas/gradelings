import type { Unit } from "../../types";
import { LANGUAGE_4 as californiaUnitsLanguageG4LANGUAGE4 } from "../../california/units/language-g4";
import { LANGUAGE_4 as texasUnitsLanguage4LANGUAGE4 } from "../../texas/units/language-4";
import { SPELLING_4 as washingtonUnitsLanguageSpellingSPELLING4 } from "../../washington/units/language-spelling";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReadingFIRSTHANDSECONDHAND } from "../../oregon/units/language-reading";
import { RML_4 as washingtonUnitsLanguageRmlMiddleRML4 } from "../../washington/units/language-rml-middle";
import { UNITS as newYorkUnitsLanguageG4UNITS } from "../../new-york/units/language-g4";
import { units as ontarioG4LanguageUnits } from "../../ontario/g4-language";

// The units Florida's Grade 4 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsLanguageG4LANGUAGE4, ...texasUnitsLanguage4LANGUAGE4, washingtonUnitsLanguageSpellingSPELLING4, oregonUnitsLanguageReadingFIRSTHANDSECONDHAND, washingtonUnitsLanguageRmlMiddleRML4, ...newYorkUnitsLanguageG4UNITS, ...ontarioG4LanguageUnits];
