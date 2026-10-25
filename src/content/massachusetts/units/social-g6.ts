import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Massachusetts Grade 6 social studies: the physical and political geography of Central America and the Caribbean
// (6.T5a.1, 6.T5a.2) and how location, climate and resources shape where people live and how they earn a living there
// (6.T5a.3).

const CARIBBEAN: Q[] = [
  ["Central America is the narrow land that connects…", "North America and South America", ["Europe and Asia", "Africa and Asia", "Australia and Antarctica"], "It is sometimes called an isthmus."],
  ["Which sea lies east of Central America?", "the Caribbean Sea", ["the Mediterranean Sea", "the Black Sea", "the North Sea"], "Many islands sit in it."],
  ["Which ocean lies west of Central America?", "the Pacific Ocean", ["the Atlantic Ocean", "the Indian Ocean", "the Arctic Ocean"], "The Panama Canal links it to the Atlantic."],
  ["The Panama Canal lets ships travel between…", "the Atlantic and Pacific Oceans", ["the Nile and the Amazon", "Europe and Africa", "two lakes in Canada"], "It opened in 1914."],
  ["Which country is in Central America?", "Guatemala", ["Peru", "Spain", "Egypt"], "It borders Mexico."],
  ["Which country is an island in the Caribbean?", "Jamaica", ["Honduras", "Belize", "Chile"], "Its capital is Kingston."],
  ["The largest island in the Caribbean is…", "Cuba", ["Puerto Rico", "Barbados", "Aruba"], "Its capital is Havana."],
  ["Which two countries share the island of Hispaniola?", "Haiti and the Dominican Republic", ["Cuba and Jamaica", "Panama and Costa Rica", "Mexico and Belize"], "Many Massachusetts families have roots there."],
  ["Puerto Rico is…", "a US territory in the Caribbean", ["a country in Africa", "a state in New England", "a city in Mexico"], "People born there are US citizens."],
  ["The capital of the Dominican Republic is…", "Santo Domingo", ["San Juan", "Havana", "Managua"], "It is one of the oldest European-founded cities in the Americas."],
  ["The capital of Costa Rica is…", "San José", ["Panama City", "Tegucigalpa", "Port-au-Prince"], "Costa Rica means rich coast."],
  ["The capital of Haiti is…", "Port-au-Prince", ["Kingston", "Santo Domingo", "Nassau"], "Haiti became independent in 1804."],
  ["Most of Central America and the Caribbean has a… climate.", "tropical", ["polar", "desert", "tundra"], "It is warm all year."],
  ["Which kind of storm often strikes the Caribbean in late summer and fall?", "hurricanes", ["blizzards", "sandstorms", "ice storms"], "They form over warm ocean water."],
  ["Central America has many volcanoes because it lies on…", "the edges of tectonic plates", ["a flat plain", "a frozen lake", "a desert"], "This is part of the Ring of Fire."],
  ["Which crop is an important export of Central America?", "bananas", ["wheat", "potatoes from Ireland", "maple syrup"], "They grow well in warm, wet places."],
  ["Coffee grows well on the… of Central America.", "cool mountain slopes", ["frozen beaches", "deserts", "glaciers"], "Rich volcanic soil helps too."],
  ["Tourism is important to many Caribbean islands because of their…", "beaches and warm weather", ["ski slopes", "frozen lakes", "deserts"], "Cruise ships visit often."],
  ["The main language spoken in most of Central America is…", "Spanish", ["German", "Japanese", "Russian"], "Spain colonized much of the region.", true],
  ["In Haiti, people speak Haitian Creole and…", "French", ["Spanish", "Portuguese", "Dutch"], "France once ruled Haiti.", true],
  ["Belize is the Central American country where the official language is…", "English", ["Spanish", "French", "Portuguese"], "Britain once ruled it.", true],
  ["Absolute location means describing a place by its…", "latitude and longitude", ["nearest store", "favorite food", "weather"], "For example, 18° N, 77° W.", true],
  ["Relative location means describing a place by…", "where it is compared with other places", ["its exact coordinates", "its population only", "its flag"], "For example, south of Cuba.", true],
  ["Why do many people in the region live along coasts?", "for fishing, trade and ports", ["because the mountains are empty", "because the coasts are frozen", "because there is no water inland"], "Ships carry goods in and out.", true],
  ["Why can a single hurricane hurt an island's economy?", "it can damage farms, homes and tourist sites at once", ["it brings more tourists", "it makes crops grow faster", "it only affects the ocean"], "Small islands may depend on a few industries.", true],
];

export const SOCIAL_6: Unit[] = [
  bankUnit({
    id: "ma-g6-central-america-caribbean",
    title: "Central America & the Caribbean",
    emoji: "🏝️",
    blurb: "Countries, capitals, climate and resources",
    parentNote: "The physical and political geography of Central America and the Caribbean: the isthmus, the Caribbean Sea and the Panama Canal, countries and their capitals, absolute and relative location, and how a tropical climate, volcanoes, hurricanes and resources shape where people live and how they earn a living.",
    standards: ["6.T5a.1; 6.T5a.2; 6.T5a.3", "the physical and political geography of Central America and the Caribbean, and how location, climate and resources shape life there"],
    items: CARIBBEAN,
  }),
];
