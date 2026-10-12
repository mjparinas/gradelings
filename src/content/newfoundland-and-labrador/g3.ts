import type { Course } from "../types";
import { courses as alberta } from "../alberta/g3";
import { courses as manitoba } from "../manitoba/g3";
import { courses as newBrunswick } from "../new-brunswick/g3";
import { courses as novaScotia } from "../nova-scotia/g3";
import { courses as ontario } from "../ontario/g3";
import { courses as saskatchewan } from "../saskatchewan/g3";
import { nlGrade } from "./kit";
import { ourProvince } from "./units/g3-g4-social";

// Newfoundland and Labrador Grade 3.
export const courses: Course[] = nlGrade("3", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { social: { units: [ourProvince], first: true } });
