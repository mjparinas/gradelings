import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Alaska Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Alaska examples added (the K-12 Science Standards for Alaska add Alaska examples to the same expectations).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "ak-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Tundra, forests, oceans and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Alaska's tundra, spruce forests and rivers to oceans, deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Caribou eat lichen on the…", "tundra", ["coral reef", "desert", "rainforest"], "The tundra is cold and has no tall trees."],
      ["A moose eats willow twigs in…", "forests and wetlands", ["the open ocean", "sand dunes", "ice caps"], "Moose like shrubs near water."],
      ["Sea otters float and eat in…", "the ocean near the shore", ["a spruce forest", "the tundra", "a lake on a mountain"], "They eat clams, crabs and sea urchins."],
      ["Which animal lives on the sea ice?", "polar bear", ["camel", "parrot", "squirrel"], "It hunts seals on the ice."],
      ["Salmon hatch in…", "rivers and streams", ["sand dunes", "tree tops", "deserts"], "Later they swim to the ocean."],
      ["Which plant grows low on the tundra?", "lichen", ["palm tree", "cactus", "redwood"], "Tundra plants stay close to the ground."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["the tundra", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do few trees grow on the Arctic tundra?", "the ground is frozen and summers are short", ["it is too hot", "there is too much shade", "animals eat every tree"], "Frozen ground is called permafrost.", true],
      ["Puffins nest on rocky cliffs and catch fish in…", "the sea", ["a desert", "a cave", "a wheat field"], "Puffins are good swimmers.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "ak-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Mountains, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Alaska places like Denali, the Yukon River, Iliamna Lake and the Kenai Peninsula.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Denali is the tallest…", "mountain in North America", ["river in Alaska", "lake in Alaska", "island in the world"], "It is in the Alaska Range."],
      ["The Yukon is a long…", "river", ["mountain", "island", "glacier"], "It flows to the Bering Sea."],
      ["Kodiak is land with water all around it. It is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["The Kenai Peninsula has water on three sides. It is a…", "peninsula", ["lake", "river", "pond"], "A peninsula sticks out into water."],
      ["Iliamna is the biggest… in Alaska.", "lake", ["mountain", "ocean", "volcano"], "It is fresh water with land around it."],
      ["A slow river of ice on a mountain is a…", "glacier", ["lake", "beach", "valley"], "Alaska has thousands of them."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Bristol Bay is ocean water partly closed in by land. It is a…", "bay", ["mountain", "island", "desert"], "A bay is a curve in the coast.", true],
    ],
  ),
];
