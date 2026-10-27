import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// South Dakota Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with South Dakota examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "sd-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with South Dakota examples such as Arctic cold fronts, summer thunderstorms and blizzards on the plains.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["In summer, warm, moist air from the Gulf of Mexico meets cooler, dry air over the plains. This often brings…", "thunderstorms", ["clear, calm skies", "a glacier", "an earthquake"], "Rising moist air cools and its water vapor condenses."],
      ["A very cold, dry air mass that sweeps south into South Dakota in winter comes from…", "the Arctic", ["the Gulf of Mexico", "the equator", "the ocean floor"], "Air masses take on the traits of where they form."],
      ["When a cold front passes through Rapid City, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from lakes and rivers?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Melting snow running off fields into the Big Sioux River is the water cycle's…", "runoff", ["evaporation", "condensation", "freezing"], "Gravity pulls water downhill.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "sd-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, distance from the ocean, elevation and winds shape regional climate, such as South Dakota's hot summers and cold winters far from any ocean, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Why does South Dakota have bigger swings between summer and winter than a town on the ocean?", "it is far from the ocean, which keeps coasts milder", ["it is closer to the moon", "it is lower down", "it has more cities"], "Water warms and cools slowly."],
      ["South Dakota is far from the equator, so it has…", "warm summers and cold winters", ["the same temperature all year", "no seasons", "only rain"], "Latitude shapes how much sunlight a place gets."],
      ["The Black Hills are often cooler and wetter than the plains around them because they are…", "higher up", ["closer to the sun", "under the sea", "made of ice"], "Air cools as it rises."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Western South Dakota gets less rain than eastern South Dakota. This affects…", "which crops farmers can grow and where ranches are", ["the time zone only", "how long a year is", "the phases of the moon"], "Climate shapes how people use land.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "sd-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with South Dakota examples like the pasque flower, ring-necked pheasants and corn and wheat fields.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Bees visit pasque flowers, South Dakota's state flower, and carry pollen from flower to flower. This helps the flowers…", "make seeds", ["stay warm", "grow roots", "hide from rabbits"], "Pollination leads to seeds."],
      ["Cottonwood seeds have fluffy white hairs so they can be carried by…", "the wind", ["fish", "snow only", "earthworms"], "Light, fluffy seeds float far away."],
      ["Corn in a field grows taller in a sunny summer with plenty of rain. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and light affect growth."],
      ["A male pheasant showing off bright feathers in spring is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Displays help animals find mates."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do farmers plant seeds from the wheat plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
