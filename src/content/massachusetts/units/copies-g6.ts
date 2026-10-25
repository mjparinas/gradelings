import type { Unit } from "../../types";
import { SOCIAL_6 as GEORGIA_SOCIAL_6 } from "../../georgia/units/social-g67";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { OWN_SOCIAL_6 as OREGON_SOCIAL_6 } from "../../oregon/units/social-g67";
import { from, localCopy } from "./kit";

// Massachusetts copies of Grade 6 units that fit Massachusetts except for a few questions naming another state's
// places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"), "ma-g6-earth-history", ["6.MS-ESS1-4; 6.MS-LS4-1; 6.MS-LS4-2", "rock strata and Earth's history, the fossil record, and anatomical evidence of common ancestry"], [
    ["Dinosaur tracks in the rock of the Connecticut River valley come from the…", "Mesozoic Era", ["Cenozoic Era", "Precambrian", "present day"], "It was the age of dinosaurs."],
    ["In undisturbed rock layers, the oldest layer is usually at the…", "bottom", ["top", "middle", "side"], "Layers pile up over time."],
    ["A bat's wing and a human arm have the same kinds of bones. They are…", "homologous structures", ["fossils", "minerals", "rock layers"], "They point to a shared ancestor."],
    ["Fossils of sea animals in rock far inland show that…", "the area was once covered by water", ["sea animals walked on land", "the fossils are fake", "rocks never change"], "Environments change over time."],
    ["A fossil found in a lower layer is likely… than one in a higher layer.", "older", ["younger", "the same age", "made of plastic"], "Lower layers formed first."],
  ]),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(GEORGIA_SOCIAL_6, "ga-g6-latin-america"), "ma-g6-latin-america", ["6.T5a.2; 6.T5b.2", "the countries and cities of Central America, the Caribbean and South America"], [
    ["The island country about 90 miles south of the Florida Keys, with its capital at Havana, is…", "Cuba", ["Jamaica", "Haiti", "Puerto Rico"], "It is the largest Caribbean island."],
    ["The capital of Brazil is…", "Brasília", ["Rio de Janeiro", "São Paulo", "Buenos Aires"], "It was built as a new capital in 1960."],
    ["The capital of Peru is…", "Lima", ["Quito", "Bogotá", "Santiago"], "It is on the Pacific coast."],
    ["The capital of Argentina is…", "Buenos Aires", ["Montevideo", "Lima", "Caracas"], "It is on the Río de la Plata."],
    ["Many Massachusetts families have roots in Brazil, Cabo Verde and…", "the Dominican Republic", ["Antarctica", "Greenland", "Iceland"], "Its capital is Santo Domingo."],
  ]),
  localCopy(from(OREGON_SOCIAL_6, "or-g6-early-americas-africa"), "ma-g6-early-americas-africa", ["6.T5c.1", "the Olmec, Maya and other ancient societies of Central America"], [
    ["The Olmec are known for carving…", "giant stone heads", ["glass windows", "steel bridges", "paper money"], "Some are taller than a person."],
    ["The Maya built cities with tall…", "stone pyramids", ["skyscrapers", "wooden castles", "glass towers"], "Tikal is one famous city."],
    ["The Maya developed a writing system and an accurate…", "calendar", ["telephone", "printing press", "compass"], "They tracked the Sun, Moon and planets."],
    ["Teotihuacan was a huge ancient city in what is now…", "Mexico", ["Peru", "Egypt", "Brazil"], "Its Pyramid of the Sun still stands."],
    ["Do Maya people live in Central America today?", "yes, millions of Maya people live there today", ["no, they all vanished", "only in museums", "only in stories"], "Maya languages are still spoken."],
  ], { parentNote: "Archaeological evidence of the first people and early civilizations of the Americas (Olmec, Maya, Teotihuacan, Moche) and of Africa (Kush, Nok, Aksum, Ghana), up to about 900 CE. Maya people are a living people today." }),
];
