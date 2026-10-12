import type { Course } from "../types";
import { courses as alberta } from "../alberta/g9";
import { courses as manitoba } from "../manitoba/g9";
import { courses as ontario } from "../ontario/g9";
import { courses as saskatchewan } from "../saskatchewan/g9";
import { nunavutGrade } from "./kit";
import { governing9, landClaim9, circumpolar9 } from "./units/g5-g9-social";
import { populationData9 } from "./units/skills";

// Nunavut 9.
export const courses: Course[] = nunavutGrade("9", [manitoba, alberta, ontario, saskatchewan], { social: { units: [governing9, landClaim9, circumpolar9, populationData9] } });
