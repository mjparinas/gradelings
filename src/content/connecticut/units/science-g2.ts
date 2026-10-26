import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Connecticut Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Connecticut examples added (woodland, salt marsh, Long Island Sound and the Connecticut River).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "ct-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Woods, marshes, the Sound and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Connecticut woodlands, salt marshes and Long Island Sound to deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Oak, maple and birch trees grow close together in a…", "forest", ["coral reef", "desert", "glacier"], "Much of Connecticut is covered by forest."],
      ["Where would a white-tailed deer find shade and food in Connecticut?", "a woodland", ["the open ocean", "sand dunes", "an ice cap"], "Deer browse on leaves and acorns."],
      ["Grasses, crabs and egrets live where the sea meets the land in a…", "salt marsh", ["desert", "mountain top", "cave"], "Salt marshes line the Connecticut shore."],
      ["Lobsters and horseshoe crabs live in…", "Long Island Sound", ["a sand dune", "a forest", "a cornfield"], "The Sound is part ocean water."],
      ["Connecticut's state bird visits lawns to pull up worms. It is the…", "American robin", ["penguin", "flamingo", "puffin"], "It has a red-orange chest."],
      ["Which animal builds dams in Connecticut streams?", "beaver", ["dolphin", "camel", "parrot"], "It cuts trees with its strong teeth."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a forest in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do many Connecticut trees drop their leaves in fall?", "to save water and energy in winter", ["to keep them warm", "to catch insects", "to grow fruit"], "They grow new leaves in spring.", true],
      ["Bald eagles gather in winter along the Connecticut River to…", "catch fish in open water", ["build igloos", "eat cactus", "sleep in caves"], "They need water that is not frozen.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "ct-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Connecticut places like the Connecticut River, Long Island Sound and the Litchfield Hills.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Long Island Sound lies along Connecticut's southern…", "coast", ["mountain", "desert", "glacier"], "The Sound opens to the Atlantic Ocean."],
      ["The Connecticut River is a long…", "river", ["mountain", "island", "glacier"], "It flows south into Long Island Sound."],
      ["The Connecticut River flows into…", "Long Island Sound", ["a mountain", "a desert", "a glacier"], "Rivers flow downhill to the sea."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["The Litchfield Hills in northwestern Connecticut are high, rolling…", "hills", ["oceans", "canyons", "glaciers"], "Hills are lower than mountains."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in Long Island Sound fresh or salty?", "salty", ["fresh", "frozen all year", "boiling"], "It mixes ocean water with river water.", true],
    ],
  ),
];
