import type { Unit } from "../../types";
import { units as albertaKScience } from "../../alberta/k-science";
import { units as albertaG2Science } from "../../alberta/g2-science";
import { units as ontarioG2Science } from "../../ontario/g2-science";
import { SCIENCE_2 as oregonScience2 } from "../../oregon/units/science-k2";
import { SCIENCE_1 as washingtonScience1, SCIENCE_2 as washingtonScience2 } from "../../washington/units/science-k2";
import { SCIENCE_2 as texasScience2 } from "../units/science-2";

// Texas Grade 2 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG2Science, ...albertaG2Science, ...albertaKScience, ...washingtonScience1, ...washingtonScience2, ...oregonScience2];

export const OWN: readonly Unit[] = texasScience2;
