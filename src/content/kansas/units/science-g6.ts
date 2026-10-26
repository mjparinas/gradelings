import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Kansas Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with Kansas examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "ks-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Kansas examples such as spring thunderstorms, supercells and winter blizzards.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["In spring, warm, moist air from the Gulf of Mexico meets cool, dry air over Kansas. What often forms?", "thunderstorms", ["clear, calm skies", "a glacier", "an earthquake"], "The meeting air masses can build huge storms."],
      ["Warm, moist air rises fast inside a storm cloud over Kansas and drops…", "rain and hail", ["sand", "lava", "salt"], "Rising air cools and its water vapor condenses."],
      ["When a cold front passes through Salina, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Milford Lake?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Heavy rain flowing off fields into the Smoky Hill River is the water cycle's…", "runoff", ["evaporation", "condensation", "freezing"], "Gravity pulls rainwater downhill.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "ks-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, mountains, elevation and winds shape regional climate, such as the Rocky Mountains that leave western Kansas drier than the east, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["The Rocky Mountains catch much of the rain from Pacific storms, so western Kansas lies in a…", "rain shadow", ["rainforest", "monsoon belt", "polar zone"], "Air dries out as it crosses the mountains."],
      ["Kansas is far from any ocean, so its climate has…", "big swings between hot and cold", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Why is the top of a tall mountain colder than the valleys around it?", "it is much higher up", ["it is closer to the equator", "it is next to the ocean", "it has more cities"], "Air gets colder as you climb."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising temperatures can make droughts in Kansas worse because warmer air…", "dries out soil and lakes faster", ["holds less water", "stops evaporation", "freezes faster"], "Heat speeds up evaporation.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "ks-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Kansas examples like sunflowers, prairie wildflowers and wheat.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Bees carry pollen between sunflower blossoms. This helps the sunflowers…", "make seeds", ["stay warm", "grow roots", "hide from deer"], "Each depends on the other."],
      ["Wheat and prairie grass pollen is carried from plant to plant mostly by…", "the wind", ["birds", "bats", "rain only"], "Grasses are wind-pollinated."],
      ["Prairie wildflowers bloom in huge numbers after a wet spring. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["A male prairie-chicken puffing up and dancing to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
