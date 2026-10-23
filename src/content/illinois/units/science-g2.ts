import type { Unit } from "../../types";
import { SCIENCE_COPIES } from "../../california/units/science-g2";
import { copyOf, from } from "./kit";

// Illinois Grade 2 science: copies of California's habitat and land-and-water units without their California places,
// with Illinois examples added (prairie, woodland, wetland, Lake Michigan and the big rivers).

export const SCIENCE_2: Unit[] = [
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-habitats"),
    {
      id: "il-g2-habitats",
      title: "Habitats Near & Far",
      emoji: "🏞️",
      blurb: "Prairies, woods, wetlands and the life in each.",
      parentNote:
        "Practices comparing the plants and animals that live in different habitats, from Illinois prairies, woodlands, wetlands and Lake Michigan to oceans, deserts and rainforests.",
      standards: ["2-LS4-1", "comparing the variety of plants and animals in different habitats"],
    },
    [
      ["Tall grasses and wildflowers cover a…", "prairie", ["coral reef", "desert", "glacier"], "Illinois is called the Prairie State."],
      ["Where would a white-tailed deer find shade and food in Illinois?", "a woodland", ["the open ocean", "sand dunes", "an ice cap"], "Deer browse on leaves and acorns."],
      ["Frogs, cattails and herons live in a…", "wetland", ["desert", "mountain top", "cave"], "Wetlands are wet, marshy land."],
      ["Yellow perch and lake trout swim in…", "Lake Michigan", ["a sand dune", "a prairie", "a cornfield"], "Lake Michigan is one of the Great Lakes."],
      ["Which bird lives in Illinois all year?", "northern cardinal", ["penguin", "flamingo", "puffin"], "The cardinal is Illinois's state bird."],
      ["Which animal digs burrows on the prairie?", "badger", ["dolphin", "camel", "parrot"], "Prairie soil is deep and soft."],
      ["Which habitat has the most kinds of plants and animals?", "a warm rainforest", ["a prairie in winter", "an ice cap", "a sand dune"], "Warm, wet places hold the most life.", true],
      ["Why do prairie plants have very deep roots?", "to reach water when it is dry", ["to keep them warm", "to catch insects", "to grow fruit"], "Deep roots also survive fires.", true],
      ["Bald eagles gather in winter along the Mississippi River to…", "catch fish in open water", ["build igloos", "eat cactus", "sleep in caves"], "Dams keep some water from freezing.", true],
    ],
  ),
  copyOf(
    from(SCIENCE_COPIES, "ca-g2-land-water"),
    {
      id: "il-g2-land-water",
      title: "Land & Water Maps",
      emoji: "🗺️",
      blurb: "Hills, valleys, rivers, lakes and oceans.",
      parentNote:
        "Practices naming kinds of land and bodies of water and showing them on a simple map, using Illinois places like Lake Michigan, the Mississippi and Illinois rivers and the Shawnee Hills.",
      standards: ["2-ESS2-2; 2-ESS2-3", "modeling the shapes and kinds of land and water in an area"],
    },
    [
      ["Lake Michigan is one of the five…", "Great Lakes", ["oceans", "mountains", "deserts"], "The Great Lakes hold fresh water."],
      ["The Mississippi is a long…", "river", ["mountain", "island", "glacier"], "It flows south to the Gulf."],
      ["The Mississippi River makes Illinois's western…", "border", ["mountain", "island", "desert"], "Rivers often mark borders."],
      ["Land with water all around it is an…", "island", ["ocean", "river", "valley"], "Islands are surrounded by water."],
      ["Much of central Illinois is flat land called…", "plains", ["mountains", "canyons", "glaciers"], "Flat plains are good for farms."],
      ["Low land between hills, often with a river, is a…", "valley", ["peak", "island", "lake"], "Rivers carve valleys."],
      ["On a map, which color usually shows water?", "blue", ["brown", "red", "yellow"], "Water is blue on most maps."],
      ["Most of the water on Earth is in…", "the oceans", ["lakes", "rivers", "glaciers"], "Ocean water is salty.", true],
      ["Where is most of Earth's fresh water frozen?", "in ice and glaciers", ["in the oceans", "in puddles", "in clouds"], "Ice sheets hold a lot of fresh water.", true],
      ["Is the water in Lake Michigan fresh or salty?", "fresh", ["salty", "frozen all year", "boiling"], "The Great Lakes are fresh water.", true],
    ],
  ),
];
