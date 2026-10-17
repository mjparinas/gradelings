import type { Unit } from "../../types";
import { units as ontarioG8LanguageUnits } from "../../ontario/g8-language";
import { LANGUAGE_8 as californiaUnitsLanguageG8LANGUAGE8 } from "../../california/units/language-g8";
import { LANGUAGE_8 as texasUnitsLanguage8LANGUAGE8 } from "../../texas/units/language-8";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguageWEIGHTHEEVIDENCE } from "../../oregon/units/language";
import { RML_8 as washingtonUnitsLanguageRmlUpperRML8 } from "../../washington/units/language-rml-upper";
import { units as manitobaUnitsG8MoreLanguageUnits } from "../../manitoba/units/g8-more-language";

// The units Florida's Grade 8 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG8LanguageUnits, ...californiaUnitsLanguageG8LANGUAGE8, ...texasUnitsLanguage8LANGUAGE8, oregonUnitsLanguageWEIGHTHEEVIDENCE, ...washingtonUnitsLanguageRmlUpperRML8, ...manitobaUnitsG8MoreLanguageUnits];
