import type { Course } from "../types";
import { courses as alberta } from "../alberta/g8";
import { courses as manitoba } from "../manitoba/g8";
import { courses as newBrunswick } from "../new-brunswick/g8";
import { courses as novaScotia } from "../nova-scotia/g8";
import { courses as ontario } from "../ontario/g8";
import { courses as oregon } from "../oregon/g8";
import { courses as saskatchewan } from "../saskatchewan/g8";
import { courses as washington } from "../washington/g8";
import { californiaGrade } from "./kit";
import { OWN } from "./units/own-g8";

// California Grade 8.
export const courses: Course[] = californiaGrade("8", [
  washington,
  oregon,
  ontario,
  alberta,
  manitoba,
  saskatchewan,
  novaScotia,
  newBrunswick,
], OWN);
