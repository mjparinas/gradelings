import type { Unit } from "../../types";
import { OWN_SOCIAL_7 as OREGON_SOCIAL_7 } from "../../oregon/units/social-g67";
import { SCIENCE_6 as TEXAS_SCIENCE_6 } from "../../texas/units/science-6";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { SCIENCE_7 as TEXAS_SCIENCE_7 } from "../../texas/units/science-7";
import { UNITS as NEW_YORK_SCIENCE_6 } from "../../new-york/units/science-g6";
import { LANGUAGE_7 as CALIFORNIA_LANGUAGE_7 } from "../../california/units/language-g7";
import { units as ALBERTA_SOCIAL_8 } from "../../alberta/g8-social";
import { from, localCopy } from "./kit";

// Ohio copies of Grade 7 units that fit Ohio except for a few questions naming another state's places.

export const LANGUAGE_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-story-analysis"),
    "oh-g7-story-analysis",
    [
      "RL.7.1; RL.7.2; RL.7.7; RL.7.9",
      "citing several pieces of evidence, theme and objective summary, comparing a text with its staged, filmed or audio version, and fiction compared with history",
    ],
  ),
  localCopy(
    from(CALIFORNIA_LANGUAGE_7, "ca-g7-info-analysis"),
    "oh-g7-info-analysis",
    [
      "RI.7.1; RI.7.2; RI.7.3; RI.7.4; RI.7.5; RI.7.7; RI.7.9",
      "evidence, central ideas, how people, events and ideas interact, word choice, text structure, comparing media versions, comparing two writers, and academic words",
    ],
    [
      [
        "The central idea of an article is…",
        "the most important point it makes",
        ["the first word", "the title only"],
        "Supporting details explain it.",
      ],
      [
        "An author who lists events in time order is using… structure.",
        "chronological",
        ["compare and contrast", "problem and solution"],
        "First, next, then, finally.",
      ],
      [
        "To support a claim about a text, you should cite…",
        "evidence from the text",
        ["your own guess", "a random fact"],
        "Quote or paraphrase the text.",
      ],
      [
        "An objective summary…",
        "leaves out your opinions",
        ["adds your feelings", "retells every detail"],
        "Stick to the main points.",
      ],
      [
        "Two authors write about the 1859 gold rush to Ohio. Comparing them helps you see…",
        "how they present the facts differently",
        ["which one is longer", "who has more pages"],
        "Authors choose what to stress.",
        true,
      ],
      [
        "A word with a strong feeling, like 'disaster', shows the author's…",
        "tone or point of view",
        ["page number", "headline size"],
        "Word choice shapes meaning.",
        true,
      ],
    ],
  ),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(ALBERTA_SOCIAL_8, "japan-land-values-ab"), "oh-g7-japan", [
    "Statement 7; Statement 2",
    "how Japan's geography shaped its culture and government",
  ]),
  localCopy(from(OREGON_SOCIAL_7, "or-g7-exploration-and-empire"), "oh-g7-exploration", ["Statement 13", "European exploration, conquest, colonization and the Columbian Exchange"], [
    ["Christopher Columbus's 1492 voyage began lasting contact between…", "the Eastern and Western Hemispheres", ["Asia and Australia", "the Arctic and Antarctica"], "It led to the Columbian Exchange."],
    ["Horses, wheat and cattle brought from Europe to the Americas are part of the…", "Columbian Exchange", ["Silk Road", "Industrial Revolution"], "Plants and animals crossed the ocean."],
    ["Corn, potatoes and tomatoes went from the Americas to…", "Europe, Africa and Asia", ["nowhere at all", "only Antarctica"], "New foods changed diets worldwide."],
    ["Diseases such as smallpox brought by Europeans…", "killed millions of people already living in the Americas", ["had no effect", "helped crops grow"], "They had no immunity to these diseases."],
    ["Portuguese sailors found a sea route around Africa to…", "India", ["Iceland", "the Arctic"], "Vasco da Gama reached India in 1498."],
    ["European rulers paid for voyages of exploration mainly to find…", "gold, land and new trade routes", ["snow", "penguins"], "Wealth and trade drove exploration."],
  ], { parentNote: "European voyages of exploration, the Columbian Exchange, colonialism in the Americas, Africa and Asia and resistance to it." }),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_6, "wa-g6-weather"), "oh-g7-weather", ["7.ESS.2; 7.ESS.3", "the atmosphere has different properties at different elevations, and air masses shape the weather"], [
    ["Cold air moving over the warmer water of Lake Erie in early winter causes…", "lake-effect snow", ["hurricanes", "dust storms"], "Northeast Ohio gets a lot of it."],
    ["When a cold front passes through Ohio in spring, it often brings…", "thunderstorms, then cooler air", ["a week of calm heat", "sea breezes"], "Cold air pushes warm air up."],
    ["The layer of the atmosphere where Ohio's weather happens is the…", "troposphere", ["stratosphere", "thermosphere"], "It is the lowest layer."],
    ["As a plane climbs above Ohio through the troposphere, the air gets…", "colder and thinner", ["warmer and thicker", "saltier"], "Air pressure drops with height."],
    ["Warm, humid summer air in Ohio usually flows in from the…", "south", ["Arctic", "North Pole"], "Warm air masses form over warm water."],
    ["The ozone layer, which absorbs ultraviolet rays, is in the…", "stratosphere", ["troposphere", "mesosphere"], "It sits above the weather."],
  ], { parentNote: "Practises how air masses and fronts change the weather, how the atmosphere changes with height, and how the sun and gravity drive the water cycle." }),
  localCopy(from(NEW_YORK_SCIENCE_6, "ny-g6-climate"), "oh-g7-climate", ["7.ESS.2", "thermal energy in the ocean and the atmosphere forms currents, which shape global climate patterns"], [
    ["Lake Erie keeps nearby Ohio towns a little… in fall than places farther inland.", "warmer", ["colder", "drier"], "Water holds heat."],
    ["Ocean currents like the Gulf Stream carry warm water…", "north from the tropics", ["from the poles to the equator only", "under the land"], "Currents move heat around Earth."],
    ["Places near the equator get more direct sunlight, so they are…", "warmer", ["colder", "snowier"], "Latitude shapes climate."],
    ["Rising global temperatures are mostly caused by…", "greenhouse gases from burning fossil fuels", ["the moon", "volcanoes on Mars"], "These gases trap heat."],
    ["Climate is different from weather because climate is…", "the average weather over many years", ["the weather today", "only the temperature at noon"], "Weather changes daily."],
    ["Ohio has warm summers and cold winters partly because it is in the… and far from an ocean.", "middle latitudes", ["tropics", "Arctic"], "Oceans soften seasons.", true],
  ], { parentNote: "Practises how latitude, oceans, ocean currents, lakes and winds shape regional climate, and the evidence for and causes of rising global temperatures." }),
  localCopy(from(TEXAS_SCIENCE_6, "tx-g6-seasons-tides"), "oh-g7-seasons-tides", ["7.ESS.4; 7.ESS.5", "the positions of Earth, the moon and the sun cause tides, and Earth's tilt causes the seasons"], [
    ["Ohio has summer when the Northern Hemisphere is…", "tilted toward the sun", ["closest to the moon", "tilted away from the sun"], "Sunlight is more direct."],
    ["Lake Erie has only tiny tides because…", "it is too small for the moon to raise much water", ["it has no water", "the moon never shines on it"], "Tides are big in oceans."],
    ["Spring tides, the highest high tides, happen when the sun, moon and Earth are…", "lined up", ["at right angles", "far apart"], "Their pulls add together."],
    ["Ocean tides are caused mostly by the pull of the…", "moon's gravity", ["wind", "sun's light"], "The moon is close to Earth."],
    ["Ohio's longest day of the year is near…", "June 21", ["December 21", "March 1"], "It is the summer solstice."],
    ["Neap tides happen when the sun and moon pull…", "at right angles to each other", ["in the same direction", "not at all"], "Their pulls partly cancel.", true],
  ], { parentNote: "Practises how the tilt of Earth's axis as it revolves around the sun causes the seasons, and how the positions of the Earth, sun and moon cause daily tides and monthly spring and neap tides." }),
  localCopy(from(TEXAS_SCIENCE_7, "tx-g7-water"), "oh-g7-water", ["7.ESS.1", "water moves through watersheds, the ground and the oceans in the hydrologic cycle"], [
    ["Rain that falls in most of northern Ohio drains into…", "Lake Erie", ["the Ohio River", "the Pacific Ocean"], "Northern rivers flow north."],
    ["Rain that falls in most of southern Ohio drains into the…", "Ohio River", ["Lake Erie", "Arctic Ocean"], "Southern rivers flow south."],
    ["A divide between the Lake Erie and Ohio River watersheds runs…", "across Ohio", ["along the Pacific coast", "under Lake Erie"], "Water flows away from a divide."],
    ["Water that soaks into the ground and fills spaces in rock is…", "groundwater", ["a cloud", "a glacier"], "It is stored underground."],
    ["Many Ohio towns get drinking water from wells that tap…", "aquifers", ["clouds", "ocean water"], "An aquifer holds groundwater."],
    ["Water evaporates from Lake Erie, forms clouds and falls as rain. This is the…", "water cycle", ["rock cycle", "food chain"], "It is also called the hydrologic cycle."],
  ], { parentNote: "Practises how water moves through watersheds, aquifers and the oceans, how human activity helps or harms groundwater and surface water (runoff, pollution, conservation), and how people depend on and affect water systems." }),
];
