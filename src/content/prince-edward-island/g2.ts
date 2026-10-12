import type { Course } from "../types";
import { courses as alberta } from "../alberta/g2";
import { courses as manitoba } from "../manitoba/g2";
import { courses as newBrunswick } from "../new-brunswick/g2";
import { courses as novaScotia } from "../nova-scotia/g2";
import { courses as ontario } from "../ontario/g2";
import { courses as saskatchewan } from "../saskatchewan/g2";
import { peGrade } from "./kit";
import { peBuildAndMove2, peChangesInMyLife2, peChangingLand2, peGrowingUp2, peOurFutureCommunity2, pePeopleWhoChangeThings2, peTechnology2, peWeatherAndWind2, peWhereIsIt2, peWorkAndPrices2 } from "./units/g2-science-social";

// Prince Edward Island Grade 2.
export const courses: Course[] = peGrade("2", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peWeatherAndWind2, peWhereIsIt2, peGrowingUp2, peBuildAndMove2], order: ["animal-life-cycles", "pe-growing-up-2", "air-and-water-for-life", "water-world", "pe-weather-and-wind-2", "solids-and-liquids", "mixtures-and-materials", "push-and-pull", "pe-where-is-it-2", "pe-build-and-move-2"] }, social: { units: [peChangesInMyLife2, pePeopleWhoChangeThings2, peOurFutureCommunity2, peTechnology2, peWorkAndPrices2, peChangingLand2], order: ["then-and-now", "pe-changes-in-my-life-2", "pe-people-who-change-things-2", "caring-citizens", "pe-our-future-community-2", "pe-technology-2", "needs-and-wants", "pe-work-and-prices-2", "pe-changing-land-2"] } });
