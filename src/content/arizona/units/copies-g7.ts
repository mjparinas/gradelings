import type { Unit } from "../../types";
import { UNITS as NEW_YORK_8 } from "../../new-york/units/social-g8";
import { UNITS as MINNESOTA_7 } from "../../minnesota/units/social-g7";
import { UNITS as MINNESOTA_8 } from "../../minnesota/units/social-g8";
import type { Q } from "../own";
import { copyOf, from } from "./kit";

// Arizona copies of other states' units for Grade 7 integrated global studies: the questions that name another state, or
// that are about Tribes or treaties, are left out. The world wars and the Cold War (7.H2.1, 7.H2.2, 7.E5.2), the world
// since 1945 (7.H1.1, 7.C4.4), population and migration (7.G4.3, 7.G3.4), economies and trade (7.E5.1, 7.E3.2) and
// civil rights (7.H3.3, 7.C4.1).

const WAR_I_EXTRA: Q[] = [
  ["Which event in 1914 set off World War I?", "the assassination of Archduke Franz Ferdinand", ["the sinking of the Titanic", "the fall of the Berlin Wall"], "He was heir to the throne of Austria-Hungary."],
  ["Long lines of ditches where soldiers fought on the Western Front were called…", "trenches", ["canals", "forts"], "Trench warfare made the war long and deadly."],
  ["The agreement that ended World War I in 1919 was the…", "Treaty of Versailles", ["Magna Carta", "Treaty of Paris of 1783"], "It made Germany pay reparations.", true],
  ["President Woodrow Wilson's plan for peace was called the…", "Fourteen Points", ["New Deal", "Marshall Plan"], "It proposed a League of Nations."],
];

const POPULATION_EXTRA: Q[] = [
  ["A reason that pushes people to leave a place, such as war or drought, is a…", "push factor", ["pull factor", "trade route"], "Pull factors draw people to a new place."],
  ["Jobs, safety and family in a new place are…", "pull factors", ["push factors", "natural hazards"], "They pull people toward a place."],
  ["Phoenix grew quickly after air conditioning became common because…", "hot summers became easier to live with", ["the desert got cooler", "the city moved north"], "Technology can change where people choose to live."],
  ["People who must flee their country because of war or danger are…", "refugees", ["tourists", "commuters"], "Refugees seek safety in another country."],
  ["Population density means…", "how many people live in an area", ["how tall the buildings are", "how old people are"], "Cities have high density; deserts have low density."],
  ["Moving from the countryside to cities is called…", "urbanization", ["immigration", "irrigation"], "More than half the world now lives in cities.", true],
];

const ECONOMIES_EXTRA: Q[] = [
  ["Goods a country sells to other countries are…", "exports", ["imports", "tariffs"], "Arizona exports copper and electronics."],
  ["A tax on goods brought in from another country is a…", "tariff", ["subsidy", "budget"], "Tariffs make imports cost more."],
  ["In a market economy, prices are mostly set by…", "buyers and sellers", ["the government alone", "the weather"], "Supply and demand shape prices."],
  ["Mexico is one of Arizona's biggest trading partners because…", "the two share a border", ["they use the same money", "they have the same government"], "Trucks cross at Nogales every day.", true],
];
export const COPIES_7: Unit[] = [
  copyOf(from(NEW_YORK_8, "ny-g8-world-war-i"), {
    id: "az-g7-world-war-i",
    title: "World War I",
    emoji: "🪖",
    blurb: "Alliances, the Great War and its results",
    parentNote: "The causes of World War I (alliances, militarism, empires and nationalism), the war in Europe and the entry of the United States, life on the home front, and the war's results around the world.",
    standards: ["7.H2.2; 7.SP4.1", "the causes and effects of conflict and peacemaking, and the multiple causes and effects of events"],
  }, WAR_I_EXTRA),
  copyOf(from(NEW_YORK_8, "ny-g8-world-war-ii"), {
    id: "az-g7-world-war-ii",
    title: "World War II",
    emoji: "✈️",
    blurb: "The road to war, the Holocaust and the world after",
    parentNote: "The road to World War II, the war in Europe and the Pacific, the Holocaust, the home front including the forced removal of Japanese Americans, and the war's results, including the United Nations.",
    standards: ["7.H2.1; 7.H3.4", "how conflict can unite and divide nations, and the influence of individuals, groups and institutions on events"],
  }),
  copyOf(from(NEW_YORK_8, "ny-g8-cold-war"), {
    id: "az-g7-cold-war",
    title: "The Cold War",
    emoji: "🧊",
    blurb: "Superpowers, the arms race and the fall of the Berlin Wall",
    parentNote: "The Cold War between the United States and the Soviet Union: communism and democracy, NATO, the arms and space races, conflicts in Korea and Vietnam, and the fall of the Berlin Wall.",
    standards: ["7.E5.2; 7.H3.1", "comparing economic systems, and the origins and spread of influential ideologies"],
  }),
  copyOf(from(MINNESOTA_8, "mn-g8-world-since-1945"), {
    id: "az-g7-world-since-1945",
    title: "The World Since 1945",
    emoji: "🌐",
    blurb: "New nations, the United Nations and global challenges",
    parentNote: "The world since 1945: the end of empires and new nations, the United Nations, human rights, globalization and shared challenges such as climate and migration.",
    standards: ["7.H1.1; 7.C4.4", "the rise, decline and blending of cultures and societies, and addressing local, regional and global problems"],
  }),
  copyOf(from(MINNESOTA_8, "mn-g8-population"), {
    id: "az-g7-population",
    title: "Population & Migration",
    emoji: "🧭",
    blurb: "Growing cities and people on the move",
    parentNote: "Where people live and why: population growth, cities, push and pull factors of migration, refugees, and how moving people and cultures change places.",
    standards: ["7.G4.3; 7.G3.4", "how population patterns change land use, and how population and movement can cause conflict or cooperation"],
  }, POPULATION_EXTRA),
  copyOf(from(MINNESOTA_8, "mn-g8-economies"), {
    id: "az-g7-economies",
    title: "Economies & Global Trade",
    emoji: "🚢",
    blurb: "Economic systems, supply and demand, and trade",
    parentNote: "Command, market and mixed economies, supply, demand and prices, and global trade: exports, imports, tariffs and trade agreements.",
    standards: ["7.E5.1; 7.E3.2", "trade and trade barriers among nations, and how supply, demand and competition influence prices"],
  }, ECONOMIES_EXTRA),
  copyOf(from(MINNESOTA_7, "mn-g7-civil-rights"), {
    id: "az-g7-civil-rights",
    title: "Civil Rights",
    emoji: "✊",
    blurb: "Movements that won equal rights",
    parentNote: "The civil rights movement in the United States and how individual rights have grown: Brown v. Board of Education, the Montgomery bus boycott, the Civil Rights Act and the Voting Rights Act, and movements for the rights of women, farm workers and others.",
    standards: ["7.H3.3; 7.C4.1", "how individual rights and freedoms have evolved, and means of changing society to promote the common good"],
  }),
];
