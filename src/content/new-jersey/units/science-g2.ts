import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// New Jersey Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with New Jersey examples added (the Pine Barrens, forests, salt marshes, the shore and the rivers).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "nj-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Pine forests, marshes, beaches and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from New Jersey's Pine Barrens, forests, salt marshes and beaches to deserts, ice and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Sandy soil and pitch pine trees cover New Jersey's…", "Pine Barrens", ["coral reef", "desert", "glacier"], "The Pine Barrens are also called the Pinelands."],
      ["Where would a white-tailed deer find shade and food in New Jersey?", "a forest", ["the open ocean", "sand dunes", "an ice cap"], "Deer browse on leaves and acorns."],
      ["Crabs, herons and tall grasses live in a salt…", "marsh", ["desert", "mountain top", "cave"], "Salt marshes line the bays near the shore."],
      ["Clams, crabs and striped bass live in…", "the Atlantic Ocean and its bays", ["a sand dune", "a pine forest", "a cornfield"], "New Jersey's east coast is on the Atlantic."],
      ["Which small yellow bird is New Jersey's state bird?", "the eastern goldfinch", ["penguin", "flamingo", "puffin"], "Goldfinches eat seeds from flowers."],
      ["Which animal comes ashore on Delaware Bay beaches to lay eggs each spring?", "horseshoe crab", ["dolphin", "camel", "parrot"], "Shorebirds eat their eggs."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a pine forest in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do pitch pines in the Pine Barrens survive forest fires?", "thick bark protects them and they sprout again", ["they never touch fire", "they are made of stone", "they live under water"], "Fire is part of life in the Pinelands.", true],
      ["Red knots stop at Delaware Bay on their long spring flight to…", "eat horseshoe crab eggs", ["build igloos", "eat cactus", "sleep in caves"], "The eggs give them energy to keep flying.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "nj-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using New Jersey places like the Atlantic coast, the Delaware and Hudson rivers, Delaware Bay and the mountains in the north.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["New Jersey's long east coast is on the…", "Atlantic Ocean", ["Pacific Ocean", "Great Lakes", "Gulf of Mexico"], "The beaches there are called the Jersey Shore."],
      ["The Delaware is a long…", "river", ["mountain", "island", "glacier"], "It flows south into Delaware Bay."],
      ["The Delaware River makes New Jersey's western…", "border", ["mountain", "island", "desert"], "Rivers often mark borders."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["Much of southern New Jersey is low, flat land called a coastal…", "plain", ["mountain", "canyon", "glacier"], "Flat land near the ocean is good for farms."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water at the Jersey Shore fresh or salty?", "salty", ["fresh", "frozen all year", "boiling"], "Ocean water is salty.", true],
    ],
  ),
];
