import type { Unit } from "../../types";
import { LANGUAGE_4 } from "../units/language-4";
import { units as ontarioG4Language } from "../../ontario/g4-language";
import { FIRSTHAND_SECONDHAND as oregonLanguageReadingFIRSTHAND_SECONDHAND } from "../../oregon/units/language-reading";
import { RML_4 as washingtonLanguageRmlMiddleRML_4 } from "../../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonLanguageSpellingSPELLING_4 } from "../../washington/units/language-spelling";

// Texas Grade 4 language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG4Language, washingtonLanguageRmlMiddleRML_4, washingtonLanguageSpellingSPELLING_4, oregonLanguageReadingFIRSTHAND_SECONDHAND];

export const OWN: readonly Unit[] = LANGUAGE_4;
