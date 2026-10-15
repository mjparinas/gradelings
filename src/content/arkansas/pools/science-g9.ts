import type { Unit } from "../../types";
import { SCIENCE_9 as texasUnitsScience9SCIENCE_9 } from "../../texas/units/science-9";
import { units as ontarioG9Science } from "../../ontario/g9-science";
import { units as manitobaUnitsG9Science } from "../../manitoba/units/g9-science";
import { units as albertaG9Science } from "../../alberta/g9-science";
import { SCIENCE_9 as washingtonUnitsScience9SCIENCE_9 } from "../../washington/units/science-9";
import { units as manitobaUnitsG9MoreScience } from "../../manitoba/units/g9-more-science";

// The units Arkansas's Grade 9 science course copies from other frameworks (see ../plan/science.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...texasUnitsScience9SCIENCE_9, ...ontarioG9Science, ...manitobaUnitsG9Science, ...albertaG9Science, ...washingtonUnitsScience9SCIENCE_9, ...manitobaUnitsG9MoreScience];
