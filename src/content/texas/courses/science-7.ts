import type { Unit } from "../../types";
import { units as albertaG6Science } from "../../alberta/g6-science";
import { units as albertaG7Science } from "../../alberta/g7-science";
import { course as gradesG6Science } from "../../grades/g6/science";
import { units as ontarioG7Science } from "../../ontario/g7-science";
import { SCIENCE_7 as washingtonScience68SCIENCE_7 } from "../../washington/units/science-68";

// Texas Grade 7 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG7Science, ...albertaG7Science, ...washingtonScience68SCIENCE_7, ...gradesG6Science.units, ...albertaG6Science];

export const OWN: readonly Unit[] = [];
