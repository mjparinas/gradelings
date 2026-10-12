import type { Course } from "../types";
import { courses as alberta } from "../alberta/g7";
import { courses as manitoba } from "../manitoba/g7";
import { courses as newBrunswick } from "../new-brunswick/g7";
import { courses as novaScotia } from "../nova-scotia/g7";
import { courses as ontario } from "../ontario/g7";
import { courses as saskatchewan } from "../saskatchewan/g7";
import { nlGrade } from "./kit";
import { resources } from "./units/g6-g7-social";

// Newfoundland and Labrador Grade 7.
export const courses: Course[] = nlGrade("7", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { social: { units: [resources], first: true } });
