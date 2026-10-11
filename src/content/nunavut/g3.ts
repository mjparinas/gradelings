import type { Course } from "../types";
import { courses as alberta } from "../alberta/g3";
import { courses as manitoba } from "../manitoba/g3";
import { courses as ontario } from "../ontario/g3";
import { courses as saskatchewan } from "../saskatchewan/g3";
import { nunavutGrade } from "./kit";
import { ourTerritory3 } from "./units/g3-g4-social";

// Nunavut 3.
export const courses: Course[] = nunavutGrade("3", [manitoba, alberta, ontario, saskatchewan], { social: { units: [ourTerritory3] } });
