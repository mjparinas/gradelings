import type { Unit } from "../../types";
import { bankUnit } from "../own";
import { CLASSICAL_ASIA, EASTERN_GEOGRAPHY, INTERACTIONS, MEDITERRANEAN } from "./social-g56-eastern";

// New York's own Grade 6 social units (`ny-` ids): the Eastern Hemisphere. Most of the course is units copied from
// other frameworks (../plan/social-g56.ts); these fill what they leave out. The banks are in ./social-g56-eastern.ts.
export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g6-eastern-hemisphere",
    title: "The Eastern Hemisphere Today",
    emoji: "🌍",
    blurb: "Continents, regions, rivers and climates",
    parentNote:
      "The continents, regions, landforms, rivers and climates of Europe, Africa, Asia and Australia, how geography shapes where people live, and how some of today's issues, such as borders and water shortages, have roots in the past.",
    standards: [
      "6.1a; 6.1b; 6.1c; 6.1d",
      "the physical and human geography of the present-day Eastern Hemisphere, its regions, and issues with roots in the past",
    ],
    items: EASTERN_GEOGRAPHY,
  }),
  bankUnit({
    id: "ny-g6-classical-china-india",
    title: "Classical China & India",
    emoji: "🐉",
    blurb: "Qin, Han, Maurya and Gupta",
    parentNote:
      "The Qin and Han dynasties of China and the Maurya and Gupta empires of India: their rulers, governments, inventions and golden ages, compared with Greece and Rome.",
    standards: [
      "6.5a; 6.5b; 6.5c",
      "the classical civilizations of China and India, how geography and government shaped them, and their golden ages compared with Greece and Rome",
    ],
    items: CLASSICAL_ASIA,
  }),
  bankUnit({
    id: "ny-g6-mediterranean",
    title: "The Mediterranean World",
    emoji: "⚔️",
    blurb: "Byzantium, the caliphates and the Crusades",
    parentNote:
      "The three regions that shared the Mediterranean after Rome fell (feudal Western Europe, the Byzantine Empire and the Islamic caliphates), how Islam spread to North Africa and Spain, and the Crusades seen from European, Byzantine and Muslim points of view. Religions are described factually and respectfully.",
    standards: [
      "6.6a; 6.6b; 6.6c; 6.6d",
      "feudal Western Europe, the Byzantine Empire, the Umayyad and Abbasid caliphates, and the Crusades from several perspectives",
    ],
    items: MEDITERRANEAN,
  }),
  bankUnit({
    id: "ny-g6-mongols-travelers",
    title: "Mongols & Travelers",
    emoji: "🐎",
    blurb: "The Mongol Empire, great journeys and the Black Death",
    parentNote:
      "The Mongol Empire and how it linked East and West, travelers such as Marco Polo, Ibn Battuta, Mansa Musa and Zheng He, trans-Saharan and Indian Ocean trade, the spread of the Black Death, and technologies such as the compass, junks and the rudder.",
    standards: [
      "6.7a; 6.7b; 6.7c",
      "Afro-Eurasian trade networks, the Mongol Empire, famous travelers and the technologies that moved people and goods",
    ],
    items: INTERACTIONS,
  }),
];
