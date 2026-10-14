import { unitsOf } from "../../placement";
import type { Unit } from "../../types";
import { LANGUAGE_K } from "../units/language-k";
import { units as albertaKLanguage } from "../../alberta/k-language";
import { languageUnits as manitobaGkMoreLanguage } from "../../manitoba/units/gk-more-language";
import { courses as ontarioK } from "../../ontario/k";
import { RML_K as washingtonLanguageRmlEarlyRML_K } from "../../washington/units/language-rml-early";

// Texas Kindergarten language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...unitsOf(ontarioK, "language"), ...albertaKLanguage, ...manitobaGkMoreLanguage, washingtonLanguageRmlEarlyRML_K];

export const OWN: readonly Unit[] = LANGUAGE_K;
