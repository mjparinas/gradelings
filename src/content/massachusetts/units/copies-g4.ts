import type { Unit } from "../../types";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { from, localCopy } from "./kit";

// Massachusetts copies of Grade 4 units that fit Massachusetts except for a few questions naming another state's
// places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(OREGON_SCIENCE_COPIES["4"] ?? [], "or-g4-rocks-erosion"), "ma-g4-rocks-erosion", ["4-ESS1-1; 4-ESS2-1", "rock layers and fossils show landscape change, and weathering and erosion shape the land"], [
    ["Glaciers moving over Massachusetts long ago left behind…", "boulders, sand and gravel", ["volcanoes", "coral reefs", "deserts"], "Glaciers carry rock as they move."],
    ["Cape Cod was formed mostly from material left by…", "glaciers", ["volcanoes", "earthquakes", "rivers of lava"], "The ice age shaped it."],
    ["Waves wearing away the cliffs on Martha's Vineyard are an example of…", "erosion", ["melting", "freezing", "evaporation"], "Moving water carries the soil away."],
    ["Dinosaur footprints in rock in the Connecticut River valley tell us…", "dinosaurs once walked there", ["dinosaurs are alive today", "the rock was made last year", "people made the tracks"], "Fossils give clues about the past."],
    ["Fossil shells found high on a hill tell scientists the land was once…", "under water", ["on the Moon", "always a hill", "made of ice"], "Shells come from water animals."],
  ]),
];
