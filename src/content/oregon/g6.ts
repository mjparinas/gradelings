import type { Course } from "../types";
import { courses as alberta } from "../alberta/g6";
import { courses as manitoba } from "../manitoba/g6";
import { courses as newBrunswick } from "../new-brunswick/g6";
import { courses as novaScotia } from "../nova-scotia/g6";
import { courses as ontario } from "../ontario/g6";
import { courses as ontario8 } from "../ontario/g8";
import { courses as saskatchewan } from "../saskatchewan/g6";
import { courses as washington } from "../washington/g6";
import { courses as bc7 } from "../grades/g7";
import { oregonGrade } from "./kit";

// Oregon Grade 6.
export const courses: Course[] = oregonGrade("6", [washington, ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick, ontario8, bc7]);
