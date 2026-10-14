import type { Unit } from "../../types";
import { units as albertaG9Science } from "../../alberta/g9-science";
import { units as manitobaG9MoreScience } from "../../manitoba/units/g9-more-science";
import { units as manitobaG9Science } from "../../manitoba/units/g9-science";
import { units as ontarioG9Science } from "../../ontario/g9-science";
import { SCIENCE_9 as washingtonScience9SCIENCE_9 } from "../../washington/units/science-9";

// Texas Grade 9 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG9Science, ...albertaG9Science, ...manitobaG9Science, ...manitobaG9MoreScience, ...washingtonScience9SCIENCE_9];

export const OWN: readonly Unit[] = [];
