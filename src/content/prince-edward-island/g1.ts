import type { Course } from "../types";
import { courses as alberta } from "../alberta/g1";
import { courses as manitoba } from "../manitoba/g1";
import { courses as newBrunswick } from "../new-brunswick/g1";
import { courses as novaScotia } from "../nova-scotia/g1";
import { courses as ontario } from "../ontario/g1";
import { courses as saskatchewan } from "../saskatchewan/g1";
import { peGrade } from "./kit";
import { peFirstPeoplesPlace1, peFourSeasons1, peGoodsAndServices1, peMakeAToy1, peNeedsAndWants1, peThenAndNow1 } from "./units/k1-science-social";

// Prince Edward Island Grade 1.
export const courses: Course[] = peGrade("1", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peMakeAToy1, peFourSeasons1], order: ["think-like-a-scientist", "mb-g1-science-skills", "our-bodies-and-senses", "materials", "objects-and-structures", "pe-make-a-toy-1", "living-things", "what-living-things-need", "animal-survival", "sky-and-seasons", "pe-four-seasons-1"] }, social: { units: [peNeedsAndWants1, peGoodsAndServices1, peThenAndNow1, peFirstPeoplesPlace1], order: ["respect-and-inclusion", "mb-g1-getting-along", "different-and-alike", "my-community", "my-roles", "our-land", "places-in-my-community", "maps", "measure-and-map", "pe-then-and-now-1", "pe-first-peoples-place-1", "pe-needs-and-wants-1", "pe-goods-and-services-1"] } });
