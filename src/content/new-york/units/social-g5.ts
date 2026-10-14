import type { Unit } from "../../types";
import { bankUnit } from "../own";
import { factQuestions, fromItems, mixUnit, timelineUnit } from "./kit";
import {
  CAPITALS,
  CIVILIZATIONS,
  COLUMBIAN_EXCHANGE,
  CULTURES,
  ECONOMICS,
  ENCOUNTERS,
  FIRST_PEOPLES,
  GEOGRAPHY,
  GOVERNMENT,
  REGIONS,
  TIMELINE,
} from "./social-g56-western";

// New York's own Grade 5 social units (`ny-` ids): the Western Hemisphere. The Maya, Aztec and Inca and European
// exploration also come from California's copies (../plan/social-g56.ts). Native nations are named as living
// communities in the present tense; past states (the Aztec and Inca empires) are in the past tense; nothing sacred or
// ceremonial. The banks are in ./social-g56-western.ts.
export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g5-first-peoples",
    title: "First Peoples of the Americas",
    emoji: "🏹",
    blurb: "Arriving, adapting and building cultures",
    parentNote:
      "How and when the first people came to the Americas, how peoples adapted to the Arctic, plains, deserts, forests and islands, and how shared customs, languages and ways of governing give a group its identity. Native nations such as the Haudenosaunee and Inuit are living communities today.",
    standards: [
      "5.1a; 5.1b; 5.1c",
      "how the first people reached the Americas, how early peoples adapted to and changed their environments, and the cultures they built",
    ],
    items: FIRST_PEOPLES,
  }),
  bankUnit({
    id: "ny-g5-early-civilizations",
    title: "Civilizations of the Americas",
    emoji: "🗿",
    blurb: "Olmec, Maya, Aztec, Inca and Mississippian",
    parentNote:
      "What makes a civilization (cities, government, job specialization, writing, social classes), city-states and empires, and how the Olmec, Maya, Aztec, Inca, Mississippian and Ancestral Puebloan peoples farmed, built and adapted to their land. Maya, Nahua and Quechua peoples live in these lands today.",
    standards: [
      "5.2a; 5.2b; 5.2c",
      "the features of civilizations, city-states and empires, and how the Olmec, Maya, Aztec, Inca and Mississippian societies adapted to their environments",
    ],
    items: CIVILIZATIONS,
  }),
  bankUnit({
    id: "ny-g5-encounters",
    title: "Explorers & Encounters",
    emoji: "🧭",
    blurb: "Columbus, Cabot, Cartier, Cabral and Balboa",
    parentNote:
      "Why European explorers sailed west, where Columbus, Cabot, Cartier, Cabral, Balboa and Hudson went, which lands Spain, Portugal, France, England and the Netherlands colonized, the conquests of Cortés and Pizarro, and the French fur trade with Native nations.",
    standards: [
      "5.3a; 5.3b",
      "why Europeans explored the Americas, where they claimed land, and the different ways they met and treated Native Americans",
    ],
    items: ENCOUNTERS,
  }),
  bankUnit({
    id: "ny-g5-columbian-exchange",
    title: "The Columbian Exchange",
    emoji: "🌽",
    blurb: "Crops, animals, diseases and the Middle Passage",
    parentNote:
      "The plants, animals, people, ideas and diseases that crossed the Atlantic after 1492, sugar plantations, and the transatlantic slave trade and the Middle Passage, told factually, with how enslaved Africans resisted and kept their cultures alive.",
    standards: [
      "5.3c; 5.3d",
      "the Columbian Exchange of goods, people, ideas and diseases, and the transatlantic slave trade and the Middle Passage",
    ],
    items: COLUMBIAN_EXCHANGE,
  }),
  bankUnit({
    id: "ny-g5-hemisphere-geography",
    title: "Geography of the Americas",
    emoji: "🗺️",
    blurb: "Mountains, rivers, climates and resources",
    parentNote:
      "The landforms, bodies of water, climate zones and resources of the Western Hemisphere (the Andes, Rockies, Amazon, Great Lakes and Panama Canal), kinds of maps, and how the land shapes where people live and work.",
    standards: [
      "5.4a; 5.4c",
      "the physical geography of the Western Hemisphere, reading different kinds of maps, and how the environment shapes where people live",
    ],
    items: GEOGRAPHY,
  }),
  mixUnit({
    id: "ny-g5-countries-capitals",
    title: "Countries & Capitals",
    emoji: "📍",
    blurb: "The countries and regions of the Americas",
    parentNote:
      "The regions of the Western Hemisphere (North America, Central America, the Caribbean and South America), which countries are in each, and their capital cities.",
    standards: [
      "5.4b; 5.5a",
      "the regions of the Western Hemisphere, the countries in each and their capitals",
    ],
    make: (d) => [
      ...factQuestions(CAPITALS, 5, {
        ask: (country) => `What is the capital of ${country}?`,
        reverse: (city) => `${city} is the capital of which country?`,
        hint: (country, city) => `${city} is the capital of ${country}.`,
      }),
      ...fromItems(REGIONS, 3, d),
    ],
  }),
  bankUnit({
    id: "ny-g5-cultures",
    title: "Cultures of the Americas",
    emoji: "🎭",
    blurb: "Languages, celebrations and contributions",
    parentNote:
      "The languages, holidays, music, sports, art and other contributions of countries across the Western Hemisphere, and what the United States, Canada and Mexico share and do differently.",
    standards: [
      "5.5a",
      "the languages, celebrations and contributions that make the countries of the Western Hemisphere distinct",
    ],
    items: CULTURES,
  }),
  bankUnit({
    id: "ny-g5-governments",
    title: "Governments of the Americas",
    emoji: "🏛️",
    blurb: "The US, Canada, Mexico and the OAS",
    parentNote:
      "How the governments of the United States, Canada and Mexico are organized, the Declaration of Independence, Constitution and Bill of Rights, people who struggled for equal rights or self-government, and groups such as the Organization of American States, the United Nations and the Red Cross.",
    standards: [
      "5.6a; 5.6b; 5.6c; 5.6d",
      "the governments of the United States, Canada and Mexico, US founding documents, struggles for equal rights, and international organizations",
    ],
    items: GOVERNMENT,
  }),
  bankUnit({
    id: "ny-g5-economics",
    title: "Economies & Trade",
    emoji: "🚢",
    blurb: "Economic systems, resources and trade",
    parentNote:
      "Traditional, market and command economies, needs, wants and scarcity, what countries of the Americas make and sell, imports and exports, and why countries depend on each other through trade.",
    standards: [
      "5.7a; 5.7b; 5.7c",
      "traditional, market and command economies, economic activities across the Americas, and trade between interdependent countries",
    ],
    items: ECONOMICS,
  }),
  timelineUnit({
    id: "ny-g5-timeline",
    title: "The Americas Through Time",
    emoji: "⏳",
    blurb: "Put the history of the hemisphere in order",
    parentNote:
      "Ordering events in the history of the Western Hemisphere, from the founding of Tenochtitlan and Columbus's voyages to independence movements, the Panama Canal and trade agreements.",
    standards: [
      "5.2; 5.3; 5.6",
      "putting events in the history of the Western Hemisphere in order, from early civilizations and exploration to independent countries",
    ],
    events: TIMELINE,
  }),
];
