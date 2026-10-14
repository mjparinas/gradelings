import type { Unit } from "../../types";
import { LANGUAGE_6 } from "../units/language-6";
import { units as ontarioG6Language } from "../../ontario/g6-language";
import { RML_6 as washingtonLanguageRmlUpperRML_6 } from "../../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonLanguageSpellingSPELLING_6 } from "../../washington/units/language-spelling";

// Texas Grade 6 language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG6Language, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6];

export const OWN: readonly Unit[] = LANGUAGE_6;
