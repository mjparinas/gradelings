import type { Course } from "../types";
import { courses as alberta } from "../alberta/g4";
import { courses as manitoba } from "../manitoba/g4";
import { courses as ontario } from "../ontario/g4";
import { courses as saskatchewan } from "../saskatchewan/g4";
import { nunavutGrade } from "./kit";
import { iqPrinciples4, languages4, regions4 } from "./units/g3-g4-social";

// Nunavut 4.
export const courses: Course[] = nunavutGrade("4", [manitoba, alberta, ontario, saskatchewan], { social: { units: [iqPrinciples4, languages4, regions4] } });
