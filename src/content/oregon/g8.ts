import type { Course } from "../types";
import { courses as alberta } from "../alberta/g8";
import { courses as manitoba } from "../manitoba/g8";
import { courses as newBrunswick } from "../new-brunswick/g8";
import { courses as novaScotia } from "../nova-scotia/g8";
import { courses as ontario } from "../ontario/g8";
import { courses as saskatchewan } from "../saskatchewan/g8";
import { courses as washington } from "../washington/g8";
import { oregonGrade } from "./kit";

// Oregon Grade 8.
export const courses: Course[] = oregonGrade("8", [washington, ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick]);
