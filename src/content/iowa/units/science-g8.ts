import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Iowa Grade 8 science: copies of California's weather, climate and growth units without their California places,
// with Iowa examples added. Iowa's science standards (2025) place weather, climate, growth and heredity in Grade 8.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "ia-g8-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and changing weather.",
      parentNote:
        "Practices how air masses meet at fronts and change the weather, with Iowa examples such as spring storms where warm, moist air from the Gulf of Mexico meets cold, dry air from Canada.",
      standards: ["8-ESS2-5", "how the motions and meetings of air masses cause changes in weather"],
    },
    [
      ["In spring, warm, moist air from the Gulf of Mexico meets cold, dry air over Iowa. What often forms?", "thunderstorms", ["clear, calm skies", "a glacier", "an earthquake"], "Clashing air masses make storms."],
      ["An air mass that forms over northern Canada in winter is usually…", "cold and dry", ["warm and moist", "hot and humid", "salty"], "Air takes on the traits of where it forms."],
      ["When a cold front passes through Des Moines, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["Humid summer days in Iowa come when air flows in from the…", "Gulf of Mexico", ["Arctic Ocean", "Sahara", "Rocky Mountain peaks"], "Moist air comes from warm water."],
      ["A line of storms moving across Iowa ahead of a cold front is called a…", "squall line", ["sand dune", "jet stream", "rain shadow"], "Storms line up along the front."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["A long line of strong winds that crossed Iowa in August 2020 and flattened crops was a…", "derecho", ["glacier", "tsunami", "rain shadow"], "Derechos are long-lived windstorms.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "ia-g8-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, oceans, land and winds shape regional climate, such as Iowa's hot summers and cold winters far from any ocean, and the causes of rising global temperatures.",
      standards: ["8-ESS2-6; 8-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Iowa is far from any ocean, so its climate has…", "big swings between hot and cold", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Why is northern Iowa usually colder in winter than southern Iowa?", "it is farther north", ["it is closer to the ocean", "it is lower down", "it has more cities"], "Latitude affects how much sunlight a place gets."],
      ["Moist air from the Gulf of Mexico gives Iowa…", "humid summers with plenty of rain", ["no rain at all", "a desert climate", "snow all summer"], "Winds carry moisture inland."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Warmer air can hold more water vapor, so a warming climate can bring Iowa…", "heavier rainstorms", ["no more rain", "colder winters only", "less evaporation"], "More water in the air means bigger downpours.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "ia-g8-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how environment and genes affect growth, and asexual versus sexual reproduction, with Iowa examples like corn, soybeans, prairie flowers and farm animals.",
      standards: ["8-LS1-5; 8-LS3-2", "what affects the growth of organisms, and asexual versus sexual reproduction"],
    },
    [
      ["Corn grows taller in a warm, wet summer than in a drought. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and warmth affect growth."],
      ["Corn pollen is carried from plant to plant mostly by…", "the wind", ["bats", "fish", "rain only"], "Corn tassels release pollen into the air."],
      ["A farmer adds fertilizer so a soybean field grows better. This shows growth depends on…", "nutrients in the soil", ["only genes", "the phase of the moon", "the farmer's name"], "Plants need nutrients."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["Bees moving pollen between prairie flowers helps the flowers…", "make seeds", ["stay warm", "grow roots", "hide from deer"], "Pollination leads to seeds."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
