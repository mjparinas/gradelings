import type { Unit } from "../../types";
import { units as albertaKScience } from "../../alberta/k-science";
import { scienceUnits as manitobaKMoreScience } from "../../manitoba/units/gk-more-science";
import { SCIENCE_K as washingtonScienceK, SCIENCE_1 as washingtonScience1 } from "../../washington/units/science-k2";
import { SCIENCE_K as texasScienceK } from "../units/science-k";

// Texas Kindergarten science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...albertaKScience, ...manitobaKMoreScience, ...washingtonScienceK, ...washingtonScience1];

export const OWN: readonly Unit[] = texasScienceK;
