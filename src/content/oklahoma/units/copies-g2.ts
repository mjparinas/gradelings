import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Oklahoma copies of Grade 2 units that fit Oklahoma except for a few questions naming another state's places, with
// Oklahoma examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"), "ok-g2-earth-changes", ["2.ESS1.1; 2.ESS2.1", "Earth events that happen quickly or slowly, and solutions that slow wind and water from changing the land"], [
    ["A tornado can change a place in…", "minutes", ["millions of years", "a hundred years"], "Tornadoes are fast."],
    ["Over a very long time, the Red River carried away soil and…", "made its valley wider", ["built a volcano", "froze solid"], "Rivers change land slowly."],
    ["In the 1930s, strong winds in western Oklahoma blew away dry…", "soil", ["oceans", "mountains"], "This was the Dust Bowl."],
    ["Farmers in Oklahoma plant rows of trees to…", "slow the wind from blowing soil away", ["make it rain", "stop the sun"], "The rows are called windbreaks."],
  ]),
  localCopy(from(WASHINGTON_SCIENCE_2, "wa-g2-land-water"), "ok-g2-land-water", ["2.ESS2.2", "a model of the shapes and kinds of land and bodies of water in an area"], [
    ["Black Mesa, the highest place in Oklahoma, is a… with a flat top.", "landform", ["lake", "river"], "Mesa means table."],
    ["The Red River is a…", "river", ["mountain", "ocean"], "It flows along Oklahoma's southern edge."],
    ["Lake Eufaula in Oklahoma holds…", "fresh water", ["salt water", "no water"], "Lakes are usually fresh water."],
    ["The Wichita Mountains are… than the plains around them.", "higher", ["lower", "wetter"], "Mountains rise above the land."],
  ], { parentNote: "Practises naming kinds of land and bodies of water and showing them on a simple map, using places like Black Mesa, the Wichita Mountains, the Red River and Lake Eufaula." }),
  localCopy(from(WASHINGTON_SCIENCE_2, "wa-g2-habitats"), "ok-g2-habitats", ["2.LS4.1", "observing plants and animals to compare the diversity of life in different habitats"], [
    ["The bison and prairie dogs of western Oklahoma live in a…", "grassland habitat", ["ocean habitat", "rainforest habitat"], "Grass covers the prairie."],
    ["Pine forests in the Ouachita Mountains are home to…", "deer and woodpeckers", ["whales", "penguins"], "Forests have many trees."],
    ["A pond in Oklahoma is a habitat for…", "frogs and fish", ["camels", "polar bears"], "Pond animals need water."],
    ["Which habitat has more kinds of trees, an Oklahoma forest or a grassland?", "a forest", ["a grassland", "they have no trees"], "Grasslands have few trees."],
  ], { parentNote: "Practises comparing the plants and animals that live in different habitats, from Oklahoma's prairies, ponds and pine forests to oceans and deserts." }),
];
