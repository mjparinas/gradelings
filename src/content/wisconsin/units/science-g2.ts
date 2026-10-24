import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Wisconsin Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Wisconsin examples added (northern forest, prairie, wetland, the Great Lakes and the big rivers).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "wi-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Forests, prairies, wetlands and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Wisconsin's northern forests, prairies, wetlands and Great Lakes to oceans, deserts and rainforests.",
      standards: ["SCI.2.LS.4", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Tall pines, maples and black bears are found in Wisconsin's northern…", "forests", ["coral reefs", "deserts", "glaciers"], "The north of the state is mostly forest."],
      ["Tall grasses and wildflowers grow on a…", "prairie", ["coral reef", "desert", "glacier"], "Prairies once covered much of southern Wisconsin."],
      ["Frogs, cattails and sandhill cranes live in a…", "wetland", ["desert", "mountain top", "cave"], "Wetlands are wet, marshy land."],
      ["Lake trout and whitefish swim in…", "Lake Superior", ["a sand dune", "a prairie", "a cornfield"], "Lake Superior is one of the Great Lakes."],
      ["Which bird is Wisconsin's state bird?", "American robin", ["penguin", "flamingo", "puffin"], "Robins hop on lawns in spring."],
      ["Which animal digs burrows and gives Wisconsin its nickname?", "badger", ["dolphin", "camel", "parrot"], "Wisconsin is the Badger State."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a prairie in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do prairie plants have very deep roots?", "to reach water when it is dry", ["to keep them warm", "to catch insects", "to grow fruit"], "Deep roots also survive fires.", true],
      ["Bald eagles gather in winter along the Wisconsin River to…", "catch fish in open water", ["build igloos", "eat cactus", "sleep in caves"], "Water below dams stays open.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "wi-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Wisconsin places like Lake Michigan, Lake Superior, the Mississippi and Wisconsin rivers and Door County.",
      standards: ["SCI.2.ESS.2", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Lake Michigan and Lake Superior are two of the five…", "Great Lakes", ["oceans", "mountains", "deserts"], "The Great Lakes hold fresh water."],
      ["The Mississippi is a long…", "river", ["mountain", "island", "glacier"], "It flows south to the Gulf."],
      ["The Mississippi River makes part of Wisconsin's western…", "border", ["mountain", "island", "desert"], "Rivers often mark borders."],
      ["The Apostle Islands in Lake Superior are land with water all around. Each one is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["Door County has water on three sides. That kind of land is a…", "peninsula", ["valley", "island", "plain"], "A peninsula sticks out into water."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in Lake Superior fresh or salty?", "fresh", ["salty", "frozen all year", "boiling"], "The Great Lakes are fresh water.", true],
    ],
  ),
];
