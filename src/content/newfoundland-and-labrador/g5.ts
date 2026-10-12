import type { Course } from "../types";
import { courses as alberta } from "../alberta/g5";
import { courses as manitoba } from "../manitoba/g5";
import { courses as newBrunswick } from "../new-brunswick/g5";
import { courses as novaScotia } from "../nova-scotia/g5";
import { courses as ontario } from "../ontario/g5";
import { courses as saskatchewan } from "../saskatchewan/g5";
import { nlGrade } from "./kit";
import { explorers, fishery } from "./units/g5-social";

// Newfoundland and Labrador Grade 5.
export const courses: Course[] = nlGrade("5", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { social: { units: [explorers, fishery], first: true } });
