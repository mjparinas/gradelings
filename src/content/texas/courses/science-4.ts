import type { Unit } from "../../types";
import { units as manitobaG4MoreScience } from "../../manitoba/units/g4-more-science";
import { units as ontarioG4Science } from "../../ontario/g4-science";
import { SCIENCE_COPIES as oregonScienceCopiesSCIENCE_COPIES } from "../../oregon/units/science-copies";
import { SCIENCE_4 as washingtonScience35SCIENCE_4 } from "../../washington/units/science-35";

// Texas Grade 4 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG4Science, ...manitobaG4MoreScience, ...washingtonScience35SCIENCE_4, ...(oregonScienceCopiesSCIENCE_COPIES["4"] ?? [])];

export const OWN: readonly Unit[] = [];
