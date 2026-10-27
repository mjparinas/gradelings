import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// New Mexico Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with New Mexico examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "nm-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with New Mexico examples such as summer monsoon storms and winter snow in the mountains.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["In summer, moist air flowing north meets hot air over New Mexico. What often forms?", "thunderstorms", ["clear, calm skies", "a glacier", "an earthquake"], "These summer storms are called the monsoon."],
      ["Moist air rises over the Sangre de Cristo Mountains in winter and drops…", "snow", ["sand", "lava", "salt"], "Rising air cools and its water vapor condenses."],
      ["When a cold front passes through Albuquerque, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Elephant Butte Lake?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Melting mountain snow in spring fills the Rio Grande. That is the water cycle's…", "runoff", ["evaporation", "condensation", "freezing"], "Gravity pulls melted snow downhill.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "nm-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, mountains, elevation and winds shape regional climate, such as New Mexico's cool, snowy mountains beside its hot deserts, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Why is the top of Wheeler Peak colder than the valleys around it?", "it is much higher up", ["it is closer to the equator", "it is next to the ocean", "it has more cities"], "Air gets colder as you climb."],
      ["New Mexico is far from any ocean, so its climate has…", "big swings between hot and cold", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Las Cruces is warmer in winter than Taos mostly because it is…", "lower and farther south", ["closer to the moon", "next to an ocean", "covered in forest"], "Latitude and elevation both shape climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising temperatures can make New Mexico's droughts worse because warmer air…", "dries out soil and rivers faster", ["holds less water", "stops evaporation", "freezes faster"], "Heat speeds up evaporation.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "nm-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with New Mexico examples like the yucca and its moth, desert wildflowers and ponderosa pines.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["A small moth carries pollen between the flowers of the yucca, New Mexico's state flower. This helps the yucca…", "make seeds", ["stay warm", "grow roots", "hide from rabbits"], "Each depends on the other."],
      ["Ponderosa pine pollen is carried from tree to tree mostly by…", "the wind", ["birds", "bats", "rain only"], "Pines are wind-pollinated."],
      ["Desert wildflowers bloom in huge numbers after a wet winter. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["A male lesser prairie-chicken dancing and booming on the eastern plains to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do chile farmers save seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
