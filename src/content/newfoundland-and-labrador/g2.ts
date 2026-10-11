import type { Course } from "../types";
import { courses as alberta } from "../alberta/g2";
import { courses as manitoba } from "../manitoba/g2";
import { courses as newBrunswick } from "../new-brunswick/g2";
import { courses as novaScotia } from "../nova-scotia/g2";
import { courses as ontario } from "../ontario/g2";
import { courses as saskatchewan } from "../saskatchewan/g2";
import { nlGrade } from "./kit";

// Newfoundland and Labrador Grade 2.
export const courses: Course[] = nlGrade("2", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick]);
