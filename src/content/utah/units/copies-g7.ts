import type { Unit } from "../../types";
import { COPIES_8 } from "../../arizona/units/copies-g8";
import { SCIENCE_7, SCIENCE_8 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Utah copies of science units that fit Utah's Grade 7 except for a few questions naming another state's places, with
// Utah examples added. Utah teaches Earth's history in rock layers and fossils (from Grade 8) in Grade 7.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(SCIENCE_7, "wa-g7-earth-surface"), "ut-g7-earth-surface", ["7.2.2; 7.2.5", "how processes at different speeds shape Earth's surface, and evidence that Earth's plates move"], [
    ["The Wasatch Mountains rose along a fault where…", "blocks of Earth's crust moved up and down", ["a volcano erupted", "a glacier pushed them up"], "Each big earthquake moves them a little."],
    ["Utah's Basin and Range region formed as Earth's crust…", "stretched and broke into blocks", ["was squeezed by an ocean", "melted completely"], "Some blocks dropped while others rose."],
    ["Glaciers carved the U-shaped canyons of Utah's…", "Wasatch and Uinta Mountains", ["Great Salt Lake Desert", "Coral Pink Sand Dunes"], "Glaciers form in high, cold places."],
    ["Utah's arches took thousands of years to form, while a flash flood can change a canyon in…", "a few hours", ["a million years", "a thousand years"], "Some changes are sudden.", true],
  ], {
    blurb: "Plates, the rock cycle and Utah's mountains.",
    parentNote: "Practises plate tectonics and evidence from fossils, rocks and continent shapes, the rock cycle, and how processes at different speeds shape Earth's surface, including Utah's Wasatch Fault and Basin and Range.",
  }),
  localCopy(from(SCIENCE_8, "wa-g8-earth-history"), "ut-g7-earth-history", ["7.2.6; 7.5.2", "how rock layers show Earth's history, and patterns in the fossil record"], [
    ["Ancient Lake Bonneville once covered much of western Utah. Old shorelines on the mountains show…", "how high the lake used to be", ["where the ocean is now", "how old the trees are"], "Waves cut flat benches into the slopes."],
    ["In a Utah canyon, a layer with dinosaur fossils lies below a layer without them. Which layer is older?", "the dinosaur layer", ["the top layer", "they are the same age"], "Lower layers formed first."],
    ["Dinosaur fossils in Utah's rock layers help scientists…", "learn about past life and the age of the rock", ["find oil only", "measure this year's rainfall"], "Fossils are clues to the past.", true],
    ["Ash layers from ancient volcanoes in Utah help geologists by…", "giving a date for the layers around them", ["making the rocks red", "turning bones into fossils"], "Ash falls over a wide area at one time.", true],
  ]),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(COPIES_8, "az-g8-economy"), "ut-g7-economy", ["UT.5.3", "the key parts of Utah's economy, and using data to recommend sustainable development"], [
    ["Copper from Utah's Bingham Canyon mine is sold to buyers around the world. This is an example of…", "trade", ["a tax", "a command economy"], "Selling goods to others is trade."],
    ["Utah's tech companies along the Wasatch Front need many skilled workers. This is the demand for…", "labor", ["land", "rain"], "Workers supply labor."],
    ["If visitors to Utah's national parks double, the businesses that see the most new demand are…", "hotels, restaurants and guides", ["copper mines", "coal plants"], "Tourists spend on travel and food."],
    ["Sustainable development in Utah means growing the economy while…", "protecting water, air and land for the future", ["using up resources fast", "stopping all growth"], "Think of the next generation.", true],
  ], {
    parentNote: "How the whole economy works: GDP, inflation and unemployment, the Federal Reserve and interest rates, specialization and trade, and economic systems, with Utah examples such as mining, technology and tourism.",
  }),
];
