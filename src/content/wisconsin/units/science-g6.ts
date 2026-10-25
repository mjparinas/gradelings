import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Wisconsin Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with Wisconsin examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "wi-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Wisconsin examples such as summer thunderstorms and lake-effect snow.",
      standards: ["SCI.m.ESS.2", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["Warm, moist air from the Gulf meets cold, dry air from Canada over Wisconsin. What often forms?", "thunderstorms", ["clear, calm skies", "a desert", "an earthquake"], "Fronts where air masses meet bring storms."],
      ["Cold air crossing the open water of Lake Superior in early winter can bring…", "lake-effect snow", ["a heat wave", "a drought", "a sandstorm"], "The air picks up moisture from the lake."],
      ["When a cold front passes through Eau Claire, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Lake Michigan?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Why do severe storms in Wisconsin come most often in late spring and summer?", "warm, moist air meets cooler air more often", ["the sun is farther away", "there is no wind in summer", "lakes are frozen"], "Clashing air masses make storms.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "wi-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, large bodies of water and winds shape regional climate, such as Wisconsin's continental climate and the Great Lakes' effect on lakeshore towns, and the causes of rising global temperatures.",
      standards: ["SCI.m.ESS.2; SCI.m.ESS.3", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Wisconsin is far from any ocean, so its climate has…", "warm summers and cold winters", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Towns on Lake Michigan often have cooler summer days because…", "the lake water warms slowly", ["the lake is salty", "the lake makes hills", "there is no sun there"], "Large bodies of water change temperature slowly."],
      ["Why is southern Wisconsin usually warmer than northern Wisconsin?", "it is closer to the equator", ["it is higher up", "it has more snow", "it is next to the ocean"], "Latitude affects climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising temperatures can bring Wisconsin heavier rainstorms because warmer air…", "holds more water vapor", ["holds less water", "stops evaporation", "freezes faster"], "Warm air can carry more moisture.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "wi-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Wisconsin examples like prairie flowers, corn and cranberries.",
      standards: ["SCI.m.LS.1; SCI.m.LS.3", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Bright purple coneflowers on a prairie attract bees. This helps the plant…", "get pollinated", ["stay warm", "grow roots", "hide from deer"], "Bees carry pollen between flowers."],
      ["Corn pollen is carried from tassels to silks mostly by…", "the wind", ["birds", "bats", "rain only"], "Corn is wind-pollinated."],
      ["Corn planted in rich, wet soil grows taller than corn in dry, poor soil. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["Cranberry growers in Wisconsin bring in honeybees during bloom so the flowers are…", "pollinated", ["watered", "frozen", "picked"], "Bees move pollen from flower to flower."],
      ["A robin singing to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
