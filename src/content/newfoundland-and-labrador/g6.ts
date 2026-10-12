import type { Course } from "../types";
import { courses as alberta } from "../alberta/g6";
import { courses as manitoba } from "../manitoba/g6";
import { courses as newBrunswick } from "../new-brunswick/g6";
import { courses as novaScotia } from "../nova-scotia/g6";
import { courses as ontario } from "../ontario/g6";
import { courses as saskatchewan } from "../saskatchewan/g6";
import { nlGrade } from "./kit";
import { government } from "./units/g6-g7-social";

// Newfoundland and Labrador Grade 6.
export const courses: Course[] = nlGrade("6", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { social: { units: [government], first: true } });
