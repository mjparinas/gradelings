import type { Unit } from "../../types";
import { course as bcG1Science } from "../../grades/g1/science";
import { life as manitobaG3ScienceLife, speed as manitobaG3ScienceSpeed } from "../../manitoba/units/g3-science";
import { units as ontarioG3Science } from "../../ontario/g3-science";
import { units as ontarioG4Science } from "../../ontario/g4-science";
import { SCIENCE_3 as washingtonScience3 } from "../../washington/units/science-35";
import { SCIENCE_3 as texasScience3 } from "../units/science-3";

// Texas Grade 3 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG3Science, ...ontarioG4Science, manitobaG3ScienceLife, manitobaG3ScienceSpeed, ...washingtonScience3, ...bcG1Science.units];

export const OWN: readonly Unit[] = texasScience3;
