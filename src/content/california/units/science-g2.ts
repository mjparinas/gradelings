import type { Unit } from "../../types";
import { SCIENCE_2 } from "../../washington/units/science-k2";
import { copyOf, from } from "./kit";

// California copies of Washington and Oregon science units built around Pacific Northwest places. Each keeps the
// original's questions, leaves out the ones about Washington, Oregon or Puget Sound, and adds California items: the
// Sierra Nevada, the Central Valley, the San Andreas Fault, kelp forests and the La Brea Tar Pits. Their own `ca-` ids
// keep California progress apart from the originals.

export const SCIENCE_COPIES: Unit[] = [
  copyOf(
    from(SCIENCE_2, "wa-g2-habitats"),
    {
      id: "ca-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, oceans, deserts and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from California's redwood forests, kelp forests and deserts to grasslands and the Arctic.",
      standards: [
        "2-LS4-1",
        "comparing the variety of plants and animals in different habitats",
      ],
    },
    [
      [
        "Tall coast redwood trees grow in…",
        "foggy forests near the coast",
        ["dry sand dunes", "the open ocean", "icy tundra"],
        "Fog gives them water.",
      ],
      [
        "Sea otters float and eat in…",
        "kelp forests in the ocean",
        ["desert sand", "tall pine trees", "a farm field"],
        "Kelp is a big seaweed.",
      ],
      [
        "A desert tortoise lives in the…",
        "Mojave Desert",
        ["kelp forest", "rainforest", "Arctic"],
        "It is hot and dry there.",
      ],
      [
        "Which plant grows in California's deserts?",
        "Joshua tree",
        ["Water lily", "Kelp", "Moss on a log"],
        "It can live with little water.",
      ],
      [
        "Which habitat has salt water and tides?",
        "A tide pool by the ocean",
        ["A mountain lake", "A desert", "A redwood forest"],
        "Tides come from the ocean.",
        true,
      ],
      [
        "Why do many kinds of fish live in a kelp forest?",
        "Kelp gives food and hiding places",
        ["Kelp is dry", "There is no water", "Kelp makes snow"],
        "Shelter and food bring life.",
        true,
      ],
    ],
  ),
  copyOf(
    from(SCIENCE_2, "wa-g2-land-water"),
    {
      id: "ca-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Mountains, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using California places like the Sierra Nevada, the Central Valley, Lake Tahoe and San Francisco Bay.",
      standards: [
        "2-ESS2-2; 2-ESS2-3",
        "modeling the shapes and kinds of land and water in an area",
      ],
    },
    [
      [
        "Mount Whitney in California is a very tall…",
        "mountain",
        ["lake", "river", "plain"],
        "It is the tallest peak in the lower 48 states.",
      ],
      [
        "The Sierra Nevada is a long row of…",
        "mountains",
        ["oceans", "lakes", "deserts"],
        "A row of mountains is a range.",
      ],
      [
        "The Central Valley is low, flat land between…",
        "mountains",
        ["two oceans", "two deserts", "two islands"],
        "A valley sits between higher land.",
      ],
      [
        "Lake Tahoe is a big lake with…",
        "fresh water",
        ["salt water", "only ice", "no water"],
        "Most lakes are fresh.",
      ],
      [
        "San Francisco Bay is part of the ocean that reaches into the land. It is a…",
        "bay",
        ["mountain", "desert", "pond"],
        "A bay is partly closed in by land.",
      ],
      [
        "Which holds salt water?",
        "The Pacific Ocean",
        ["Lake Tahoe", "A mountain stream", "A rain puddle"],
        "Oceans are salty.",
        true,
      ],
      [
        "On a map, the Sacramento River is drawn as a…",
        "blue line",
        ["brown triangle", "green square", "red dot"],
        "Rivers are long and blue on maps.",
        true,
      ],
    ],
  ),
];
