import type { Unit } from "../../types";
import { SCIENCE_5 as TEXAS_SCIENCE_5 } from "../../texas/units/science-5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { UNITS as NEW_YORK_SOCIAL_5 } from "../../new-york/units/social-g5";
import { from, localCopy } from "./kit";

// Ohio copies of Grade 5 units that fit Ohio except for a few questions naming another state's places.

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(NEW_YORK_SOCIAL_5, "ny-g5-hemisphere-geography"), "oh-g5-americas-geography", [
    "Statement 2; Statement 9",
    "the mountains, rivers, climates and resources of the Western Hemisphere and how they affect people",
  ]),
  localCopy(from(NEW_YORK_SOCIAL_5, "ny-g5-early-civilizations"), "oh-g5-early-americas", [
    "Statement 6",
    "the early civilizations of the Americas and their developments",
  ]),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_5, "wa-g5-gravity"), "oh-g5-gravity", ["5.PS.1", "gravity pulls objects toward the center of Earth"], [
    ["A student in Columbus and a student in Australia each drop a ball. Both balls fall…", "toward Earth's center", ["toward Ohio", "up into space"], "Gravity pulls toward the center everywhere."],
    ["A buckeye falls from a tree because of…", "gravity", ["magnetism", "friction"], "Gravity pulls it down."],
    ["Water in the Ohio River flows downhill because of…", "gravity", ["sunlight", "magnetism"], "Gravity pulls water to lower places."],
    ["Gravity pulls a sled down a snowy Ohio hill. Which force slows it down?", "friction", ["gravity", "magnetism"], "Friction acts between surfaces."],
    ["You throw a ball straight up at a park in Dayton. Gravity makes it…", "come back down", ["keep going up forever", "float in place"], "Gravity changes its motion."],
  ]),
  localCopy(from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"), "oh-g5-ecosystems", ["5.LS.1", "organisms perform a variety of roles in an ecosystem, and matter moves among them"], [
    ["In an Ohio forest, mushrooms that break down fallen logs are…", "decomposers", ["producers", "predators"], "They recycle dead matter."],
    ["Earthworms in Ohio farm soil help by…", "breaking down dead plants into nutrients", ["eating the crops' roots", "making sunlight"], "Decomposers enrich soil."],
    ["In a Lake Erie food chain, algae are…", "producers", ["consumers", "decomposers"], "They make food from sunlight."],
    ["A white-tailed deer eating plants in an Ohio woods is a…", "consumer", ["producer", "decomposer"], "It eats other living things."],
    ["When leaves fall in an Ohio autumn, decomposers return their matter to the…", "soil", ["sun", "clouds"], "Plants use it again."],
  ], { parentNote: "Practises how matter moves among plants, animals, decomposers and the environment, and how decomposers return nutrients to the soil." }),
  localCopy(from(WASHINGTON_SCIENCE_5, "wa-g5-sun-stars"), "oh-g5-sun-stars", ["5.ESS.2; 5.ESS.3", "the sun is one of many stars, and Earth's motion causes patterns of day, night and the seasons"], [
    ["Days in Ohio are shortest in…", "December", ["June", "August"], "Winter days are short."],
    ["Days in Ohio are longest in…", "June", ["December", "January"], "Summer days are long."],
    ["At noon in Ohio, your shadow is shortest in…", "summer", ["winter", "fall"], "The sun is highest in summer."],
    ["From Ohio, the sun looks much bigger and brighter than other stars because it is…", "much closer to Earth", ["the largest star there is", "the only star"], "Other stars are very far away."],
    ["In Ohio, the sun rises in the…", "east", ["west", "north"], "It sets in the west."],
    ["You can see Orion on winter nights in Ohio but not in summer because…", "Earth is in a different place in its orbit", ["Orion moves away", "the stars turn off"], "Earth orbits the sun each year.", true],
  ]),
  localCopy(from(TEXAS_SCIENCE_5, "tx-g5-day-night"), "oh-g5-day-night", ["5.ESS.3", "the cycles of day and night are caused by Earth's rotation, and shadows change through the day"], [
    ["In Ohio, a shadow at noon points roughly…", "north", ["south", "east"], "The sun is in the southern sky at noon."],
    ["Earth spins once on its axis about every…", "24 hours", ["365 days", "one month"], "One spin is one day."],
    ["In the morning in Ohio, your shadow points…", "west", ["east", "north"], "The sun is in the east."],
    ["When it is day in Ohio, it is night…", "on the other side of Earth", ["everywhere on Earth", "on the sun"], "Half of Earth faces the sun."],
    ["The sun seems to move across Ohio's sky because…", "Earth rotates", ["the sun circles Earth each day", "clouds push it"], "We are the ones moving."],
  ], { parentNote: "Practises that Earth rotates on its axis about once every 24 hours, which causes day and night and makes the sun appear to move across the sky, so shadows change length and direction during the day." }),
];
