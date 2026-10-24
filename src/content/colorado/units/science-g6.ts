import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g6";
import { copyOf, from } from "./kit";

// Colorado Grade 6 science: copies of California's weather, climate and growth units without their California places,
// with Colorado examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_6: Unit[] = [
  copyOf(
    from(CA, "ca-g6-weather"),
    {
      id: "co-g6-weather",
      title: "Weather Systems",
      emoji: "🌧️",
      blurb: "Air masses, fronts and the water cycle.",
      parentNote:
        "Practices how air masses and fronts change the weather, and how the sun and gravity drive the water cycle, with Colorado examples such as summer thunderstorms, upslope snowstorms and chinook winds.",
      standards: ["ESS3.MS.6.b; ESS3.MS.6.c", "the water cycle driven by sunlight and gravity, and how air masses cause weather changes"],
    },
    [
      ["Warm, moist air from the Gulf meets cold, dry air from the north over Colorado. What often forms?", "thunderstorms", ["clear, calm skies", "a desert", "an earthquake"], "Fronts where air masses meet bring storms."],
      ["Moist air pushed up against the Front Range cools and can bring…", "heavy snow", ["a heat wave", "a drought", "a sandstorm"], "Rising air cools and its water vapor condenses."],
      ["When a cold front passes through Denver, the temperature usually…", "drops", ["rises sharply", "stays the same", "doubles"], "Cold air pushes in behind the front."],
      ["What makes water evaporate from a mountain reservoir?", "energy from the sun", ["gravity", "the wind only", "the Moon"], "Sunlight heats the water."],
      ["What pulls rain and snow back down to the ground?", "gravity", ["sunlight", "evaporation", "air pressure only"], "Gravity drives precipitation and runoff."],
      ["Falling air pressure in a weather report often means…", "stormy weather is coming", ["clear weather is coming", "an earthquake is near", "the sun is closer"], "Low pressure brings clouds and rain.", true],
      ["Warm, dry chinook winds blowing down the mountains can…", "melt snow on the plains quickly", ["make it snow harder", "freeze rivers", "stop all wind"], "Air warms as it sinks.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-climate"),
    {
      id: "co-g6-climate",
      title: "Climate & Climate Change",
      emoji: "🌍",
      blurb: "What shapes climate, and why Earth is warming.",
      parentNote:
        "Practices how latitude, large bodies of water and winds shape regional climate, such as Colorado's dry, sunny continental climate and the cooler, snowier mountains, and the causes of rising global temperatures.",
      standards: ["ESS3.MS.6.d; ESS3.MS.11.a", "what shapes regional climate, and the causes of rising global temperatures"],
    },
    [
      ["Colorado is far from any ocean, so its climate has…", "hot summers and cold winters", ["the same temperature all year", "no seasons", "only rain"], "Oceans keep coastal climates milder."],
      ["Mountain towns are cooler in summer than towns on the plains mainly because they are…", "at a higher elevation", ["closer to the ocean", "farther from the sun's light", "under the ground"], "Air gets cooler as you go higher."],
      ["Why is Colorado drier than places near the Gulf Coast?", "it is far from the ocean's moisture", ["it is closer to the sun", "it has no wind", "it is near the equator"], "Moist air comes from oceans."],
      ["Burning fossil fuels adds which gas that traps heat?", "carbon dioxide", ["oxygen", "helium", "nitrogen only"], "It is a greenhouse gas."],
      ["Planting trees can help slow climate change because trees…", "take in carbon dioxide", ["make the sun cooler", "produce coal", "stop the wind"], "Plants use carbon dioxide to grow."],
      ["Climate is different from weather because climate is…", "the pattern over many years", ["what happens today", "only about rain", "only about wind"], "Weather is short term.", true],
      ["Warmer springs in Colorado make mountain snow melt earlier. That can leave rivers…", "lower in late summer", ["higher all year", "frozen in summer", "unchanged"], "Snowpack stores water for summer.", true],
    ],
  ),
  copyOf(
    from(CA, "ca-g6-growth"),
    {
      id: "co-g6-growth",
      title: "Growing & Reproducing",
      emoji: "🌸",
      blurb: "Flowers, nests, genes, sunlight and copies of parents.",
      parentNote:
        "Practices how animal behaviors and plant structures help reproduction, how environment and genes affect growth, and asexual versus sexual reproduction, with Colorado examples like wildflowers, aspen trees and corn.",
      standards: ["LS2.MS.2.a; LS2.MS.2.b; LS2.MS.8.b", "behaviors and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"],
    },
    [
      ["Bright blue columbines in mountain meadows attract bees. This helps the plant…", "get pollinated", ["stay warm", "grow roots", "hide from deer"], "Bees carry pollen between flowers."],
      ["Corn pollen is carried from tassels to silks mostly by…", "the wind", ["birds", "bats", "rain only"], "Corn is wind-pollinated."],
      ["Corn planted in rich, wet soil grows taller than corn in dry, poor soil. This shows growth depends on…", "the environment", ["only genes", "the moon", "the color of the seed"], "Water and nutrients affect growth."],
      ["A bull elk bugling to attract a mate is a…", "behavior that helps reproduction", ["kind of pollination", "kind of root", "way to make seeds"], "Animals use songs and displays."],
      ["Offspring from sexual reproduction get genes from…", "two parents", ["one parent", "no parents", "only the soil"], "Each parent gives half."],
      ["A grove of aspen trees sprouting from one shared root system is…", "asexual reproduction", ["sexual reproduction", "pollination", "migration"], "The new plant is a copy of the parent.", true],
      ["Why do farmers plant seeds from plants that grew best?", "offspring inherit useful traits", ["seeds forget their parents", "bigger seeds are always better", "it changes the weather"], "Traits pass from parents to offspring.", true],
    ],
  ),
];
