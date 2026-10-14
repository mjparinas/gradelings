import type { Unit } from "../../types";
import { SCIENCE_COPIES as californiaScienceG5 } from "../../california/units/science-g5";
import { SCIENCE_5 as washingtonScience5 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

/** Alabama's own Grade 5 science units (`al-` ids): copies of other states' units without their places, plus Alabama items. */
export const UNITS: Unit[] = [
  copyOf(
    from(washingtonScience5, "wa-g5-sun-stars"),
    {
      id: "al-g5-sun-stars",
      title: "Sun, Stars & Shadows",
      emoji: "⭐",
      blurb: "Why the sun looks so bright, and patterns of shadows, day and night, moon phases and stars.",
      parentNote: "Your child explains why the sun looks bigger and brighter than other stars and finds patterns in shadows, day and night, moon phases and the stars seen in each season.",
      standards: ["5.10; 5.11", "why the sun looks bigger and brighter than other stars, and daily and seasonal patterns in the sky"],
    },
    [
      ["The sun looks bigger and brighter than other stars because it is…", "much closer to Earth", ["the biggest star in the universe", "the only hot star", "made of fire"], "Distance changes how bright a star looks."],
      ["Your shadow is shortest at about…", "noon", ["sunrise", "sunset", "midnight"], "The sun is highest in the middle of the day."],
      ["The moon's phases repeat about every…", "month", ["day", "hour", "ten years"], "From one full moon to the next takes about 29.5 days."],
      ["Some constellations are seen only in certain seasons because…", "Earth moves around the sun during the year", ["stars turn off in summer", "the moon blocks them", "clouds always cover them"], "Our night side faces different stars through the year.", true],
    ],
  ),
  copyOf(
    from(californiaScienceG5, "ca-g5-earth-water"),
    {
      id: "al-g5-earth-water",
      title: "Earth's Systems & Water",
      emoji: "🌊",
      blurb: "How the atmosphere, biosphere, geosphere and hydrosphere interact, and where Earth's water is.",
      parentNote: "Your child models how two of Earth's systems interact to support life and how Earth's water is split between salt water and fresh water.",
      standards: ["5.12; 5.13", "how Earth's systems interact and support life, and the share of fresh and salt water on Earth"],
    },
    [
      ["Most of Earth's water is…", "salt water in the oceans", ["fresh water in lakes", "water vapor in clouds", "water in rivers"], "Oceans cover most of Earth."],
      ["Most of Earth's fresh water is frozen in…", "glaciers and ice caps", ["rivers", "puddles", "clouds"], "Much fresh water is ice near the poles."],
      ["Mobile Bay is where river water meets the sea. Its water is…", "a mix of fresh and salt water", ["pure fresh water", "frozen all year", "saltier than the open ocean"], "Rivers bring fresh water into the salty bay."],
      ["Rain soaking into soil so plants can grow shows which two systems interacting?", "Hydrosphere and biosphere", ["Atmosphere and space", "Geosphere and the moon", "Biosphere and the sun only"], "Water is the hydrosphere; living things are the biosphere.", true],
    ],
  ),
  copyOf(
    from(washingtonScience5, "wa-g5-ecosystems"),
    {
      id: "al-g5-ecosystems",
      title: "Matter Moves in Ecosystems",
      emoji: "🍂",
      blurb: "Producers, consumers and decomposers, and how matter and energy move among them.",
      parentNote: "Your child models how matter and energy move between living things and the environment, through food chains and decomposers.",
      standards: ["5.9", "how matter and energy move between organisms and their environment"],
    },
    [
      ["In an Alabama river, algae are eaten by small insects, which are eaten by catfish. The algae are…", "producers", ["consumers", "decomposers", "nonliving"], "Producers make their own food from sunlight."],
      ["Mushrooms growing on a fallen log are…", "decomposers", ["producers", "predators", "herbivores"], "They break down dead material."],
      ["Where does the energy in a food chain first come from?", "The sun", ["The soil", "Water", "Decomposers"], "Plants capture it to make food."],
      ["When a deer eats grass, matter from the grass…", "becomes part of the deer's body or is used for energy", ["disappears", "turns into sunlight", "goes back into the grass"], "Matter is not destroyed; it moves.", true],
    ],
  ),
  // A copy of wa-g5-gravity without its questions about other states' places.
  copyOf(from(washingtonScience5, "wa-g5-gravity"), {
    id: "al-g5-gravity",
    title: "Gravity Pulls Down",
    emoji: "🍎",
    blurb: "Earth's gravity pulls objects toward its center.",
    parentNote: "Your child learns that Earth's gravity pulls everything toward the center of the planet, wherever you stand.",
    standards: ["5.5; 5.6", "Earth's gravity pulls objects toward its center, and changing how fast things fall"],
  }, [
    ["A ball is dropped in Mobile and another in Huntsville. Which way do both fall?", "Down, toward Earth's center", ["Up", "Sideways", "Toward the sun"], "Gravity pulls toward the center of Earth."],
    ["Why does a ball you throw up come back down?", "Earth's gravity pulls it down", ["The air pushes it up", "It is too light", "The wind always blows down"], "A force pulls everything toward Earth."],
    ["Which force keeps water in a river flowing downhill?", "Gravity", ["Magnetism", "Friction", "Light"], "Water moves from high places to low places."],
    ["Rain falls from clouds to the ground because of…", "gravity", ["sunlight", "sound", "magnets"], "What pulls things down?"],
    ["A person in Australia drops a pencil. It falls…", "down, toward Earth's center, like everywhere else", ["up into the sky", "sideways", "it floats away"], "Down means toward the center of Earth everywhere.", true],
  ]),
];
