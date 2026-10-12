import type { Course } from "../types";
import { courses as alberta } from "../alberta/k";
import { courses as manitoba } from "../manitoba/k";
import { courses as newBrunswick } from "../new-brunswick/k";
import { courses as novaScotia } from "../nova-scotia/k";
import { courses as ontario } from "../ontario/k";
import { courses as saskatchewan } from "../saskatchewan/k";
import { nlGrade } from "./kit";

// Newfoundland and Labrador Kindergarten.
export const courses: Course[] = nlGrade("k", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick]);
