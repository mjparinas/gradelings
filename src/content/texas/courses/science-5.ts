import type { Unit } from "../../types";
import { units as albertaG5Science } from "../../alberta/g5-science";
import { weather as manitobaG5ScienceWeather } from "../../manitoba/units/g5-science";
import { units as ontarioG5Science } from "../../ontario/g5-science";
import { SCIENCE_5 as oregonScience35SCIENCE_5 } from "../../oregon/units/science-35";
import { SCIENCE_5 as washingtonScience35SCIENCE_5 } from "../../washington/units/science-35";

// Texas Grade 5 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG5Science, ...albertaG5Science, manitobaG5ScienceWeather, ...washingtonScience35SCIENCE_5, ...oregonScience35SCIENCE_5];

export const OWN: readonly Unit[] = [];
