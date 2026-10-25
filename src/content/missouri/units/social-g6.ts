import type { Unit } from "../../types";
import { SOCIAL_6 as GEORGIA_SOCIAL_6 } from "../../georgia/units/social-g67";
import { worldMaps6 } from "../../oregon/units/social-copies";
import { from, localCopy } from "./kit";

// Missouri Grade 6 social studies, world geography: Missouri copies of other states' world maps, Latin America and
// Australia units without the questions that name their own states or are about Tribes.

export const SOCIAL_6: Unit[] = [
  localCopy(
    worldMaps6,
    "mo-g6-world-maps",
    ["6-8.GEO.1.G.A; 6-8.GEO.2.G.B", "using maps, globes, latitude and longitude, and the world's physical systems"],
    [
      ["St. Louis is at about 38° north latitude. That means it is…", "north of the equator", ["south of the equator", "on the equator", "at the South Pole"], "North latitudes are above the equator."],
      ["Lines that run east and west around the globe, parallel to the equator, are lines of…", "latitude", ["longitude", "elevation", "scale"], "Latitude measures north and south."],
      ["The imaginary line at 0° longitude that runs through Greenwich, England, is the…", "prime meridian", ["equator", "Tropic of Cancer", "Arctic Circle"], "It divides east from west."],
      ["Missouri is in which two hemispheres?", "the Northern and Western", ["the Southern and Eastern", "the Northern and Eastern", "the Southern and Western"], "It is north of the equator and west of the prime meridian."],
      ["A map that shows Missouri's land as flat and the Ozarks as hilly is a…", "physical map", ["political map", "road map", "time zone map"], "Physical maps show landforms.", true],
    ],
  ),
  localCopy(
    from(GEORGIA_SOCIAL_6, "ga-g6-latin-america"),
    "mo-g6-latin-america",
    ["6-8.GEO.2.PC.A; 6-8.GEO.2.G.C", "the physical and human characteristics of Latin America, and how people adapt to and change it"],
    [
      ["The Amazon, the river with the most water in the world, flows mostly through…", "Brazil", ["Mexico", "Chile", "Cuba"], "It crosses the rainforest."],
      ["The Andes Mountains run along the western side of…", "South America", ["Africa", "Asia", "Europe"], "They are the longest mountain range on land."],
      ["The main language spoken in Brazil is…", "Portuguese", ["Spanish", "French", "English"], "Portugal colonized Brazil."],
      ["The Panama Canal lets ships travel between the Atlantic and…", "Pacific Oceans", ["Indian Oceans", "Arctic Oceans", "Great Lakes"], "Ships no longer sail around South America."],
      ["Cutting down the Amazon rainforest for farms and ranches is called…", "deforestation", ["irrigation", "migration", "urbanization"], "It destroys habitats.", true],
    ],
  ),
  localCopy(
    from(GEORGIA_SOCIAL_6, "ga-g6-australia"),
    "mo-g6-australia",
    ["6-8.GEO.2.PC.C; 6-8.GEO.2.G.C", "Australia's land, climate and people, and how location and resources affect where people live"],
    [
      ["Most Australians live near the…", "coast", ["center of the desert", "top of Uluru", "South Pole"], "The interior is very dry."],
      ["The dry interior of Australia is called the…", "Outback", ["Andes", "Sahara", "Amazon"], "Few people live there."],
      ["The Great Barrier Reef lies off Australia's…", "northeast coast", ["west coast", "south coast", "Antarctic shore"], "It is the world's largest coral reef system."],
      ["Australia is both a country and a…", "continent", ["state", "city", "river"], "It is the smallest continent."],
      ["Aboriginal and Torres Strait Islander peoples have lived in Australia for…", "tens of thousands of years", ["about 200 years", "about 50 years", "about 1,000 years"], "Their cultures and languages continue today.", true],
    ],
    {
      parentNote:
        "Locating Australia's key physical features (the Great Barrier Reef, Uluru, the Outback and the Great Dividing Range), how its location, climate and resources affect where people live and trade, its market economy, and the Aboriginal and Torres Strait Islander peoples, whose cultures and languages continue today.",
    },
  ),
];
