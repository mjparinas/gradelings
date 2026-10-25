import type { Unit } from "../../types";
import { SCIENCE_4, SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Utah copies of science units that fit Utah's Grade 5 except for a few questions naming another state's places, with
// Utah examples added. Utah teaches Earth's features and hazards (from Grade 4) in Grade 5.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(SCIENCE_4, "wa-g4-earth-hazards"), "ut-g5-earth-hazards", ["5.1.1; 5.1.5", "patterns of Earth's features on maps, and designs that reduce the impacts of natural hazards"], [
    ["The Wasatch Fault runs along the mountains near Salt Lake City. It can cause…", "earthquakes", ["hurricanes", "tsunamis"], "A fault is a crack where blocks of rock move."],
    ["Snow fences and avalanche control help keep Utah's mountain roads safe from…", "avalanches", ["volcanoes", "ocean waves"], "Snow can slide down steep slopes."],
    ["Hikers in Utah's narrow slot canyons check the weather first because of…", "flash floods", ["tsunamis", "earthquakes"], "Rain far away can send water rushing through."],
    ["Bolting tall bookshelves to the wall makes a home safer in…", "earthquakes", ["droughts", "snowstorms"], "It keeps them from falling over."],
    ["Clearing dry brush away from homes helps protect them from…", "wildfires", ["earthquakes", "flash floods"], "Dry plants burn easily.", true],
  ], {
    parentNote: "Practises reading maps of mountains, volcanoes, earthquakes and ocean features to find patterns, and comparing solutions that reduce the impacts of earthquakes, eruptions, landslides, floods and avalanches, using Utah's Wasatch Fault and canyons as examples.",
  }),
  localCopy(from(SCIENCE_5, "wa-g5-earth-water"), "ut-g5-earth-water", ["5.1.2; 5.3.4", "how Earth's systems interact, and how people protect Earth's resources and environment"], [
    ["The Great Salt Lake has shrunk in dry years partly because…", "people use river water before it reaches the lake", ["the lake froze solid", "the lake flowed into the ocean"], "Rivers are the lake's water supply."],
    ["Planting yards with plants that need little water helps Utah…", "save water", ["get more rain", "make more snow"], "Much of Utah is dry."],
    ["Snow melting in Utah's mountains in spring fills…", "rivers and reservoirs", ["the ocean directly", "the clouds"], "Water flows downhill."],
    ["Why is saving water important in Utah?", "Utah is one of the driest states", ["Utah gets too much rain", "water never runs out"], "Utah gets little rain."],
    ["Dust blowing off the dry shore of the Great Salt Lake into the air shows the geosphere interacting with the…", "atmosphere", ["biosphere only", "Moon"], "The air is the atmosphere.", true],
  ], {
    parentNote: "Practises how Earth's geosphere, hydrosphere, atmosphere and biosphere interact, how much of Earth's water is salty or frozen, and how communities protect resources like the Great Salt Lake.",
  }),
  localCopy(from(SCIENCE_5, "wa-g5-ecosystems"), "ut-g5-ecosystems", ["5.3.3", "how matter moves among plants, animals, decomposers and the environment"], [
    ["In the Great Salt Lake, brine shrimp eat algae. Algae are…", "producers", ["consumers", "decomposers"], "Algae make food from sunlight."],
    ["Eared grebes eat brine shrimp at the Great Salt Lake. The grebes are…", "consumers", ["producers", "decomposers"], "They eat other living things."],
    ["In Utah's deserts, fungi and beetles break down dead plants. They are…", "decomposers", ["producers", "predators"], "They return nutrients to the soil."],
    ["Sagebrush makes its own food from sunlight. It is a…", "producer", ["consumer", "decomposer"], "Plants make their own food."],
    ["A golden eagle catches a jackrabbit. The eagle is a…", "consumer", ["producer", "decomposer"], "It eats another animal.", true],
  ], {
    parentNote: "Practises how matter moves among plants, animals, decomposers and the environment, with Utah examples like the algae, brine shrimp and birds of the Great Salt Lake.",
  }),
];
