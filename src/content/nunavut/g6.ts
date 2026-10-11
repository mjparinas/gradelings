import type { Course } from "../types";
import { courses as alberta } from "../alberta/g6";
import { courses as manitoba } from "../manitoba/g6";
import { courses as ontario } from "../ontario/g6";
import { courses as saskatchewan } from "../saskatchewan/g6";
import { nunavutGrade } from "./kit";
import { governing6 } from "./units/g5-g9-social";

// Nunavut 6.
export const courses: Course[] = nunavutGrade("6", [manitoba, alberta, ontario, saskatchewan], { social: { units: [governing6] } });
