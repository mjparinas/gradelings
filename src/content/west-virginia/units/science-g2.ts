import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// West Virginia Grade 2 science: copies of California's habitat and land-and-water units without their California
// places, with West Virginia examples added (forests, bogs, mountain streams, the Ohio and New rivers, Spruce Knob).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "wv-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, bogs, streams and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from West Virginia's forests, mountain streams and bogs to deserts and rainforests.",
      standards: ["S.2.7", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Oak, maple and hickory trees grow close together in a…", "forest", ["coral reef", "desert", "glacier"], "Most of West Virginia is covered by forest."],
      ["Where would a black bear find food and shelter in West Virginia?", "the forest", ["the open ocean", "sand dunes", "an ice cap"], "The black bear is West Virginia's state animal."],
      ["West Virginia's state bird has bright red feathers. It is the…", "northern cardinal", ["penguin", "flamingo", "puffin"], "You can see it all year, even in winter."],
      ["Brook trout, West Virginia's state fish, live in…", "cold mountain streams", ["warm sand dunes", "salty oceans", "dry deserts"], "They need clean, cold water."],
      ["The Cranberry Glades are wet, spongy places full of moss called…", "bogs", ["deserts", "coral reefs", "glaciers"], "Bogs are a kind of wetland."],
      ["Which animal builds dams in West Virginia streams?", "beaver", ["dolphin", "camel", "parrot"], "It cuts trees with its strong teeth."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a forest in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many West Virginia trees drop their leaves in fall?", "to save water and energy in winter", ["to keep them warm", "to catch insects", "to grow fruit"], "They grow new leaves in spring.", true],
      ["Many bats spend the winter in West Virginia caves because caves…", "stay cool and steady all winter", ["are hot like deserts", "are full of sunlight", "are filled with ocean water"], "Caves do not freeze like the air outside.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "wv-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Mountains, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water, showing them on a simple map, and where water is found as ice or liquid, using West Virginia places like the Ohio River, the New River Gorge and Spruce Knob.",
      standards: ["S.2.10; S.2.11", "modeling the shapes and kinds of land and water in an area, and where water is found as solid or liquid"],
    },
    [
      ["The Ohio River is a long…", "river", ["mountain", "island", "glacier"], "It runs along West Virginia's western border."],
      ["West Virginia is called the Mountain State because it has lots of…", "mountains", ["oceans", "deserts", "glaciers"], "Mountains and hills cover the state."],
      ["Spruce Knob, the highest place in West Virginia, is the top of a…", "mountain", ["valley", "lake", "ocean"], "It is high in the Allegheny Mountains."],
      ["The New River Gorge is a deep valley with steep sides. It was cut by a…", "river", ["volcano", "desert", "glacier"], "Moving water carved it over a very long time."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in the New River fresh or salty?", "fresh", ["salty", "frozen all year", "boiling"], "Rivers carry fresh water from rain and springs.", true],
    ],
  ),
];
