import type { Course } from "../types";
import { courses as alberta } from "../alberta/g9";
import { courses as manitoba } from "../manitoba/g9";
import { courses as newBrunswick } from "../new-brunswick/g9";
import { courses as novaScotia } from "../nova-scotia/g9";
import { courses as ontario } from "../ontario/g9";
import { courses as saskatchewan } from "../saskatchewan/g9";
import { peGrade } from "./kit";
import { peGeographicInformation9, peGeographicThinking9, peGlobalCitizenship9, peGlobalization9, peGoodScience9, peSettlementPatterns9, peSocialAction9, peSustainability9, peSustainabilitySocial9 } from "./units/g9-science-social";

// Prince Edward Island Grade 9.
export const courses: Course[] = peGrade("9", [ontario, manitoba, alberta, saskatchewan, novaScotia, newBrunswick], { science: { units: [peSustainability9, peGoodScience9], order: ["ecosystems-9", "biodiversity-ab", "pe-sustainability-9", "atoms-9", "periodic-table-9", "compounds-9", "bonding-and-reactions", "chemical-change-ab", "static-charges-9", "circuits-9", "electrical-energy-9", "mb-how-science-works", "mb-science-and-society", "pe-good-science-9"] }, social: { units: [peGeographicThinking9, peGeographicInformation9, peSettlementPatterns9, peSustainabilitySocial9, peGlobalization9, peGlobalCitizenship9, peSocialAction9], order: ["pe-geographic-thinking-9", "pe-geographic-information-9", "pe-settlement-patterns-9", "population-issues-9", "pe-sustainability-social-9", "pe-globalization-9", "pe-global-citizenship-9", "pe-social-action-9"] } });
