import type { Unit } from "../../types";
import { SOCIAL_6 as TEXAS_SOCIAL_6 } from "../../texas/units/social-g6";
import { SCIENCE_6 as TEXAS_SCIENCE_6 } from "../../texas/units/science-6";
import { G6 as WASHINGTON_SOCIAL_6 } from "../../washington/units/social-59-g6";
import { from, localCopy } from "./kit";

// Ohio copies of Grade 6 units that fit Ohio except for a few questions naming another state's places.

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SOCIAL_6, "wa-g6-world-regions"),
    "oh-g6-world-regions",
    [
      "Statement 8",
      "the major regions of the Earth, their physical features and their countries",
    ],
  ),
  localCopy(from(TEXAS_SOCIAL_6, "tx-g6-world-maps"), "oh-g6-world-maps", ["Statement 2; Statement 3", "maps from different perspectives, and latitude and longitude for absolute location"], [
    ["Columbus, Ohio, is at about 40° N, 83° W. It is in the… hemispheres.", "Northern and Western", ["Southern and Eastern", "Northern and Eastern"], "North of the equator and west of the prime meridian."],
    ["Lines of latitude measure distance north or south of the…", "equator", ["prime meridian", "North Pole only"], "The equator is 0° latitude."],
    ["Lines of longitude measure distance east or west of the…", "prime meridian", ["equator", "Tropic of Cancer"], "The prime meridian is 0° longitude."],
    ["A Mercator map makes Greenland look much bigger than it is because…", "every flat map stretches part of the round Earth", ["Greenland is the largest continent", "the mapmaker made a mistake"], "Projections distort size or shape."],
    ["Cleveland is at a higher latitude than Cincinnati. That means Cleveland is…", "farther north", ["farther south", "farther east"], "Latitude grows toward the poles."],
    ["Absolute location is…", "an exact spot given by latitude and longitude", ["a place described as near a landmark", "a country's name"], "Relative location uses nearby places."],
  ], { parentNote: "Latitude and longitude, hemispheres, absolute location, kinds of maps and projections, continents, oceans and major landforms." }),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(TEXAS_SCIENCE_6, "tx-g6-rock-cycle"), "oh-g6-rock-cycle", ["6.ESS.1; 6.ESS.2; 6.ESS.3; 6.ESS.5", "minerals and rocks, how they form and are identified, and how people use them"], [
    ["Much of the bedrock under Ohio is sedimentary rock, such as…", "limestone, sandstone and shale", ["granite and basalt only", "marble only"], "It formed in ancient seas and swamps."],
    ["Ohio's limestone formed from…", "shells and remains of sea animals pressed together", ["cooled lava", "melted glaciers"], "Ohio was once under a sea."],
    ["Ohio flint, the state gemstone, was used by early people to make…", "tools and points", ["coins", "glass windows"], "It breaks with sharp edges."],
    ["Salt mined deep under Lake Erie near Cleveland is a…", "mineral", ["rock made of lava", "fossil fuel"], "Rock salt is the mineral halite."],
    ["Scratching a mineral against another tests its…", "hardness", ["age", "color"], "Harder minerals scratch softer ones."],
    ["Heat and pressure can change limestone into…", "marble", ["sandstone", "coal"], "That makes a metamorphic rock.", true],
  ], { parentNote: "Practises how igneous, sedimentary and metamorphic rocks form and change into one another through melting, cooling, weathering, compaction, heat and pressure, and how minerals are identified, with Ohio examples such as limestone, Ohio flint and the salt mined under Lake Erie." }),
];
