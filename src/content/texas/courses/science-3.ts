import type { Unit } from "../../types";
import { life as manitobaG3ScienceLife } from "../../manitoba/units/g3-science";
import { speed as manitobaG3ScienceSpeed } from "../../manitoba/units/g3-science";
import { units as ontarioG3Science } from "../../ontario/g3-science";
import { SCIENCE_3 as oregonScience35SCIENCE_3 } from "../../oregon/units/science-35";
import { SCIENCE_3 as washingtonScience35SCIENCE_3 } from "../../washington/units/science-35";

// Texas Grade 3 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG3Science, manitobaG3ScienceLife, manitobaG3ScienceSpeed, ...washingtonScience35SCIENCE_3, ...oregonScience35SCIENCE_3];

export const OWN: readonly Unit[] = [];
