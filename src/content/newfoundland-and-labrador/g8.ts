import type { Course } from "../types";
import { courses as alberta } from "../alberta/g8";
import { courses as manitoba } from "../manitoba/g8";
import { courses as newBrunswick } from "../new-brunswick/g8";
import { courses as novaScotia } from "../nova-scotia/g8";
import { courses as ontario } from "../ontario/g8";
import { courses as saskatchewan } from "../saskatchewan/g8";
import { nlGrade } from "./kit";
import { confederation } from "./units/g8-g9-social";

// Newfoundland and Labrador Grade 8.
export const courses: Course[] = nlGrade("8", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { social: { units: [confederation], first: true } });
