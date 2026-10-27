import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// New Hampshire Grade 6 science: copies of California's weather, climate and growth units without their California
// places, with New Hampshire examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "nh-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with New Hampshire examples such as nor'easters, summer thunderstorms and the wild weather on Mount Washington.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["A nor'easter forms when cold air from the north meets warm, moist air from the…", "ocean", ["desert", "moon", "mountains only"], "The storm's winds blow in from the northeast."],
      ["Moist air rises over the White Mountains and cools. What often falls?", "rain or snow", ["sand", "lava", "salt"], "Rising air cools and its water vapor condenses."],
      ["When a cold front passes through Concord, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Lake Winnipesaukee?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Melting mountain snow in spring fills the Pemigewasset River. That is the water cycle's…", "runoff", ["evaporation", "condensation", "freezing"], "Gravity pulls melted snow downhill.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "nh-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, mountains, elevation, the ocean and winds shape regional climate, such as Mount Washington's cold summit and New Hampshire's milder coast, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Why is the top of Mount Washington colder than the valleys around it?", "it is much higher up", ["it is closer to the equator", "it is next to the ocean", "it has more cities"], "Air gets colder as you climb."],
      ["Portsmouth, on the coast, usually has milder winters than towns far inland because…", "the ocean keeps the air from getting as cold", ["it is higher up", "it is farther north", "it has more mountains"], "Water warms and cools slowly."],
      ["Towns in northern New Hampshire usually have colder winters than towns in the south mostly because they are…", "farther north", ["closer to the moon", "next to the equator", "covered in sand"], "Latitude shapes climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Warmer winters can shorten New Hampshire's ski and ice fishing seasons because…", "less snow and ice build up", ["the sun gets smaller", "mountains shrink", "lakes get saltier"], "Higher temperatures melt snow and ice.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "nh-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with New Hampshire examples like the purple lilac, apple orchards and their bees, white pines and the drumming ruffed grouse.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Bees carry pollen between apple blossoms in New Hampshire orchards. This helps the trees…", "make apples with seeds", ["stay warm", "grow roots", "hide from deer"], "Pollinated flowers become fruit."],
      ["White pine pollen is carried from tree to tree mostly by…", "the wind", ["birds", "bats", "rain only"], "Pines are wind-pollinated."],
      ["Garden plants grow bigger in a sunny, well-watered spot than in a dry, shady one. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water, light and nutrients affect growth."],
      ["A male ruffed grouse beating its wings to make a loud drumming sound in spring is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use sounds and displays to attract mates."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["New lilac bushes often sprout from the roots of an old one. The new bushes are…", "copies of the parent", ["mixes of two parents", "a different species", "grown from pollen"], "Growing from roots is asexual reproduction.", true],
    ],
  ),
];
