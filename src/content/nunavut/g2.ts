import type { Course } from "../types";
import { courses as alberta } from "../alberta/g2";
import { courses as manitoba } from "../manitoba/g2";
import { courses as ontario } from "../ontario/g2";
import { courses as saskatchewan } from "../saskatchewan/g2";
import { nunavutGrade } from "./kit";
import { arcticAnimals2 } from "./units/science";

// Nunavut 2.
export const courses: Course[] = nunavutGrade("2", [manitoba, alberta, ontario, saskatchewan], { science: { units: [arcticAnimals2] } });
