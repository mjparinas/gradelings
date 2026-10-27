import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Montana Grade 6 science: copies of California's weather, climate and growth units without their California
// places, with Montana examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "mt-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Montana examples such as winter cold fronts, summer thunderstorms and mountain snowpack.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["Warm, moist air from the south meets cold, dry air from the north over Montana. What often forms?", "storms along a front", ["clear, calm skies", "a desert", "an earthquake"], "Fronts where air masses meet bring storms."],
      ["An arctic air mass sweeps south from Canada into Montana in winter. It often brings…", "bitter cold and snow", ["a heat wave", "a drought", "a sandstorm"], "Air masses carry the weather of where they formed."],
      ["When a cold front passes through Great Falls, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Flathead Lake?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Snow that falls high in the mountains ends up in rivers because…", "gravity pulls the meltwater downhill", ["the water is hotter than the land", "the sun sets early", "the Moon pulls the air"], "Warm air over land rises and cooler sea air moves in.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "mt-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, large bodies of water and winds shape regional climate, such as Montana's hot summers and cold winters far from any ocean, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Places in the middle of a continent, far from any ocean, usually have…", "hotter summers and colder winters", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Moist Pacific air drops rain and snow on the west side of the Rockies. The east side is drier because…", "the air has lost its moisture crossing the mountains", ["the east side is closer to the ocean", "mountains make clouds disappear", "there is no sun in the west"], "This is called a rain shadow."],
      ["Why are places near the equator usually warmer than Montana?", "sunlight hits them more directly", ["they are higher up", "they have more snow", "they have more mountains"], "Latitude affects climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising temperatures can bring Montana heavier rainstorms because warmer air…", "holds more water vapor", ["holds less water", "stops evaporation", "freezes faster"], "Warm air can carry more moisture.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "mt-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Montana examples like bitterroot flowers and wheat.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Pink bitterroot flowers attract bees. This helps the plant…", "get pollinated", ["stay warm", "grow roots", "hide from deer"], "Bees carry pollen between flowers."],
      ["Wheat pollen is carried from flower to flower mostly by…", "the wind", ["birds", "bats", "rain only"], "Grasses like wheat are wind-pollinated."],
      ["Wheat planted in rich, wet soil grows taller than wheat in dry, poor soil. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["A meadowlark singing to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
