import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Montana Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Montana examples added (forests, prairie, Flathead Lake, the Missouri River and the Rocky Mountains).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "mt-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, prairie, mountains and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Montana's mountain forests and prairie grasslands to deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Tall ponderosa pines and fir trees grow close together in a…", "forest", ["coral reef", "desert", "glacier"], "Much of western Montana is covered by forest."],
      ["Where would a pronghorn find grass to eat in eastern Montana?", "on the prairie", ["in the open ocean", "on sand dunes", "on an ice cap"], "Prairie is wide, grassy land."],
      ["Mountain goats climb steep, rocky cliffs high in the…", "mountains", ["desert", "swamp", "ocean"], "Montana's west is full of mountains."],
      ["Trout swim in cold, clear water in a…", "mountain stream", ["sand dune", "cornfield", "cave"], "Fish need water to live."],
      ["Montana's state bird sings from fence posts on the prairie. It is the…", "western meadowlark", ["penguin", "flamingo", "puffin"], "It has a yellow chest with a black V."],
      ["Which animal builds dams in Montana streams?", "beaver", ["dolphin", "camel", "parrot"], "It cuts trees with its strong teeth."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a forest in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do aspen and cottonwood trees drop their leaves in fall?", "to save water and energy in winter", ["to keep them warm", "to catch insects", "to grow fruit"], "They grow new leaves in spring.", true],
      ["Bald eagles gather in winter along Montana rivers to…", "catch fish in open water", ["build igloos", "eat cactus", "sleep in caves"], "They need water that is not frozen.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "mt-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Mountains, plains, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Montana places like the Rocky Mountains, the Great Plains, the Missouri River and Flathead Lake.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["The Rocky Mountains in western Montana are tall, rocky…", "mountains", ["oceans", "deserts", "islands"], "Mountains are higher than hills."],
      ["The Missouri River is a long…", "river", ["mountain", "island", "glacier"], "It flows east across Montana."],
      ["Flathead Lake is a big body of fresh water with land all around it. It is a…", "lake", ["ocean", "river", "mountain"], "Lakes have land on every side."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["The wide, mostly flat land of eastern Montana is called the…", "plains", ["ocean", "canyon", "glacier"], "Plains are flat or gently rolling."],
      ["Low land between mountains, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in Flathead Lake fresh or salty?", "fresh", ["salty", "frozen all year", "boiling"], "Rivers and snowmelt fill it.", true],
    ],
  ),
];
