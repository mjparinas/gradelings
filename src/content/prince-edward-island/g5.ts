import type { Course } from "../types";
import { courses as alberta } from "../alberta/g5";
import { courses as manitoba } from "../manitoba/g5";
import { courses as newBrunswick } from "../new-brunswick/g5";
import { courses as novaScotia } from "../nova-scotia/g5";
import { courses as ontario } from "../ontario/g5";
import { courses as saskatchewan } from "../saskatchewan/g5";
import { peGrade } from "./kit";
import { peAirAndSun5, peBodyInvestigations5, peDecisionMaking5, peFirstNationsInuit5, peMeetingInAtlanticCanada5, peMiddleAges5, peWeatherTools5 } from "./units/g5-science-social";

// Prince Edward Island Grade 5.
export const courses: Course[] = peGrade("5", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peWeatherTools5, peAirAndSun5, peBodyInvestigations5], order: ["digestion-and-breathing", "heart-bones-muscles", "body-teamwork-5", "pe-body-investigations-5", "states-of-matter-5", "changes-of-state-5", "matter-changes-5", "mb-matter-changes-5", "simple-machines", "mb-friction-5", "mb-weather-5", "pe-weather-tools-5", "pe-air-and-sun-5", "mb-science-skills-5"] }, social: { units: [peMiddleAges5, peFirstNationsInuit5, peDecisionMaking5, peMeetingInAtlanticCanada5], order: ["mb-history-skills-5", "inquiry-5", "where-and-when-ab", "environment-ab", "rise-and-fall-ab", "pe-middle-ages-5", "pe-first-nations-inuit-5", "pe-decision-making-5", "pe-meeting-in-atlantic-canada-5", "legacies-ab"] } });
