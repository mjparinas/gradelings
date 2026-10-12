import type { Course } from "../types";
import { courses as alberta } from "../alberta/g3";
import { courses as manitoba } from "../manitoba/g3";
import { courses as newBrunswick } from "../new-brunswick/g3";
import { courses as novaScotia } from "../nova-scotia/g3";
import { courses as ontario } from "../ontario/g3";
import { courses as saskatchewan } from "../saskatchewan/g3";
import { peGrade } from "./kit";
import { peCitizensTakePart3, peGovernments3, peGrowingConditions3, peHowPeopleLive3, peMagnetsStatic3, peOurProvince3, pePeoplesOfOurProvince3, peSoilParts3, peSoilWater3 } from "./units/g3-science-social";

// Prince Edward Island Grade 3.
export const courses: Course[] = peGrade("3", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peGrowingConditions3, peSoilParts3, peSoilWater3, peMagnetsStatic3], order: ["plant-parts", "plant-life", "pe-growing-conditions-3", "pe-soil-parts-3", "pe-soil-water-3", "forces-3", "pe-magnets-static-3", "structures-3", "strong-stable", "skills-3"] }, social: { units: [peOurProvince3, peHowPeopleLive3, pePeoplesOfOurProvince3, peGovernments3, peCitizensTakePart3], order: ["mb-world-maps", "maps-and-globes", "pe-our-province-3", "mb-global-communities", "pe-how-people-live-3", "pe-peoples-of-our-province-3", "world-cultures", "mb-contributions-and-connections", "mb-working-together", "mb-groups-and-leaders", "pe-governments-3", "mb-citizenship", "pe-citizens-take-part-3"] } });
