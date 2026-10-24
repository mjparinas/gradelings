import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// New Jersey Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with New Jersey examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "nj-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with New Jersey examples such as summer thunderstorms, nor'easters and hurricanes.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["Warm, moist air from the south meets cold, dry air from Canada over New Jersey. What often forms?", "thunderstorms", ["clear, calm skies", "a desert", "an earthquake"], "Fronts where air masses meet bring storms."],
      ["A storm moving up the coast in winter, pulling in moist ocean air, can bring New Jersey…", "heavy snow and strong wind", ["a heat wave", "a drought", "a sandstorm"], "That kind of storm is a nor'easter."],
      ["When a cold front passes through Trenton, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from the Atlantic Ocean?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Why do hurricanes that reach New Jersey form over warm ocean water?", "warm water gives the storm heat and moisture", ["cold water makes wind", "hurricanes form over deserts", "the Moon pulls them"], "They weaken over land and cold water.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "nj-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, large bodies of water and winds shape regional climate, such as the Atlantic Ocean's effect on the Jersey Shore, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Towns on the Jersey Shore often have milder winters than towns far inland because…", "the ocean cools and warms slowly", ["the ocean is frozen", "the shore is higher up", "there is no sun there"], "Oceans keep coastal climates milder."],
      ["On hot summer days, beaches often feel cooler than towns inland because…", "a breeze blows in off the cooler ocean", ["the sand is cold", "the sun is farther away", "there is no air there"], "Land heats up faster than water."],
      ["Why is Cape May usually warmer than High Point?", "it is farther south, lower and next to the ocean", ["it is higher up", "it has more snow", "it is farther north"], "Latitude, height and water affect climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising temperatures can bring New Jersey heavier rainstorms because warmer air…", "holds more water vapor", ["holds less water", "stops evaporation", "freezes faster"], "Warm air can carry more moisture.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "nj-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with New Jersey examples like blueberries and corn.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Bees visit blueberry flowers on New Jersey farms. This helps the plant…", "get pollinated", ["stay warm", "grow roots", "hide from deer"], "Bees carry pollen between flowers."],
      ["Corn pollen is carried from tassels to silks mostly by…", "the wind", ["birds", "bats", "rain only"], "Corn is wind-pollinated."],
      ["Corn planted in rich, wet soil grows taller than corn in dry, poor soil. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["A goldfinch singing to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
