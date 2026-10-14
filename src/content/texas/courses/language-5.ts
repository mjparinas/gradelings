import type { Unit } from "../../types";
import { LANGUAGE_5 } from "../units/language-5";
import { multimodal as manitobaG5MoreLanguageMultimodal } from "../../manitoba/units/g5-more-language";
import { RML_5 as washingtonLanguageRmlMiddleRML_5 } from "../../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonLanguageSpellingSPELLING_5 } from "../../washington/units/language-spelling";

// Texas Grade 5 language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [manitobaG5MoreLanguageMultimodal, washingtonLanguageRmlMiddleRML_5, washingtonLanguageSpellingSPELLING_5];

export const OWN: readonly Unit[] = LANGUAGE_5;
