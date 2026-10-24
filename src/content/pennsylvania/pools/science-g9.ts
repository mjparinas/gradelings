import type { Unit } from "../../types";
import { UNITS as newYorkUnitsScienceG9UNITS } from "../../new-york/units/science-g9";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9PhysicalPHYSICALSCIENCE } from "../../california/units/science-g9-physical";
import { OWN_SCIENCE as californiaUnitsScienceG9OWNSCIENCE } from "../../california/units/science-g9";
import { units as ontarioG9ScienceUnits } from "../../ontario/g9-science";
import { SCIENCE_9 as washingtonUnitsScience9SCIENCE9 } from "../../washington/units/science-9";
import { units as manitobaUnitsG9ScienceUnits } from "../../manitoba/units/g9-science";
import { units as albertaG9ScienceUnits } from "../../alberta/g9-science";
import { units as manitobaUnitsG9MoreScienceUnits } from "../../manitoba/units/g9-more-science";

// The units Pennsylvania's Grade 9 science course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...newYorkUnitsScienceG9UNITS, ...californiaUnitsScienceG9PhysicalPHYSICALSCIENCE, ...californiaUnitsScienceG9OWNSCIENCE, ...ontarioG9ScienceUnits, ...washingtonUnitsScience9SCIENCE9, ...manitobaUnitsG9ScienceUnits, ...albertaG9ScienceUnits, ...manitobaUnitsG9MoreScienceUnits];
