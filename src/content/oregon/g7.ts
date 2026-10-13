import type { Course } from "../types";
import { courses as alberta6 } from "../alberta/g6";
import { courses as alberta } from "../alberta/g7";
import { courses as bc6 } from "../grades/g6";
import { courses as manitoba } from "../manitoba/g7";
import { courses as newBrunswick } from "../new-brunswick/g7";
import { courses as novaScotia } from "../nova-scotia/g7";
import { courses as ontario } from "../ontario/g7";
import { courses as saskatchewan } from "../saskatchewan/g7";
import { courses as washington } from "../washington/g7";
import { courses as bc8 } from "../grades/g8";
import { courses as alberta8 } from "../alberta/g8";
import { courses as washington6 } from "../washington/g6";
import { oregonGrade } from "./kit";

// Oregon Grade 7.
export const courses: Course[] = oregonGrade("7", [washington, ontario, alberta, manitoba, saskatchewan, novaScotia, newBrunswick, bc6, alberta6, bc8, alberta8, washington6]);
