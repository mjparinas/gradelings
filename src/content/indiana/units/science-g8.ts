import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { SCIENCE_COPIES as OREGON_SCIENCE_COPIES } from "../../oregon/units/science-copies";
import { copyOf, from, localCopy } from "./kit";

// Indiana Grade 8 science: Indiana teaches weather, climate, growth and heredity, and the history of life in Grade 8, so
// this grade has copies of California's weather, climate and growth units and Oregon's Earth-history unit without their
// own states' places, with Indiana examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_8: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "in-g8-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Indiana examples such as spring thunderstorms and lake-effect snow.",
      standards: ["MS-ESS2-4; MS-ESS2-5", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["Warm, moist air from the Gulf meets cold, dry air from the north over Indiana. What often forms?", "thunderstorms", ["clear, calm skies", "a desert", "an earthquake"], "Fronts where air masses meet bring storms."],
      ["Cold air crossing the warmer water of Lake Michigan in winter can bring northern Indiana…", "lake-effect snow", ["a heat wave", "a drought", "a sandstorm"], "The air picks up moisture from the lake."],
      ["When a cold front passes through Indianapolis, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from Lake Michigan?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Why do tornado watches in Indiana come most often in spring?", "warm and cold air masses collide more often", ["the sun is farther away", "there is no wind in summer", "lakes are frozen"], "Clashing air masses make storms.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "in-g8-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, large bodies of water and winds shape regional climate, such as Indiana's continental climate and Lake Michigan's effect on the north, and the causes of rising global temperatures.",
      standards: ["MS-ESS2-6; MS-ESS3-5", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Indiana is far from any ocean, so its climate has…", "hot summers and cold winters", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Towns near Lake Michigan often have cooler summer days because…", "the lake water warms slowly", ["the lake is salty", "the lake makes hills", "there is no sun there"], "Large bodies of water change temperature slowly."],
      ["Why is southern Indiana usually warmer than northern Indiana?", "it is closer to the equator", ["it is higher up", "it has more snow", "it is next to the ocean"], "Latitude affects climate."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Rising temperatures can bring Indiana heavier rainstorms because warmer air…", "holds more water vapor", ["holds less water", "stops evaporation", "freezes faster"], "Warm air can carry more moisture.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "in-g8-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Indiana examples like peonies, tulip trees and corn.",
      standards: ["MS-LS1-4; MS-LS1-5; MS-LS3-2", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["The big, sweet-smelling flowers of a peony attract insects. This helps the plant…", "get pollinated", ["stay warm", "grow roots", "hide from deer"], "Insects carry pollen between flowers."],
      ["Corn pollen is carried from tassels to silks mostly by…", "the wind", ["birds", "bats", "rain only"], "Corn is wind-pollinated."],
      ["Corn planted in rich, wet soil grows taller than corn in dry, poor soil. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["A cardinal singing to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A potato growing from a piece of potato is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
  localCopy(
    from(OREGON_SCIENCE_COPIES["8"] ?? [], "or-g8-earth-history"),
    "in-g8-earth-history",
    ["MS-LS4-1; MS-LS4-2", "the fossil record as evidence of change over time, and anatomical evidence of common ancestry"],
    [
      ["In undisturbed rock layers, the youngest layer is…", "on top", ["at the bottom", "in the middle"], "Layers stack over time."],
      ["The coral fossils at the Falls of the Ohio are about 390 million years old. They tell us…", "the area was once a warm, shallow sea", ["it was a desert then", "Indiana had glaciers then"], "Coral grows only in warm water."],
      ["The fossil record shows that life on Earth has…", "changed over time", ["never changed", "only grown smaller"], "Older layers hold older forms of life."],
      ["Similar bones in a bat's wing and a human arm are evidence of…", "common ancestry", ["no relationship", "the same diet"], "Similar structures suggest shared ancestors."],
      ["Which is older, coal deep in southwestern Indiana or the Ice Age soil on top of it?", "the coal", ["the Ice Age soil", "they are the same age"], "Lower layers formed first.", true],
      ["Mastodon bones in Indiana are only thousands of years old, but the coral fossils are hundreds of millions. This shows the fossil record…", "covers very different ages", ["is all from one year", "has no order"], "Fossils span Earth's long history.", true],
    ],
  ),
];
