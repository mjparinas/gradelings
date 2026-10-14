import type { Unit } from "../../types";
import { course as bcG2Science } from "../../grades/g2/science";
import { course as bcG3Science } from "../../grades/g3/science";
import { course as bcG6Science } from "../../grades/g6/science";
import { units as albertaG4Science } from "../../alberta/g4-science";
import { units as ontarioG4Science } from "../../ontario/g4-science";
import { units as ontarioG6Science } from "../../ontario/g6-science";
import { SCIENCE_3 as washingtonScience3, SCIENCE_4 as washingtonScience4, SCIENCE_5 as washingtonScience5 } from "../../washington/units/science-35";
import { SCIENCE_4 as texasScience4 } from "../units/science-4";

// Texas Grade 4 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG4Science, ...ontarioG6Science, ...albertaG4Science, ...washingtonScience3, ...washingtonScience4, ...washingtonScience5, ...bcG2Science.units, ...bcG3Science.units, ...bcG6Science.units];

export const OWN: readonly Unit[] = texasScience4;
