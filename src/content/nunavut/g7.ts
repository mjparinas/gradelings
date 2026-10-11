import type { Course } from "../types";
import { courses as alberta } from "../alberta/g7";
import { courses as manitoba } from "../manitoba/g7";
import { courses as ontario } from "../ontario/g7";
import { courses as saskatchewan } from "../saskatchewan/g7";
import { nunavutGrade } from "./kit";
import { circumpolar7, iqInPractice7 } from "./units/g5-g9-social";
import { tundra7 } from "./units/science";

// Nunavut 7.
export const courses: Course[] = nunavutGrade("7", [manitoba, alberta, ontario, saskatchewan], { social: { units: [circumpolar7, iqInPractice7] }, science: { units: [tundra7] } });
