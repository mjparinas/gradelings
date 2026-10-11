import type { Course } from "../types";
import { courses as alberta } from "../alberta/g8";
import { courses as manitoba } from "../manitoba/g8";
import { courses as ontario } from "../ontario/g8";
import { courses as saskatchewan } from "../saskatchewan/g8";
import { nunavutGrade } from "./kit";
import { makingNunavut8 } from "./units/g5-g9-social";

// Nunavut 8.
export const courses: Course[] = nunavutGrade("8", [manitoba, alberta, ontario, saskatchewan], { social: { units: [makingNunavut8] } });
