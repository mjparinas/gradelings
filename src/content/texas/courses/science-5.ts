import type { Unit } from "../../types";
import { units as albertaG5Science } from "../../alberta/g5-science";
import { units as manitobaG4MoreScience } from "../../manitoba/units/g4-more-science";
import { friction as manitobaG5Friction, weather as manitobaG5Weather } from "../../manitoba/units/g5-science";
import { units as ontarioG4Science } from "../../ontario/g4-science";
import { units as ontarioG5Science } from "../../ontario/g5-science";
import { SCIENCE_5 as texasScience5 } from "../units/science-5";

// Texas Grade 5 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG5Science, ...ontarioG4Science, ...albertaG5Science, manitobaG5Weather, manitobaG5Friction, ...manitobaG4MoreScience];

export const OWN: readonly Unit[] = texasScience5;
